const BinarySearchTree = require("../trees").BinarySearchTree

/**
 *  A TreeMap is a map implementation using {@link BinarySearchTree}.
 *  Implementing a Map with a tree has a few advantages over a {@link List}
 *  powered {@link HashMap}:
 *  
 *  * Keys are always sorted
 *  * When working with numbers, obtaining statistical data like median,
 *    min/max etc. is trivial.
 *  * Collisions are not a concern, so even in the worst case complexity
 *    is `O(log n)`.
 *  * No collisions, no rehashing. 
 * 
 *  The tree used here, `BinarySearchTree`, is not self balancing. Using
 *  a self-balanced tree such as a Red-Black tree or an AVL tree would 
 *  give better performance.
 * 
 *  **The data stored in a `TreeMap` must support comparison operations**
 *  **such as `<`, `>`, `==` in a coherent manner**. The behaviour, otherwise,
 *  is undefined.
 *  
 *  @class
 */
class TreeMap {
  constructor() {
    this._tree = new BinarySearchTree()
  }

  get count() {
    return this._tree.count
  }

  /**
   *  Insert a key/value pair into the map. If the key is already present,
   *  overwrite the existing value.
   *  
   *  Runtime: `O(log n)`
   * 
   *  Returns the map instance to allow command chaining.
   * 
   *  @param {any} key
   *  @param {any} value
   *  @returns {TreeMap} the map instance to allow command chaining
   */
  add(key, value) {
    const node = this._tree.find(key)
    if (node) {
      node.metadata.value = value
    }
    else {
      // By storing keys as node 'data', we ensure that keys 
      // are always sorted. That's why we need to store value
      // as metadata.
      this._tree.add(key).metadata.value = value
    }

    return this
  }

  /**
   *  Returns the value for given key. Runtime: `O(log n)`. If the key doesn't
   *  exist, returns `null`.
   * 
   *  @param {any} key
   *  @returns {?any}
   */
  get(key) {
    const node = this._tree.find(key)
    return node ? node.metadata.value : null
  }

  /**
   *  Searchs for the `key` and returns `true` if it is found, and `false`
   *  otherwise.
   *  
   *  Runtime: `O(log n)`
   *  
   *  @param {any} key
   *  @returns {boolean} indicating whether the key exists or not
   */
  has(key) {
    return !!this.get(key)
  }

  /**
   *  Deletes the key-value pair if the key exists and returns the removed value. 
   *  If key doesn't exist, returns `null`.
   * 
   *  @param {any} key 
   */
  delete(key) {
    const removedNode = this._tree.remove(key)
    return removedNode ? removedNode.metadata.value : null
  }

  /**
   *  The default iterator for this map. Uses {@link BinarySearchTree#traverseInOrderly}.
   *  Returns the `BinaryTreeNode`s which make up the hashmap.
   *  @yields {BinaryTreeNode}
   */
  * [Symbol.iterator]() {
    yield* this._tree.traverseInOrderly()
  }

  /**
   *  Get key for each element in the map. Result in ascending order.
   *  @returns {Iterator} keys
   */
  * keys() {
    for (const node of this) {
      yield node.data
    }
  }

  /**
   *  Get value for each element in the map. Result in ascending order of the
   *  corresponding keys.
   *  
   *  @returns {Iterator} values
   */
  * values() {
    for (const node of this) {
      yield node.metadata.value
    }
  }
}

module.exports = TreeMap
