function clean(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

function problem(res) {
  return function (status, title, type, detail, instance) {
    return function () {
      res.setHeader('Content-Type', 'application/problem+json');
      res.status(status);
      const result = {
        title,
        type,
        status,
        detail,
        instance
      };
      clean(result);
      res.send(result);
    };
  };
}

function init() {
  return function (req, res, next) {
    const problemRes = problem(res);
    res.problem = {
      new: problemRes,

      // 4xx
      badRequest: problemRes(400, 'Bad request'),
      unauthorized: problemRes(401, 'Unauthorized'),
      paymentRequired: problemRes(402, 'Payment required'),
      forbidden: problemRes(403, 'Forbidden'),
      notFound: problemRes(404, 'Not found'),
      methodNotAllowed: problemRes(405, 'Method not allowed'),
      notAcceptable: problemRes(406, 'Not acceptable'),
      proxyAuthRequired: problemRes(407, 'Proxy auth required'),
      clientTimeout: problemRes(408, 'Client timeout'),
      conflict: problemRes(409, 'Conflict'),
      resourceGone: problemRes(410, 'Resource gone'),
      lengthRequired: problemRes(411, 'Length required'),
      preconditionFailed: problemRes(412, 'Preconditioning failed'),
      entityTooLarge: problemRes(413, 'Entity too large'),
      uriTooLong: problemRes(414, 'Uri too long'),
      unsupportedMediaType: problemRes(415, 'Unsupported media type'),
      rangeNotSatisfiable: problemRes(416, 'Range not satisfiable'),
      expectationFailed: problemRes(417, 'Expectation failed'),
      teapot: problemRes(418, 'Teapot'),
      badData: problemRes(422, 'Bad data'),
      locked: problemRes(423, 'Locked'),
      failedDependency: problemRes(424, 'Failed dependency'),
      preconditionRequired: problemRes(428, 'Precondition required'),
      tooManyRequests: problemRes(429, 'Too many requests'),
      illegal: problemRes(451, 'Illegal'),

      //5xx
      badImplementation: problemRes(500, 'Bad implementation'),
      notImplemented: problemRes(501, 'Not implemented'),
      badGateway: problemRes(502, 'Bad gateway'),
      serverUnavailable: problemRes(503, 'Server unavailable'),
      gatewayTimeout: problemRes(504, 'Gateway timeout'),
    };
    next();
  };
}

module.exports = init;