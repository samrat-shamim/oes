define(['angular'], function (angular) {


    angular.module('sample-two').controller('sampleTwoController',
        ['$rootScope', '$scope', '$http', function ($rootScope,scope, http) {

            scope.message = "Sample app two";

        }]);
});

