module.exports = function(app, route) {
    var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
    return function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['authToken'];

        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    res.send(decoded._doc);
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }


    };

        function sendError(message){
            res.send(message);
            next();
        }

};
