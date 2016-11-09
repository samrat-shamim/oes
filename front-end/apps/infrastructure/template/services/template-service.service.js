define(['angular'], function (angular) {

    angular.module('template').service('templateService', ['$http', "$rootScope","$q","identifier", function ($http, $rootScope,$q,identifier) {
        var config;
        var currentStateParams;


       this.websiteDetails = {
           title: "Account Information System"
       }

       this.sideNavbarDetails = {
           shouldShow: true,
           modules: [

           ]
       }

        this.roleWeight = {
            "visitor": 0,
            "examinee": 1,
            "examiner": 2,
            "coordinator":3,
            "admin": 4
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

        function setStateparams(params){
            currentStateParams = params;
            $rootScope.$broadcast("state-params-changed");
        }

        function getStateparams(){
            return currentStateParams;
        }

        this.setStateparams = setStateparams;
        this.getStateparams = getStateparams;
    }]);
});
