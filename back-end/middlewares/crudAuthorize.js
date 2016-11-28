var restful = require('node-restful');
var jwt = require('jsonwebtoken');
var config = require('../config');
var fs = require('fs');
module.exports = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['authtoken'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                if(authorizeByRole(req.url,decoded._doc.roles[0], req.body.entityName)){
                    next();
                } else{
                    return res.status(403).send({
                        success: false,
                        message: 'Unauthorized request'
                    });
                }

            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

    var actionPermissionMap = {
        "/getMany": "read",
        "/getById": "read",
        "/insert": "modify",
        "/update": "modify",
        "/deleteMany": "modify",
        "/deleteById": "modify",
        "/getConnection": "read",
        "/connect": "modify"
    }
    function authorizeByRole(action,role,model){
        var data;
         try{
             data = fs.readFileSync('./configs/models/' + model + '.json');
         } catch (err){
             if (err.code === 'ENOENT') {
                 console.log( model + ".json file not found!");
             } else {
                 console.log("Unknown error in "+ model + ".json !");
             }
             return false;
         }
        data = JSON.parse(data);
        if(data.permissions[actionPermissionMap[action]].indexOf(role)>=0){
            return true;
        }else{
            return false;
        }
    }

};