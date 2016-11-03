define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('leavePageConfirmationController',
        ['$scope', '$http','$q',"$rootScope",'examService',
          function (scope, http,$q,$rootScope, examService) {
            scope.confirm = function () {
                console.log("Confirmed");
            }


              scope.cancel = function () {
                  console.log("canceled");
              }


        }]);


    return exam;
});

