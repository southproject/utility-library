;(function (name,definition){
    var hasDefine = typeof define === 'function',
        hasExports = typeof module !=='undefined'&&module.exports;
    if(hasDefine){
        //AMD or CMD
        define(definition);
    }
    else if(hasExports){
        //Node cjs
        module.exports = definition();
    }
    else{
        //global
        this[name]=definition();
    }
})("hello",function(){
    var hello = function(){};
    return hello;
});