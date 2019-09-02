/**
 *  JavaScript ships a built-in `Array` type. This `collections` module introduces 
 *  three more linear data structures to the mix:
 *    - `List`, a doubly-linked list, with random access
 *    - `Stack`, a last-in-first-out data structure, without random access
 *    - `Queue`, a first-in-first-out data structure, without random access
 *  
 *  Use an `Array` when:
 *  - data needs to be accessed quickly in random order (using an index)
 *  - data is multi-dimensional, e.g. matrix, vector, tensor etc.
 * 
 *  Use a `List` when:
 *  - data will be accessed sequentially
 *  - memory is at a premium and must be allocated on a allocate-as-you-go basis
 *  - items need to be added/removed from the extremes of the list in constant time
 *    `O(1)`
 * 
 *  Use a `Stack` when:
 *  - data needs to be access last-in, first-out
 *  - one needs to implement a Depth-first search
 * 
 *  Use a `Queue` when:
 *  - data needs to be access first-in, first-out
 *  - one needs to implement a Breadth-first search
 * 
 *  @module collections
 */
const List = require("./list")
const Queue = require("./queue")
const Stack = require("./stack")

module.exports = {
  /** @type List */
  List,
  /** @type Queue */
  Queue,
  /** @type Stack */
  Stack
}
