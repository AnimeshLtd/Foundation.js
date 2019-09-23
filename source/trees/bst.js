const BinaryTreeNode = require("./bstNode")
const Queue = require("../linear").Queue
const Stack = require("../linear").Stack

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

  /**
   *  Breadth-first searches the tree level by level starting at the root. It visits
   *  the root, then the children of the root, then their children and so on. So for
   *  a tree of shape:
   *  ```
   *         10
   *        /  \
   *      5    30
   *     /    /  \
   *    4    15   40
   *   /
   *  3
   *  ```
   *  Breadth-first traversal would look like: 10, 5, 30, 4, 15, 40, 3
   * 
   *  **Use breadth-first search when the node you are looking for is likely to be**
   *  **nearby the root.**
   *  
   *  @yields {BinaryTreeNode}
   */
  * searchBreadthFirst() {
    const queue = new Queue()
    queue.enqueue(this._root)

    while(queue.length > 0) {
      const node = queue.dequeue()
      yield node
      if (node.leftChild) {
        queue.enqueue(node.leftChild)
      }
      if (node.rightChild) {
        queue.enqueue(node.rightChild)
      }
    }
  }

  /**
   *  Depth-first search starts from the root and goes as deep as it can
   *  until it finds a leaf node. Then it visits all the remaining nodes
   *  it encountered along the path, going as deep as possible in each
   *  branch.
   * 
   *  For a tree of shape:
   *  ```
   *         10
   *        /  \
   *      5    30
   *     /    /  \
   *    4    15   40
   *   /
   *  3
   *  ```
   *  Depth-first traversal would look like:
   *  - In-order (left-root-right) -> 3, 4, 5, 10, 15, 30, 40
   *    see [traverseInOrderly]{@link BinarySearchTree#traverseInOrderly}
   *  - Pre-order (root-left-right) -> 10, 5, 4, 3, 30, 15, 40
   *    see [traversePreOrderly]{@link BinarySearchTree#traversePreOrderly}
   *  - Post-order (left-right-root) -> 3, 4, 5, 15, 40, 30, 10
   *    see [traversePostOrderly]{@link BinarySearchTree#traversePostOrderly}
   *  
   *  This function returns result similar to a pre-order traversal but uses a 
   *  [Stack]{@link Stack} to achieve that. 
   * 
   *  **Use depth-first search when the node you are looking for is likely**
   *  **to be far from the root.**
   *  
   *  @yields {BinaryTreeNode}
   */
  * searchDepthFirst() {
    const stack = new Stack()
    stack.push(this._root)

    while (stack.depth > 0) {
      const node = stack.pop()
      yield node

      if (node.rightChild) {
        stack.push(node.rightChild)
      }
      if (node.leftChild) {
        stack.push(node.leftChild)
      }
    }
  }

  /**
   *  For a binary tree, an in-order traversal returns values sorted in ascending
   *  order.
   *  
   *  @param {BinaryTreeNode} node
   *  @yields {BinaryTreeNode}
   */
  * traverseInOrderly(node = this._root) {
    if (node && node.leftChild) {
      yield* this.traverseInOrderly(node.leftChild)
    }
    yield node
    if (node && node.rightChild) {
      yield* this.traverseInOrderly(node.rightChild)
    }
  }

  /**
   *  For a binary tree, a pre-order traversal creates a copy of the tree. If the
   *  tree is used as an expression tree, a pre-order traversal will yield a prefix
   *  expression of the tree (as used in the [Polish notation](https://en.wikipedia.org/wiki/Polish_notation)).
   * 
   *  @param {BinaryTreeNode} node 
   *  @yields {BinaryTreeNode}
   */
  * traversePreOrderly(node = this._root) {
    yield node
    
    if (node.leftChild) {
      yield* this.traversePreOrderly(node.leftChild)
    }
    if (node.rightChild) {
      yield* this.traversePreOrderly(node.rightChild)
    }
  }

  /**
   *  Post-order traversal is used to:
   *  - delete the tree because it visits the children before removing
   *    the parent
   *  - get the postfix expression of an expression tree, as in the reverse
   *    Polish notation
   * 
   *  @param {BinaryTreeNode} node
   *  @yields {BinaryTreeNode} 
   */
  * traversePostOrderly(node = this._root) {
    if (node.leftChild) {
      yield* this.traversePostOrderly(node.leftChild)
    }
    if (node.rightChild) {
      yield* this.traversePostOrderly(node.rightChild)
    }
    yield node
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
