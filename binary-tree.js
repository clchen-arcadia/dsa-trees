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
    // nodeStack array containing 3-tuple like arrays!
    // like [[node, depth, nodeParent], [], [], ...]

    let nodeStack = [[this.root, 1, null]];
    let node1Info = null;
    let node2Info = null;

    while (nodeStack.length) {
      const currNodeTuple = nodeStack.pop();

      if (currNodeTuple[0] === node1) node1Info = currNodeTuple;
      if (currNodeTuple[0] === node2) node2Info = currNodeTuple;

      if (currNodeTuple[0].left !== null) {
        nodeStack.push([currNodeTuple[0].left, currNodeTuple[1] + 1, currNodeTuple[0]]);
      }
      if (currNodeTuple[0].right !== null) {
        nodeStack.push([currNodeTuple[0].right, currNodeTuple[1] + 1, currNodeTuple[0]]);
      }
    }

    if (node1Info === null || node2Info === null) {
      throw new Error(); //either node1 or node2 not found
    }
    if (node1Info[1] === node2Info[1] && node1Info[2] !== node2Info[2]) {
      return true;
    }
    else return false;
  }

  // From Solution:
  // areCousins(node1, node2) {
  //   function findLevelAndParent(
  //     nodeToFind,
  //     currentNode,
  //     level = 0,
  //     data = { level: 0, parent: null }
  //   ) {
  //     if (data.parent) return;
  //     if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
  //       data.level = level + 1;
  //       data.parent = currentNode;
  //     }
  //     if (currentNode.left) {
  //       findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
  //     }
  //     if (currentNode.right) {
  //       findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
  //     }
  //     return data;
  //   }

  //   let node1Info = findLevelAndParent(node1, this.root);
  //   let node2Info = findLevelAndParent(node2, this.root);

  //   let sameLevel =
  //     node1Info && node2Info && node1Info.level === node2Info.level;
  //   let differentParents =
  //     node1Info && node2Info && node1Info.parent !== node2Info.parent;
  //   return sameLevel && differentParents;
  // }

}

module.exports = { BinaryTree, BinaryTreeNode };
