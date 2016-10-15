module.exports = function(app, route) {
    var mongoose = require('mongoose');
    var response = {};
    response.message = [];
    return function(req, res, next) {
        var pageNumber = req.body.pageNumber, pageSize = req.body.pageSize;
        var parentModel;
        var childModel;
        var connectionModel = mongoose.model("connection", app.models['connection']);

        if(req.body.filters.parentEntityName){
            var parentSchema = app.models[req.body.filters.parentEntityName];
            if(!parentSchema)
                sendError("Invalid parent entity name.");
            else{
                parentModel = mongoose.model(req.body.filters.parentEntityName, parentSchema);
            }
        } else if(req.body.expandParent){
            req.body.expandParent = false;
            response.message.push("Please supply parentEntityName to expand parent.");
        }


        if(req.body.filters.childEntityName){
            var childSchema = app.models[req.body.filters.childEntityName];
            if(!childSchema)
                sendError("Invalid child entity name.");
            else{
                childModel = mongoose.model(req.body.filters.childEntityName, childSchema);
            }
        } else if(req.body.expandChild){
            req.body.expandChild = false;
            response.message.push("Please supply childEntityName to expand child.");
        }
        var query = req.body.filters?req.body.filters:{};
        connectionModel.find(query?query:null,null,{},function(err, documents){
            if(req.body.expandParent && req.body.expandChild){
                var parentIds = [];
                for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){
                    if(documents[i]){
                        parentIds.push(documents[i].parentEntityId);
                    }
                }
                parentModel.find({_id:{$in:parentIds}}, function(err, docs){
                    for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){
                        if(documents[i]){
                            docs.foreach(function(doc){
                                if(doc._id==documents[i].childEntityId)
                                    documents[i].child = doc;
                            })
                        }
                    }
                    var childIds = [];
                    for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){
                        if(documents[i]){
                            childIds.push(documents[i].childEntityId);
                        }
                    }
                    childModel.find({_id:{$in:childIds}}, function(err, docs){
                        for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){
                            if(documents[i]){
                                docs.forEach(function(doc){
                                    if(doc._id==documents[i].childEntityId)
                                        documents[i].child = doc;
                                })
                            }
                        }
                        res.send(err? err: buildResponse(req.body.pageNumber, req.body.pageSize,documents));
                        next();
                    })
                })
            }
            else if(req.body.expandParent){
                var parentIds = [];

                for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){
                    if(documents[i]){
                        parentIds.push(documents[i].parentEntityId);
                    }
                }
                parentModel.find({_id:{$in:parentIds}}, function(err, docs){
                    for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){

                        if(documents[i]){
                            docs.forEach(function(doc){
                                if(doc._id==documents[i].parentEntityId){
                                    documents[i].parent = doc;

                                }

                            })
                        }
                    }
                    res.send(err? err: buildResponse(req.body.pageNumber, req.body.pageSize,documents));
                    next();

                })
            }
            else if(req.body.expandChild){
                var childIds = [];
                for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){
                    if(documents[i]){
                        childIds.push(documents[i].childEntityId);
                    }
                }
                childModel.find({_id:{$in:childIds}}, function(err, docs){
                    for(var i=(pageNumber-1)*pageSize; i<pageNumber*pageSize; i++){
                        if(documents[i]){
                            docs.forEach(function(doc){
                                if(doc._id==documents[i].childEntityId)
                                    documents[i].child = doc;
                            })
                        }
                    }
                    res.send(err? err: buildResponse(req.body.pageNumber, req.body.pageSize,documents));
                    next();
                })
            }
            else{
                res.send(err? err: buildResponse(req.body.pageNumber, req.body.pageSize,documents));
                next();
            }

        });
        function sendError(message){
            res.send(message);
            next();
        }
    };

    function buildResponse(pageNumber, pageSize, documents){
        var totalCount = documents.length;
        var totalPage = Math.ceil(totalCount/pageSize);
        response.totalCount = totalCount;
        response.pageNumber = pageNumber;
        response.pageSize = pageSize;
        response.data = documents.slice((pageNumber-1)*pageSize,pageNumber*pageSize);

        return response;
    }

};