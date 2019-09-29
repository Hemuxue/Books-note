// interface Comparable {
//   // 传入二分搜索树的元素必须具有一个可比较的 compareValue 属性
//   compareValue: number | string | boolean;
//   // 比较函数 true: 为大于， false: 为小于
//   compare(ele: any): number;
// }
// class ElementNode implements Comparable{
//   compareValue: number; 
//   constructor (value: number) {
//     this.compareValue = value;
//   }
//   compare(ele: number) {
//     if(this.compareValue > ele) {
//       return 1;
//     }else if(this.compareValue < ele) {
//       return -1;
//     }else {
//       return 0;
//     }
//   }
// }
// class TreeNode<E extends Comparable> {
//   ele: E;
//   left: TreeNode<E>;
//   right: TreeNode<E>;
//   constructor (key: E){
//     this.ele = key;
//     this.left = null;
//     this.right = null;
//   }
// }
// interface BSTTree<T extends Comparable>{
//   root: TreeNode<T>;
//   size: number;
//   getSize(): number;
//   isEmpty(): boolean;
//   contain(ele: T): boolean;
//   search(ele: T): TreeNode<T>;
//   add(ele: T);
// }
// class GenericsBST<T extends Comparable> implements BSTTree<T> {
//   root: TreeNode<T> = null;
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
//   contain(ele: T) {
//     return this.search(ele) === null
//   }
//   add(ele: T) {
//     const add = (treeNode: TreeNode<T>, ele) => {
//       if(treeNode === null) {
//         this.size ++;
//         return new TreeNode(ele);
//       }
//       if(treeNode.ele.compare(ele.compareValue) > 0) {
//         treeNode.left = add(treeNode.left, ele);
//       } else if (treeNode.ele.compare(ele.compareValue) < 0) {
//         treeNode.right = add(treeNode.right, ele);
//       }
//       return treeNode;
//     }
//     this.root = add(this.root, ele);
//   }
//   search(ele: T) {
//     const search = (treeNode: TreeNode<T>, ele: T): TreeNode<T> => {
//       if (treeNode === null) {
//         return null;
//       }
//       if(treeNode.ele.compare( ele.compareValue) === 0) {
//         return treeNode;
//       }
//       if(treeNode.ele.compare(ele.compareValue) > 0) {
//         return search(treeNode.left, ele);
//       } else {
//         return search(treeNode.right, ele);
//       }
//     }
//     return search(this.root, ele);
//   }
//   prevTraversing(): void {
//     const prevTraversing  = (treeNode: TreeNode<T>): void => {
//       if(treeNode === null) {
//         return;
//       }
//       console.log(treeNode)
//       prevTraversing(treeNode.left);
//       prevTraversing(treeNode.right);
//     }
//     prevTraversing(this.root);
//   }
//   midTraversing(): void {
//     const midTraversing  = (treeNode: TreeNode<T>): void => {
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
//     const postTraversing  = (treeNode: TreeNode<T>): void => {
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
//       const node: TreeNode<T>= tempArr.shift();
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
//     const nodeList: TreeNode<T>[] = [];
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
//     const nodeList: TreeNode<T>[] = [];
//     if(this.root === null) {
//       return;
//     }
//     nodeList.push(this.root);
//   }
//   removeMin(): TreeNode<T> {
//     const e: TreeNode<T> = this.minimum();
//     this.root = this.removeMinByNode(this.root);
//     return e;
//   }
//   private removeMinByNode (treeNode: TreeNode<T>): TreeNode<T> {
//     if(treeNode.left === null) {
//       const tempNode = treeNode.right;
//       treeNode.left === null;
//       this.size --;
//       return tempNode;
//     }
//     treeNode.left = this.removeMinByNode(treeNode.left);
//     return treeNode;
//   }
//   removeMax(): TreeNode<T> {
//     const removeMax = (treeNode: TreeNode<T>): TreeNode<T> => {
//       if(treeNode.right === null) {
//         const tempNode = treeNode.left;
//         treeNode.right === null;
//         this.size --;
//         return tempNode;
//       }
//       treeNode.right = removeMax(treeNode.right);
//       return treeNode;
//     }
//     const e: TreeNode<T> = this.maximum();
//     this.root = removeMax(this.root);
//     return e;
//   }
//   removeByValue(ele: number): TreeNode<T> {
//     const removeByValue = (treeNode: TreeNode<T>, ele: number): TreeNode<T> => {
//       if(treeNode === null) {
//         return null;
//       }
//       if(treeNode.ele.compare(ele) > 0) {
//         treeNode.left =  removeByValue(treeNode.left, ele);
//         return treeNode;
//       } else if (treeNode.ele.compare(ele) < 0) {
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
//   minimum(): TreeNode<T>{
//     const minimum = (treeNode: TreeNode<T>) => {
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
//   maximum(): TreeNode<T>{
//     if(this.size === 0 ) {
//       console.log('当前为空树')
//       return
//     }
//     return this.maximumByNode(this.root);
//   }
//   private minimumByNode(treeNode: TreeNode<T>) {
//     if (treeNode.left === null) {
//       return treeNode
//     }
//     return this.minimumByNode(treeNode.left);
//   }
//   private maximumByNode(treeNode: TreeNode<T>) {
//     if (treeNode.right === null) {
//       return treeNode
//     }
//     return this.maximumByNode(treeNode.right);
//   }
// }
// const gTree = new GenericsBST();
// // gTree.add(new ElementNode(4));
// // gTree.add(new ElementNode(3));
// // gTree.add(new ElementNode(6));
// // gTree.add(new ElementNode(5));
// // gTree.add(new ElementNode(8));
// // gTree.add(new ElementNode(7));
// // gTree.add(new ElementNode(10));
// console.log('-------------------------')
// // console.log(gTree.removeByValue(6));
// // gTree.prevTraversingS();
// function genericsBSTTest(size: number , time: number) {
//   const arrTime1 = new Date().getTime();
//   const arr = [];
//   for(let i = 0; i < size ; i++) {
//     arr.push(Math.floor(Math.random() * size));
//   }
//   for(let i = 0; i < time; i++) {
//     arr.find(ele => ele === Math.floor(Math.random() * size));
//   }
//   const arrTime2 = new Date().getTime() - arrTime1;
//   console.log(`array run time: ${arrTime2}`);
//   const treeTime1 = new Date().getTime();
//   const gTree = new GenericsBST();
//   for(let i = 0; i < size ; i++) {
//     gTree.add(new ElementNode(Math.floor(Math.random() * size)));
//   }
//   for(let i = 0; i < time; i++) {
//     gTree.contain(new ElementNode(Math.floor(Math.random() * size)));
//   }
//   const treeTime2 = new Date().getTime() - treeTime1;
//   console.log(`tree run time: ${treeTime2}`);
// }
// genericsBSTTest(100000, 100000);
//# sourceMappingURL=index.js.map