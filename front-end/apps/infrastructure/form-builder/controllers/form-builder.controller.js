'use strict';
define(['angular'], function (angular) {
    angular.module("form-builder").controller('formBuilderController', function ($scope, formBuilderService, $stateParams) {
        $scope.form = {};
        // read form with given id
        formBuilderService.form(2).then(function (form) {
            $scope.form = form;
        });
    });

});

