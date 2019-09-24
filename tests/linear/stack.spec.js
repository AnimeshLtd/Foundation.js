const Stack = require("../../source/linear").Stack

describe("Collections ◊ Stack", function() {
  it("should initialise a stack",           testInit)
  it("should add items to the top",         testPush)
  it("should remove items from the top",    testPop)
  it("should retrieve item from the top",   testPeek)
})

function testInit() {
  const stack = new Stack()
  expect(stack.depth).toBe(0)
}

function testPush() {
  const stack = new Stack()
  stack.push(10)
    .push(20)
    .push(30)
  expect(stack.depth).toBe(3)
  expect(stack.pop()).toBe(30)
}

function testPop() {
  const stack = new Stack()
  stack.push(10)
    .push(20)
    .push(30)

  expect(stack.depth).toBe(3)
  expect(stack.pop()).toBe(30)
  expect(stack.depth).toBe(2)
  expect(stack.pop()).toBe(20)
  expect(stack.depth).toBe(1)
}

function testPeek() {
  const stack = new Stack()
  stack.push(10)
    .push(20)
    .push(30)
  
  expect(stack.depth).toBe(3)
  expect(stack.peek()).toBe(30)
  expect(stack.pop()).toBe(30)
  expect(stack.peek()).toBe(20)
}
