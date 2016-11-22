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
                    type: 'textarea',
                    templateOptions: {
                        type: 'input',
                        label: 'Details',
                        placeholder: 'Enter details',
                        required: true,
                        rows: 10
                    }
                }
            ]


            scope.createNotice = function(){
                var model = {
                    "entityName": "notice"
                };
                model.entity = scope.noticeModel;
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

        }]);

});

