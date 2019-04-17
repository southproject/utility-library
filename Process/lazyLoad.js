/* const over = Symbol();

const isOver = function (_over) {
  return _over === over;
}

const range = function (from, to) {
    let i = from;
    return function () {
      if (i < to) {
        i++
        console.log('range\t', i);
        return i
      }
      return over;
    }
  }

const map = function (flow, transform) {
    return function () {
      const data = flow();
      console.log('map\t', data);
      return isOver(data) ? data : transform(data);
    }
  }

  const filter = function (flow, condition) {
    return function () {
      while(true) {
        const data = flow();
        if (isOver(data)) {
          return data;
        }
        if(condition(data)) {
          console.log('filter\t', data);
          return data;
        }
      }
    }
  }

  const stop = function (flow, condition) {
    let _stop = false;
    return function () {
      if (_stop) return over;
      const data = flow();
      if (isOver(data)) {
        return data;
      }
      _stop = condition(data);
      return data;
    }
  }
  
  const take = function(flow, num) {
    let i = 0;
    return stop(flow, (data) => {
      return ++i >= num;
    });
  }

  const join = function (flow) {
    const array = [];
    while(true) {
      const data = flow();
      if (isOver(data)) {
        break;
      }
      array.push(data);
    }
    return array;
  }

  const nums = join(take(filter(map(range(0, 20), n => n * 10), n => n % 3 === 0), 2));
  console.log(nums); */
  /* const range = function* (from, to) {
    for(let i = from; i < to; i++) {
      console.log('range\t', i);
      yield i;
    }
  }
  
  const map = function* (flow, transform) {
    for(const data of flow) {
      console.log('map\t', data);
      yield(transform(data));
    }
  }
  
  const filter = function* (flow, condition) {
    for(const data of flow) {
      console.log('filter\t', data);
      if (condition(data)) {
        yield data; //有条件的yield促使下级条件执行
      }
    }
  }
  
  const stop = function* (flow, condition) {
    for(const data of flow) {
      yield data;
      if (condition(data)) {
        break;
      }
    }
  }
  
  const take = function (flow, number) {
    let count = 0;
    const _filter = function (data) {
      count ++
      return count >= number;
    }
    return stop(flow, _filter);
  }
  
   for(const n of take(filter(map(range(0, 10000), n => n * 10), n => n % 3 === 0), 2)) {
     console.log('num:\t', n, '\n');
   } */

//非生成器实现没有太大价值：采取每次执行下游函数时，上游函数的执行部分（flow()）卡在下游函数的执行过程中，导致回溯到源头实现了所谓的
//“直到执行时才顺序”lazyFn而不是“执行时先得出上游函数值作为输入”，扩展性不强


/* const Lazy = iterator => {
    const next = iterator.next.bind(iterator)
      const map = () => {}
      const filter = () => {}
      const takeWhile = () => {}
      return {
        next,
        map,
        filter,
        takeWhile,
      }
    }
      const map = f => {
        const modifiedNext = () => {
          const item = next()
          const mappedValue = f(item.value)
          return {
            value: mappedValue,
            done: item.done,
          }
        }
        const newIter = { ...iterator, next: modifiedNext }
        return Lazy(newIter)
      }
      const filter = predicate => {
        const modifiedNext = () => {
          while (true) {
            const item = next()
            if (predicate(item.value)) {
              return item
            }
          }
        }
        const newIter = { ...iterator, next: modifiedNext }
        return Lazy(newIter)
      }

      const takeWhile = predicate => {
        const result = []
        let value = next().value
        while (predicate(value)) {
          result.push(value)
          value = next().value
        }
        return result
      }
 */
      const Lazy = iterator => {
        const next = iterator.next.bind(iterator)
      
        const map = f => {
          const modifiedNext = () => {
            const item = next()
            const mappedValue = f(item.value)
            return {
              value: mappedValue,
              done: item.done,
            }
          }
          const newIter = { /* ...iterator, */ next: modifiedNext }
          return Lazy(newIter)
        }
      
        const filter = predicate => {
          const modifiedNext = () => {
            while (true) {
              const item = next()
              if (predicate(item.value)) {
                return item
              }
            }
          }
          const newIter = { /* ...iterator, */ next: modifiedNext }
          return Lazy(newIter)
        }
      
        const takeWhile = predicate => {
          const result = []
          let value = next().value
          while (predicate(value)) {
            result.push(value)
            value = next().value
          }
          return result
        }
      
        return Object.freeze({
          map,
          filter,
          takeWhile,
          next,
        })
      }
      
      const numbers = function*() {
        let i = 1
        while (true) {
          yield i++
        }
      }

      console.log(Lazy(numbers())
      .map(x => x ** 2)
      .filter(x => x % 2 === 1)
      .takeWhile(x => x < 10000)
      .reduce((x, y) => x + y))
    // => 16650
    console.log(numbers().next())
//链式写法固然容易理解一个值依次执行了各项操作，但是能够不停调用next也是依靠闭包（上游中的函数modifynext传给下游）
//take 和 takeWhile则是水阀，不断调用next取值
//class implement

/* class Lazy {
  constructor(iterable, callback) {
      this.iterable = iterable
      this.callback = callback
  }

  filter(callback) {
      return new LazyFilter(this, callback)
  }

  map(callback) {
      return new LazyMap(this, callback)
  }

  next() {
      return this.iterable.next()
  }

  take(n) {
      const values = []
      for (let i=0; i<n; i++) {
          values.push(this.next().value)
      }

      return values
  }
}  

class LazyFilter extends Lazy {
  next() {
      while (true) {
          const item = this.iterable.next()

          if (this.callback(item.value)) {
              return item
          }
      }
  }
}

class LazyMap extends Lazy {
  next() {
      const item = this.iterable.next()

      const mappedValue = this.callback(item.value)
      return { value: mappedValue, done: item.done }
  }
}

let result = new Lazy(numbers()).map(num=>num*3).take(4).reduce((a,v) => a + v)
console.log('result = ' + result)

result = new Lazy(numbers()).filter(n=>n%2==0).take(4).reduce((a,v) => a + v)
console.log('result = ' + result)

result = new Lazy(numbers()).filter(n=>n%2==0).map(num=>num**2).take(4).reduce((a,v) => a + v)
console.log('result = ' + result)

result = new Lazy(numbers()).map(num=>num**2).filter(n=>n%2==0).take(4).reduce((a,v) => a + v)
console.log('result = ' + result) */