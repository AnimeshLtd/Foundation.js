const BinaryTreeNode = require("./bstNode")

/**
 *  Binary Search Tree is a specialised binary tree where the children
 *  are ordered such that the left child's value has to be less than or
 *  equal to that of the parent, and the right child must be larger than
 *  the parent.
 * 
 *  left child ≤ parent node ≤ right child
 * 
 *  All binary search trees must have a root node. Nodes may need re-ordering
 *  after each insert/delete operation to keep the left-parent-right constraint.
 * 
 *  **The data stored in BinarySearchTree must support comparison operations such**
 *  **as `<`, `>`, `==` in a coherent manner.** Failing to ensure this will result 
 *  in undefined behaviour.
 * 
 *  @class
 */
class BinarySearchTree {
  constructor() {
    this._root = null
    this._count = 0 
  }

  /**
   *  Get the total number of nodes in the tree. May **not** be same as the depth or
   *  height of the tree.
   */
  get count() {
    return this._count
  }

  /**
   *  Returns the node having the "smallest" value of data in the entire tree.
   *  @returns {BinaryTreeNode} smallest node
   */
  get min() {
    return this.getLeftmost().data
  }

  /**
   *  Returns the node having the "largest" value of data in the entire tree.
   *  @returns {BinaryTreeNode} largest node
   */
  get max() {
    return this.getRightmost().data
  }

  /**
   *  Returns a JSON string representation of the tree.
   *  @returns {string}
   */
  toString() {
    return JSON.stringify({
      count: this._count,
      nodes: this._root.toJSON()
    })
  }

  /**
   *  Inserts the a new node into the tree and attachs the given `data` to it.  
   *  `data` must be a type which supports logical operations of `==`, `<=`, `>=`.
   * 
   *  - If the tree is empty, the newly created node is added as root.
   *  - If the `data` is already in a tree node (== equality), simply increments the `copies` 
   *    value of that {@link BinaryTreeNode} (`node.metadata.copies`).
   * 
   *  Returns the newly added node.
   *   
   *  @param {any} data 
   *  @returns {BinaryTreeNode} newly added node.
   */
  add(data) {
    const newNode = new BinaryTreeNode(data)

    if (!this._root) {
      this._root = newNode
      this._count += 1
      return newNode
    }

    const { node, parent } = this.findNode(data)
    if (node) {
      node.metadata.copies += 1
    }
    else if (data < parent.data) {
      parent.leftChild = (newNode)
    }
    else {
      parent.rightChild = (newNode)
    }

    this._count += 1
    return newNode
  }

  /**
   *  Returns the tree node containing `data` (== equality) or `null` if none.
   *  
   *  @param {BinaryTreeNode} data
   *  @returns {?BinaryTreeNode}
   */
  find(data) {
    return this.findNode(data).node
  }

  /**
   *  Recursively finds the node matching the `data` (== equality)। If no match 
   *  is found, returns the `parent` to which a new node with this `data` must 
   *  be attached.
   * 
   *  Returns object of the form: `{ node: BinaryTreeNode | null, parent: BinaryTreeNode}`
   *  
   *  @private
   *  @param {any} data
   *  @param {BinaryTreeNode} node node to search from; default is root
   *  @param {BinaryTreeNode} parent used to keep track of parent (set when recursing)
   *  @returns {object}
   */
  findNode(data, node = this._root, parent = null) {
    if (!node || node.data == data) {
      return { node, parent }
    }

    if (data < node.data) {
      return this.findNode(data, node.leftChild, node)
    }

    return this.findNode(data, node.rightChild, node)
  }

  /**
   *  Removes the node having `data` if it's the only copy left (`node.metadata.copies` is 1).
   *  To delete some copies of `data` in the node, simply set `copies` param to
   *  a numeric value. If this value is more than `node.metadata.copies` than the
   *  node is removed from the tree.
   *  
   *  **By default, deletes all copies of `data` in the node and removes node from the tree.**
   *  If the removed node had children, they are assigned new parent 
   *  node(s).
   *  
   *  If no node is found, returns `null`. Otherwise, returns the removed/modified node.
   * 
   *  @param {any} data
   *  @param {number} copies number of copies to delete; deletes all by default
   *  @returns {?BinaryTreeNode} node
   */
  remove(data, copies = '*') {
    const { node, parent } = this.findNode(data)
    if (!node) { return null }

    // Update node metadata and check if the node needs to be actually 
    // removed.
    if (copies === '*') {
      // the '- 1' here accounts for the this._count -= 1 line at the
      // end of the function, which is triggered only if the node is
      // actually removed.
      this._count -= node.metadata.copies - 1
      node.metadata.copies = 0
    }
    else {
      this._count -= (copies >= node.metadata.copies) ? node.metadata.copies - 1 : copies 
      node.metadata.copies -= copies
    }

    if (node.metadata.copies >= 1) {
      // Nothing needs to deleted, some copies remain
      return node
    }

    // Only 1 or fewer copies remain. Node must be removed from the tree.
    const heir = this.makeSubtreeWithoutParent(node)
    if (node === this._root) {
      // Set the remaining subtree as the root and clear reference
      // to the old parent
      this._root = heir
      if (this._root) { this._root.parent = null }
    }
    else if (node.isLeftChild) {
      parent.leftChild = heir
    }
    else {
      parent.rightChild = heir
    }

    this._count -= 1
    return node
  }

  /**
   *  Removes the given parent node and combines the newly orphaned left and
   *  right branches into a new subtree. Returns the root of this new subtree.
   *  
   *      30*                             40
   *    /     \                          /  \
   *   10      40      combined        35   50
   *     \    /  \    ---------->     /
   *     15  35   50                 10
   *                                   \
   *                                    15
   *
   *  Node to be removed is 30. It takes node 30 left subtree (10 and 15) and 
   *  put it in the leftmost node of the right subtree (40, 35, 50).
   * 
   *  @private
   *  @param {BinaryTreeNode} parent parent to be removed
   *  @returns {BinaryTreeNode} parent of the new subtree
   */
  makeSubtreeWithoutParent(parent) {
    if (parent.rightChild) {
      const leftmost = this.getLeftmost(parent.rightChild)
      leftmost.leftChild = parent.leftChild
      return parent.rightChild
    }
    return parent.leftChild
  }

  /** @private */
  getRightmost(node = this._root) {
    if (!node || !node.rightChild) {
      return node
    }
    return this.getRightmost(node.rightChild)
  }

  /** @private */
  getLeftmost(node = this._root) {
    if (!node || !node.leftChild) {

      return node
    }
    return this.getLeftmost(node.leftChild)
  }
}

module.exports = BinarySearchTree
