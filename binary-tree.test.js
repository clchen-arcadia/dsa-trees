"use strict";

const { BinaryTree, BinaryTreeNode } = require("./binary-tree");

let smallTree;
let largeTree;
let emptyTree;

beforeEach(function() {
  emptyTree = new BinaryTree();

  // build small tree
  //
  //            root
  //              |
  //              6
  //            /   \
  //           5     5
  //

  let smallLeft = new BinaryTreeNode(5);
  let smallRight = new BinaryTreeNode(5);
  let smallRoot = new BinaryTreeNode(6, smallLeft, smallRight);
  smallTree = new BinaryTree(smallRoot);

  // build large tree
  //
  //                  root
  //                   |
  //                   6
  //                /     \
  //               5       5
  //                    /     \
  //                   3       1
  //                 /   \
  //                2     1
  //

  let node6 = new BinaryTreeNode(1);
  let node5 = new BinaryTreeNode(1);
  let node4 = new BinaryTreeNode(2);
  let node3 = new BinaryTreeNode(3, node4, node6);
  let node2 = new BinaryTreeNode(5, node3, node5);
  let node1 = new BinaryTreeNode(5);
  let root = new BinaryTreeNode(6, node1, node2);
  largeTree = new BinaryTree(root);
});

describe("minDepth", function() {
  it("handles simple trees", function() {
    expect(smallTree.minDepth()).toBe(2);
  });

  it("handles more complex trees", function() {
    expect(largeTree.minDepth()).toBe(2);
  });

  it("handles empty trees", function() {
    expect(emptyTree.minDepth()).toBe(0);
  });
});

describe("maxDepth", function() {
  it("handles simple trees", function() {
    expect(smallTree.maxDepth()).toBe(2);
  });

  it("handles more complex trees", function() {
    expect(largeTree.maxDepth()).toBe(4);
  });

  it("handles empty trees", function() {
    expect(emptyTree.maxDepth()).toBe(0);
  });
});

describe("nextLarger", function() {
  it("handles simple trees", function() {
    expect(smallTree.nextLarger(4)).toBe(5);
    expect(smallTree.nextLarger(5)).toBe(6);
    expect(smallTree.nextLarger(6)).toBe(null);
  });

  it("handles empty trees", function() {
    expect(emptyTree.nextLarger(0)).toBe(null);
  });

  it("handles more complex trees", function() {
    expect(largeTree.nextLarger(1)).toBe(2);
    expect(largeTree.nextLarger(2)).toBe(3);
    expect(largeTree.nextLarger(3)).toBe(5);
    expect(largeTree.nextLarger(4)).toBe(5);
    expect(largeTree.nextLarger(5)).toBe(6);
    expect(largeTree.nextLarger(6)).toBe(null);
  });
});

describe("areCousins", function() {
  it("returns true if they are cousins, false if not", function() {
    // build tree with cousins
    //
    //                  root
    //                    |
    //                    1
    //                 /     \
    //               2         3
    //             /   \     /   \
    //            4     5   6     7
    //

    let n7 = new BinaryTreeNode(7);
    let n6 = new BinaryTreeNode(6);
    let n5 = new BinaryTreeNode(5);
    let n4 = new BinaryTreeNode(4);
    let n3 = new BinaryTreeNode(3, n6, n7);
    let n2 = new BinaryTreeNode(2, n4, n5);
    let root = new BinaryTreeNode(1, n2, n3);
    let tree = new BinaryTree(root);

    expect(tree.areCousins(n4, n6)).toBe(true);
    expect(tree.areCousins(n4, n7)).toBe(true);
    expect(tree.areCousins(n5, n6)).toBe(true);
    expect(tree.areCousins(n5, n7)).toBe(true);
    expect(tree.areCousins(n2, n3)).toBe(false);
    expect(tree.areCousins(n4, n5)).toBe(false);
    expect(tree.areCousins(n6, n7)).toBe(false);
    expect(tree.areCousins(n4, n3)).toBe(false);
    expect(tree.areCousins(root, n3)).toBe(false);
  });
});

