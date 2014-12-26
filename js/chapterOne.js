//
// See: https://github.com/funjs/book-source/blob/master/chapter01.js
//

function existy(x) {
  return x != null;
};

function truthy(x) {
  return (x !== false) && existy(x);
}

function doWhen(cond, action) {
  if(truthy(cond)) {
    return action();
  } else {
    return undefined;
  }
}

function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  };
};

var _ = require("underscore");

function lameCSV(str) {
  return _.reduce(str.split("\n"), function(table, row) {
    table.push(_.map(row.split(","), function(c) { return c.trim() }));
    return table;
  }, []);
};

var functionsToExport = [doWhen,
                         existy,
                         splat,
                         truthy,
                         lameCSV];

function exportFunction(fun) {
  exports[fun.name] = fun;
}

_.each(functionsToExport, exportFunction);
