var objToString = Object.prototype.toString;

var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var nativeReduce = arrayProto.reduce;

//pipe

const pipe = (...fns) => (x) => fns.nativeReduce((f,g) => g(f),x)

//compose

const compose = (...fns) => fns.nativeReduce((f,g) => {(...args) => g(f(...args))})
//this is a more flexible method could exchange f and g 

//curry
const simple_curry = function(func,args) {
    var length = func.length;
   // var args = nativeSlice.call(arguments, 1);
    args = args||[];
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return newArgs.length < length?simple_curry.call(this,func,newArgs):func.apply(this,newArgs)
    };
}


//everyNth
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

//digitize
const digitize = n => [...`${n}`].map(i => parseInt(i));

//negate
const negate = func => (...args) => !func(...args);

const foldl = {};


const mapp = (arrs,fn)=>arrs.reduce((acc,x) => (acc.concat([fn(x)])),[])
//[].contact(fn(a)) Function.prototype.concat.apply(acc,fn(x))
//cautious about return value of push、map、concat
export {pipe,compose,simple_curry,mapp}


const uncurry = (fn, n = 1) => (...args) => {
    const next = acc => args => args.reduce((x, y) => x(y), acc);
    if (n > args.length) throw new RangeError('Arguments too few!');
    return next(fn)(args.slice(0, n));
  };


  const add = x => y => z => x + y + z;
  const uncurriedAdd = uncurry(add, 3);
  uncurriedAdd(1, 2, 3); // 6


  const deepMapKeys = (obj, f) =>
  Array.isArray(obj)
    ? obj.map(val => deepMapKeys(val, f))
    : typeof obj === 'object'
      ? Object.keys(obj).reduce((acc, current) => {
        const val = obj[current];
        acc[f(current)] =
            val !== null && typeof val === 'object' ? deepMapKeys(val, f) : (acc[f(current)] = val);
        return acc;
      }, {})
      : obj;

      const obj = {
        foo: '1',
        nested: {
          child: {
            withArray: [
              {
                grandChild: ['hello']
              }
            ]
          }
        }
      };
      const upperKeysObj = deepMapKeys(obj, key => key.toUpperCase());
      /*
      {
        "FOO":"1",
        "NESTED":{
          "CHILD":{
            "WITHARRAY":[
              {
                "GRANDCHILD":[ 'hello' ]
              }
            ]
          }
        }
      }
      */
      const reduceWhich = (arr, comparator = (a, b) => a - b) =>
      arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));

      reduceWhich([1, 3, 2]); // 1
      reduceWhich([1, 3, 2], (a, b) => b - a); // 3
      reduceWhich(
        [{ name: 'Tom', age: 12 }, { name: 'Jack', age: 18 }, { name: 'Lucy', age: 9 }],
        (a, b) => a.age - b.age
      ); // {name: "Lucy", age: 9}

      const permutations = arr => {
        if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
        return arr.reduce(
          (acc, item, i) =>
            acc.concat(
              permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [item, ...val])
            ),
          []
        );
      };

      permutations([1, 33, 5]); // [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]