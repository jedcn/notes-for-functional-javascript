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

  describe("conditional1", function() {
    it("provides a mechanism for chaining pre-conditions before a function invocation", function() {
      var sqrPre = condition1(
        validator("arg must not be zero", complement(zero)),
        validator("arg must be a number", _.isNumber));
      expect(function() {
        sqrPre(_.identity, 0);
      }).toThrowError("arg must not be zero");
      expect(function() {
        sqrPre(_.identity, 'a');
      }).toThrowError("arg must be a number");
    });

    describe("combined with partial1", function() {
      it("allows you to couple pre-conditions and invocation ", function() {
        var sqrPre = condition1(
          validator("arg must not be zero", complement(zero)),
          validator("arg must be a number", _.isNumber));
        function uncheckedSqr(n) {
          return n * n;
        }
        var checkedSqr = partial1(sqrPre, uncheckedSqr);
        expect(checkedSqr(10)).toEqual(100);
      });
    });
  });

  describe("de-coupled pre and post condition checks around a function", function() {
    it("works with _.compose and partial application (partial1)", function() {

      var preConditions = condition1(
        validator("arg must not be zero", complement(zero)),
        validator("arg must be a number", _.isNumber));

      function square(n) {
        return n * n;
      }

      var checkPreConditionsThenSquare = partial1(preConditions, square);

      function greaterThan(rhs) {
        return function(lhs) {
          return lhs > rhs;
        }
      }

      var postConditions = condition1(
        validator("result should be a number", _.isNumber),
        validator("result should not be zero", complement(zero)),
        validator("result should be positive", greaterThan(0)));

      var checkPreConditionsThenSquareThenCheckPostConditions =
          _.compose(partial(postConditions, _.identity), checkPreConditionsThenSquare);

      var result = checkPreConditionsThenSquareThenCheckPostConditions(10);
      expect(result).toEqual(100);

      expect(function() {
        // NaN is a number.. and it's not zero.. so it can get by the
        // preConditions.
        checkPreConditionsThenSquareThenCheckPostConditions(NaN);
      }).toThrowError('result should be positive');
    });
  });
});
