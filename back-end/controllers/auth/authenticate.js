module.exports = function(app, route) {
  var mongoose = require('mongoose');
  var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
  var message = {};
  var bcrypt = require('bcrypt-nodejs');
  return function(req, res, next) {
    var entityName = "user";
    var schema = app.models[entityName];
    var model = mongoose.model(entityName, schema);
    model.findOne({
      userEmail: req.body.userEmail
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        console.log(user);

        // check if password matches
        console.log(bcrypt.compareSync(req.password, user.password));

        if (bcrypt.compareSync(req.password, user.password)) {
          console.log(req.body);
          console.log(user);
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn : 60*60*24 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user
          });
        }

      }

    });
    function sendError(message){
      res.send(message);
      next();
    }
  };
};
