var _ = require("underscore");
var fs = require("fs");

function exportAllInside(modulePath) {
  var module = require(modulePath);
  _.each(_.functions(module), function(funName) {
    exports[funName] = module[funName];
  });
}

function requireAndExportFilesIn(dir) {
  var files = fs.readdirSync(dir);
  _.each(files, function(file) {
    exportAllInside(dir + "/" + file);
  });
}

requireAndExportFilesIn(__dirname + "/js");
