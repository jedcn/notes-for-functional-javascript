//
// See: https://github.com/funjs/book-source/blob/master/chapter02.js
//

require("./importAll.js").importAll("chapter01.js");
var _ = require("underscore");

function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  } else {
    return [];
  }
}

exports.cat = cat;
