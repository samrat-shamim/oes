define(['angular'], function (angular) {
    var mainApp = angular.module('mainApp');
   
    mainApp.registerController('landingController',
        ['$rootScope', '$scope', 'identifier', '$state', function ($rootScope, scope, identifier, $state) {
            scope.name = "Samrat";

        }]);
});

