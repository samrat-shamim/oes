define(['angular'], function (angular) {

    angular.module('user-management').service('userService', ['$http', "$rootScope","$q", function ($http, $rootScope,$q) {
        var baseUrl = "http://localhost:3000/";
      var userToBeEdited;
      var usersToBeDeleted;
      var activeModal;
      var userToBeViewed;


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

      function setUserToBeEdited(user) {
        userToBeEdited = user;
      }
      function getUserToBeEdited() {
        return userToBeEdited ;
      }

      function setUserToBeViewed(user) {
        userToBeViewed = user;
      }
      function getUserToBeViewed() {
        return userToBeViewed ;
      }

      function setModal(modal) {
        activeModal = modal;
      }
      function getModal() {
        return activeModal;
      }

      function setUsersToBeDeleted(users) {
        usersToBeDeleted = users;
      }

      function getUsersToBeDeleted() {
        return usersToBeDeleted;
      }
      this.manupulate = manupulate;
      this.setUserToBeEdited = setUserToBeEdited;
      this.getUserToBeEdited = getUserToBeEdited;
      this.setUsersToBeDeleted = setUsersToBeDeleted;
      this.getUsersToBeDeleted = getUsersToBeDeleted;
      this.setModal = setModal;
      this.getModal = getModal;
      this.setUserToBeViewed = setUserToBeViewed;
      this.getUserToBeViewed = getUserToBeViewed;

    }]);
});
