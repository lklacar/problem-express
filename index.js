function problem(res) {
    return function (title, type, status, detail, instance) {
        res.setHeader("Content-Type", "application/problem+json");
        res.send({
            title,
            type,
            status,
            detail,
            instance
        })
    }
}

function init() {
    return function (req, res) {
        const problemRes = problem(res);
        req.problem = {
            new: problemRes,

            // 4xx
            badRequest: problemRes("Bad request"),
            unauthorized: problemRes('Unauthorized'),
            paymentRequired: problemRes('Payment required'),
            forbidden: problemRes('Forbidden'),
            notFound: problemRes('Not found'),
            methodNotAllowed: problemRes('Method not allowed'),
            notAcceptable: problemRes('Not acceptable'),
            proxyAuthRequired: problemRes('Proxy auth required'),
            clientTimeout: problemRes('Client timeout'),
            conflict: problemRes('Conflict'),
            resourceGone: problemRes('Resource gone'),
            lengthRequired: problemRes('Length required'),
            preconditionFailed: problemRes('Preconditioning failed'),
            entityTooLarge: problemRes('Entity too large'),
            uriTooLong: problemRes('Uri too long'),
            unsupportedMediaType: problemRes('Unsupported media type'),
            rangeNotSatisfiable: problemRes('Range not satisfiable'),
            expectationFailed: problemRes('Expectation failed'),
            teapot: problemRes('Teapot'),
            badData: problemRes('Bad data'),
            locked: problemRes('Locked'),
            failedDependency: problemRes('Failed dependency'),
            preconditionRequired: problemRes('Precondition required'),
            tooManyRequests: problemRes('Too many requires'),
            illegal: problemRes('Illegal'),

            //5xx
            badImplementation: problemRes('Bad implementation'),
            notImplemented: problemRes('Not implemented'),
            badGateway: problemRes('Bad gateway'),
            serverUnavailable: problemRes('Server unavailable'),
            gatewayTimeout: problemRes('Gateway timeout'),
        }
    }
}


module.exports = init;