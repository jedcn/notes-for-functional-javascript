var _ = require("underscore");

require("../global.js")

describe("Chapter 6", function() {

  describe("andify", function() {
    it("can be implemented with _'s _every", function() {
      function andify(/* predicates */) {
        var predicates = _.toArray(arguments);
        function allPredicatesAreTrue(item) {
          for(var i = 0; i < predicates.length; i++) {
            if (! predicates[i](item)) {
              return false;
            }
          }
          return true;
        }
        return function(/* args */) {
          return _.every(_.toArray(arguments), allPredicatesAreTrue);
        };
      }

      var evenNums = andify(_.isNumber, isEven);
      expect(evenNums(1,2)).toBe(false);
      expect(evenNums(2,4,6,8)).toBe(true);
      expect(evenNums(2,4,6,8,9)).toBe(false);
    })
  });

  describe("orify", function() {
    it("can be implemented with _'s some", function() {
      function orify(/* predicates */) {
        var predicates = _.toArray(arguments);
        function anyPredicateIsTrue(item) {
          for(var i = 0; i < predicates.length; i++) {
            if (predicates[i](item)) {
              return true;
            }
          }
          return false;
        }
        return function(/* args */) {
          return _.some(_.toArray(arguments), anyPredicateIsTrue);
        };
      }
      var zeroOrOdd = orify(isOdd, zero);
      expect(zeroOrOdd()).toEqual(false);
      expect(zeroOrOdd(0,2,4,6)).toEqual(true);
      expect(zeroOrOdd(2,4,6,1)).toEqual(true);
      expect(zeroOrOdd(2,4,6)).toEqual(false);
    })
  });
});
