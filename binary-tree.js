"use strict";

/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** minDepth(): return the minimum depth from the invoking node -- that is,
   * the length of the shortest path from the invoking node to a leaf. */
  minDepth(depth = 1) {
    if (this.left === null && this.right === null) return depth;
    return Math.min(this.left.minDepth(depth), this.right.minDepth(depth)) + 1;
  }

  /** maxDepth(): return the maximum depth from the invoking node -- that is,
   * the length of the longest path from the invoking node to a leaf. */
  maxDepth(depth = 1) {
    if (this.left === null && this.right === null) return depth;
    return Math.max(this.left.maxDepth(depth), this.right.maxDepth(depth)) + 1;
  }

  nextLarger(lowerBound) {
    const thisCheck = this.val > lowerBound ? this.val : Infinity;

    let leftCheck = this.left === null ? Infinity : this.left.nextLarger(lowerBound);
    if (leftCheck === null) leftCheck = Infinity;

    let rightCheck = this.right === null ? Infinity : this.right.nextLarger(lowerBound);
    if (rightCheck === null) rightCheck = Infinity;

    const min = Math.min(thisCheck, leftCheck, rightCheck);

    return isFinite(min) ? min : null;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  // this is a stack or recursion problem; we'll use recursion

  minDepth() {
    if (this.root === null) return 0;
    return this.root.minDepth();
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  // this is a stack or recursion problem; we'll use recursion

  maxDepth() {
    if (this.root === null) return 0;
    return this.root.maxDepth();
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root === null) return null;
    return this.root.nextLarger(lowerBound);
  }

  // Options to Refactor
  // 1. move logic into Node Class, BinaryTreeNode.nextLarger()
  // 2. nested function (helper recurser)
  // 3. or just implement a ADT within BinaryTree.nextLarger()

  /** Previous BALLER implementation: */

  // nextLarger(lowerBound) {
  //   if (this.root === null) return null;

  //   const leftTree = new BinaryTree(this.root.left);
  //   const rightTree = new BinaryTree(this.root.right);

  //   const thisNodeCheck = this.root.val > lowerBound ? this.root.val : Infinity;

  //   const leftCheckTempVar = leftTree.nextLarger(lowerBound);
  //   const leftCheck = leftCheckTempVar === null
  //     ? Infinity
  //     : leftCheckTempVar;

  //   const rightCheckTempVar = rightTree.nextLarger(lowerBound);
  //   const rightCheck = rightCheckTempVar === null
  //     ? Infinity
  //     : rightCheckTempVar;

  //   let min = Math.min(leftCheck, rightCheck, thisNodeCheck);

  //   return isFinite(min) ? min : null;
  // }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
