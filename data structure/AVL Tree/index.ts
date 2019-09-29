// 平衡 二叉树

interface Comparable {
  // 传入二分搜索树的元素必须具有一个可比较的 compareValue 属性
  compareValue: number | string | boolean;
  // 比较函数 true: 为大于， false: 为小于
  compare(ele: any): number;
}

class ElementNode implements Comparable{
  compareValue: number; 
  constructor (value: number) {
    this.compareValue = value;
  }
  compare(ele: number) {
    if(this.compareValue > ele) {
      return 1;
    }else if(this.compareValue < ele) {
      return -1;
    }else {
      return 0;
    }
  }
}

class TreeNode<E extends Comparable> {
  ele: E;
  left: TreeNode<E>;
  right: TreeNode<E>;
  height: number = null;
  

  constructor (key: E){
    this.ele = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

interface BSTTree<T extends Comparable>{
  root: TreeNode<T>;
  size: number;
  getSize(): number;
  isEmpty(): boolean;
  contain(ele: T): boolean;
  search(ele: T): TreeNode<T>;
  add(ele: T);

}

class AVLTree<T extends Comparable> implements BSTTree<T> {

  root: TreeNode<T> = null;
  size: number = 0;

  constructor() {
    this.root = null;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  contain(ele: T) {
    return this.search(ele) === null
  }

  add(ele: T) {
    const add = (treeNode: TreeNode<T>, ele) => {
      if(treeNode === null) {
        this.size ++;
        return new TreeNode(ele);
      }
      if(treeNode.ele.compare(ele.compareValue) > 0) {
        treeNode.left = add(treeNode.left, ele);
      } else if (treeNode.ele.compare(ele.compareValue) < 0) {
        treeNode.right = add(treeNode.right, ele);
      }
      // 更新hight
      treeNode.height = Math.max(this.getHeight(treeNode.left), this.getHeight(treeNode.right)) + 1;
      
      // 计算平横因子
      const balanceFactor = this.getBalanceFactor(treeNode);
      // LL 左侧不平衡，且为插入的元素 是该节点的左侧的左侧
      if(balanceFactor > 1 && this.getBalanceFactor(treeNode.left) >= 0) {
        return this.rightRotate(treeNode);
      }

      // RR 右侧不平衡，且为插入的元素 是该节点的右侧的右侧
      if(balanceFactor < -1 && this.getBalanceFactor(treeNode.right) <= 0) {
        return this.leftRotate(treeNode);
      }

      // LR 左侧不平衡，且为插入的元素 是该节点的左侧的右侧
      if(balanceFactor > 1 && this.getBalanceFactor(treeNode.left) < 0) {
        treeNode.left = this.leftRotate(treeNode.left);
        return this.rightRotate(treeNode);
      }

      // RL 右侧不平衡，且为插入的元素 是该节点的右侧的左侧
      if(balanceFactor < -1 && this.getBalanceFactor(treeNode.right) > 0) {
        treeNode.right = this.rightRotate(treeNode.right);
        return this.leftRotate(treeNode);
      }



      return treeNode;
    }

    this.root = add(this.root, ele);
  }

  search(ele: T) {
    const search = (treeNode: TreeNode<T>, ele: T): TreeNode<T> => {
      if (treeNode === null) {
        return null;
      }
      if(treeNode.ele.compare( ele.compareValue) === 0) {
        return treeNode;
      }

      if(treeNode.ele.compare(ele.compareValue) > 0) {
        return search(treeNode.left, ele);
      } else {
        return search(treeNode.right, ele);
      }
    }
    return search(this.root, ele);
  }

  private getHeight(treeNode: TreeNode<T>): number {
    if(treeNode === null) {
      return 0;
    }
    return treeNode.height;
  }

  private getBalanceFactor(treeNode: TreeNode<T>): number {
    if(treeNode === null) {
      return 0;
    }
    return this.getHeight(treeNode.left) - this.getHeight(treeNode.right);
  }

  /**  对节点Y进行右旋转操作，返回旋转后的新的根节点。
   *        y                                       X
   *      /  \                                    /  \
   *     X   T4       向右旋转Y                   z    y
   *    / \            ------>                 /  \  / \
   *   Z  T3                                  T1  T2 T3  T4
   *  / \
   * T1 T2
   */
  private rightRotate(y: TreeNode<T>) {
    const x = y.left;
    const t3 = x.right;
    x.right = y;
    y.left = t3;

    // 更新height
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  /**  对节点Y进行右旋转操作，返回旋转后的新的根节点。
   *        y                                       X
   *      /  \                                    /  \
   *     T4  x       向左旋转Y                    Y    Z
   *        / \            ------>            /  \   / \
   *       T3 Z                              T4  T3 T1 T2 
   *         / \
   *        T1 T2
   */
  private leftRotate(y: TreeNode<T>) {
    const x = y.right;
    const t3 = x.left;
    x.left = y;
    y.right = t3;

    // 更新height
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  isBST(){
    const array: T[] = [];
    this.inOrder(this.root, array);
    for(let i = 0 ; i < array.length - 1 ;i ++) {
      if(array[i].compare(array[i].compareValue) > 0) {
        return false
      }
    }
    return true;
  }

  isBalanced() {
    const isBalanced = (treeNode: TreeNode<T>) => {
      if(treeNode === null) {
        return true;
      }
      if(Math.abs(this.getBalanceFactor(treeNode)) > 1) {
        return false;
      }
      return isBalanced(treeNode.left) && isBalanced(treeNode.right)
    }
    return isBalanced(this.root);
  }

  private inOrder(treeNode: TreeNode<T>, arr: Array<T>) {
    const inOrder = (treeNode: TreeNode<T>): void => {
      if(treeNode === null) {
        return;
      }
      inOrder(treeNode.left);
      arr.push(treeNode.ele);
      inOrder(treeNode.right);
    }
    inOrder(treeNode);
  }

  prevTraversing(): void {

    const prevTraversing  = (treeNode: TreeNode<T>): void => {
      if(treeNode === null) {
        return;
      }
      console.log(treeNode)
      prevTraversing(treeNode.left);
      prevTraversing(treeNode.right);
    }
    prevTraversing(this.root);
  }

  midTraversing(): void {

    const midTraversing  = (treeNode: TreeNode<T>): void => {
      if(treeNode === null) {
        return;
      }
      midTraversing(treeNode.left);
      console.log(treeNode.ele);
      midTraversing(treeNode.right);
    }
    midTraversing(this.root);
  }

  postTraversing(): void {

    const postTraversing  = (treeNode: TreeNode<T>): void => {
      if(treeNode === null) {
        return;
      }
      postTraversing(treeNode.left);
      postTraversing(treeNode.right);
      console.log(treeNode.ele);
      
    }
    postTraversing(this.root);
  }

  levelTraversing(): void {
    const tempArr = [];
    if(this.root === null) {
      return;
    }
    tempArr.push(this.root);
    while(tempArr.length !== 0) {
      const node: TreeNode<T>= tempArr.shift();
      console.log(node.ele);
      if(node.left) {
        tempArr.push(node.left);
      }
      if(node.right) {
        tempArr.push(node.right);
      }
    }
  }

  prevTraversingS(): void {
    const nodeList: TreeNode<T>[] = [];
    if(this.root === null) {
      return;
    }
    nodeList.push(this.root);

    while(nodeList.length !== 0) {
      const treeNode = nodeList.pop();
      console.log(treeNode.ele);
      if(treeNode.right !== null) {
        nodeList.push(treeNode.right);
      }
      if(treeNode.left !== null) {
        nodeList.push(treeNode.left);
      }
    }
  }
  midTraversingS(): void {
    const nodeList: TreeNode<T>[] = [];
    if(this.root === null) {
      return;
    }
    nodeList.push(this.root);
  }

  removeMin(): TreeNode<T> {
    const e: TreeNode<T> = this.minimum();

    this.root = this.removeMinByNode(this.root);
    return e;
    
  }

  private removeMinByNode (treeNode: TreeNode<T>): TreeNode<T> {
    if(treeNode.left === null) {
      const tempNode = treeNode.right;
      treeNode.left === null;
      this.size --;
      return tempNode;
    }

    treeNode.left = this.removeMinByNode(treeNode.left);
    return treeNode;

  }

  removeMax(): TreeNode<T> {
    const removeMax = (treeNode: TreeNode<T>): TreeNode<T> => {
      if(treeNode.right === null) {
        const tempNode = treeNode.left;
        treeNode.right === null;
        this.size --;
        return tempNode;
      }

      treeNode.right = removeMax(treeNode.right);
      return treeNode;

    }
    const e: TreeNode<T> = this.maximum();

    this.root = removeMax(this.root);
    return e;
  }

  removeByValue(ele: number): TreeNode<T> {
    const removeByValue = (treeNode: TreeNode<T>, ele: number): TreeNode<T> => {
      if(treeNode === null) {
        return null;
      }
      let retNode: TreeNode<T> = null;
      if(treeNode.ele.compare(ele) > 0) {
        treeNode.left =  removeByValue(treeNode.left, ele);
        retNode = treeNode;
      } else if (treeNode.ele.compare(ele) < 0) {
        treeNode.right =  removeByValue(treeNode.right, ele);
        retNode = treeNode;
      } else {
        if(treeNode.left === null) {
          const rightNode = treeNode.right
          treeNode.right = null;
          this.size --;
          retNode = rightNode;
        } else if(treeNode.right === null) {
          const leftNode = treeNode.left;
          treeNode.left = null;
          this.size --;
          retNode = leftNode;
        } else {
          const successor = new TreeNode(this.minimumByNode(treeNode.right).ele);
          successor.right = this.removeMinByNode(successor.ele.compareValue);
          successor.left = treeNode.left;
          treeNode.left = null;
          treeNode.right = null;
          retNode = successor;
        }
      }

      // 更新hight
      retNode.height = Math.max(this.getHeight(retNode.left), this.getHeight(retNode.right)) + 1;
      
      // 计算平横因子
      const balanceFactor = this.getBalanceFactor(retNode);
      // LL 左侧不平衡，且为插入的元素 是该节点的左侧的左侧
      if(balanceFactor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
        return this.rightRotate(retNode);
      }

      // RR 右侧不平衡，且为插入的元素 是该节点的右侧的右侧
      if(balanceFactor < -1 && this.getBalanceFactor(retNode.right) <= 0) {
        return this.leftRotate(retNode);
      }

      // LR 左侧不平衡，且为插入的元素 是该节点的左侧的右侧
      if(balanceFactor > 1 && this.getBalanceFactor(retNode.left) < 0) {
        retNode.left = this.leftRotate(retNode.left);
        return this.rightRotate(retNode);
      }

      // RL 右侧不平衡，且为插入的元素 是该节点的右侧的左侧
      if(balanceFactor < -1 && this.getBalanceFactor(retNode.right) > 0) {
        retNode.right = this.rightRotate(retNode.right);
        return this.leftRotate(retNode);
      }

      return retNode;
    }
    return removeByValue(this.root, ele);
  }

  minimum(): TreeNode<T>{
    const minimum = (treeNode: TreeNode<T>) => {
      if (treeNode.left === null) {
        return treeNode
      }
      return minimum(treeNode.left);
    }

    if(this.size === 0 ) {
      console.log('当前为空树')
      return
    }
    return minimum(this.root);
  }
  maximum(): TreeNode<T>{
    if(this.size === 0 ) {
      console.log('当前为空树')
      return
    }
    return this.maximumByNode(this.root);

  }

  private minimumByNode(treeNode: TreeNode<T>) {
    if (treeNode.left === null) {
      return treeNode
    }
    return this.minimumByNode(treeNode.left);
  }

  private maximumByNode(treeNode: TreeNode<T>) {
    if (treeNode.right === null) {
      return treeNode
    }
    return this.maximumByNode(treeNode.right);
  }

}

class GenericsBST<T extends Comparable> implements BSTTree<T> {

  root: TreeNode<T> = null;
  size: number = 0;

  constructor() {
    this.root = null;
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  contain(ele: T) {
    return this.search(ele) === null
  }

  add(ele: T) {
    const add = (treeNode: TreeNode<T>, ele) => {
      if(treeNode === null) {
        this.size ++;
        return new TreeNode(ele);
      }
      if(treeNode.ele.compare(ele.compareValue) > 0) {
        treeNode.left = add(treeNode.left, ele);
      } else if (treeNode.ele.compare(ele.compareValue) < 0) {
        treeNode.right = add(treeNode.right, ele);
      }
      return treeNode;
    }

    this.root = add(this.root, ele);
  }

  search(ele: T) {
    const search = (treeNode: TreeNode<T>, ele: T): TreeNode<T> => {
      if (treeNode === null) {
        return null;
      }
      if(treeNode.ele.compare( ele.compareValue) === 0) {
        return treeNode;
      }

      if(treeNode.ele.compare(ele.compareValue) > 0) {
        return search(treeNode.left, ele);
      } else {
        return search(treeNode.right, ele);
      }
    }
    return search(this.root, ele);
  }

  prevTraversing(): void {

    const prevTraversing  = (treeNode: TreeNode<T>): void => {
      if(treeNode === null) {
        return;
      }
      console.log(treeNode)
      prevTraversing(treeNode.left);
      prevTraversing(treeNode.right);
    }
    prevTraversing(this.root);
  }

  midTraversing(): void {

    const midTraversing  = (treeNode: TreeNode<T>): void => {
      if(treeNode === null) {
        return;
      }
      midTraversing(treeNode.left);
      console.log(treeNode.ele);
      midTraversing(treeNode.right);
    }
    midTraversing(this.root);
  }

  postTraversing(): void {

    const postTraversing  = (treeNode: TreeNode<T>): void => {
      if(treeNode === null) {
        return;
      }
      postTraversing(treeNode.left);
      postTraversing(treeNode.right);
      console.log(treeNode.ele);
      
    }
    postTraversing(this.root);
  }

  levelTraversing(): void {
    const tempArr = [];
    if(this.root === null) {
      return;
    }
    tempArr.push(this.root);
    while(tempArr.length !== 0) {
      const node: TreeNode<T>= tempArr.shift();
      console.log(node.ele);
      if(node.left) {
        tempArr.push(node.left);
      }
      if(node.right) {
        tempArr.push(node.right);
      }
    }
  }

  prevTraversingS(): void {
    const nodeList: TreeNode<T>[] = [];
    if(this.root === null) {
      return;
    }
    nodeList.push(this.root);

    while(nodeList.length !== 0) {
      const treeNode = nodeList.pop();
      console.log(treeNode.ele);
      if(treeNode.right !== null) {
        nodeList.push(treeNode.right);
      }
      if(treeNode.left !== null) {
        nodeList.push(treeNode.left);
      }
    }
  }
  midTraversingS(): void {
    const nodeList: TreeNode<T>[] = [];
    if(this.root === null) {
      return;
    }
    nodeList.push(this.root);
  }

  removeMin(): TreeNode<T> {
    const e: TreeNode<T> = this.minimum();

    this.root = this.removeMinByNode(this.root);
    return e;
    
  }

  private removeMinByNode (treeNode: TreeNode<T>): TreeNode<T> {
    if(treeNode.left === null) {
      const tempNode = treeNode.right;
      treeNode.left === null;
      this.size --;
      return tempNode;
    }

    treeNode.left = this.removeMinByNode(treeNode.left);
    return treeNode;

  }

  removeMax(): TreeNode<T> {
    const removeMax = (treeNode: TreeNode<T>): TreeNode<T> => {
      if(treeNode.right === null) {
        const tempNode = treeNode.left;
        treeNode.right === null;
        this.size --;
        return tempNode;
      }

      treeNode.right = removeMax(treeNode.right);
      return treeNode;

    }
    const e: TreeNode<T> = this.maximum();

    this.root = removeMax(this.root);
    return e;
  }

  removeByValue(ele: number): TreeNode<T> {
    const removeByValue = (treeNode: TreeNode<T>, ele: number): TreeNode<T> => {
      if(treeNode === null) {
        return null;
      }

      if(treeNode.ele.compare(ele) > 0) {
        treeNode.left =  removeByValue(treeNode.left, ele);
        return treeNode;
      } else if (treeNode.ele.compare(ele) < 0) {
        treeNode.right =  removeByValue(treeNode.right, ele);
        return treeNode;
      } else {
        if(treeNode.left === null) {
          const rightNode = treeNode.right
          treeNode.right = null;
          this.size --;
          return rightNode;
        }

        if(treeNode.right === null) {
          const leftNode = treeNode.left;
          treeNode.left = null;
          this.size --;
          return leftNode;
        }

        const successor = new TreeNode(this.minimumByNode(treeNode.right).ele);
        successor.right = this.removeMinByNode(treeNode.right);
        successor.left = treeNode.left;
        treeNode.left = null;
        treeNode.right = null;
        return successor;
      }
    }

    return removeByValue(this.root, ele);
  }

  minimum(): TreeNode<T>{
    const minimum = (treeNode: TreeNode<T>) => {
      if (treeNode.left === null) {
        return treeNode
      }
      return minimum(treeNode.left);
    }

    if(this.size === 0 ) {
      console.log('当前为空树')
      return
    }
    return minimum(this.root);
  }
  maximum(): TreeNode<T>{
    if(this.size === 0 ) {
      console.log('当前为空树')
      return
    }
    return this.maximumByNode(this.root);

  }

  private minimumByNode(treeNode: TreeNode<T>) {
    if (treeNode.left === null) {
      return treeNode
    }
    return this.minimumByNode(treeNode.left);
  }

  private maximumByNode(treeNode: TreeNode<T>) {
    if (treeNode.right === null) {
      return treeNode
    }
    return this.maximumByNode(treeNode.right);
  }

}


// const gTree = new AVLTree();
// gTree.add(new ElementNode(4));
// gTree.add(new ElementNode(3));
// gTree.add(new ElementNode(6));
// gTree.add(new ElementNode(5));
// gTree.add(new ElementNode(8));
// gTree.add(new ElementNode(7));
// gTree.add(new ElementNode(10));


console.log('-------------------------')
// console.log(gTree.removeByValue(6));
// gTree.prevTraversingS();

function avlTreeTest(size: number , time: number) {
  // const treeTime0 = new Date().getTime();
  // const gTree1 = new GenericsBST();
  // for(let i = 0; i < size ; i++) {
  //   gTree1.add(new ElementNode(size));
  // }
  // for(let i = 0; i < time; i++) {
  //   gTree1.contain(new ElementNode(time));
  // }
  // const arrTime2 = new Date().getTime() - treeTime0;
  // console.log(`array run time: ${arrTime2}`);

  const treeTime1 = new Date().getTime();
  const gTree2 = new AVLTree();
  for(let i = 0; i < size ; i++) {
    gTree2.add(new ElementNode(size));
  }
  for(let i = 0; i < time; i++) {
    gTree2.removeByValue( Math.floor(Math.random() * size));
    if( !gTree2.isBST() || !gTree2.isBalanced()){
      console.log('失败了，不是平衡二叉树');
    }
  }
  const treeTime2 = new Date().getTime() - treeTime1;
  console.log(`tree run time: ${treeTime2}`);
  console.log(`is BST: ${gTree2.isBST()}`)
  console.log(`is Balanced: ${gTree2.isBalanced()}`)
  

}

avlTreeTest(1000, 100);
