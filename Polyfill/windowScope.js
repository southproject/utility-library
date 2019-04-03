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


  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }