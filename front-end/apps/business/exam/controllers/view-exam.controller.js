define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('viewExamController',
        ['$scope', '$http','$q',"$rootScope",'dataManupulator','FileUploader','examService',
          function (scope, http,$q,$rootScope, dataManupulator, FileUploader, examService) {

            scope.pageTitle = "Create Exam";
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
              dataManupulator.manupulate("getMany", {entityName: "question", filters:{"_id":{$in:examToBeViewed.questions}}, pageNumber:1, pageSize:1000}).then(function (res) {
                scope.questions = res.data.data;
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

