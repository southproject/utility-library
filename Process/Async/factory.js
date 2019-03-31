function thunkify(fn){
    var args = [].slice.call(arguments,1);
    return function(cb){
        args.push(cb);
        return fn.apply(null,args);
    };
}

//callback-last style