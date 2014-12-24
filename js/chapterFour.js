
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

function exportFunction(fun) {
  exports[fun.name] = fun;
}

function always(value) {
  return function() {
    return value;
  }
}

var functionsToExport = [finder,
                         best,
                         repeat,
                         repeatedly,
                         iterateUntil,
                         always];

_.each(functionsToExport, exportFunction);
