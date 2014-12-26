require("../global.js")

describe('Chapter 1', function() {
  describe('splat', function() {
    it('enhances a function to work with an array of elements', function() {
      var input = [1,2];

      var addTwoArgs = function(x, y) { return x + y };

      // End up with String concatenation when passing an array to
      // addTwoArgs
      expect(addTwoArgs(input)).toEqual('1,2undefined');

      // But, if you splat addTwoArgs, the result (addArrayElements)
      // can now handle an array with two items:
      var addArrayElements = splat(addTwoArgs);
      expect(addArrayElements(input)).toEqual(3);

      // You can pass an array with three items, but the third item
      // will be discarded because the underlying function
      // (addTwoArgs) can only deal with two items:
      expect(addArrayElements([1,2,3])).toEqual(3);
    })
  });

  describe('lameCSV', function() {
    it('parses CSV into an array of arrays', function() {

      var peopleTable = lameCSV("name,age,hair\nMerble,35,red\nBob,64,blonde");

      expect(peopleTable.length).toEqual(3);

      var firstRow = peopleTable[0],
          secondRow = peopleTable[1],
          thirdRow = peopleTable[2];

      expect(firstRow).toEqual(["name", "age", "hair"]);
      expect(secondRow).toEqual(["Merble", "35", "red"]);
      expect(thirdRow).toEqual(["Bob", "64", "blonde"]);
    })
  });
});
