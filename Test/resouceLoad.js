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
  function debounce(fn, delay) { //一段时间内，回调函数只会调用一次，即触发事件的最后一次
    let timer
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
