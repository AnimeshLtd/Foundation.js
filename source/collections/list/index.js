const Errors = require("../../errors")
const Node  = require("./node")

/**
 *  A List (or linked list) is a linear data structure formed by chaining
 *  Nodes together. Lists come in three varieties:
 *  - single: every node points to the next node
 *  - double: every node stores a reference to previous and next nodes
 *  - circular: the last node points to the first node
 * 
 *  Instances of this class are doubly-linked lists.
 * 
 *  Unlike arrays, Lists don't support random data access. When fetching data
 *  from a list, the cursor begins at head and sequentially visits each node.
 *  Thus, access data in a List is an `O(n)` operation.
 * 
 *  Lists fare better than arrays in space complexity. Lists don't need to be
 *  contiguous. Furthermore, Nodes occupy exactly the memory they need so large
 *  chunks of memory need not be reserved beforehand. When an array fills up,
 *  the runtime creates a bigger array and copies all the items to the new array.
 *  This `O(n)` operation isn't relevant to Lists.
 * 
 *  Adding or deleting at the beginning of a list takes `O(1)`. Arrays take `O(n)`.
 *  
 *  Inserting or deleting at the end of a list takes `O(n)`. Arrays take `O(1)`. We 
 *  keep reference to the last item in the List here to optimise performance and
 *  insert/delete at the end of list in `O(1)`.
 *  
 *  @class
 */
class List {
  constructor() {
    /** @private */
    this._first = null
    /** @private */
    this._last = null
    /** @private */
    this._count = 0
  }

  /**
   *  Returns the number of items in the list
   *  @returns {number}
   */ 
  get count() {
    return this._count
  }

  /** @private */
  set count(newValue) {
    this._count = newValue
  }

  /** @private */
  get first() {
    return this._first
  }

  /** @private */
  set first(newValue) {
    this._first = newValue
  }

  /** @private */
  get last() {
    return this._last
  }
  
  /** @private */
  set last(newValue) {
    this._last = newValue
  }

  /**
   *  Add element at the given position in the list. If no index is specified,
   *  data is added to the end of the list.
   *  
   *  Returns the newly created node.
   *  
   *  Runtime: 
   *  - O(1) for adding at start or end (default) of the list
   *  - O(n) otherwise
   *  
   *  @param {any} data
   *  @param {number} atIndex 0 for adding at start of the list, or a positive 
   *    integer to insert data in the middle.
   *  @returns {Node} newly created node
   *  @throws {OutOfBoundsError} If index is negative or out of bounds
   * 
   *  @example
   *  list.add(123)       // Adds '123' at the end of the list
   *  list.add(123, 0)    // Adds '123' at the beginning of the list
   *  list.add(123, 4)    // Adds '123' at index 4 or throws an error 
   */
  add(data, atIndex = this.count) {
    const index = atIndex
    if (index === 0) {
      return this.addAtStart(data)
    }
    if (index === this.count) {
      return this.addAtLast(data)
    }

    const nodeAtIndex = this.nodeAtIndex(index)
    const newNode = new Node(data)

    newNode.previous = nodeAtIndex.previous
    newNode.next = nodeAtIndex
    nodeAtIndex.previous.next = newNode
    nodeAtIndex.previous = newNode
    
    this.count += 1
    return newNode
  }

  /**
   *  Internal method. Use add(data:, atIndex:) instead.
   *  @private
   *  @param {any} data
   */
  addAtStart(data) {
    const newNode = new Node(data)
    const firstItem = this.first

    newNode.next = firstItem
    // If firstItems make it the second item by making its previous point to
    // the newNode. If it doesn't exists, this means there's no existing item 
    // in the list, so make this.last point to newNode too.
    firstItem ? firstItem.previous = newNode : this.last = newNode
    this.first = newNode
    this.count += 1
    
    return newNode
  }

  /**
   *  Internal method. Use add(data:, atIndex:) instead.
   *  @private
   *  @param {any} data
   */
  addAtLast(data) {
    const newNode = new Node(data)

    if (this.first) {
      newNode.previous = this.last
      this.last.next = newNode
      this.last = newNode
    }
    else {
      // No existing items in the list, so set both first and last
      // to newNode
      this.first = newNode
      this.last = newNode
    }
    this.count += 1
    
    return newNode
  }

