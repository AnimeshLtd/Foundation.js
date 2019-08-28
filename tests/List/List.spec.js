const List = require("../../source/List/List")

describe("List spec", function () {
  it("should initialise a list", testInit)
  
  it("should add data at end by default", testAdd)
  it("should add data at start", testAddAtStart)
  it("should add data at given index", testAddAtIndex)

  it("should find data by value", testIndexOf)
  it("should handle search by value failure", testIndexOfFailCase)

  it("should find data by index", testItemAtIndex)
  it("should handle index out of bounds error", testItemAtIndexOutOfBounds)
})

function testInit() {
  const list = new List()
  expect(list.count).toBe(0)
}

function testAdd() {
  const list = new List()
  list.add(10)
  list.add(20)
  expect(list.count).toBe(2)
  expect(list.itemAtIndex(1)).toBe(20)
}

function testAddAtStart() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30, 0)
  expect(list.count).toBe(3)
  expect(list.itemAtIndex(0)).toBe(30)
}

function testAddAtIndex() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30, 1)
  expect(list.count).toBe(3)
  expect(list.itemAtIndex(1)).toBe(30)
}

function testIndexOf() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30)
  list.add(40)
  expect(list.indexOf(30)).toBe(2)
}

function testIndexOfFailCase() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30)
  list.add(40)
  expect(list.indexOf(80)).toBe(null)
}

function testItemAtIndex() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30)
  list.add(40)
  expect(list.itemAtIndex(2)).toBe(30)
}

function testItemAtIndexOutOfBounds() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30)
  list.add(40)
  expect(() => list.itemAtIndex(8)).toThrow()
}
