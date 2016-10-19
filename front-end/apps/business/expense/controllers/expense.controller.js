define(['angular'], function (angular) {


    angular.module('expense').controller('expenseController',
        ['$rootScope', '$scope', '$http', 'dynamicFormService', function ($rootScope, $scope, http, dynamicFormService) {

            $scope.message = "expense";

            
            $scope.formInatiatingData = [
                apiUrl = "nkjsdnfljkdsnflkjdslkfndlskflmdsnfldsnflk",
                prepopulatedData = {
                    FirstName: "Ishmam",
                    Age: 23,
                    Password: "iit123",
                    School: "MGBHS",
                    Country: "Bangladesh",
                    Cow: "wertwerewre",
                    Sex: "Male",
                    Car: "Zahir Mototrs",
                    Fruit: {
                        Banana: true,
                        mango: true
                    },
                    Language: {
                        bangla: true,
                        arbi: true
                    }

                },
                {
                    type: "text",
                    fieldName: "FirstName"
                },
                {
                    type: "number",
                    fieldName: "Age",
                    min: 1,
                    max: 100
                },
                {
                    type: "password",
                    fieldName: "Password"
                },
                {
                    type: "text",
                    fieldName: "School"
                },
                {
                    type: "radio",
                    fieldName: "Country",
                    value: ["Bangladesh", "India", "Pakistan"]
                },
                {
                    type: 'radio',
                    fieldName: "Sex",
                    value: ["Male", "Female"]
                },
                {
                    type: "dropDown",
                    fieldName: "Car",
                    value: ["Vovo", "Suzuki", "Zahir Mototrs"]
                },
                {
                    type: "textArea",
                    fieldName: "Cow",
                    rows: 10,
                    cols: 30

                },
                {
                    type: "checkList",
                    fieldName: "Fruit",
                    list: [
                        {
                            id: 1,
                            value: "mango"
                        },
                        {
                            id: 2,
                            value: "Banana"
                        },
                        {
                            id: 3,
                            value: "Jackfruit"
                        }
                    ]
                },
                {
                    type: "checkList",
                    fieldName: "Language",
                    list: [
                        {
                            id: 1,
                            value: "bangla"
                        },
                        {
                            id: 2,
                            value: "english"
                        },
                        {
                            id: 3,
                            value: "arbi"
                        }
                    ]
                }
                
            ];
            console.log("In expense controller : formInatiatingData " + $scope.formInatiatingData[0]);

            $scope.$on('submitedData', function () {
                submitUserGivenData(dynamicFormService.getData());
             });

             var submitUserGivenData = function (userGivenData) {
                 console.log("Before calling post method");
                 console.log(userGivenData);
             }
            
        }]);
});

