const { Graph } = require("../../source")

let graph;

describe("Graph", function() {
  beforeEach(() => {
    graph = new Graph()
  })

  it("should initialise",                       testInit)
  it("should add vertex",                       testAddVertex)
  it("should remove vertex",                    testRemoveVertex)
  it("should add edge for a directed graph",    testAddEdgeDirected)
  it("should add edge for an undirected graph", testAddEdgeUndirected)
  it("should remove edge for directed graph",   testRemoveEdgeDirected)
  it("should remove edge for undirected graph", testRemoveEdgeUndirected)
  it("should search depth-first",               testDepthFirstSearch)
  it("should search breadth-first",             testBreadthFirstSearch)
})

function testInit() {
  expect(graph._isDirected).toBe(true)
  expect(graph.count).toBe(0)
}

function testAddVertex() {
  graph.addVertex("Mongolia")
  graph.addVertex("India")
  graph.addVertex("Kenya")
  expect(graph.count).toBe(3)
}

function testRemoveVertex() {
  graph.addVertex("Mongolia")
  graph.addVertex("India")
  graph.addVertex("Kenya")
  expect(graph.count).toBe(3)

  const removed = graph.removeVertex("Kenya")
  expect(graph.count).toBe(2)
  expect(removed.data.key).toBe("Kenya")
}

function testAddEdgeDirected() {
  const { source, destination } = graph.addEdge("India", "Mongolia")
  expect(source.isNeighbour(destination)).toBe(true)
  expect(destination.isNeighbour(source)).toBe(false)
  expect(graph.areNeighbours("India", "Mongolia")).toBe(true)
}

function testAddEdgeUndirected() {
  const undirected = new Graph(false)
  const { source, destination } = undirected.addEdge("India", "Mongolia")
  expect(source.isNeighbour(destination)).toBe(true)
  expect(destination.isNeighbour(source)).toBe(true)
  expect(undirected.areNeighbours("India", "Mongolia")).toBe(true)
}

function testRemoveEdgeDirected() {
  const { source, destination } = graph.addEdge("India", "Mongolia")
  expect(source.isNeighbour(destination)).toBe(true)
  expect(destination.isNeighbour(source)).toBe(false)
  expect(graph.areNeighbours("India", "Mongolia")).toBe(true)

  expect(graph.removeEdge("India", "Mongolia")).toBe(true)
  expect(source.isNeighbour(destination)).toBe(false)
  expect(destination.isNeighbour(source)).toBe(false)
  expect(graph.areNeighbours("India", "Mongolia")).toBe(false)
}

function testRemoveEdgeUndirected() {
  const undirected = new Graph(false)
  const { source, destination } = undirected.addEdge("India", "Mongolia")
  expect(source.isNeighbour(destination)).toBe(true)
  expect(destination.isNeighbour(source)).toBe(true)
  expect(undirected.areNeighbours("India", "Mongolia")).toBe(true)

  expect(undirected.removeEdge("India", "Mongolia")).toBe(true)
  expect(source.isNeighbour(destination)).toBe(false)
  expect(destination.isNeighbour(source)).toBe(false)
  expect(undirected.areNeighbours("India", "Mongolia")).toBe(false)
}

function testDepthFirstSearch() {
  graph.addVertex("Mongolia")
  graph.addVertex("India")
  graph.addVertex("Kenya")
  graph.addVertex("Zimbabwe")
  graph.addVertex("Austria")
  graph.addVertex("Sweden")
  graph.addEdge("Mongolia", "India")
  graph.addEdge("Mongolia", "Austria")
  graph.addEdge("India", "Sweden")
  graph.addEdge("India", "Austria")
  graph.addEdge("India", "Zimbabwe")
  graph.addEdge("Kenya", "Zimbabwe")
  graph.addEdge("Austria", "India")
  graph.addEdge("Austria", "Sweden")
  graph.addEdge("Sweden", "Mongolia")

  expect(Array.from(graph.searchDepthFirst("India"))).toMatchSnapshot()
}

function testBreadthFirstSearch() {
  graph.addVertex("Mongolia")
  graph.addVertex("India")
  graph.addVertex("Kenya")
  graph.addVertex("Zimbabwe")
  graph.addVertex("Austria")
  graph.addVertex("Sweden")
  graph.addEdge("Mongolia", "India")
  graph.addEdge("Mongolia", "Austria")
  graph.addEdge("India", "Sweden")
  graph.addEdge("India", "Austria")
  graph.addEdge("India", "Zimbabwe")
  graph.addEdge("Kenya", "Zimbabwe")
  graph.addEdge("Austria", "India")
  graph.addEdge("Austria", "Sweden")
  graph.addEdge("Sweden", "Mongolia")

  expect(Array.from(graph.searchBreadthFirst("India"))).toMatchSnapshot()
}
