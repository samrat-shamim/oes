var jwt = require('jsonwebtoken');
var config = require('../config');
module.exports = function(token) {
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return {
                    success: false,
                    text: "Failed to decode token"
                };
            } else {
                return {
                    success: true,
                    data: decoded
                }
            }
        });

    } else {
       return {
           success: false,
           text: "No token provided"
       }
    }
};