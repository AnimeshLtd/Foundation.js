/**
 *  A binary tree node must have at most two children, usually referred to
 *  as "left" and "right".
 *  
 *  left child ≤ parent node ≤ right child
 * 
 *  @class
 */
class BinaryTreeNode {
  constructor(data) {
    /** @private */
    this._data = data
    /** @private */
    this._left = null
    /** @private */
    this._right = null
    /** 
     *  Holds metadata about the node, like duplicity, colour (for visualisations),
     *  or any other custom data points needed.
     *  @type {object}
     */
    this.metadata = {
      copies: 1
    }
  }

  /**
   *  Returns the data stored at the tree node
   *  @returns {any}
   */
  get data() {
    return this._data
  }

  /**
   *  Return the node's left child, or `null` if the node has none.
   *  @private
   *  @returns {?BinaryTreeNode}
   */
  get leftChild() {
    return this._left
  }

  /**
   *  Sets the node's left child.
   *  @private
   *  @param {BinaryTreeNode}
   */
  set leftChild(node) {
    this._left = node
  }

  /**
   *  Return the node's right child, or `null` if the node has none.
   *  @private
   *  @returns {?BinaryTreeNode}
   */
  get rightChild() {
    return this._right
  }

  /**
   *  Sets the node's right child.
   *  @private
   *  @param {BinaryTreeNode}
   */
  set rightChild(node) {
    this._right = node
  }

  /**
   *  Returns an object literal representation of the node.
   *  @returns {object}
   */
  toJSON() {
    return {
      data: this._data,
      metadata: this.metadata,
      children: (this._left || this._right) ? {
        left: this._left ? this._left.toJSON() : undefined,
        right: this._right ? this._right.toJSON() : undefined
      } : undefined
    }
  }
}

module.exports = BinaryTreeNode
