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

export {pipe,compose,simpel_curry}