define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('showResultExamineeController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','identifier','examService',
          function (scope, http,$q,$rootScope, dataManupulator, identifier, examService) {

            scope.pageTitle = "Result";
            scope.baseUrl = "http://localhost:3000/";
            scope.bgColor = "background-color: BurlyWood";
            var examToBeViewed;
            var modalInstance;
            function init() {
              examToBeViewed = examService.getExamToBeViewed();
              modalInstance = examService.getModal();
              scope.exam = examToBeViewed;
              dataManupulator.manupulate("getById", {entityName: "subject", entityId: examToBeViewed.subjectId}).then(function (res) {
                scope.subject = res.data;
              })
              dataManupulator.manupulate("getMany", {entityName: "answer",
                filters:{"examId":examToBeViewed._id, "examineeId": identifier.identity().userId}, pageNumber:1, pageSize:1000}).then(function (res) {
                scope.answers = res.data.data[0];
              })
            }
            init();

            scope.cancel = function () {
              modalInstance.close();
            }
            function makeGetManyQuestionFilter(ids){
              var filter = [];
              ids.forEach(function (id) {
                filter.push(new ObjectId(id));
              })
              return filter;
            }


        }]);


    return exam;
});

