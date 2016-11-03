module.exports = function(app, route) {
  var mongoose = require('mongoose');
  var jwt    = require('jsonwebtoken');
  var tokenDecoder = require('../../services/tokenDecoder');
  var config = require('../../config');
  var bcrypt = require('bcrypt-nodejs');
  return function(req, res, next) {
    var entityName = "user";
    var schema = app.models[entityName];
    var model = mongoose.model(entityName, schema);
    var token = req.headers['authtoken'];
    var userInfo;
    jwt.verify(token, config.secret, function(err, decoded) {
      if(decoded){
        userInfo = decoded._doc;
        model.findOne({
          userEmail: userInfo.userEmail
        }, function(err, user) {

          if (err) throw err;

          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else if (user) {



            if (!bcrypt.compareSync(req.body.password, user.password)) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
              user.password = bcrypt.hashSync(req.body.newPassword)

              model.findByIdAndUpdate(userInfo._id,{$set:user},{new: true}, function(err, updatedUser){
                if(err){
                  console.log(err);
                }

                if(updatedUser){
                  res.json({
                    success: true,
                    user: updatedUser
                  });
                }
              });

            }

          }

        });
      }else{
        sendError("Failed to decode token");
      }
    });


    function sendError(message){
      res.send(message);
      next();
    }
  };
};
