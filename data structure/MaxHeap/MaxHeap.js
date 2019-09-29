class Freq {
    constructor(key, freq) {
        this.key = null;
        this.freq = null;
        this.key = key;
        this.freq = freq;
    }
    compare(anther) {
        return this.freq > anther.freq;
    }
}
class Heap {
    constructor(type = 'max') {
        this.data = [];
        this.type = false;
        this.type = type === 'max' ? false : true;
    }
    getSize() {
        return this.data.length;
    }
    isEmpty() {
        return this.getSize() !== 0;
    }
    add(e) {
        this.data.push(e);
        this.shitUp(this.data.length - 1);
    }
    extractMax() {
        let max = this.findMax();
        this.swap(0, this.getSize() - 1);
        this.data.pop();
        this.shitDown(0);
        return max;
    }
    findMax() {
        if (this.getSize() === 0) {
            throw new Error('没有元素了');
        }
        return this.data[0];
    }
    parent(index) {
        if (index === 0) {
            throw new Error('根节点没有父亲节点');
        }
        return Math.floor((index - 1) / 2);
    }
    leftChild(index) {
        return index * 2 + 1;
    }
    rightChild(index) {
        return index * 2 + 2;
    }
    shitUp(index) {
        while (index > 0 && (this.data[this.parent(index)].compare(this.data[index])) === this.type) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }
    shitDown(index) {
        let size = this.getSize();
        while (this.leftChild(index) < size) {
            let j = this.leftChild(index);
            if (j + 1 < size && (this.data[j].compare(this.data[j + 1])) === this.type) {
                j = j + 1;
            }
            // 此时 j 已经存储了左右孩子中大的那一个节点
            if (this.data[j].compare(this.data[index]) !== this.type) {
                break;
            }
            this.swap(index, j);
            index = j;
        }
    }
    swap(i, j) {
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }
}
class PriorityQueue {
    constructor(type = 'max') {
        this.maxHeap = new Heap(type);
    }
    getSize() {
        return this.maxHeap.getSize();
    }
    isEmpty() {
        return this.maxHeap.isEmpty();
    }
    getFront() {
        return this.maxHeap.findMax();
    }
    enquque(e) {
        this.maxHeap.add(e);
    }
    dequque() {
        return this.maxHeap.extractMax();
    }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    const map = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], +map.get(nums[i]) + 1);
        }
        else {
            map.set(nums[i], 1);
        }
    }
    const queue = new PriorityQueue('min');
    for (let item of map.entries()) {
        if (queue.getSize() < k) {
            queue.enquque(new Freq(Number(item[0]), Number(item[1])));
        }
        else if (item[1] > queue.getFront().freq) {
            queue.dequque();
            queue.enquque(new Freq(Number(item[0]), Number(item[1])));
        }
    }
    let resArr = [];
    for (let i = 0, len = queue.getSize(); i < len; i++) {
        resArr.push(Number(queue.dequque().key));
    }
    return resArr;
};
var topKFrequent2 = function (nums, k) {
    var hs = new Map();
    for (var i = 0; i < nums.length; i++) {
        if (hs.has(nums[i])) {
            hs.set(nums[i], hs.get(nums[i]) + 1);
        }
        else {
            hs.set(nums[i], 1);
        }
    }
    var arr = [...hs];
    arr.sort((a, b) => b[1] - a[1]);
    return arr.slice(0, k).map(function (a) {
        return a[0];
    });
};
//# sourceMappingURL=MaxHeap.js.map