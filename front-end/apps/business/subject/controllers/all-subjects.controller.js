define(['angular'], function (angular) {

    var subject = angular.module('subject').controller('subjectsController',
        ['$scope', '$http','dataManupulator', function (scope, http, dataManupulator) {

            var getManyFilter = {
                entityName: "subject",
                pageNumber:1,
                pageSize: 10
            }



            function getAllSubject(){
                dataManupulator.manupulate("getMany", getManyFilter).then(function(response){
                    scope.myItems = response.data.data;
                })
            }
          getAllSubject();

            scope.pageTitle = "All Subjects";
            /*scope.myItems = [{name: "Moroni", age: 50},
                {name: "Tiancum", age: 43},
                {name: "Jacob", age: 27},
                {name: "Nephi", age: 29},
                {name: "Enos", age: 99}];*/

            scope.options = {
                scrollbarV: false
            };

            scope.data = [
                { name: 'Austin', gender: 'Male' },
                { name: 'Marjan', gender: 'Male' }
            ];
        }]);


    return subject;
});

