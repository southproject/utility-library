//普通情况与是否初次执行（前缘）
//节流：某个时间内只执行一次操作，如果其间有时间触发会被忽略
//防抖：以最后触发的事件为准，等待一段时间后执行，如果等待期间事件触发，延时
//第三种需求：某段时间执行一次操作，以最该时间段内最后被触发的事件为准
// 优化版： 定时器执行时，判断start time 是否向后推迟了，若是，设置延迟定时器
var debounce = (fn, wait) => {
	let timer, startTimeStamp=0;
	let context, args;
 
	let run = (timerInterval)=>{
		timer= setTimeout(()=>{
			let now = (new Date()).getTime();
			let interval=now-startTimeStamp
			if(interval<timerInterval){ // the timer start time has been reset, so the interval is less than timerInterval
				console.log('debounce reset',timerInterval-interval);
				startTimeStamp=now;
				run(timerInterval-interval);  // reset timer for left time 
			}else{
				fn.apply(context,args);
				clearTimeout(timer);
				timer=null;
			}
			
		},timerInterval);
	}
 
	return function(){
		context=this;
		args=arguments;
		let now = (new Date()).getTime();
		startTimeStamp=now;
 
		if(!timer){
			console.log('debounce set',wait);
			run(wait);    // last timer alreay executed, set a new timer
		}
		
	}
 
}


function throttle1(fn, delay) {
    let isExecute = false
    return function (...args) {
      if (isExecute) return
      isExecute = true
      setTimeout(() => {
        fn.apply(this, args)
        isExecute = false
      }, delay)
    }
  }
  function throttle2(fn, delay) { //一段时间内，会每隔一段时间调用一次
    let lastTime = new Date().getTime()
    let currentTime
    return function (...args) {
      currentTime = new Date().getTime()
      if (currentTime - lastTime < delay) return
      lastTime = currentTime
      fn.apply(this, args)
    }
  }
  /// 增加前缘
var throttle3 = (fn, wait, immediate) => {
	let timer, timeStamp=0;
	let context, args;
 
	let run = () => {
		timer=setTimeout(()=>{
			if(!immediate){
				fn.apply(context,args);
			}
			clearTimeout(timer);
			timer=null;
		},wait);
	}
 
	return function () {
		context=this;
		args=arguments;
		if(!timer){
			console.log("throttle, set");
			if(immediate){
				fn.apply(context,args);
			}
			run();
		}else{
			console.log("throttle, ignore");
		}
	}
}


  function debounce(fn, delay) { //一段时间内，回调函数只会调用一次，即触发事件的最后一次
    let timer
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }

  // throttle 和 debouce 函数的底层实现
  var limit = function(func, wait, debounce) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        // 封装函数,用于延迟调用
        var throttler = function() {
            // 只是节流函数的时候,对其timeout进行赋值为null,这样可以设置下一次的setTimtout
            timeout = null;
            func.apply(context, args);
        };
        // 如果debouce是true的话,前一个函数的调用timeout会被清空,不会被执行
        // 就是debounce函数的调用,这个前一个函数的不会执行.下面会重新设定setTimeout用于
        // 执行这一次的调用.
        // 但是如果是throttle函数,则会执行前一个函数的调用,同时下面的setTimeout在
        // 函数没有运行的时候,是无法再次设定的.
        if (debounce) clearTimeout(timeout);
        // 如果debouce是true 或者 timeout 为空的情况下,设置setTimeout
        if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
};

// throttle 节流函数
_.throttle = function(func, wait) {
    return limit(func, wait, false);
};

// debouce 多次调用,只执行最后一次.
_.debounce = function(func, wait) {
    return limit(func, wait, true);
};

// Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
_.throttle = function(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function(func, wait, immediate) {
  var timeout, result;

  var later = function(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArguments(function(args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = _.delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

// Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

