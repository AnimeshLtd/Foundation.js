const Queue = require("../../source/collections").Queue

describe("Collections ◊ Queue", function() {
  it("should initialise a queue",         testInit)
  it("should add item to the back",       testEnqueue)
  it("should remove item from the front", testDequeue)
})

function testInit() {
  const queue = new Queue()
  expect(queue.length).toBe(0)
}

function testEnqueue() {
  const queue = new Queue()
  queue.enqueue(10)
    .enqueue(20)

  expect(queue.length).toBe(2)
  expect(queue.dequeue()).toBe(10)
  queue.enqueue(30)
  expect(queue.dequeue()).toBe(20)
}

function testDequeue() {
  const queue = new Queue()
  queue.enqueue(10)
    .enqueue(20)
    .enqueue(30)

  expect(queue.dequeue()).toBe(10)
  expect(queue.dequeue()).toBe(20)
}
