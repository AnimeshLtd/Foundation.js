const List = require("../list")

/**
 *  Stack is a last-in-first-out (LIFO) data structure that restricts
 *  the way data is added or removed. 
 *  
 *  A Stack inserts item to the end of the collection and also removes 
 *  from the end. Both an array and a linked list would do this in `O(1)`,
 *  but I've chosen linked list since there's no need for an array's
 *  random access capabilities in this context.
 *  @class
 */

class Stack {
  constructor() {
    this._items = new List()
  }

  /**
   *  Returns the number of items in the stack
   *  @returns {number}
   */
  get depth() {
    return this._items.count
  }
}

module.exports = Stack
