
interface Merger<E> {
  (a: E, b: E): E;
}
class SegmentTree<E> {

  private data: E[] = null;
  private tree: E[] = null;
  private merger: Merger<E> = null;

  constructor(arr: E[], merge: Merger<E>) {
    this.merger = merge;
    this.data = [].concat(arr);
    this.tree = new Array(arr.length * 4);
    this.buildSegmentTree(0, 0, this.getSize() - 1);
  }

  public query(queryL: number, queryR: number): E {
    if ((queryL < 0 && queryL > this.getSize() - 1) ||
      (queryR < 0 && queryR > this.getSize() - 1) || queryL > queryR) {
      throw new Error("范围异常");
    }

    const _query = (treeIndex: number, l: number, r: number, queryL: number, queryR: number): E => {
      if (l === queryL && r === queryR) {
        return this.tree[treeIndex];
      }
      const mid = l + Math.floor((r - l) / 2);
      const leftChild = this.leftChild(treeIndex);
      const rightChild = this.rightChild(treeIndex);
      if (queryL >= mid + 1) {
        return _query(rightChild, mid + 1, r, queryL, queryR);
      } else if (queryR <= mid) {
        return _query(leftChild, l, mid, queryL, queryR);
      }
      const leftResult = _query(leftChild, l, mid, queryL, mid);
      const rightResult = _query(rightChild, mid + 1, r, mid + 1, queryR);
      return this.merger(leftResult, rightResult);
    }
    return _query(0, 0, this.getSize() - 1, queryL, queryR);
  }

  public set(index: number, e: E) {

    if (index > this.getSize() - 1 || index < 0 ) {
      throw new Error("范围异常");
    }
    this.data[index] = e;
    const set = (treeIndex: number, l:number , r: number, index: number, e: E) => {
      if(l === r) {
        this.tree[treeIndex] = e;
        return;
      }

      const mid = l + Math.floor((r - l) / 2);
      const leftChild = this.leftChild(treeIndex);
      const rightChild = this.rightChild(treeIndex);

      if(index >= mid + 1) {
        set(rightChild, mid + 1, r, index, e);
      } else {
        set(leftChild, l, mid, index, e);
      }

      this.tree[treeIndex] = this.merger(this.tree[leftChild], this.tree[rightChild]);
    }
    set(0, 0, this.getSize() - 1, index, e );

  }
  public get(index: number): E {
    if (index < 0) {
      throw new Error('Index is illegal');
    }
    return this.data[index];
  }

  public getSize(): number {
    return this.data.length;
  }
  /**
   * @override
   */
  public toString(): string {
    let str = '[';
    this.tree.forEach(item => {
      str += `${item},`
    })
    str += ']';
    return str;
  }

  /**
   * 
   * @param treeIndex 根节点对应的索引位置
   * @param l 范围的左端点
   * @param r 范围的右端点
   */
  private buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l];
      return;
    }
    const leftChild = this.leftChild(treeIndex);
    const rightChild = this.rightChild(treeIndex);
    const mid = l + Math.floor((r - l) / 2);
    this.buildSegmentTree(leftChild, l, mid);
    this.buildSegmentTree(rightChild, mid + 1, r);

    this.tree[treeIndex] = this.merger(this.tree[leftChild], this.tree[rightChild]);
  }

  private leftChild(index: number) {
    return index * 2 + 1;
  }
  private rightChild(index: number) {
    return index * 2 + 2;
  }
}

const init = () => {
  const arr = [0, 1, 2, 3, 4, 6];
  const seg = new SegmentTree<number>(arr, (a: number, b: number): number => {
    return a + b;
  });
  console.log(seg.toString());
}

init();


class NumArray {
  seg: SegmentTree<number>;
  constructor(nums) {
    this.seg = new SegmentTree<number>(nums, (a: number, b: number): number => {
      return a + b;
    });
  }

  update(i: number, value: number) {
    this.seg.set(i, value);
  }

  sumRange(i, j){
    this.seg.query(i, j);
  }
}