define(['angular'], function (angular) {

    var dynamicForm = angular.module('formly-app').controller('formlyController',
        ['$rootScope', '$scope', '$http', function ($rootScope, $scope, http) {

            var vm = this;
            console.log("1 " + vm.params);
            console.log("2 " + vm.params[1]);
            vm.userGivenData = vm.params[1];
            //console.log("Pre populated " + vm.userGivenData);
            vm.formInatiatingData = vm.params;
           // console.log("Pre populated " + vm.formInatiatingData.prepopulatedData.FirstName);

            //console.log("In dynamic-form controller : formInatiatingData " + vm.params);
            
            $scope.submitForm = function (formData) {
               // console.log(formData);
                dynamicFormService.setData(formData);
                $rootScope.$broadcast('submitedData');
            }
        }]);

    return dynamicForm;
});

