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
      console.log("here");
        document.save(function(err, doc){
          console.log(err);
            res.send(doc);
            next();
        });
        function sendError(){
            res.send(message);
            next();
        }
    };
};
