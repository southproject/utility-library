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
  const range = function* (from, to) {
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
        yield data;
      }
    }
  }
  
  const stop = function*(flow, condition) {
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
   }