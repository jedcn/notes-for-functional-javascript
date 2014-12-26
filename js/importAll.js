var _ = require("underscore");

function importAll(moduleName) {
  var module = require("./" + moduleName);
  _.each(_.keys(module), function(name) {
    global[name] = module[name];
  });
}

exports.importAll = importAll;
