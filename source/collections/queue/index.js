const List = require("../list")

/**
 *  Queue is a linear data structure with a first-in-first-out(FIFO)
 *  mode of operation. A Queue does not support random access. Items
 *  are added to the back of the Queue, and removed from the front.
 *  
 *  Either an array or a linked list could be used to implement a queue.
 *  I've picked linked list because removing an element from the front is
 *  an `O(1)` operation, versus an `O(n)` operation in arrays.
 */
class Queue {
  constructor() {
    this._items = new List()
  }

  /**
   *  Returns the number of items in the queue
   *  @returns {number}
   */
  get length() {
    return this._items.count
  }

  /**
   *  Adds item to the back of the queue. Return the Queue instance to
   *  allow chaining of commands.
   *  
   *  Runtime: `O(1)`
   *  
   *  @param {any} item to add
   *  @returns {Queue} the Queue instance
   *  @example
   *  queue.enqueue(10)
   *    .enqueue(20)
   *    .enqueue(30)
   *    .length   // 3
   */
  enqueue(item) {
    this._items.add(item)
    return this
  }

  /**
   *  Removes item from the front of the queue and returns the removed
   *  value.
   *  
   *  Runtime: `O(1)`
   *  
   *  @returns {any} data item removed
   */
  dequeue() {
    return this._items.remove(0)
  }
}

module.exports = Queue
