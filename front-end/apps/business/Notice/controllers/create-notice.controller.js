define(['angular'], function (angular) {

    var notice = angular.module('notice').controller('createNoticeController',
        ['$scope', '$state','toastr','dataManupulator','identifier', function (scope,$state, toastr, dataManupulator, identifier) {

            scope.pageTitle = "Create notice";

            scope.noticeModel = {};

            scope.noticeSchema = [
                {
                    key: 'title',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Notice Title',
                        placeholder: 'Enter the notice title',
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
              scope.noticeModel.titleFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'oa'){
              scope.noticeModel.optionAFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'ob'){
              scope.noticeModel.optionBFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'oc'){
              scope.noticeModel.optionCFigure = res.fileName;
            }else if(scope.uploadingImgFor == 'od'){
              scope.noticeModel.optionDFigure = res.fileName;
            }
          }

            scope.createNotice = function(){
                var model = {
                    "entityName": "notice"
                };
                model.entity = scope.noticeModel;
                identifier.identity().then(
                    function(res){
                        model.entity.createdById = res.userId;
                        dataManupulator.manupulate("insert",model).then(function (res) {
                            if(res.data.success){
                                toastr.success("Notice created", "Success!");
                                $state.go("all-notices");
                            } else{
                                toastr.error("Failed to create sucject", "Error!");
                            }
                        }, function (err) {
                            toastr.error("Something went wrong, failed to create notice", "Error");
                        });
                    }
                )
            }

        }]);

});

