define(['angular'], function (angular) {

    angular.module('exam').service('examService', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var baseUrl = "http://localhost:3000/";
      var examToBeEdited;
      var examsToBeDeleted;
      var activeModal;
      var examToBeViewed;


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

      function setExamToBeEdited(exam) {
        examToBeEdited = exam;
      }
      function getExamToBeEdited() {
        return examToBeEdited ;
      }

      function setExamToBeViewed(exam) {
        examToBeViewed = exam;
      }
      function getExamToBeViewed() {
        return examToBeViewed ;
      }

      function setModal(modal) {
        activeModal = modal;
      }
      function getModal() {
        return activeModal;
      }

      function setExamsToBeDeleted(exams) {
        examsToBeDeleted = exams;
      }

      function getExamsToBeDeleted() {
        return examsToBeDeleted;
      }
      this.manupulate = manupulate;
      this.setExamToBeEdited = setExamToBeEdited;
      this.getExamToBeEdited = getExamToBeEdited;
      this.setExamsToBeDeleted = setExamsToBeDeleted;
      this.getExamsToBeDeleted = getExamsToBeDeleted;
      this.setModal = setModal;
      this.getModal = getModal;
      this.setExamToBeViewed = setExamToBeViewed;
      this.getExamToBeViewed = getExamToBeViewed;

    }]);
});
