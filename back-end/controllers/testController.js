/**
 * Created by Shamim on 10/11/2016.
 */
var restful = require('node-restful');
module.exports = function(app, route) {

    //// Setup the controller for REST.
    //var rest = restful.model(
    //    'exam',
    //    app.models.exam
    //).methods(['get', 'put', 'post', 'delete']);
    //
    //// Register this endpoint with the application.
    //rest.register(app, route);

    // Return middleware.
    return function(req, res, next) {
        var entityName = "";
        if(req.body){
            entityName = req.body.entityName;
            req.body  = req.body.entity;
        }
        else if(req.param("entityName")){
            entityName = req.param("entityName");
            console.log(entityName);
        }
        var rest = restful.model(
            entityName,
            app.models.exam
        ).methods(['get', 'put', 'post', 'delete']);

        // Register this endpoint with the application.
        rest.register(app, route);
        next();
    };
};