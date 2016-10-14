module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var entityName = req.body.entityName;
        var entityId = req.body.entityId;
        var schema = app.models[entityName];
        if(!schema)
            sendError("Invalid entity name.");
        var model = mongoose.model(entityName, schema);
        model.findById({_id:entityId},function(err, doc){
            res.send(doc);
            next();
        });
        function sendError(message){
            res.send(message);
            next();
        }
    };
};