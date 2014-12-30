//
// See: https://github.com/funjs/book-source/blob/master/chapter03.js
//

require("./importAll.js").importAll("chapter02.js");

function isEven(n) {
  return (n%2) === 0
}

var isOdd = complement(isEven);

exports.isEven = isEven;
exports.isOdd = isOdd;
