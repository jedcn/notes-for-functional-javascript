// These functions are defined on page 19 and 20 as part of "Getting
// Started with Functional Programming"
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

function importAll(moduleName) {
  var _ = require("underscore");
  var module = require(moduleName);
  _.each(_.keys(module), function(name) {
    this[name] = module[name];
  });
}

exports.existy = existy;
exports.truthy = truthy;
exports.doWhen = doWhen;
exports.importAll = importAll;
