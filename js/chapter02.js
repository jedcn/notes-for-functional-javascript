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

function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}

exports.cat = cat;
exports.construct = construct;
exports.mapcat = mapcat;
