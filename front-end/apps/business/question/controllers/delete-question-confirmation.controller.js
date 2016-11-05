define(['angular'], function (angular) {

    var question = angular.module('question').controller('deleteQuestionController',
        ['$scope', '$state','$q',"$rootScope",'dataManupulator','FileUploader','questionService','toastr',
          function (scope, $state,$q,$rootScope, dataManupulator, FileUploader, questionService, toastr) {

            scope.pageTitle = "Create Question";
            var questionToBeEdited;
            var modalInstance;
            function init() {
              questionsToBeDeleted = questionService.getQuestionsToBeDeleted();
              modalInstance = questionService.getModal();
              scope.questions = questionsToBeDeleted;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }

            scope.deleteQuestions = function(){
                var model = {
                  "entityName": "question",
                  "entityIds":[]
                };
                questionsToBeDeleted.forEach(function (item) {
                  model.entityIds.push(item._id);
                })
              dataManupulator.manupulate("deleteMany",model).then(
                  function (response) {
                      toastr.success("Question deleted", "Success!");
                      $state.go('all-questions');
                  },
                  function (err) {
                      toastr.error("Failed to delete question", "Error!");
                  }
              );
              scope.cancel();
              $rootScope.$broadcast("question-deleted", {ids:model.entityIds});
            }


        }]);


    return question;
});

