/**
 *  Node is the fundamental unit of data in a linked list. Each node is linked 
 *  to the next node (and optionally previous node in doubly-linked lists).
 * 
 *  @class
 */
class Node {
  constructor(data) {
    this.data = data
    this.previous = null
    this.next = null
  }
}

module.exports = Node
