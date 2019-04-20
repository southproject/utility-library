/* class Event {
    constructor () {
      // 储存事件的数据结构
      // 为查找迅速， 使用对象（字典）
      this._cache = {}
    }
  
    // 绑定
    on(type, callback) {
      // 为了按类查找方便和节省空间
      // 将同一类型事件放到一个数组中
      // 这里的数组是队列， 遵循先进先出
      // 即新绑定的事件先触发
      let fns = (this._cache[type] = this._cache[type] || [])
      if(fns.indexOf(callback) === -1) {
        fns.push(callback)
      }
      return this
    }
  
    // 触发
    // emit
    trigger(type, data) {
      let fns = this._cache[type]
      if(Array.isArray(fns)) {
        fns.forEach((fn) => {
          fn(data)
        })
      }
      return this
    }
    
    // 解绑
    off (type, callback) {
      let fns = this._cache[type]
      if(Array.isArray(fns)) {
        if(callback) {
          let index = fns.indexOf(callback)
          if(index !== -1) {
            fns.splice(index, 1)
          }
        } else {
          // 全部清空
          fns.length = 0
        }
      }
      return this
    }
  } */

// 观察者
class Observer {
    constructor() {

    }
    update(val) {

    }
}
// 观察者列表
class ObserverList {
    constructor() {
        this.observerList = []
    }
    add(observer) {
        return this.observerList.push(observer);
    }
    remove(observer) {
        this.observerList = this.observerList.filter(ob => ob !== observer);
    }
    count() {
        return this.observerList.length;
    }
    get(index) {
        return this.observerList(index);
    }
}
// 目标
class Subject {
    constructor() {
        this.observers = new ObserverList();
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.remove(observer);
    }
    notify(...args) {
        let obCount = this.observers.count();
        for (let index = 0; index < obCount; index++) {
            this.observers.get(i).update(...args);
        }
    }
}
class PubSub {
    constructor() {
        this.subscribers = {}
    }
    subscribe(type, fn) {
        let listeners = this.subscribers[type] || [];
        listeners.push(fn);
    }
    unsubscribe(type, fn) {
        let listeners = this.subscribers[type];
        if (!listeners || !listeners.length) return;
        this.subscribers[type] = listeners.filter(v => v !== fn);
    }
    publish(type, ...args) {
        let listeners = this.subscribers[type];
        if (!listeners || !listeners.length) return;
        listeners.forEach(fn => fn(...args));        
    }
}

let ob = new PubSub();
ob.subscribe('add', (val) => console.log(val));
ob.publish('add', 1);
/* 
在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。

在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。

观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）
 */