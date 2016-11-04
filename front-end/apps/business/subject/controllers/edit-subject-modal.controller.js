define(['angular'], function (angular) {

    var subject = angular.module('subject').controller('editSubjectController',
        ['$scope', 'identifier','$q','dataManupulator','FileUploader','subjectService','toastr',
          function (scope, identifier,$q, dataManupulator, FileUploader, subjectService, toastr) {

            scope.pageTitle = "Create Subject";
            var subjectToBeEdited;
            var modalInstance;
            function init() {
              subjectToBeEdited = subjectService.getSubjectToBeEdited();
              modalInstance = subjectService.getModal();
              scope.subjectModel = subjectToBeEdited;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            var subjects = [];

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
              ];

            scope.editSubject = function(){
                var model = {
                  "entityName": "subject",
                  "entityId": subjectToBeEdited._id
                };
                model.entity = scope.subjectModel;
                identifier.identity().then(
                    function(res){
                        model.entity.updatedById = res.userId;
                        dataManupulator.manupulate("update",model).then(
                            function (response) {
                                toastr.success("Subject updated", "Success!");
                            },
                            function (err) {
                                toastr.error("Failed to update subject", "Error!");
                            }
                        );
                    }
                )
              scope.cancel();
            }

        }]);


    return subject;
});

