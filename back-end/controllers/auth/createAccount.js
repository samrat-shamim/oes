module.exports = function(app, route) {
  var mongoose = require('mongoose');
  var bcrypt = require('bcrypt-nodejs');
  var message = {};
  return function(req, res, next) {
    var entityName = "user";
    var schema = app.models[entityName];
    if(!schema){
      message.text = "Invalid entity name.";
      sendError();
    }
    var model = mongoose.model(entityName, schema);
    model.findOne({userEmail:req.body.userEmail}, function (err, user) {
      if(user){
        message.text = "Email already exist";
        sendError(message);
      }else{
        message.text = "user created";
        req.body.password = bcrypt.hashSync(req.body.password);
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
