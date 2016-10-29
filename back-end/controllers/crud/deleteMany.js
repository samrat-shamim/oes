module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var entityName = req.body.entityName;
        var entityIds = req.body.entityIds;
        var schema = app.models[entityName];
        if(!schema)
            sendRes("Invalid entity name.", false);
        var model = mongoose.model(entityName, schema);
        model.remove({_id:{$in : entityIds}},function(err, doc){
            sendRes("Delete Successfull", true, doc)
        });
        function sendRes(message, success, data){
            res.json({
                message: message,
                success: success,
                data: data
            })
            next();
        }

    };
};
