//
// See: https://github.com/funjs/book-source/blob/master/chapter04.js
//

var importAll = require("./core.js").importAll;
importAll("./chapter01.js");
importAll("./chapter02.js");


var _ = require("underscore");

function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, function(best, current) {
    var bestValue = valueFun(best);
    var currentValue = valueFun(current);
    return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
  })
}

function best(bestAndValue, coll) {
  return _.reduce(coll, function(x, y) {
    return bestAndValue(x, y) ? x : y;
  });
}

function repeat(times, value) {
  return _.map(_.range(times), function() {
    return value;
  })
}

function repeatedly(times, fun) {
  return _.map(_.range(times), fun);
}

function iterateUntil(fun, check, init) {
  var ret = [];
  var result = fun(init);
  while (check(result)) {
    ret.push(result);
    result = fun(result);
  }
  return ret;
}

function always(value) {
  return function() {
    return value;
  }
}

function invoker(name, method) {
  return function(target /* args ... */) {
    if (!existy(target)) {
      fail("Must provide a target");
    }
    var targetMethod = target[name];
    var args = _.rest(arguments);
    return doWhen((existy(targetMethod) && method === targetMethod), function() {
      return targetMethod.apply(target, args);
    });
  };
}

function fnull(fun /*, defaults */) {
  var defaults = _.rest(arguments);
  return function(/* args */) {
    var args = _.map(arguments, function(e, i) {
      return existy(e) ? e : defaults[i];
    });
    return fun.apply(null, args);
  };
}

function checker(/* validators */) {
  var validators = _.toArray(arguments);
  return function(obj) {
    return _.reduce(validators, function(errs, check) {
      if (check(obj)) {
        return errs;
      } else {
        return _.chain(errs).push(check.message).value();
      }
    }, []);
  }
}

function validator(message, fun) {
  var f = function(/* args */) {
    return fun.apply(fun, arguments);
  };
  f['message'] = message;
  return f;
}

function aMap(obj) {
  return _.isObject(obj);
}

function hasKeys() {
  var keys = _.toArray(arguments);
  var fun = function(obj) {
    return _.every(keys, function(k) {
      return _.has(obj, k);
    });
  };
  fun.message = cat(["Must have values for keys:"], keys).join(" ");
  return fun;
}

// This is what Fogus calls a "fluent api:" reading the method names
// and their arguments is a sensible (albeit rough) sentence.
//
// In particular, he calls out hasKeys as "beautifully fluent."
exports.checkCommand = checker(validator("Must be a map", aMap),
                               hasKeys("message", "type"));

var functionsToExport = [finder,
                         best,
                         repeat,
                         repeatedly,
                         iterateUntil,
                         always,
                         invoker,
                         fnull,
                         checker,
                         validator];

function exportFunction(fun) {
  exports[fun.name] = fun;
}

_.each(functionsToExport, exportFunction);
