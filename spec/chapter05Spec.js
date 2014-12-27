var _ = require("underscore");

require("../global.js")

describe("Chapter 5", function() {
  describe("dispatch", function() {
    it("takes a list of functions and returns a function that invokes them on a target", function() {
      var str = dispatch(invoker('toString', Array.prototype.toString),
                         invoker('toString', String.prototype.toString));
      expect(str("a")).toEqual("a");
      expect(str(_.range(10))).toEqual("0,1,2,3,4,5,6,7,8,9");
    })
  });
});
