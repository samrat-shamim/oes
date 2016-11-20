/**
 * Created by Shamim on 11/20/2016.
 */
module.exports = function(app, route) {
    var mongoose = require('mongoose');
    var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
    var message = {};
    var bcrypt = require('bcrypt-nodejs');
    return function(req, res, next) {
        var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        if (checkIp(ip)){
            res.json(
                {
                    success: true,
                    permission: "allowed",
                    ip: ip
                }
            )
        }else{
            res.json(
                {
                    success: true,
                    permission: "denied",
                    ip: ip
                }
            )
        }
    };

    function checkIp(ip){
        var reqIp = ip.split(".");
        var allowedIp = require('../../exam-config').allowedIpRange.split(".");
        console.log(allowedIp);
        console.log(reqIp);
        var authentic = true;
        for(var i=0;i<4;i++){
            if(allowedIp[i] != "*"){
                if(reqIp[i]!=allowedIp[i])
                authentic = false;
            }
        }
        return authentic;
    }
};
