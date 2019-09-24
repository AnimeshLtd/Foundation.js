/**
 *  A graph is a non-linear data structure where a node can have zero or more
 *  connected nodes.
 *
 *  @module graph
 */

const { Stack, Queue } = require("../linear")
const GraphNode = require("./node")
const HashMap = require("../maps").HashMap

/**
 *  The connection between two nodes in a graph is called an **edge**.
 *  Nodes are also referred to as **vertices**.
 * 
 *  A graph can be **directed** or **undirected**. A directed graph
 *  has edges that allow traversing in one direction only. Whereas edges
 *  in an undirected graph are two-way and can be traversed freely.
 * 
 *  Graphs can be **cyclic** or **acyclic**. A graph in which you can
 *  pass through a node more than once is called a cyclic graph. Those
 *  who don't share this characteristic are acyclic graphs.
 */
class Graph {
  /**
   *  Instantiates a graph.
   *  @param {boolean} [directed=true] Edge direction. Set to `false`
   *    for an undirected graph.
   */
  constructor(directed = true) {
    this._nodes = new HashMap()
    this._isDirected = directed
  }

  get count() {
    return this._nodes.count
  }

  /**
   *  Add a vertex to the graph. Returns the new vertex or the existing
   *  one if it already exists.
   * 
   *  Runtime: `O(1)`
   * 
   *  @param {any} data
   *  @returns {GraphNode} the new node or the existing one if it already
   *    exists 
   */
  addVertex(data) {
    if(this._nodes.has(data)) {
      return this._nodes.get(data)
    }

    const vertex = new GraphNode(data)
    this._nodes.add(data, vertex)
    return vertex
  }

  /**
   *  Removes vertex with the given `data` from the graph. Returns the removed
   *  node's value or `null` if no such node was found.
   *  
   *  Runtime: `O(n)` where n = number of vertices + number of edges
   * 
   *  @param {any} data
   *  @returns {?any}
   */
  removeVertex(data) {
    if(!this._nodes.has(data)) {
      return null
    }

    const current = this._nodes.get(data)
    Array.from(this._nodes.values()).forEach(node => node.removeNeighbour(current))
    return this._nodes.delete(data)
  }

  /**
   *  Create a connection between `source` node and `destination` node. If the
   *  graph is undirected, it will also create the connection from `destination`
   *  to `destination`.
   *  If the nodes don't exist, they will be created anew with values set to 
   *  `source` and `destination` respectively.
   * 
   *  Return source/destination node pair as 
   *    `{ source: GraphNode, destination: GraphNode }`
   * 
   *  Runtime: `O(1)`
   * 
   *  @param {any} source 
   *  @param {any} destination
   *  @returns {{GraphNode, GraphNode}} source/destination node pair
   */
  addEdge(source, destination) {
    const sourceNode = this.addVertex(source)
    const destNode = this.addVertex(destination)
    
    sourceNode.addNeighbour(destNode)
    if(!this._isDirected) {
      destNode.addNeighbour(sourceNode)
    }

    return {
      source: sourceNode,
      destination: destNode
    }
  }

  /**
   *  Remove connection between `source` node and `destination` node.
   *  If the graph is undirected it will also remove the connection from
   *  `destination` to `destination`.
   * 
   *  Returns `true` if  deletion is successful, `false` if no such nodes
   *  exist.
   *  
   *  Runtime: `O(n)` where n is the number of edges
   * 
   *  @param {any} source 
   *  @param {any} destination 
   */
  removeEdge(source, destination) {
    const sourceNode = this._nodes.get(source)
    const destNode = this._nodes.get(destination)

    if (sourceNode && destNode) {
      sourceNode.removeNeighbour(destNode)
      if(!this._isDirected) {
        destNode.removeNeighbour(sourceNode)
      }
      return true
    }

    return false
  }

  /**
   *  Returns `true` if two nodes are adjacent to each other.
   *  
   *  @param {any} source source node's value
   *  @param {any} destination destination node's value
   *  @returns {boolean}
   */
  areNeighbours(source, destination) {
    const sourceNode = this._nodes.get(source)
    const destNode = this._nodes.get(destination)

    if (sourceNode && destNode) {
      return sourceNode.isNeighbour(destNode)
    }

    return false
  }

  /**
   *  Depth-first search goes deep before going wide. Works the same
   *  as {@link BinarySearchTree#searchDepthFirst}.
   *  
   *  @param {any} startValue value of the vertex to start the search from
   */
  * searchDepthFirst(startValue) {
    const startVertex = this._nodes.get(startValue)
    yield* Graph.Search(startVertex, Stack)
  }

  /**
   *  Breadth-first search goes deep before going wide. Works the same
   *  as {@link BinarySearchTree#searchBreadthFirst}.
   *  @param {any} startValue the value of the vertex to start the search from 
   */
  * searchBreadthFirst(startValue) {
    const startVertex = this._nodes.get(startValue)
    yield* Graph.Search(startVertex, Queue)
  }

  /**
   *  Generic graph search method. Can be passed a `Type` which determines
   *  the search method used.
   *  
   *  Breadth-first search if `Type` is `Queue`.
   *  Depth-first search if `Type` is `Stack`.
   *  
   *  @private
   *  @param {GraphNode} first vertex to start the search
   *  @param {Stack|Queue} Type `Stack` for depth-first; `Queue` for breadth-first
   */
  static* Search(first, Type = Stack) {
    const visited = new HashMap()
    const visitList = new Type()

    Type == Stack ? visitList.push(first) : visitList.enqueue(first)

    while (visitList._items.count > 0) {
      const node = Type == Stack ? visitList.pop() : visitList.dequeue()
      if (node && !visited.has(node)) {
        yield node
        visited.add(node)
        node._neighbours.forEach(neighbour => Type == Stack ? visitList.push(neighbour) : visitList.enqueue(neighbour))
      }
    }
  }
}

module.exports = Graph
