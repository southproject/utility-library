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
const simpel_curry = function(func,args) {
    var length = func.length;
   // var args = nativeSlice.call(arguments, 1);
    args = args||[];
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        return newArgs.length < length?curry.call(this,func,newArgs):func.apply(this,newArgs)
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
export {pipe,compose,simpel_curry,mapp}


const uncurry = (fn, n = 1) => (...args) => {
    const next = acc => args => args.reduce((x, y) => x(y), acc);
    if (n > args.length) throw new RangeError('Arguments too few!');
    return next(fn)(args.slice(0, n));
  };


  const add = x => y => z => x + y + z;
  const uncurriedAdd = uncurry(add, 3);
  uncurriedAdd(1, 2, 3); // 6