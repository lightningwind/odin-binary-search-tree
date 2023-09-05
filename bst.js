class Node {
  constructor(data, left=null, right=null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  /* Builds a balanced BST from the given array of integers and
  returns the root node. */
  buildTree(array) {
    array.sort();
    // TODO: Remove duplicates
    return this.buildTreeHelper(array, 0, array.length - 1);
  }

  /* Builds a balanced BST from the given sorted subarray array[start..end] and
  returns the root node. */
  buildTreeHelper(array, start, end) { // O(n)
    if (start > end) return null;
    const mid = parseInt((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTreeHelper(array, start, mid - 1);
    root.right = this.buildTreeHelper(array, mid + 1, end);
    return root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Driver code
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
