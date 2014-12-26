var index = require("./index.js");
for (var fun in index) {
  global[fun] = index[fun];
}
