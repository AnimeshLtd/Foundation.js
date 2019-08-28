const Errors = require("../Errors")
const Node  = require("./Node")

/**
 *  A List (or linked list) is a linear data structure formed by chaining
 *  Nodes together. Lists come in three varieties:
 *      - single: every node points to the next node
 *      - double: every node stores a reference to previous and next nodes
 *      - circular: the last node points to the first node
 * 
 *  Unlike arrays, Lists don't support random data access. When fetching data
 *  from a list, the cursor begins at head and sequentially visits each node.
 *  Thus, access data in a List is an O(n) operation.
 * 
 *  Lists fare better than arrays in space complexity. Lists don't need to be
 *  contiguous. Furthermore, Nodes occupy exactly the memory they need so large
 *  chunks of memory need not be reserved beforehand. When an array fills up,
 *  the runtime creates a bigger array and copies all the items to the new array.
 *  This O(n) operation isn't relevant to Lists.
 * 
 *  Adding or deleting at the beginning of a list takes O(1). Arrays take O(n).
 *  
 *  Inserting or deleting at the end of a list takes O(n). Arrays take O(1). We 
 *  keep reference to the last item in the List here to optimise performance and
 *  insert/delete at the end of list in O(1).
 *  
 *  @class
 */
class List {
  constructor() {
    /** @type Node */
    this.first = null

    /** @type Node */
    this.last = null

    /** 
     *  Total number of elements in the list
     *  @type number
     */
    this.count = 0
  }

  /**
   *  Add element at the given position in the list. If no index is specified,
   *  data is added to the end of the list.
   *  
   *  Using the element last reference instead of navigating through the list, 
   *  we get constant runtime, instead of linear, when adding at end of list.
   *  
   *  Runtime: 
   *    O(1) for adding at start or end (default) of the list
   *    O(n) otherwise
   *  
   *  @param {any} data
   *  @param {number} atIndex 0 for adding at start of the list, or a positive 
   *    integer to insert data in the middle.
   *  @returns {Node} newly created node
   *  @throws {OutOfBoundsError} If index is negative or out of bounds
   * 
   *  @example
   *    list.add(123)       // Adds '123' at the end of the list
   *    list.add(123, 0)    // Adds '123' at the beginning of the list
   *    list.add(123, 4)    // Adds '123' at index 4 or throws an error 
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

    newNode.next = this.first
    if (this.first) {
      this.first.previous = newNode
    }
    else {
      this.last = newNode
    }
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
      this.first = newNode
      this.last = newNode
    }

    this.count += 1
    return newNode
  }

  /**
   *  Finds the first occurrence of `value` in the list.
   *  Runtime: O(n)
   * 
   *  @param {any} value
   *  @returns {?number} index of first occurrence or `null`
   * 
   *  @example
   *  // Given a list 1 → 2 → 3
   *    list.indexOf(2) // 1
   *    list.indexOf(5) // null
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
   *    list.itemAtIndex(2) // 3
   *    list.itemAtIndex(5) // null
   */
  itemAtIndex(index = 0) {
    return this.nodeAtIndex(index).data
  }

  /**
   *  Internal method. Use itemAtIndex() instead.
   *  @private
   *  @param {any} index 
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
   *  Iterate through the list until predicate return a truthy value.
   *  
   *  @param {List.FindPredicate} predicate 
   *  @returns {any} whatever the predicate returns or null if predicate
   *    never returns a truthy value
   * 
   *  @example see #get and #indexOf
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
 *  This closure is used to specify custom search predicate used by {@link find} 
 *  method. The function is passed a node and its index in the list on each iteration. 
 *  Search continues until the closure returns a value other than `null`.
 *  
 *  @callback List.FindPredicate
 *  @param {Node} node
 *  @param {number} index
 *  @returns {any} a value or null
 */
