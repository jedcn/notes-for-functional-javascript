//
// See: https://github.com/funjs/book-source/blob/master/chapter08.js
//

var _ = require("underscore");
var importAll = require("./importAll.js").importAll;
importAll("chapter02.js");

function pipeline(seed /*, args */) {
  return _.reduce(_.rest(arguments),
                  function(value, fun) {
                    return fun(value);
                  },
                  seed
                 );
}

function lift(answerFun, stateFun) {
  return function(/* args */) {
    var args = _.toArray(arguments);
    return function(state) {
      // answerFun takes state as first argument and then args of
      // returned function
      var appliedArgs = construct(state, args)
      var ans = answerFun.apply(null, appliedArgs);

      // Was a stateFun supplied? If so, pass it the state and use the
      // result it returns. Otherwise use the result of answerFun
      var s = stateFun ? stateFun(state) : ans;

      // Finally, capture the result of answerFun in "answer" and the
      // computed state in "state."
      return { answer: ans, state: s};
    };
  };
}

function actions(acts, done) {
  return function(seed) {
    var init = { values: [], state: seed };
    var intermediate = _.reduce(acts, function(stateObj, action) {
      var result = action(stateObj.state);
      var values = cat(stateObj.values, [result.answer]);
      return { values: values, state: result.state };
    }, init);
    var keep = _.filter(intermediate.values, existy);
    return done(keep, intermediate.state);
  };
}

exports.actions = actions;
exports.lift = lift;
exports.pipeline = pipeline;
