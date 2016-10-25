module.exports = function(app, route) {
  var multer = require('multer');
  var uplaodedFileName;

  var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      uplaodedFileName = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];

      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  });
  var upload = multer({ //multer settings
    storage: storage
  }).single('file');
  return function(req, res) {
    upload(req,res,function(err){
      if(err){
        res.json({error_code:1,err_desc:err});
        return;
      }
      res.json({error_code:0,err_desc:null, fileName:uplaodedFileName});
    });
  }
};
