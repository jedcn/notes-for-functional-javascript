//
// See: https://github.com/funjs/book-source/blob/master/chapter02.js
//

var existy = require("./chapterOne.js").existy;
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
