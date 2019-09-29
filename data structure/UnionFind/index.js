class QuickFind {
    constructor(capacity = 10) {
        this.size = 0;
        this.data = [];
        this.data = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.data[i] = i;
        }
        this.size = this.data.length;
    }
    getSize() {
        return this.size;
    }
    isConnection(p, q) {
        return this.find(p) === this.find(q);
    }
    unionElement(p, q) {
        const pId = this.find(p);
        const qId = this.find(q);
        if (pId === qId) {
            return;
        }
        for (let i = 0, len = this.data.length; i < len; i++) {
            if (this.data[i] === pId) {
                this.data[i] = qId;
            }
        }
    }
    find(index) {
        return this.data[index];
    }
}
class QuickUnion {
    constructor(capacity = 10) {
        this.size = 0;
        this.data = [];
        this.data = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.data[i] = i;
        }
        this.size = this.data.length;
    }
    getSize() {
        return this.size;
    }
    isConnection(p, q) {
        return this.find(p) === this.find(q);
    }
    unionElement(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) {
            return;
        }
        this.data[pRoot] = qRoot;
    }
    // 查找过程。查找原始p所对应的集合编号
    // O(h)复杂度，h为树的高度
    find(index) {
        if (index < 0 || index > this.getSize()) {
            throw new Error('index is illegal');
        }
        while (this.data[index] !== index) {
            index = this.data[index];
        }
        return index;
    }
}
// 基于size 的优化，通过一个根节点，下面子树的个树，来判断合并规则
class QuickUnion2 {
    constructor(capacity = 10) {
        this.size = 0;
        this.data = [];
        this.sizeArr = [];
        this.data = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.data[i] = i;
            this.sizeArr[i] = 1;
        }
        this.size = this.data.length;
    }
    getSize() {
        return this.size;
    }
    isConnection(p, q) {
        return this.find(p) === this.find(q);
    }
    unionElement(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) {
            return;
        }
        if (this.sizeArr[pRoot] < this.sizeArr[qRoot]) {
            this.data[pRoot] = qRoot;
            this.sizeArr[qRoot] += this.sizeArr[pRoot];
        }
        else {
            this.data[qRoot] = pRoot;
            this.sizeArr[pRoot] += this.sizeArr[qRoot];
        }
    }
    // 查找过程。查找原始p所对应的集合编号
    // O(h)复杂度，h为树的高度
    find(index) {
        if (index < 0 || index > this.getSize()) {
            throw new Error('index is illegal');
        }
        while (this.data[index] !== index) {
            index = this.data[index];
        }
        return index;
    }
}
// 基于排名来判断合并倾向的优化，
class QuickUnion3 {
    constructor(capacity = 10) {
        this.size = 0;
        this.data = [];
        this.rank = [];
        this.data = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.data[i] = i;
            this.rank[i] = 1;
        }
        this.size = this.data.length;
    }
    getSize() {
        return this.size;
    }
    isConnection(p, q) {
        return this.find(p) === this.find(q);
    }
    unionElement(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) {
            return;
        }
        if (this.rank[pRoot] < this.rank[qRoot]) {
            this.data[pRoot] = qRoot;
        }
        else if (this.rank[pRoot] > this.rank[qRoot]) {
            this.data[qRoot] = pRoot;
        }
        else {
            // 当2个树的rank 一致时，不管那个合并那个被合并的那个只需要加一即可
            this.data[qRoot] = pRoot;
            this.rank[pRoot] += 1;
        }
    }
    // 查找过程。查找原始p所对应的集合编号
    // O(h)复杂度，h为树的高度
    find(index) {
        if (index < 0 || index > this.getSize()) {
            throw new Error('index is illegal');
        }
        while (this.data[index] !== index) {
            index = this.data[index];
        }
        return index;
    }
}
// 基于路径压缩的优化方法
class QuickUnion4 {
    constructor(capacity = 10) {
        this.size = 0;
        this.rank = [];
        this.data = [];
        this.data = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.data[i] = i;
            this.rank[i] = 1;
        }
        this.size = this.data.length;
    }
    getSize() {
        return this.size;
    }
    isConnection(p, q) {
        return this.find(p) === this.find(q);
    }
    unionElement(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) {
            return;
        }
        if (this.rank[pRoot] < this.rank[qRoot]) {
            this.data[pRoot] = qRoot;
        }
        else if (this.rank[pRoot] > this.rank[qRoot]) {
            this.data[qRoot] = pRoot;
        }
        else {
            this.data[qRoot] = pRoot;
            this.rank[pRoot] += 1;
        }
    }
    formatAll() {
        this.data = this.data.map(ele => this.find(ele));
    }
    find(index) {
        if (index < 0 || index > this.getSize()) {
            throw new Error('index is illegal');
        }
        // 路径压缩， 在不断寻找父级的过程，让路径进行压缩。
        while (this.data[index] !== index) {
            // 让index 的父级 等于 index 的父亲的父亲，这样执行一步，就压缩了一层路径
            this.data[index] = this.data[this.data[index]];
            index = this.data[index];
        }
        return index;
    }
}
class QuickUnion5 {
    constructor(capacity = 10) {
        this.size = 0;
        this.rank = [];
        this.data = [];
        this.data = new Array(capacity);
        for (let i = 0; i < capacity; i++) {
            this.data[i] = i;
            this.rank[i] = 1;
        }
        this.size = this.data.length;
    }
    getSize() {
        return this.size;
    }
    isConnection(p, q) {
        return this.find(p) === this.find(q);
    }
    unionElement(p, q) {
        const pRoot = this.find(p);
        const qRoot = this.find(q);
        if (pRoot === qRoot) {
            return;
        }
        if (this.rank[pRoot] < this.rank[qRoot]) {
            this.data[pRoot] = qRoot;
        }
        else if (this.rank[pRoot] > this.rank[qRoot]) {
            this.data[qRoot] = pRoot;
        }
        else {
            this.data[qRoot] = pRoot;
            this.rank[pRoot] += 1;
        }
    }
    // 查找过程。查找原始p所对应的集合编号
    // O(h)复杂度，h为树的高度
    find(index) {
        if (index < 0 || index > this.getSize()) {
            throw new Error('index is illegal');
        }
        if (this.data[index] !== index) {
            this.data[index] = this.find(this.data[index]);
        }
        return this.data[index];
    }
}
function test(uf, m) {
    const size = uf.getSize();
    const startTime = new Date().getTime();
    for (let i = 0; i < m; i++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        uf.unionElement(a, b);
    }
    for (let i = 0; i < m; i++) {
        const a = Math.floor(Math.random() * size);
        const b = Math.floor(Math.random() * size);
        uf.isConnection(a, b);
    }
    return new Date().getTime() - startTime;
}
function main(size, m) {
    // const uf1 = new QuickFind(size);
    // const uf2 = new QuickUnion(size);
    const uf3 = new QuickUnion2(size);
    const uf4 = new QuickUnion3(size);
    const uf5 = new QuickUnion4(size);
    const uf6 = new QuickUnion5(size);
    // console.log('uf1 run time:', test(uf1, m));
    // console.log('uf2 run time:', test(uf2, m));
    console.log('uf3 run time:', test(uf3, m));
    console.log('uf4 run time:', test(uf4, m));
    console.log('uf5 run time:', test(uf5, m));
    console.log('uf6 run time:', test(uf6, m));
}
// main(10000000, 10000000);
/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function (M) {
    const uf = new QuickUnion4(M.length);
    for (let i = 0; i < M.length; i++) {
        for (let j = 0; j < M[i].length; j++) {
            if (M[i][j] === 1 && j > i) {
                uf.unionElement(i, j);
            }
        }
    }
    uf.formatAll();
    return new Set(uf.data).size;
};
const data = [
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
];
console.log(findCircleNum(data));
//# sourceMappingURL=index.js.map