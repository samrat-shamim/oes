define(['angular'], function (angular) {

    angular.module('subject').service('subjectService', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var baseUrl = "http://localhost:3000/";
      var subjectToBeEdited;
      var subjectsToBeDeleted;
      var activeModal;
      var subjectToBeViewed;


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

      function setSubjectToBeEdited(subject) {
        subjectToBeEdited = subject;
      }
      function getSubjectToBeEdited() {
        return subjectToBeEdited ;
      }

      function setSubjectToBeViewed(subject) {
        subjectToBeViewed = subject;
      }
      function getSubjectToBeViewed() {
        return subjectToBeViewed ;
      }

      function setModal(modal) {
        activeModal = modal;
      }
      function getModal() {
        return activeModal;
      }

      function setSubjectsToBeDeleted(subjects) {
        subjectsToBeDeleted = subjects;
      }

      function getSubjectsToBeDeleted() {
        return subjectsToBeDeleted;
      }
      this.manupulate = manupulate;
      this.setSubjectToBeEdited = setSubjectToBeEdited;
      this.getSubjectToBeEdited = getSubjectToBeEdited;
      this.setSubjectsToBeDeleted = setSubjectsToBeDeleted;
      this.getSubjectsToBeDeleted = getSubjectsToBeDeleted;
      this.setModal = setModal;
      this.getModal = getModal;
      this.setSubjectToBeViewed = setSubjectToBeViewed;
      this.getSubjectToBeViewed = getSubjectToBeViewed;

    }]);
});
