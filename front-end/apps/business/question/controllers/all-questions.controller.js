define(['angular'], function (angular) {

    var question = angular.module('question').controller('questionsController',
        ['$scope', '$http','dataManupulator', function (scope, http, dataManupulator) {

            var getManyFilter = {
                entityName: "question",
                pageNumber:2,
                pageSize: 10
            }



            function getAllQuestion(){
                dataManupulator.manupulate("getMany", getManyFilter).then(function(response){
                    scope.allQuestions = response.data.data;
                })
            }
            getAllQuestion();

            scope.pageTitle = "All Questions";

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

