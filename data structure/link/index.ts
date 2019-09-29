interface LinkNode {
  next: LinkNode;
  value: number | string;
}

class CreateNode {
  value: number | string;
  next : LinkNode;

  constructor (value) {
    this.value = value;
    this.next = null;
  }
}

class Link {

  private dummyHead: LinkNode;
  private size: number;

  constructor () {
    this.dummyHead = new CreateNode('dummyHead');
    this.size = 0;
  }
  
  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  addElementByIndex(index, ele) {
    if (index > this.size || index < 0) {
      throw Error('新增数据越界');
    }
    let prev = this.dummyHead;
    while (index --) {
      prev = prev.next;
    }
    ele.next = prev.next;
    prev.next = ele;
    this.size ++;
  }

  addElementByValue(value, ele) {
    let prev = this.dummyHead;
    while (prev.next !== null) {
      if (prev.value = value) {
        ele.next = prev.next;
        prev.next = ele.next;
        this.size ++;
        return ;
      } else {
        prev = prev.next;
      }
    }

    throw Error(`没找到value = ${value} 的值`);
  }

  addFirst(ele) {
    this.addElementByIndex(0, ele);
  }

  addLast(ele) {
    this.addElementByIndex(this.size, ele );
  }

  deleteByIndex(index) {
    if (index > this.size || index < 0) {
      throw Error(`不存在的index:${index}`)
    }

    let prev = this.dummyHead;
    while (index --) {
      prev = prev.next
    }

    const tempNode = prev.next;
    prev.next = tempNode.next;
    tempNode.next = null;
    this.size --;
  }

  deleteByValue(value) {
    let prev = this.dummyHead;
    while (prev.next) {
      if (prev.next.value === value) {
        const tempNode = prev.next;
        prev.next = tempNode.next;
        tempNode.next = null;
        this.size --;
        return ;
      } else {
        prev = prev.next;
      }
    }
  }

  deleteFirst() {
    this.deleteByIndex(0);
  }
  deleteLast() {
    this.deleteByIndex(this.size);
  }

  toString() {
    let str = 'Head >>';
    let prev = this.dummyHead;
    while (prev.next) {
      prev = prev.next;
      str += `${prev.value} >> `
    }
    str += 'end';
    console.log(str);
  }
}

const link = new Link();
for(let i = 0; i < 10 ;i ++) {
  link.addLast(new CreateNode(`node${i}`));
  if (i % 3 === 0) {
    link.deleteFirst();
  }
}
link.deleteByValue('node6');
link.deleteByValue(2);
link.toString();

