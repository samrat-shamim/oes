module.exports = function(app, route) {
  var mongoose = require('mongoose');
  var message = {};
  return function(req, res, next) {
    var entityName = "user";
    var schema = app.models[entityName];
    if(!schema){
      message.text = "Invalid entity name.";
      sendError();
    }
    var model = mongoose.model(entityName, schema);
    model.findOne({userName:req.body.userName}, function (err, user) {
      if(user){
        message.text = "Username already exist";
        sendError(message);
      }else{
        message.text = "user created";
        var document = new model(req.body);
        document.save(function(err, doc){
          res.send(doc);
          next();
        });
      }
    })

    function sendError(message){
      res.send(message);
      next();
    }
  };
};
