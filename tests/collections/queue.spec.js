const Queue = require("../../source/collections").Queue

describe("Collections ◊ Queue", function() {
  it("should initialise a queue", testInit)
})

function testInit() {
  const queue = new Queue()
  expect(queue.length).toBe(0)
}
