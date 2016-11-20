module.exports = function(app, route) {
    var mongoose = require('mongoose');
    return function(req, res, next) {
        var entityName = req.body.entityName;
        var schema = app.models[entityName];
        if(!schema)
            sendError("Invalid entity name.");
        var model = mongoose.model(entityName, schema);
        var sort = {};
        if(req.body.sort){
            sort[req.body.sort.sortBy] = req.body.sort.sortOrder=="dsc"?-1:1;
        }

        var query = req.body.filters?req.body.filters:{};
        model.find(query?query:null,null,{sort:sort},function(err, documents){
            res.send(err? err: buildResponse(req.body.pageNumber||1, req.body.pageSize||10000000,documents));
            next();
        });
        function sendError(message){
            res.send(message);
            next();
        }

    };

    function buildResponse(pageNumber, pageSize, documents){
        var totalCount = documents.length;
        var totalPage = Math.ceil(totalCount/pageSize);

        return {
            totalCount: totalCount,
            pageNumber: pageNumber,
            pageSize: pageSize,
            data : documents.slice((pageNumber-1)*pageSize,pageNumber*pageSize)
        }
    }
};
