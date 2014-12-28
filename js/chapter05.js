//
// See: https://github.com/funjs/book-source/blob/master/chapter05.js
//

var importAll = require("./importAll.js").importAll;
importAll("chapter01.js");
importAll("chapter02.js");
importAll("chapter04.js");
var _ = require("underscore");

function dispatch(/* funs */) {
  var funs = _.toArray(arguments);
  var size = funs.length;
  return function(target /*, args */) {
    var ret = undefined;
    var args = _.rest(arguments);
    for(var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, construct(target, args));
      if (existy(ret)) {
        return ret;
      }
    }
    return ret;
  };
}

function curry2(fun) {
  return function(secondArg) {
    return function(firstArg) {
      return fun(firstArg, secondArg);
    };
  };
}

var zero = validator("arg must be zero", function(n) {
  return 0 === n;
});

function condition1(/* validators */) {
  var validators = _.toArray(arguments);
  return function(fun, arg) {

    // So-- in this part we're running all of the validators against
    // the first argument.
    //
    // You *could* think of these validators as asserting that a
    // pre-condition is met for the function passed in (fun)
    var errors = mapcat(function(isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);

    // In this case, it's expected that a validator returns [] if all
    // is good, else the validator has a property named message that
    // indicates what it tests for)

    // With a pre-condition mindset, if you combine the code above
    // with the if statement below, then they team up to throw an
    // Error if a pre-condition is unmet.
    if (!_.isEmpty(errors)) {
      throw new Error(errors.join(', '));
    }

    // And finally-- if all preconditions are met-- we run the
    // function with just a single argument.
    return fun(arg);
  };
}

// Creates a function that always passes arg1 as the first argument to
// fun.
function partial1(fun, arg1) {
  return function(/* args */) {
    var args = construct(arg1, arguments);
    return fun.apply(null, args);
  };
}

function partial(fun /*, pargs */) {
  var pargs = _.rest(arguments);

  return function(/* arguments */) {
    var args = cat(pargs, _.toArray(arguments));
    return fun.apply(fun, args);
  };
}

exports.condition1 = condition1;
exports.curry2 = curry2;
exports.dispatch = dispatch;
exports.partial = partial;
exports.partial1 = partial1;
exports.zero = zero;
