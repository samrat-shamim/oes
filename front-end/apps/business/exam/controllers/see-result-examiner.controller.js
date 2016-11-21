define(['angular'], function (angular) {

  var exam = angular.module('exam').controller('seeResultExaminerController',
    ['$scope', '$state', '$q', "toastr", 'dataManupulator', 'examService',
      function (scope, $state, $q, toastr, dataManupulator, examService) {
        var xlxJSON = [];

        scope.pageTitle = "Result";
        scope.baseUrl = "http://localhost:3000/";
        scope.bgColor = "background-color: BurlyWood";
        var examToBeViewed;
        var modalInstance;
        var results = [];

        function init() {
          examToBeViewed = examService.getExamToBeViewed();
          modalInstance = examService.getModal();
          scope.exam = examToBeViewed;
          dataManupulator.manupulate("getById", {
            entityName: "subject",
            entityId: examToBeViewed.subjectId
          }).then(function (res) {
            scope.subject = res.data;
          })
          var connectionFilter = {
            filters: {
              childEntityId: examToBeViewed._id,
              childEntityName: "exam",
              parentEntityName: "user",
              tags: "taken"
            },
            pageNumber: 1,
            pageSize: 20000
          }
          dataManupulator.getConnections(connectionFilter).then(function (res) {
            var connections = res.data.data;
            if (connections.length <= 0) {
              toastr.error("No one has taken this exam", "Not Taken!");
              scope.cancel();
              $state.go("all-exams");
            } else {
              var examIds = [], examineeIds = [], exams = [], examinees = [];
              connections.forEach(function (item, index) {
                examIds.push(item.childEntityId);
                examineeIds.push(item.parentEntityId);
              })
              dataManupulator.manupulate("getMany", {
                entityName: "exam",
                filters: {_id: {$in: examIds}}
              }).then(function (res) {
                var response = res.data.data;
                response.forEach(function (item) {
                  exams[item._id] = item;
                });
                dataManupulator.manupulate("getMany", {
                  entityName: "user",
                  filters: {_id: {$in: examineeIds}}
                }).then(function (res) {
                  var response = res.data.data;
                  response.forEach(function (item) {
                    examinees[item._id] = item;
                  });
                  dataManupulator.manupulate("getMany", {
                    entityName: "answer",
                    filters: {examId: {$in: examIds}, examineeId: {$in: examineeIds}}
                  }).then(function (res) {
                    var response = res.data.data;
                    response.forEach(function (item) {
                      var result = {};
                      result.exam = exams[item.examId];
                      result.examinee = examinees[item.examineeId];
                      result.answer = item;
                      results.push(result);
                    });
                    scope.allResults = results;
                    scope.allResults.forEach(function (item) {
                      var json = {
                        Name:item.examinee.userName,
                        Email: item.examinee.userEmail,
                        Answered: item.answer.totalAnswered,
                        Correct: item.answer.totalCorrect
                      }
                      xlxJSON.push(json);
                    })
                  })
                })
              })
            }
          }, function (err) {
            console.log(err);
          })
        }

        init();

        scope.cancel = function () {
          modalInstance.close();
        }
        function makeGetManyQuestionFilter(ids) {
          var filter = [];
          ids.forEach(function (id) {
            filter.push(new ObjectId(id));
          })
          return filter;
        }

        /*scope.exportData = function () {
         var blob = new Blob([document.getElementById('exportable').innerHTML], {
         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
         });
         saveAs(blob, "Report");
         }*/
        scope.exportData = function () {
          alasql('SELECT * INTO XLSX("result-' + examToBeViewed.title +'.xlsx",{headers:true}) FROM ?', [xlxJSON]);
        };


      }]);


  return exam;
});

