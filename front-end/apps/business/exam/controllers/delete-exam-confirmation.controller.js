define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('deleteExamController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','examService','toastr',
          function (scope, http,$q,$rootScope, dataManupulator, examService, toastr) {

            scope.pageTitle = "Create exam";
            var examToBeEdited;
            var modalInstance;
            function init() {
              examsToBeDeleted = examService.getExamsToBeDeleted();
              modalInstance = examService.getModal();
              scope.exams = examsToBeDeleted;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            scope.deleteExams = function(){
                var model = {
                  "entityName": "exam",
                  "entityIds":[]
                };
                examsToBeDeleted.forEach(function (item) {
                  model.entityIds.push(item._id);
                })
              dataManupulator.manupulate("deleteMany",model).then(function (res) {
                  toastr.success("Delete successful", "Success!");
              }, function (err) {
                  toastr.error("Delete Failed", "Error!");
              });
              scope.cancel();
              $rootScope.$broadcast("exam-deleted", {ids:model.entityIds});
            }


        }]);


    return exam;
});

