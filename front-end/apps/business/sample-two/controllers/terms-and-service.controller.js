// we can mention the dependency file here too 
define(['angular'], function (angular) {

    angular.module('sample-two').controller('termsAndServiceController',
        ['$scope', '$http', function (scope, http) {

            scope.message = "This is our terms and services";

        }]);

});

