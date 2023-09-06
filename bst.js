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
    array.sort((a, b) => a - b); 
    array = array.filter((e, i, a) => e !== a[i - 1]);
    return this.buildTreeHelper(array, 0, array.length - 1);
  }

  /* Builds a balanced BST from the given sorted subarray array[start..end] and
  returns the root node. */
  buildTreeHelper(array, start, end) { // O(n)
    if (start > end) return null; // Base case
    const mid = parseInt((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTreeHelper(array, start, mid - 1);
    root.right = this.buildTreeHelper(array, mid + 1, end);
    return root;
  }

  /* Inserts a value into a BST by traversing the tree and manipulating nodes and
  their connections. */
  insert(value) { // O(lgn) where n is the size of this tree in a balanced BST
    if (this.root === null) {
      this.root = new Node(value);
    } else {
      this.insertHelper(this.root, value);
    }
  }

  /* A recursive implementation of insertion. Note that there is an
  iterative implementation (see CLRS) */
  insertHelper(root, value) { // O(h), where h is the height of the BST
    if (root === null) { // Basis: Tree is empty
      root = new Node(value);
      return root;
    }
    if (value < root.data) {
      root.left = this.insertHelper(root.left, value);
    } else if (value > root.data) {
      root.right = this.insertHelper(root.right, value);
    }

    return root;
  }

  /* Deletes a node from this BST. */
  delete(value) {
    this.deleteHelper(this.root, value);
  }

  /* Deletes the node with key <k> from the BST rooted at node <root>. */
  deleteHelper(root, k) {
    if (root === null) { // Base case
      return root;
    }
    if (root.data > k) { // Recurse down the LST
      root.left = this.deleteHelper(root.left, k);
      return root;
    } else if (root.data < k) { // Recurse down the RST
      root.right = this.deleteHelper(root.right, k);
      return root;
    }

    // If we get here, we are deleting node <root>

    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    } else {
      // Case: If both children exist
      let succParent = root;

      // Find root's in-order successor, which is the left-most node in RST
      let succ = root.right;
      while (succ.left !== null) { // Move down the tree using two pointers
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== root) {
        succParent.left = succ.right;
      } else { // Successor is root's right child
        succParent.right = succ.right;
      }

      root.data = succ.data;

      return root;
    }
  }

  /* Returns the node with key <value>. Otherwise returns null. */
  find(value) {
    return this.findHelper(this.root, value);
  }

  findHelper(root, key) { // O(h)
    if (root === null || key === root.data) {
      return root;
    }
    if (key < root.data) {
      return this.findHelper(root.left, key);
    } else {
      return this.findHelper(root.right, key);
    }
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

const tree2 = new Tree([]);
tree2.insert(50);
tree2.insert(30);
tree2.insert(20);
tree2.insert(40);
tree2.insert(70);
tree2.insert(60);
tree2.insert(80);
// prettyPrint(tree2.root);

const tree3 = new Tree([50, 30, 20, 40, 70, 60, 80]);
// prettyPrint(tree3.root);

// console.log('Deleting a leaf node: 20');
tree3.delete(20);
// prettyPrint(tree3.root);

// console.log('Deleting a node with a single child: 30');
tree3.delete(30);
// prettyPrint(tree3.root);

// console.log('Delete the root node: 50');
tree3.delete(50);
// prettyPrint(tree3.root);

console.log(tree.find(5));