var restful = require('node-restful');
var jwt = require('jsonwebtoken');
var config = require('../config');
module.exports = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['authtoken'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
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