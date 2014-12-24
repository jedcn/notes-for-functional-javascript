var chapterFour = require("../js/chapterFour.js");
var _ = require("underscore");
_.each(_.keys(chapterFour), function(name) {
  this[name] = chapterFour[name];
});

describe("Chapter 4", function() {
  describe("finder", function() {
    it("takes a best function, a value function, and a collection and finds the best value", function() {
      result = finder(_.identity, Math.max, [1, 2, 3, 4, 5]);
      expect(result).toEqual(5);
    })
  });

  describe("best", function() {
    it("takes a best-value function and a collection and finds the best value", function() {
      var largestNumber = function(x, y) {
        return x > y;
      }
      result = best(largestNumber, [1, 2, 3, 4, 5])
      expect(result).toEqual(5);
    });
  });

  describe("repeat", function() {
    it("builds an array containing a repeated value", function() {
      result = repeat(2, "Major");
      expect(result.length).toEqual(2);
      expect(result).toEqual(["Major", "Major"]);
    });
  });

  describe("repeatedly", function() {
    it("builds an array containing the result of invoking a function", function() {
      var constant = function() {
        return "constant";
      }
      result = repeatedly(2, constant)
      expect(result.length).toEqual(2);
      expect(result).toEqual(["constant", "constant"])
    });
  });

  describe("iterateUntil", function() {
    it("builds an array with the result of a invoking a function a dynamic number of times", function() {
      var notMoreThan = function(max) {
        return function(n) {
          return n < max;
        }
      }

      var notMorethan2000 = notMoreThan(2000);

      var multiplesOf2 = function(n) {
        return 2 * n;
      }
      result = iterateUntil(multiplesOf2, notMorethan2000, 1);
      expect(result.length).toEqual(10);
      expect(result[9]).toEqual(1024);
    });
  });

  describe("always", function() {
    it("always returns the same value", function() {

      // This is straightforward..
      var twoNumber = always(2);
      expect(twoNumber()).toEqual(2);

      // But this is pretty neat. It's the exact same function!
      var returnSimpleFunction = always(function() {});
      expect(returnSimpleFunction()).toBe(returnSimpleFunction());

      // Fogus references Braithwaite's
      // https://leanpub.com/javascript-allonge here..
    });
  });
});
