function buildArray(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(parseInt(Math.random() * 100));
  }
  return array;
}

const array = buildArray(10);
const tree = new Tree(array);
prettyPrint(tree.root);

console.log(`The tree is balanced: ${tree.isBalanced()}`);

console.log(`level-order traversal: ${tree.levelOrder()}`)

console.log("pre-order traversal:");
tree.preorder((node) => console.log(node.data));

console.log("post-order traversal:");
tree.postorder((node) => console.log(node.data));

console.log("in-order traversal:");
tree.inorder((node) => console.log(node.data));

tree.insert(125);
tree.insert(150);
tree.insert(175);
tree.insert(200);
prettyPrint(tree.root);

console.log(`The tree is not balanced: ${tree.isBalanced()}`);

tree.rebalance();
prettyPrint(tree.root);

console.log(`The tree is balanced: ${tree.isBalanced()}`);

console.log(`level-order traversal: ${tree.levelOrder()}`)

console.log("pre-order traversal:");
tree.preorder((node) => console.log(node.data));

console.log("post-order traversal:");
tree.postorder((node) => console.log(node.data));

console.log("in-order traversal:");
tree.inorder((node) => console.log(node.data));
