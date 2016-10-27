define(['angular'], function (angular) {

    var question = angular.module('question').controller('viewQuestionController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','FileUploader','questionService',
          function (scope, http,$q,$rootScope, dataManupulator, FileUploader, questionService) {

            scope.pageTitle = "Create Question";
            scope.baseUrl = "http://localhost:3000/";
            scope.bgColor = "background-color: BurlyWood";
            var questionToBeViewed;
            var modalInstance;
            function init() {
              questionToBeViewed = questionService.getQuestionToBeViewed();
              modalInstance = questionService.getModal();
              scope.question = questionToBeViewed;
              dataManupulator.manupulate("getById", {entityName: "subject", entityId: questionToBeViewed.subjectId}).then(function (res) {
                scope.subject = res.data;
              })
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }


        }]);


    return question;
});

