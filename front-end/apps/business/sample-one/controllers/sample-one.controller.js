define(['angular'], function (angular) {

    var login = angular.module('sample-one').controller('sampleOneController',
        ['$scope', '$http', function (scope, http) {

            scope.message = "Sample app one";

        }]);

    return login;
});

