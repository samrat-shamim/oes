define(['angular'], function (angular) {

    var notice = angular.module('notice').controller('editNoticeController',
        ['$scope', 'identifier','$q','dataManupulator','FileUploader','noticeService','toastr',
          function (scope, identifier,$q, dataManupulator, FileUploader, noticeService, toastr) {

            scope.pageTitle = "Create Notice";
            var noticeToBeEdited;
            var modalInstance;
            function init() {
              noticeToBeEdited = noticeService.getNoticeToBeEdited();
              modalInstance = noticeService.getModal();
              scope.noticeModel = noticeToBeEdited;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            var notices = [];

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
                          type: 'text',
                          label: 'Details',
                          placeholder: 'Enter details',
                          required: true,
                          rows: 10
                      }
                  }
              ];

            scope.editNotice = function(){
                var model = {
                  "entityName": "notice",
                  "entityId": noticeToBeEdited._id
                };
                model.entity = scope.noticeModel;
                identifier.identity().then(
                    function(res){
                        model.entity.updatedById = res.userId;
                        dataManupulator.manupulate("update",model).then(
                            function (response) {
                                toastr.success("Notice updated", "Success!");
                            },
                            function (err) {
                                toastr.error("Failed to update notice", "Error!");
                            }
                        );
                    }
                )
              scope.cancel();
            }

        }]);


    return notice;
});

