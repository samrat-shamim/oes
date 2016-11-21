define(['angular'], function (angular) {

    var question = angular.module('question').controller('importQuestionController',
        ['$scope','$state', 'identifier','$q','dataManupulator','FileUploader', 'toastr',"$timeout",
            function (scope,$state, identifier,$q, dataManupulator, FileUploader, toastr,$timeout) {

            scope.pageTitle = "Import Question";
              var csvQuestions = [];

              scope.importQuestion = function () {
                csvQuestions.forEach(function (item) {
                  dataManupulator.manupulate("insert", {entityName: "question", entity: item});
                })
                scope.working = true;
                $timeout(function () {
                  $state.go('all-questions');
                }, 1000);
              }

              scope.onFileUpload = function (element) {
                scope.$apply(function (scope) {
                  var file = element.files[0];
                  var fileReader = new FileReader();
                    fileReader.readAsText(file);

                  fileReader.onload = function (e) {
                    var csvData = Papa.parse(e.target.result).data;
                    var headers = csvData[0];
                    var headersNeeded = ["subjectId","difficultyLevel","title","optionA","optionB","optionC", "optionD", "correctAnswer"];
                    var docAllowed = arraysIdentical(headers,headersNeeded );
                    csvData.forEach(function (item, index) {
                      if(index==0)return;
                      var json = {
                        subjectId: item[0],
                        difficultyLevel: item[1],
                        title: item[2],
                        optionA: item[3],
                        optionB: item[4],
                        optionC: item[5],
                        optionD: item[6],
                        correctAnswer: item[7]
                      }
                      csvQuestions.push(json);
                    })
                    console.log(csvQuestions);
                  };
                });
              };
              function arraysIdentical(a, b) {
                var i = a.length;
                if (i != b.length) return false;
                while (i--) {
                  if (a[i] !== b[i]) return false;
                }
                return true;
              };

        }]);


    return question;
});

