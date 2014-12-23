function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  };
};

exports.splat = splat;

var _ = require('underscore');

function lameCSV(str) {
  return _.reduce(str.split("\n"), function(table, row) {
    table.push(_.map(row.split(","), function(c) { return c.trim() }));
    return table;
  }, []);
};

exports.lameCSV = lameCSV;
