module.exports = function(app, route) {
    var jwt    = require('jsonwebtoken');
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['authtoken'];
        if (token) {

            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    var entityName = "user";
                    var schema = app.models[entityName];
                    var model = mongoose.model(entityName, schema);
                    model.findOne({
                        userEmail: decoded._doc.userEmail
                    }, function(err, user) {

                        if (err) throw err;

                        if (!user) {
                            res.json({ success: false, message: 'Authentication failed. User not found.' });
                        } else if (user) {
                            res.json({
                                success: true,
                                user: user
                            });
                        }

                    });
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
