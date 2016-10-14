module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var parentModel;
        var childModel;

        if(req.body.parentEntityName){
            var parentSchema = app.models[req.body.parentEntityName];
            if(!parentSchema)
                sendError("Invalid parent entity name.");
            else{
                parentModel = mongoose.model(req.body.parentEntityName, parentSchema);
            }
        }


        if(req.body.childEntityName){
            var childSchema = app.models[req.body.childEntityName];
            if(!childSchema)
                sendError("Invalid child entity name.");
            else{
                childModel = mongoose.model(req.body.childEntityName, childSchema);
            }
        }

        function sendError(message){
            res.send(message);
            next();
        }
    };



};