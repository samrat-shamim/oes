module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var entityName = req.body.entityName;
        var schema = app.models[entityName];
        if(!schema)
            sendError("Invalid entity name.");
        var model = mongoose.model(entityName, schema);
        var document = new model(req.body.entity);
        document.save(function(err, doc){
            res.send(doc);
            next();
        });
        function sendError(message){
            res.send(message);
            next();
        }
    };
};