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

  describe("curry2", function() {
    // Note: The usefulness of currying in JavaScript is limited by
    // the fact that JavaScript allows for variable arguments. Fogus
    // recommends using Partial Application instead. It is generates
    // functions that are "more like" standard JavaScript APIs.
    it("helps make fluent apis", function() {
      var greaterThan = curry2(function(lhs, rhs) { return lhs > rhs; });

      var lessThan = curry2(function(lhs, rhs) { return lhs < rhs; });

      var withinRange = checker(
        validator("arg must be greater than 10", greaterThan(10)),
        validator("arg must be less than 20", lessThan(20)));

      var resultWith11 = withinRange(11);
      expect(resultWith11).toEqual([]);

      var resultWith20 = withinRange(20);
      expect(resultWith20).toEqual(["arg must be less than 20"]);

      var resultWith1 = withinRange(1);
      expect(resultWith1).toEqual(["arg must be greater than 10"]);
    });
  });
});
