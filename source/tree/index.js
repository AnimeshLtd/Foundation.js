/**
 *  A tree is a non-linear data structure where a node can have zero or more
 *  connections. The topmost node in a tree is called **root**. The linked
 *  nodes to the root are called **children** or **descendants**. A node without
 *  any children is called a **leaf** or **terminal node**. All nodes except 
 *  for the leaf and root node are called **internal nodes**.
 *  
 *  The **height of a tree** is the distance (edge count) from the farthest
 *  leaf to the root. The **depth of a tree** is the distance from the root 
 *  to the farthest leaf.
 *  
 *  The **height of a node** is obtained by counting the edges (connections)
 *  between the node and the most distant leaf.
 * 
 *  There are certain constraints a Tree structure must observe:
 *  - It can't have a circular loop. That would be a {@link Graph}[Graph]
 *  - A node can't have more than two parents. That too would be a {@link Graph}[Graph]
 *  - It must have only one root.
 *  - It can't have branches not connected to the root or its descendants.
 * 
 *  A tree where each node has at most two children is called a **binary tree**.
 *  
 *  @module trees
 */

const BinarySearchTree = require("./bst")

module.exports = {
  /** @type BinarySearchTree */
  BinarySearchTree
}
