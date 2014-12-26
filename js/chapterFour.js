require("./core.js")
  .importAll("./core.js");

var _ = require('underscore');

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

var functionsToExport = [finder,
                         best,
                         repeat,
                         repeatedly,
                         iterateUntil,
                         always,
                         invoker,
                         fnull];

function exportFunction(fun) {
  exports[fun.name] = fun;
}

_.each(functionsToExport, exportFunction);
