function init() {
    return function (req, res) {
        req.problem = function (title, type, status, detail, instance) {
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
}


module.exports = init;