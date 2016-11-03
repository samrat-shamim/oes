module.exports = function(app, route) {
    var jwt    = require('jsonwebtoken');
    return function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['authtoken'];
        if (token) {

            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    res.send(decoded._doc);
                    next();
                }
            });

        } else {
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
