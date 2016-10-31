define(['angular'], function (angular) {

    var subject = angular.module('subject').controller('createSubjectController',
        ['$scope', '$http','dataManupulator','FileUploader', function (scope, http, dataManupulator, FileUploader) {

            scope.pageTitle = "Create subject";

            scope.subjectModel = {};

            scope.subjectSchema = [
                {
                    key: 'title',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Subject Title',
                        placeholder: 'Enter the subject title',
                        required: true
                    }
                },
                {
                    key: 'description',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Description',
                        placeholder: 'Enter description',
                        required: true
                    }
                }
            ]

          function setImgPathToDatabase(res) {
            if(scope.uploadingImgFor == 'q'){
              scope.subjectModel.titleFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'oa'){
              scope.subjectModel.optionAFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'ob'){
              scope.subjectModel.optionBFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'oc'){
              scope.subjectModel.optionCFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'od'){
              scope.subjectModel.optionDFigure = res.fileName;
            }
          }

            scope.createSubject = function(){
                var model = {
                    "entityName": "subject"
                };
                model.entity = scope.subjectModel;
                identifier.identity().then(
                    function(res){
                        model.entity.createdById = res.userId;
                        dataManupulator.manupulate("insert",model);
                    }
                )
            }

        }]);

});

