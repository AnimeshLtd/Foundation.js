const List = require("../list")

/**
 *  Stack is a last-in-first-out (LIFO) data structure that restricts
 *  the way data is added or removed. Stacks are especially useful for
 *  implementing depth-first search.
 *  
 *  A Stack inserts item to the end of the collection and also removes 
 *  from the end. Both an array and a linked list would do this in `O(1)`,
 *  but I've chosen linked list since there's no need for an array's
 *  random access capabilities in this context.
 *  
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

  /**
   *  Add element to the stack. Returns the Stack instance to allow
   *  the `push()` calls to be chained.
   *  
   *  Runtime: `O(1)`
   * 
   *  @param {any} item
   *  @returns {Stack} the Stack instance
   *  
   *  @example
   *  stack.push(10)
   *    .push(20)
   *    .push(30)
   */
  push(item) {
    this._items.add(item)
    return this
  }

  /**
   *  Remove element from the stack. Returns the removed value.
   *  
   *  Runtime: `O(1)`
   * 
   *  @returns {any} Removed value
   */
  pop() {
    return this._items.remove()
  }

  /**
   *  Retrieve the item from the top of the stack
   *  
   *  @returns {any} data item fetched
   */
  peek() {
    return this._items.itemAtIndex(this.depth - 1)
  }
}

module.exports = Stack
