module.exports = function(app, route) {
  var mongoose = require('mongoose');
  var bcrypt = require('bcrypt-nodejs');
  var message = {};
  return function(req, res, next) {
    var entityName = "user";
    var schema = app.models[entityName];
    if(!schema){
      sendRes("Invalid entity name.", false);
    }
    var model = mongoose.model(entityName, schema);
    model.findOne({userEmail:req.body.userEmail}, function (err, user) {
      if(user){
        sendRes("Email already exist", false);
      }else{
        req.body.password = bcrypt.hashSync(req.body.password);
        var document = new model(req.body);

        document.save(function(err, doc){
          if(doc){
            sendRes("User Created", true, doc);
          }
          else{
            sendRes("User Creation failed", false, err);
          }
        });
      }
    })

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
