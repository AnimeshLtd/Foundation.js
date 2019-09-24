/**
 *  Graph node/vertex that can hold adjacent nodes. For performance,
 *  uses a `Set` instead of array for neighbours. Unlike trees, a
 *  graph does not have a root node and can be traversed from anywhere.
 *  
 *  @class GraphNode
 */
class GraphNode {
  constructor(data) {
    this._data = data
    this._neighbours = new Set()
  }

  /**
   *  Checks if the given `node` is a neighbour
   *  @param {GraphNode} neighbour 
   */
  isNeighbour(node) {
    return this._neighbours.has(node)
  }

  /**
   *  Remove given `neighbour` from the neighbours list. Returns `true`
   *  node or `false` if node was not found.
   * 
   *  Runtime: `O(1)`
   *  
   *  @param {GraphNode} neighbour
   *  @returns {boolean}
   */
  removeNeighbour(node) {
    return this._neighbours.delete(node)
  }

  /**
   *  Add `neighbour` to the neighbours list
   *  Runtime: `O(1)`
   * 
   *  @param {GraphNode} neighbour
   */
  addNeighbour(node) {
    this._neighbours.add(node)
  }
}

module.exports = GraphNode
