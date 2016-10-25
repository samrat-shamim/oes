define(['angular'], function (angular) {

    var question = angular.module('question').controller('questionsController',
        ['$scope', '$http','dataManupulator', function (scope, http, dataManupulator) {
          scope.totalItems=0;
          scope.subjects = [];

            var getManyFilter = {
                entityName: "question",
                pageNumber:1,
                pageSize: 8,
                sort:{},
                filters:{}
            }

          var filter={
            subjectId: scope.selectedSubject
          };
          scope.updateTable = function () {
            console.log(filter);
            console.log("here");
          }

            scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
              makePartialSearchFilter(filterByFields);
              getManyFilter.pageNumber = currentPage+1;
              getManyFilter.pageSize = pageItems;
              getManyFilter.sort.sortBy = orderBy;
              getManyFilter.filters = filter;
              getAllQuestion();
              console.log("get more");
            }

            function makePartialSearchFilter(object) {
              for(var key in object){
                filter[key] = {
                  $regex:object[key]
                };
              }

            }

          var getAllSubjectFilter = {
            entityName: "subject",
            pageNumber:1,
            pageSize: 1000000
          }



          function getAllSubject(){
            dataManupulator.manupulate("getMany", getAllSubjectFilter).then(function(response){
              scope.subjects = response.data.data;
            })
          }

            function getAllQuestion(){
                dataManupulator.manupulate("getMany", getManyFilter).then(function(response){
                    scope.allQuestions = response.data.data;
                  scope.totalItems = response.data.totalCount;

                  scope.allQuestions.forEach(function (item, index) {
                    dataManupulator.manupulate("getById",{entityName: 'subject', entityId: item.subjectId}).then(function (res) {
                      scope.allQuestions[index].subject = res.data.title;
                    })
                  })
                })
            }
            //getAllQuestion();

            scope.pageTitle = "All Questions";

            scope.options = {
                scrollbarV: false
            };

            scope.data = [
                { name: 'Austin', gender: 'Male' },
                { name: 'Marjan', gender: 'Male' }
            ];

          function init() {
            getAllSubject();
          }
          init();
        }]);


    return question;
});

