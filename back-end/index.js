var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var morgan      = require('morgan');
var config = require('./config');
var cors = require('cors');


// Create the application.
var app = express();

app.use(cors());

app.set('superSecret', config.secret);

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));
app.use(express.static('uploads'));

/*
// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'authToken, Content-Type');
    next();
});
*/

// Connect to MongoDB
mongoose.connect('mongodb://oes:oes123@ds033036.mlab.com:33036/oes');
mongoose.connection.once('open', function() {

    // Load the models.
    app.models = require('./models/index');

    var crudMiddleware = require('./middlewares/crudAuthorize');
    app.use('/crud', crudMiddleware);

    // Load the routes.
    var routes = require('./routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    console.log('Listening on port 3000...');
    app.listen(3000);
});
