define(['angular'], function (angular) {

    var user = angular.module('user-management').controller('viewUserController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','FileUploader','userService',
          function (scope, http,$q,$rootScope, dataManupulator, FileUploader, userService) {

            scope.pageTitle = "View User";
            scope.baseUrl = "http://localhost:3000/";
            scope.bgColor = "background-color: BurlyWood";
            var userToBeViewed;
            var modalInstance;
            function init() {
              userToBeViewed = userService.getUserToBeViewed();
              modalInstance = userService.getModal();
              scope.user = userToBeViewed;
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }


        }]);


    return user;
});

