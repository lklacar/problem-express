function clean(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (var i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

function sendRequest(res, args) {
  res.setHeader('Content-Type', 'application/problem+json');
  res.status(args.statusCode);
  const result = {
    ...args
  };
  clean(result);
  res.send(result);
};

function registerProblem(key, handler, res) {
  const problem = handler;

  res.problem[key] = function (args) {
    const problemResult = problem(args);
    sendRequest(res, problemResult);
  };
}

function init(additionalProbems) {
  return function (req, res, next) {
    res.problem = {};
    Object.keys(additionalProbems).forEach(problemKey => {
      const problem = additionalProbems[problemKey];
      registerProblem(problemKey, problem, res);
    });
    next();
  };
}

module.exports = init;