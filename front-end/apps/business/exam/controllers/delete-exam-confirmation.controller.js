define(['angular'], function (angular) {

    var question = angular.module('exam').controller('deleteExamController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','FileUploader','questionService',
          function (scope, http,$q,$rootScope, dataManupulator, FileUploader, questionService) {

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
              dataManupulator.manupulate("deleteMany",model);
              scope.cancel();
              $rootScope.$broadcast("question-deleted", {ids:model.entityIds});
            }


        }]);


    return question;
});

