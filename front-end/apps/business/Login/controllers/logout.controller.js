define(['angular'], function (angular) {

    var login = angular.module('login').controller('logoutController',
        ['$rootScope', '$scope', '$state', '$localStorage',"identifier",'dataManupulator', "toastr",
            function ($rootScope, scope, $state,$localStorage, identifier, dataManupulator, toastr) {


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
