define(['angular'], function (angular) {

    angular.module('question').service('questionService', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var baseUrl = "http://localhost:3000/";
      var questionToBeEdited;
      var questionsToBeDeleted;
      var activeModal;
      var questionToBeViewed;


        function manupulate(action, data){
            return $q(function(resolve, reject){
                $http({
                    method: 'POST',
                    url: baseUrl + action,
                    data: data,
                    headers: {'Content-Type': 'application/json'}
                }).then(function(response){
                    resolve(response);
                }, function(err){
                    reject(err);
                });
            })
        };

      function setQuestionToBeEdited(question) {
        questionToBeEdited = question;
      }
      function getQuestionToBeEdited() {
        return questionToBeEdited ;
      }

      function setQuestionToBeViewed(question) {
        questionToBeViewed = question;
      }
      function getQuestionToBeViewed() {
        return questionToBeViewed ;
      }

      function setModal(modal) {
        activeModal = modal;
      }
      function getModal() {
        return activeModal;
      }

      function setQuestionsToBeDeleted(questions) {
        questionsToBeDeleted = questions;
      }

      function getQuestionsToBeDeleted() {
        return questionsToBeDeleted;
      }
      this.manupulate = manupulate;
      this.setQuestionToBeEdited = setQuestionToBeEdited;
      this.getQuestionToBeEdited = getQuestionToBeEdited;
      this.setQuestionsToBeDeleted = setQuestionsToBeDeleted;
      this.getQuestionsToBeDeleted = getQuestionsToBeDeleted;
      this.setModal = setModal;
      this.getModal = getModal;
      this.setQuestionToBeViewed = setQuestionToBeViewed;
      this.getQuestionToBeViewed = getQuestionToBeViewed;

    }]);
});
