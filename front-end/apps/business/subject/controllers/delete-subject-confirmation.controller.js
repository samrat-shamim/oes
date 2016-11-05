define(['angular'], function (angular) {

    var subject = angular.module('subject').controller('deleteSubjectController',
        ['$scope', '$state','$q',"$rootScope",'dataManupulator','FileUploader','subjectService','toastr',
          function (scope, $state,$q,$rootScope, dataManupulator, FileUploader, subjectService, toastr) {

            scope.pageTitle = "Create Subject";
            var subjectToBeEdited;
            var modalInstance;
            function init() {
              subjectsToBeDeleted = subjectService.getSubjectsToBeDeleted();
              modalInstance = subjectService.getModal();
              scope.subjects = subjectsToBeDeleted;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            scope.deleteSubjects = function(){
                var model = {
                  "entityName": "subject",
                  "entityIds":[]
                };
                subjectsToBeDeleted.forEach(function (item) {
                  model.entityIds.push(item._id);
                })
              dataManupulator.manupulate("deleteMany",model).then(
                  function (response) {
                      toastr.success("Subject deleted", "Success!");
                      $state.go('all-subjects');
                  },
                  function (err) {
                      toastr.error("Failed to delete subject", "Error!");
                  }
              );
              scope.cancel();
              $rootScope.$broadcast("subject-deleted", {ids:model.entityIds});
            }


        }]);


    return subject;
});

