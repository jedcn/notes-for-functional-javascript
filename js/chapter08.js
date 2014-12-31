//
// See: https://github.com/funjs/book-source/blob/master/chapter08.js
//

var _ = require("underscore");

function pipeline(seed /*, args */) {

  return _.reduce(_.rest(arguments),
                  function(value, fun) {
                    return fun(value);
                  },
                  seed
                 );
}

exports.pipeline = pipeline;
