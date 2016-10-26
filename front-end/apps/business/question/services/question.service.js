define(['angular'], function (angular) {

    angular.module('question').service('questionService', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var baseUrl = "http://localhost:3000/";
      var questionToBeEdited;
      var activeModal;


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

      function setModal(modal) {
        activeModal = modal;
      }
      function getModal() {
        return activeModal;
      }
      this.manupulate = manupulate;
      this.setQuestionToBeEdited = setQuestionToBeEdited;
      this.getQuestionToBeEdited = getQuestionToBeEdited;
      this.setModal = setModal;
      this.getModal = getModal;

    }]);
});