  /**
   *  Removes list item at the given index and return the data held at
   *  the removed node. If no index is given, removes the last item.
   *  
   *  Runtime:
   *    - O(1) when removing from start or end (default)
   *    - O(n) otherwise
   *  
   *  @param {number} [index=last] 
   *  @throws {OutOfBoundsError}
   *  @returns {any}
   *  
   *  @example
   *  list.remove(0)  // Removes first item
   *  list.remove(7)  // Removes 8th item or throws an out of bounds error
   *  list.remove()   // Removes last item
   */
  remove(index = this.count - 1) {
    if (index === 0) {
      return this.removeFirst()
    }

    if (index === this.count - 1) {
      return this.removeLast()
    }

    const nodeAtIndex = this.nodeAtIndex(index)
    nodeAtIndex.next.previous = nodeAtIndex.previous
    nodeAtIndex.previous.next = nodeAtIndex.next
    this.count -= 1

    return nodeAtIndex.data
  }

  /**
   *  Removes element from the start of the list and returns the data
   *  held at the removed node.
   *  Runtime: O(1)
   *  
   *  @returns {any} the data held at removed node
   *  @private
   */
  removeFirst() {
    const head = this.first
    if (head) {
      this.first = head.next
      // If this.first is null, this means list would be emptied after
      // removing the head so set this.last to null too.
      this.first ? this.first.previous = null : this.last = null
      this.count -= 1
    }

    return head && head.data
  }

  /**
   *  Removes element from the end of the list and returns the data
   *  held at the removed node.
   *  Runtime: O(1)
   *  
   *  @returns {any} the data held at removed node
   *  @private
   */
  removeLast() {
    const tail = this.last

    if (tail) {
      this.last = tail.previous
      // If this.last is null, that means the list would be emptied
      // after removing the tail so set this.first to null too
      this.last ? this.last.next = null : this.first = null
      this.count -= 1
    }

    return tail && tail.data
  }

  /**
   *  Finds the first occurrence of `value` in the list.
   *  
   *  Returns index of first occurrence or `null`.
   *  Runtime: O(n)
   * 
   *  @param {any} value
   *  @returns {?number} index of first occurrence or `null`
   * 
   *  @example
   *  // Given a list 1 → 2 → 3
   *  list.indexOf(2) // 1
   *  list.indexOf(5) // null
   */
  indexOf(value) {
    return this.find((node, index) => {
      if (node.data === value) {
        return index
      }
      return null
    })
  }

  /**
   *  Get data stored at the given index.
   *  Runtime: O(n)
   * 
   *  @param {number} [index=0]
   *  @returns {any} data at the specified position.
   *  @throws {OutOfBoundsError}
   * 
   *  @example
   *  // Given a list 1 → 2 → 3
   *  list.itemAtIndex(2) // 3
   *  list.itemAtIndex(5) // null
   */
  itemAtIndex(index = 0) {
    return this.nodeAtIndex(index).data
  }

  /**
   *  Internal method. Use itemAtIndex() instead. 
   *  Runtime: O(n)
   * 
   *  @private
   *  @param {any} index
   *  @throws {OutOfBoundsError}
   *  @returns {?Node} either a node or `null` if search fails
   */
  nodeAtIndex(index = 0) {
    if (index < 0 || index >= this.count) {
      throw new Errors.OutOfBoundsError()
    }

    const node = this.find((n, position) => {
      if (position === index) {
        return n
      }
      return null
    })

    return node
  }

  /**
   *  Search through the list for a node that matches the predicate. 
   * 
   *  Returns whatever the predicate returns. If predicate doesn't return a 
   *  non-null value for any Node, returns `null` to indicate that the search 
   *  failed.
   * 
   *  @param {List.FindPredicate} predicate 
   *  @returns {?any} whatever the predicate returns or `null` if predicate
   *    never returns a value other than `null`
   */
  find(predicate) {
    let current = this.first
    let index = 0

    while(current) {
      const result = predicate(current, index)
      if (result !== null) {
        return result
      }

      index += 1
      current = current.next
    }

    // If predicate didn't return a truthy value for any Node,
    // return null to indicate that the search failed.
    return null
  }
}

module.exports = List

// ------------------ Type definitions ------------------------------- //

/**
 *  This closure is used to specify custom search predicate used by the 
 *  [find]{@linkcode List#find} method. The function is passed a node and its
 *  index in the list on each iteration. Search continues until the closure
 *  returns a value other than `null`.
 *  
 *  @callback List.FindPredicate
 *  @param {Node} node
 *  @param {number} index
 *  @returns {?any}
 *  @example
 *  // Returns the first node with even data, if none returns `null`
 *  const predicate = function(node, position) {
 *    if (node.data % 2 === 0) {
 *      return n
 *    }
 *    return null
 *  }
 */
