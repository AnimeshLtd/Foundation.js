const List = require("../../source/List/List")

describe("List spec", function () {
  it("should initialise a list", testInit)
  it("should add data", testAdd)

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
}

function testIndexOf() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30)
  list.add(40)
  expect(list.indexOf(30)).toBe(1)
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
  expect(list.itemAtIndex(2)).toBe(20)
}

function testItemAtIndexOutOfBounds() {
  const list = new List()
  list.add(10)
  list.add(20)
  list.add(30)
  list.add(40)
  expect(() => list.itemAtIndex(8)).toThrow()
}
