module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var parentSchema = app.models[req.body.parentEntityName];
        if(!parentSchema)
        {
            res.json({
                success: false,
                text: "Invalid parent entity name"
            });
            next();
        }


        var childSchema = app.models[req.body.childEntityName];
        if(!childSchema)
        {
            res.json({
                success: false,
                text: "Invalid child entity name"
            });
            next();
        }

        var parentModel = mongoose.model(req.body.parentEntityName, parentSchema);
        var childModel = mongoose.model(req.body.childEntityName, childSchema);


        //validate parent entity
        parentModel.findById({_id: req.body.parentEntityId},function(err, doc){
            if(!doc){
                res.json({
                    success: false,
                    text: "Parent entity not found"
                });
                next();
            } else{
                //validate child entity
                childModel.findById({_id: req.body.childEntityId},function(err, doc){
                    if(!doc){
                        res.json({
                            success: false,
                            text: "Child entity not found"
                        });
                        next();
                    }else{
                        var connectionSchema = app.models.connection;
                        var connectionModel = mongoose.model("connection", connectionSchema);
                        var connection = new connectionModel(req.body);
                        connection.save(function(err, doc){
                            res.json({
                                success: true,
                                data: doc
                            })
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