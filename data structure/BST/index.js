// class TreeNode {
//   ele: number;
//   left: any;
//   right: any;
//   constructor (key: number){
//     this.ele = key;
//     this.left = null;
//     this.right = null;
//   }
// }
// interface BSTTree{
//   root: TreeNode;
//   size: number;
//   getSize(): number;
//   isEmpty(): boolean;
//   contain(ele: number): boolean;
//   search(ele: number): TreeNode;
//   add(ele: number);
// }
// class Tree implements  BSTTree{
//   root: TreeNode = null;
//   size: number = 0;
//   constructor() {
//     this.root = null;
//   }
//   getSize() {
//     return this.size;
//   }
//   isEmpty() {
//     return this.size === 0;
//   }
//   contain(ele) {
//     return this.search(ele) === null
//   }
//   add(ele: number) {
//     const add = (treeNode: TreeNode, ele) => {
//       if(treeNode === null) {
//         this.size ++;
//         return new TreeNode(ele);
//       }
//       if(treeNode.ele > ele) {
//         treeNode.left = add(treeNode.left, ele);
//       } else if (treeNode.ele < ele) {
//         treeNode.right = add(treeNode.right, ele);
//       }
//       return treeNode;
//     }
//     this.root = add(this.root, ele);
//   }
//   search(ele: number) {
//     const search = (treeNode: TreeNode, ele: number): TreeNode => {
//       if (treeNode === null) {
//         console.log('没有找到该节点');
//         return null;
//       }
//       if(treeNode.ele === ele) {
//         return treeNode;
//       }
//       if(treeNode.ele > ele) {
//         return search(treeNode.left, ele);
//       } else {
//         return search(treeNode.right, ele);
//       }
//     }
//     return search(this.root, ele);
//   }
//   prevTraversing(): void {
//     const prevTraversing  = (treeNode: TreeNode): void => {
//       if(treeNode === null) {
//         return;
//       }
//       console.log(treeNode.ele);
//       prevTraversing(treeNode.left);
//       prevTraversing(treeNode.right);
//     }
//     prevTraversing(this.root);
//   }
//   midTraversing(): void {
//     const midTraversing  = (treeNode: TreeNode): void => {
//       if(treeNode === null) {
//         return;
//       }
//       midTraversing(treeNode.left);
//       console.log(treeNode.ele);
//       midTraversing(treeNode.right);
//     }
//     midTraversing(this.root);
//   }
//   postTraversing(): void {
//     const postTraversing  = (treeNode: TreeNode): void => {
//       if(treeNode === null) {
//         return;
//       }
//       postTraversing(treeNode.left);
//       postTraversing(treeNode.right);
//       console.log(treeNode.ele);
//     }
//     postTraversing(this.root);
//   }
//   levelTraversing(): void {
//     const tempArr = [];
//     if(this.root === null) {
//       return;
//     }
//     tempArr.push(this.root);
//     while(tempArr.length !== 0) {
//       const node: TreeNode= tempArr.shift();
//       console.log(node.ele);
//       if(node.left) {
//         tempArr.push(node.left);
//       }
//       if(node.right) {
//         tempArr.push(node.right);
//       }
//     }
//   }
//   prevTraversingS(): void {
//     const nodeList: TreeNode[] = [];
//     if(this.root === null) {
//       return;
//     }
//     nodeList.push(this.root);
//     while(nodeList.length !== 0) {
//       const treeNode = nodeList.pop();
//       console.log(treeNode.ele);
//       if(treeNode.right !== null) {
//         nodeList.push(treeNode.right);
//       }
//       if(treeNode.left !== null) {
//         nodeList.push(treeNode.left);
//       }
//     }
//   }
//   midTraversingS(): void {
//     const nodeList: TreeNode[] = [];
//     if(this.root === null) {
//       return;
//     }
//     nodeList.push(this.root);
//   }
//   removeMin(): TreeNode {
//     const e: TreeNode = this.minimum();
//     this.root = this.removeMinByNode(this.root);
//     return e;
//   }
//   private removeMinByNode (treeNode: TreeNode): TreeNode {
//     if(treeNode.left === null) {
//       const tempNode = treeNode.right;
//       treeNode.left === null;
//       this.size --;
//       return tempNode;
//     }
//     treeNode.left = this.removeMinByNode(treeNode.left);
//     return treeNode;
//   }
//   removeMax(): TreeNode {
//     const removeMax = (treeNode: TreeNode): TreeNode => {
//       if(treeNode.right === null) {
//         const tempNode = treeNode.left;
//         treeNode.right === null;
//         this.size --;
//         return tempNode;
//       }
//       treeNode.right = removeMax(treeNode.right);
//       return treeNode;
//     }
//     const e: TreeNode = this.maximum();
//     this.root = removeMax(this.root);
//     return e;
//   }
//   removeByValue(ele: number): TreeNode {
//     const removeByValue = (treeNode: TreeNode, ele: number): TreeNode => {
//       if(treeNode === null) {
//         return null;
//       }
//       if(treeNode.ele > ele) {
//         treeNode.left =  removeByValue(treeNode.left, ele);
//         return treeNode;
//       } else if (treeNode.ele < ele) {
//         treeNode.right =  removeByValue(treeNode.right, ele);
//         return treeNode;
//       } else {
//         if(treeNode.left === null) {
//           const rightNode = treeNode.right
//           treeNode.right = null;
//           this.size --;
//           return rightNode;
//         }
//         if(treeNode.right === null) {
//           const leftNode = treeNode.left;
//           treeNode.left = null;
//           this.size --;
//           return leftNode;
//         }
//         const successor = new TreeNode(this.minimumByNode(treeNode.right).ele);
//         successor.right = this.removeMinByNode(treeNode.right);
//         successor.left = treeNode.left;
//         treeNode.left = null;
//         treeNode.right = null;
//         return successor;
//       }
//     }
//     return removeByValue(this.root, ele);
//   }
//   minimum(): TreeNode{
//     const minimum = (treeNode: TreeNode) => {
//       if (treeNode.left === null) {
//         return treeNode
//       }
//       return minimum(treeNode.left);
//     }
//     if(this.size === 0 ) {
//       console.log('当前为空树')
//       return
//     }
//     return minimum(this.root);
//   }
//   maximum(): TreeNode{
//     if(this.size === 0 ) {
//       console.log('当前为空树')
//       return
//     }
//     return this.maximumByNode(this.root);
//   }
//   private minimumByNode(treeNode: TreeNode) {
//     if (treeNode.left === null) {
//       return treeNode
//     }
//     return this.minimumByNode(treeNode.left);
//   }
//   private maximumByNode(treeNode: TreeNode) {
//     if (treeNode.right === null) {
//       return treeNode
//     }
//     return this.maximumByNode(treeNode.right);
//   }
// }
// const tree = new Tree();
// tree.add(4);
// tree.add(3);
// tree.add(6);
// tree.add(5);
// tree.add(8);
// tree.add(7);
// tree.add(10);
// console.log('-------------------------')
// // console.log(tree.removeMin());
// // console.log(tree.removeMax());
// console.log(tree.removeByValue(6));
// tree.prevTraversingS();
//# sourceMappingURL=index.js.map