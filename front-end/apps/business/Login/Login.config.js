
define(['angular'], function (angular) {

    var login = angular.module('login', ['ngAnimate', 'toastr']);

    login.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 1000
        });
    });
});