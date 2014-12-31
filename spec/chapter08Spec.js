var _ = require("underscore");

require("../global.js")

describe("Chapter 8", function() {
  describe("pipeline", function() {
    it("is undefined if invoked without any arguments", function() {
      expect(pipeline()).toEqual(undefined);
    })

    it("is the single argument if invoked with a single argument", function() {
      var a = {
        'a': 'a'
      }
      expect(pipeline(a)).toBe(a);
      expect(pipeline(42)).toEqual(42);
    })

    it("is the result of invoking a single function on an item if invoked with an item and a function", function() {
      var result = pipeline(42, function(n) { return -n; });
      expect(result).toEqual(-42);
    });

    it("is the result of invoking a series of functions in order if invoked with an item and a series of functions", function() {

      function square(n) {
        return n * n;
      }

      function negate(n) {
        return -n;
      }

      function addOne(n) {
        return n + 1;
      }

      var result = pipeline(10,
                            square,
                            negate,
                            addOne)
      expect(result).toEqual(-99);
    });
  });
});
