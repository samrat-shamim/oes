define(['angular'], function (angular) {

    var subject = angular.module('subject').controller('createSubjectController',
        ['$scope', '$state','toastr','dataManupulator','identifier', function (scope,$state, toastr, dataManupulator, identifier) {

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
                dataManupulator.manupulate("insert",model).then(function (res) {
                    if(res.data.success){
                        toastr.success("Subject created", "Success!");
                        $state.go("all-subjects");
                    } else{
                        toastr.error("Failed to create sucject", "Error!");
                    }
                }, function (err) {
                    toastr.error("Something went wrong, failed to create subject", "Error");
                });
            }

        }]);

});

