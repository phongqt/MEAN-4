var jwt = require('jsonwebtoken');
var checkAuthentication = function checkAuthentication(request, response, next) {
    let path = request.path;
    let token = request.headers['authorization'];
    if (token) {
        jwt.verify(token, "superSecret", function (err, decode) {
            if (err) {
                return response.status(401).send({ success: false, message: 'Failed to authenticate token.' });
            }

            request.decode = decode;
            return next();
        });
    } else {
        return response.status(403).send({
            success: false,
            message: 'No token provided.',
            data: null
        })
    }
}

module.exports = {
    checkAuthentication
}