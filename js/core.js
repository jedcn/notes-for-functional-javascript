var _ = require("underscore");

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

// This function is defined on page 39 as part of "Applicative
// Programming"
function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  } else {
    return [];
  }
}

// This is a function that I declared to help me locally import all
// functions exposed in a module
function importAll(moduleName) {
  var module = require(moduleName);
  _.each(_.keys(module), function(name) {
    this[name] = module[name];
  });
}

exports.existy = existy;
exports.truthy = truthy;
exports.doWhen = doWhen;
exports.cat = cat;
exports.importAll = importAll;
