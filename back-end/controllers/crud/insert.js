module.exports = function(app, route) {
    var mongoose = require('mongoose');
    var message = {};
    return function(req, res, next) {
        if(!req.body.entityName){
            message.text = "No entity name supplied";
            sendError();
        }
        var entityName = req.body.entityName;
        var schema = app.models[entityName];
        if(!schema){
            message.text = "Invalid entity name.";
            sendError();
        }
        var model = mongoose.model(entityName, schema);
        var document = new model(req.body.entity);
        document.createdById = req.decoded._doc._id;
        document.save(function(err, doc){
            if(err){
                sendError(err);
            }else{
                res.json({
                    success: true,
                    data: doc
                });
                next();
            }
        });
        function sendError(err){
            res.json({
                success: false,
                text: "Falied to create entity",
                err: err
            });
            next();
        }
    };
};
