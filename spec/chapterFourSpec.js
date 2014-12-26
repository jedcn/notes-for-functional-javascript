var _ = require("underscore");

require("../js/core.js")
  .importAll("../js/chapterFour.js");

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

  describe("invoker", function() {
    it("invokes a named method on various targets", function() {
      var rev = invoker('reverse', Array.prototype.reverse);
      expect(_.map([[1, 2, 3]], rev)).toEqual([[3, 2, 1]]);
    });
  });

  describe("fnull", function() {
    it("creates a version of a function coupled with default parameters", function() {
      var nums = [ 1, 2, 3, null, 5 ];
      var badResult = _.reduce(nums, function(total, n) {
        return total * n;
      })
      expect(badResult).toEqual(0);

      var safeMultiply = fnull(function(total, n) { return total * n; }, 1, 1);

      var goodResult = _.reduce(nums, safeMultiply);
      expect(goodResult).toEqual(30);
    });
  });

  describe("checker", function() {
    it("works with a series of validators to build up a composite check", function() {

      var alwaysPasses = checker(always(true), always(true));
      expect(alwaysPasses({})).toEqual([]);

      var fails = always(false);
      fails.message = "It's no good!";
      var alwaysFails = checker(fails);
      expect(alwaysFails({})).toEqual(["It's no good!"]);
    });
  });

  describe("validator", function() {
    it("is a function for building validators that work with checker", function() {
      var gonnaFail = checker(validator("ZOMG!", always(false)));
      expect(gonnaFail(100)).toEqual(["ZOMG!"]);
    });
  });

  describe("checkCommand", function() {
    it("is a combination of validators that verify a command object", function() {

      // Presuming a valid command object is an object with these
      // properties:
      var validCommand = {
        message: "Hi!",
        type: "display",
        from: "https://localhost:8080/node/frob"
      };
      var result = checkCommand(validCommand);
      expect(result.length).toBe(0);

      result = checkCommand(32);
      expect(result).toEqual(["Must be a map", "Must have values for keys: message type"]);

      result = checkCommand({});
      expect(result).toEqual(["Must have values for keys: message type"]);

      result = checkCommand({
        type: "alert"
      });
      expect(result).toEqual(["Must have values for keys: message type"]);
    });
  });

});
