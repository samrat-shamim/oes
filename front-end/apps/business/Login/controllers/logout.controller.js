define(['angular'], function (angular) {

    var login = angular.module('login').controller('logoutController',
        ['$rootScope', '$scope', '$state', '$localStorage',"identifier",'dataManupulator', function ($rootScope, scope, $state,$localStorage, identifier, dataManupulator) {


            scope.message = "Logging out";
             function logout () {
                identifier.authenticate(null);
                $state.go('login');
                $localStorage.token = null;
                $rootScope.$broadcast("loggedout");
            }

            logout();

        }]);

    return login;
});
