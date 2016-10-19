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

       this.getTemplateConfig = function () {
           return $q(function(resolve, reject){
               $http.get("mocks/template-config.coordinator.json").success(function (response) {
                   if(!identifier.isAuthenticated()){
                       resolve(response);
                   }else{
                       reject("error");
                   }
               });

           })

        }
    }]);
});
