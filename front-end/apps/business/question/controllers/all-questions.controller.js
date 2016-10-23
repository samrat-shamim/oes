define(['angular'], function (angular) {

    var question = angular.module('question').controller('questionsController',
        ['$scope', '$http','dataManupulator', function (scope, http, dataManupulator) {

            var getManyFilter = {
                entityName: "question",
                pageNumber:1,
                pageSize: 10
            }



            function getAllQuestion(){
                dataManupulator.manupulate("getMany", getManyFilter).then(function(response){
                    console.log(response.data.data);
                    scope.myItems = response.data.data;
                })
            }
            getAllQuestion();

            scope.pageTitle = "All Questions";
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


    return question;
});

