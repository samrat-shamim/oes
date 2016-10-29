
define(['angular'], function (angular) {

    var login = angular.module('login', []);

    login.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 3000
        });
    });
});