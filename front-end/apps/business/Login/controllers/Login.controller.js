define(['angular'], function (angular) {

    var login = angular.module('login').controller('loginController',
        ['$rootScope', '$scope', '$state', "identifier", function ($rootScope, scope, $state, identifier) {

            scope.message = "Please Login";
            scope.login = function () {
                identifier.authenticate({
                    name: scope.username,
                    roles: ['user']
                });
                if (true) {
                    $rootScope.$broadcast("loggedin");
                    $state.go('landing');
                }
            }

        }]);

    return login;
});
