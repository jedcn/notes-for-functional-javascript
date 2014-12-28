var _ = require("underscore");

require("../global.js")

describe("Chapter 2", function() {
  describe("cat", function() {
    it("concatenates arrays", function() {
      var result = cat([1, 2], ['a', 'b']);
      expect(result).toEqual([1, 2, 'a', 'b']);
    })
  });
  describe("construct", function() {
    it("builds adds a single item to the front of an array", function() {
      var result = construct(1, [2, 3, 4]);
      expect(result).toEqual([1, 2, 3, 4]);
    })
  });
  describe("mapcat", function() {
    it("builds a new array by running a function against the contents of an old one. Function must return an []", function() {
      function square(n) {
        return [n * n];
      }
      var result = mapcat(square, [1, 2, 3, 4]);
      expect(result).toEqual([1, 4, 9, 16]);
    })
  });
});
