const BinarySearchTree = require("../../source/tree").BinarySearchTree

describe("Tree ◊ Binary Search Tree", function() {
  it("should initialise an empty tree",       testInit)
  it("should add an item",                    testAdd)
  it("should add lower value to the left",    testAddLeft)
  it("should add higher value to the right",  testAddRight)
  it("should add left and right",             testAddLeftRight)
  it("should not create duplicate nodes",     testAddDuplicate)

  it("should return node if search passes",   testFind)
  it("should return null if search fails",    testFindFail)

  it("should remove all copies of node by default",       testRemove)
  it("should remove only some copies of node if asked",   testRemoveSome)
  it("should remove the node if too many copies asked",   testRemoveTooMany)
})

function testInit() {
  const tree = new BinarySearchTree()
  expect(tree.count).toBe(0)
}

function testAdd() {
  const tree = new BinarySearchTree()
  tree.add(5)
  expect(tree.count).toBe(1)
  expect(tree.toString()).toMatch(`{"count":1,"nodes":{"data":5,"metadata":{"copies":1}}}`)
}

function testAddLeft() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(2)
  expect(tree.count).toBe(2)
  expect(tree.toString()).toMatch(`{"count":2,"nodes":{"data":5,"metadata":{"copies":1},"children":{"left":{"data":2,"metadata":{"copies":1}}}}}`)
}

function testAddRight() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(12)
  expect(tree.count).toBe(2)
  expect(tree.toString()).toMatch(`{"count":2,"nodes":{"data":5,"metadata":{"copies":1},"children":{"right":{"data":12,"metadata":{"copies":1}}}}}`)
}

function testAddLeftRight() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(2)
  tree.add(12)
  expect(tree.count).toBe(3)
  expect(tree.toString()).toMatch(`{"count":3,"nodes":{"data":5,"metadata":{"copies":1},"children":{"left":{"data":2,"metadata":{"copies":1}},"right":{"data":12,"metadata":{"copies":1}}}}}`)
}

function testAddDuplicate() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(5)
  tree.add(5)
  expect(tree.count).toBe(3)
  expect(tree.toString()).toMatch(`{"count":3,"nodes":{"data":5,"metadata":{"copies":3}}}`)
}

function testFind() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(10)
  tree.add(1)
  
  const node = tree.find(10)
  expect(node).not.toBe(null)
  expect(node.data).toBe(10)
}

function testFindFail() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(10)
  tree.add(1)
  expect(tree.find(100)).toBe(null)
}

function testRemove() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(10)
  tree.add(10)
  tree.add(10)
  tree.add(1)
  expect(tree.count).toBe(5)

  const node = tree.remove(10)
  expect(tree.count).toBe(2)
  expect(node.data).toBe(10)
  expect(tree.toString()).toBe(`{"count":2,"nodes":{"data":5,"metadata":{"copies":1},"children":{"left":{"data":1,"metadata":{"copies":1}}}}}`)
}

function testRemoveSome() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(10)
  tree.add(10)
  tree.add(10)
  tree.add(1)
  expect(tree.count).toBe(5)
  
  const node = tree.remove(10, 2)
  expect(tree.count).toBe(3)
  expect(node.data).toBe(10)
  expect(tree.toString()).toBe(`{"count":3,"nodes":{"data":5,"metadata":{"copies":1},"children":{"left":{"data":1,"metadata":{"copies":1}},"right":{"data":10,"metadata":{"copies":1}}}}}`)
}

function testRemoveTooMany() {
  const tree = new BinarySearchTree()
  tree.add(5)
  tree.add(10)
  tree.add(10)
  tree.add(1)
  expect(tree.count).toBe(4)
  
  const node = tree.remove(10, 3)
  expect(tree.count).toBe(2)
  expect(node.data).toBe(10)
  console.log
  expect(tree.toString()).toBe(`{"count":2,"nodes":{"data":5,"metadata":{"copies":1},"children":{"left":{"data":1,"metadata":{"copies":1}}}}}`)
}
