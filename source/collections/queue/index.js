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

  get length() {
    return this._items.count
  }
}

module.exports = Queue
