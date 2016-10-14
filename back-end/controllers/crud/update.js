module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var entityName = req.body.entityName;
        var entityId = req.body.entityId;
        var entity = req.body.entity;
        var schema = app.models[entityName];
        if(!schema)
            sendError("Invalid entity name.");
        var model = mongoose.model(entityName, schema);
        model.findByIdAndUpdate(entityId,{$set:entity},{new: true}, function(err, updatedDoc){
            if(err){
                console.log(err);
            }
            res.send(updatedDoc);
        });

        function sendError(message){
            res.send(message);
            next();
        }
    };
};