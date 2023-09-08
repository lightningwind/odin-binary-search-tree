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
    array = array.filter((e, i, a) => e !== a[i - 1]); // Remove dups
    return this.buildTreeHelper(array, 0, array.length - 1);
  }

  /* Builds a balanced BST from the given sorted subarray array[start..end] and
  returns the root node. */
  buildTreeHelper(array, start, end) { // O(n) time complexity
    if (start > end) return null; // Base case
    const mid = parseInt((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTreeHelper(array, start, mid - 1);
    root.right = this.buildTreeHelper(array, mid + 1, end);
    return root;
  }

  /* Inserts a value into a BST by traversing the tree and manipulating nodes and
  their connections. */
  insert(value) { // O(lgn) time complexity (where n is the size of this tree) in a balanced BST
    if (this.root === null) {
      this.root = new Node(value);
    } else {
      this.insertHelper(this.root, value);
    }
  }

  /* A recursive implementation of insertion. Note that there is an
  iterative implementation which may be more efficient (see CLRS) */
  insertHelper(root, value) { // O(h) time complexity, where h is the height of the BST
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

  /* Deletes the node with key <k> from the BST rooted at node <root>. 
  See CLRS for an alternative implementation of deletion. */
  deleteHelper(root, k) { // O(h) time complexity
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

  /* A recursive implementation of search. Note that there is also an
  iterative implementation (see CLRS). */
  findHelper(root, key) { // O(h) time complexity
    if (root === null || key === root.data) {
      return root;
    }
    if (key < root.data) {
      return this.findHelper(root.left, key);
    } else {
      return this.findHelper(root.right, key);
    }
  }

  /* Traverses this BST in level order, returning an array of values. */
  levelOrder() {
    if (this.root === null) return [];
    const rs = [];
    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const current = queue.shift();
      rs.push(current.data); // Visit current tree node
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }

    return rs;
  }

  /* Performs an inorder tree walk, calling function <fn> each time
  we visit a node. */
  inorder(fn) {
    this.inorderHelper(this.root, fn);
  }

  inorderHelper(node, fn) {
    if (node !== null) {
      this.inorderHelper(node.left, fn);
      fn(node);
      this.inorderHelper(node.right, fn);
    }
  }

  preorder(fn) {
    this.preorderHelper(this.root, fn);
  }

  preorderHelper(node, fn) {
    if (node !== null) {
      fn(node);
      this.preorderHelper(node.left, fn);
      this.preorderHelper(node.right, fn);
    }
  }

  postorder(fn) {
    this.postorderHelper(this.root, fn);
  }

  postorderHelper(node, fn) {
    if (node !== null) {
      this.postorderHelper(node.left, fn);
      this.postorderHelper(node.right, fn);
      fn(node);
    }
  }

  /* Returns the height of the subtree rooted at node <node>. */
  height(node) { // O(n) where n is the number of nodes in the tree
    if (node === null) return -1; // Base Case: tree is empty
    if (node.left === null && node.right === null) return 0; // Base Case: leaf node
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  /* Returns the depth of the given node with respect to the root node. */
  depth(node) { 
    return this.height(this.root) - this.height(node);
  }
}

/* Logs given binary tree in a structured format, where node is the root of the tree. */
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

// Example 1: Initializing a new balanced BST
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);

// Example 2: Inserting keys into a BST
const tree2 = new Tree([]);
tree2.insert(50);
tree2.insert(30);
tree2.insert(20);
tree2.insert(40);
tree2.insert(70);
tree2.insert(60);
tree2.insert(80);
// prettyPrint(tree2.root);

// Example 3: Deleting nodes from a BST. 
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

// Example 4: Searching a BST
// console.log(tree.find(5));

// Example 5: Level-order traversal
const array = tree.levelOrder();
// prettyPrint(tree.root);
// console.log(array);

// Example 6: inorder / preorder / postorder
// prettyPrint(tree.root);
// console.log("In-order traversal");
// tree.inorder((node) => console.log(node.data));

// console.log("Pre-order traversal");
// tree.preorder((node) => console.log(node.data));

// console.log("Post-order traversal");
// tree.postorder((node) => console.log(node.data));

// Example 7: height
//prettyPrint(tree.root);
//console.log(tree.height(tree.root));

// Example 8: depth
const node = tree.root.right.left;
console.log(tree.depth(node));
