define(['angular'], function (angular) {

    angular.module('template').service('templateService', ['$http', "$rootScope","$q","identifier", function ($http, $rootScope,$q,identifier) {
        var config;


       this.websiteDetails = {
           title: "Account Information System"
       }

       this.sideNavbarDetails = {
           shouldShow: true,
           modules: [

           ]
       }

       this.getTemplateConfig = function (role) {
           return $q(function(resolve, reject){
               $http.get("mocks/template-config." + role + ".json").success(function (response) {
                   resolve(response);
               }, function (err) {
                   reject(err);
               });

           })

        }
    }]);
});
