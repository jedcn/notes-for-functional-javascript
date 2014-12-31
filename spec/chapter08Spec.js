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

  describe("lift", function() {
    it("is like pipeline, but manages an intermediate object allowing for differing return values", function() {

      function sqr(n) {
        return n * n;
      }
      var mSqr2 = lift(sqr);

      var note = jasmine.createSpy('note');
      var mNote2 = lift(note, _.identity);

      var mNeg2 = lift(function(n) { return -n });

      var negativeSqrAction2 = actions([mSqr2(), mNote2(), mNeg2()], function(_, state) {
        return state;
      });

      expect(negativeSqrAction2(100)).toEqual(-10000);
      expect(note).toHaveBeenCalled();
    });
  });
  describe("push + pop", function() {

    it("represents a sequence of stack events ", function() {
      var timesPushCalled = 0;
      var push = lift(function(stack, e) {
        timesPushCalled++;
        return construct(e, stack)
      });

      var pop = lift(_.first, _.rest);

      var stackAction = actions([push(1),
                                 push(2),
                                 pop()],
                                function(values, state) {
                                  return values;
                                });
      expect(timesPushCalled).toBe(0);
      var result = stackAction([]);

      var theQueueWithJustOne = [1];
      var theQueueWithOneAndTwo = [2, 1];
      var theResultOfPoppingTheTwo = 2;
      expect(result).toEqual([theQueueWithJustOne, theQueueWithOneAndTwo, theResultOfPoppingTheTwo]);
      expect(timesPushCalled).toBe(2);
    });
  });
});
