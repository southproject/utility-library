(function() {
    setTimeout(function(arg1) {
      if (arg1 === 'test') {
        // feature test is passed, no need for polyfill
        return;
      }
      var __nativeST__ = window.setTimeout;
      window.setTimeout = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeST__(vCallback instanceof Function ? function() {
          vCallback.apply(null, aArgs);
        } : vCallback, nDelay);
      };
    }, 0, 'test');
  
    var interval = setInterval(function(arg1) {
      clearInterval(interval);
      if (arg1 === 'test') {
        // feature test is passed, no need for polyfill
        return;
      }
      var __nativeSI__ = window.setInterval;
      window.setInterval = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeSI__(vCallback instanceof Function ? function() {
          vCallback.apply(null, aArgs);
        } : vCallback, nDelay);
      };
    }, 0, 'test');
  }())