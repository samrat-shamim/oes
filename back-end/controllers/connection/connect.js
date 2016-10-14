module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var parentSchema = app.models[req.body.parentEntityName];
        if(!parentSchema)
            sendError("Invalid parent entity name.");


        var childSchema = app.models[req.body.childEntityName];
        if(!childSchema)
            sendError("Invalid child entity name.");

        var parentModel = mongoose.model(req.body.parentEntityName, parentSchema);
        var childModel = mongoose.model(req.body.childEntityName, childSchema);


        //validate parent entity
        parentModel.findById({_id: req.body.parentEntityId},function(err, doc){
            if(!doc){
                sendError("Parent entity not found.");
            } else{
                //validate child entity
                childModel.findById({_id: req.body.childEntityId},function(err, doc){
                    if(!doc){
                        sendError("Child entity not found.");
                    }else{
                        var connectionSchema = app.models.connection;
                        var connectionModel = mongoose.model("connection", connectionSchema);
                        var connection = new connectionModel(req.body);
                        connection.save(function(err, doc){
                            res.send(doc);
                            next();
                        });
                    }

                });
            }

        });

        function sendError(message){
            res.send(message);
            next();
        }
    };



};