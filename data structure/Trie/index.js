class TNode {
    constructor(value = '', origin = null) {
        this.isWord = false;
        this.value = '';
        this.next = null;
        this.origin = null;
        this.next = [];
        this.value = value;
        this.origin = origin;
    }
}
// class Trie {
//   size: number = 0;
//   private root: TNode = null;
//   constructor () {
//     this.root = new TNode();
//   }
//   getSize(): number {
//     return this.size;
//   }
//   add(word: string) {
//     let node = this.root
//     for(let i = 0, len = word.length; i < len ; i++) {
//       const c = word.charAt(i);
//       if(!node.next.get(c)) {
//         node.next.set(c, new TNode())
//       }
//       node = node.next.get(c);
//     }
//     if(node.isWord === false) {
//       node.isWord = true;
//       this.size ++;
//     }
//   }
//   contains(word: string): boolean {
//     let node = this.root
//     for(let i = 0, len = word.length; i < len ; i++) {
//       const c = word.charAt(i);
//       if(!node.next.get(c)) {
//         return false;
//       }
//       node = node.next.get(c);
//     }
//     return node.isWord;
//   }
//   prefix(prefix: string): boolean {
//     let node = this.root
//     for(let i = 0, len = prefix.length; i < len ; i++) {
//       const c = prefix.charAt(i);
//       if(!node.next.get(c)) {
//         return false;
//       }
//       node = node.next.get(c);
//     }
//     return true;
//   }
// }
// class WordDictionary {
//   private root: TNode = null;
//   constructor () {
//     this.root = new TNode();
//   }
//   addWord(word) {
//     let node = this.root
//     for(let i = 0, len = word.length; i < len ; i++) {
//       const c = word.charAt(i);
//       if(!node.next.get(c)) {
//         node.next.set(c, new TNode())
//       }
//       node = node.next.get(c);
//     }
//     if(node.isWord === false) {
//       node.isWord = true;
//     }
//   }
//   search(word) {
//     return this.match(this.root, word, 0);
//   }
//   match(node, word, index) {
//     if(index === word.length) {
//       return node.isWord;
//     }
//     const c = word.charAt(index);
//     if(c !== '.') {
//       const temp = node.next.get(c)
//       if(temp) {
//         return this.match(temp, word, index + 1);
//       } else  {
//         return false;
//       }
//     } else {
//       for(let tempNode of node.next.values()) {
//         if(this.match(tempNode, word, index + 1)) {
//           return true
//         }
//       }
//       return false;
//     }
//   }
// }
// class MapSum {
//   size: number = 0;
//   private root: TNode = null;
//   constructor () {
//     this.root = new TNode();
//   }
//   insert(word: string, value) {
//     let node = this.root
//     for(let i = 0, len = word.length; i < len ; i++) {
//       const c = word.charAt(i);
//       if(!node.next.get(c)) {
//         node.next.set(c, new TNode())
//       }
//       node = node.next.get(c);
//     }
//     node.value = value
//   }
//   sum(prefix: string) {
//     let node = this.root;
//     for(let i = 0, len = prefix.length; i < len ; i++) {
//       const c = prefix.charAt(i);
//       if(node.next.get(c)) {
//         node = node.next.get(c);
//       } else {
//         return 0;
//       }
//     }
//     return this.getValue(node);
//   }
//   getValue(node) {
//     let res = node.value;
//     for(let item of node.next.values()) {
//       res += this.getValue(item);
//     }
//     return res;
//   }
// }
class Trie {
    constructor() {
        this.root = null;
        this.root = new TNode();
    }
    add(word) {
        let node = this.root;
        for (let i = 0, len = word.length; i < len; i++) {
            const c = word.charAt(i);
            const temp = node.next.find(ele => ele.value === c);
            if (!temp) {
                node.next.push(new TNode(c, word));
            }
            if (temp) {
                node = temp;
            }
            else {
                node = node.next[node.next.length - 1];
            }
        }
    }
    findKNumber(k) {
        const numberList = [];
        let nodeList = [];
        const node = this.root;
        nodeList.push(node);
        while (numberList.length <= k) {
            const temp = nodeList.pop();
            numberList.push(temp.origin);
            for (let i = temp.next.length - 1; i >= 0; i--) {
                nodeList.push(temp.next[i]);
            }
        }
        return Number(numberList.pop());
    }
}
const time = new Date().getTime();
const trie = new Trie();
for (let i = 1; i < 4289384; i++) {
    trie.add(String(i));
}
console.log(trie.findKNumber(1922239));
console.log(`time: ${new Date().getTime() - time}`);
//# sourceMappingURL=index.js.map