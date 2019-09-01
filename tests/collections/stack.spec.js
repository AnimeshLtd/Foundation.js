const Stack = require("../../source/collections").Stack

describe("Collections ◊ Stack", function() {
  it("should initialise a stack", testInit)
})

function testInit() {
  const stack = new Stack()
  expect(stack.depth).toBe(0)
}
