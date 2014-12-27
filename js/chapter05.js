//
// See: https://github.com/funjs/book-source/blob/master/chapter05.js
//

var importAll = require("./importAll.js").importAll;
importAll("chapter01.js");
importAll("chapter02.js");
var _ = require("underscore");

function dispatch(/* funs */) {
  var funs = _.toArray(arguments);
  var size = funs.length;
  return function(target /*, args */) {
    var ret = undefined;
    var args = _.rest(arguments);
    for(var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, construct(target, args));
      if (existy(ret)) {
        return ret;
      }
    }
    return ret;
  };
}

function curry2(fun) {
  return function(secondArg) {
    return function(firstArg) {
      return fun(firstArg, secondArg);
    };
  };
}

exports.dispatch = dispatch;
exports.curry2 = curry2;
