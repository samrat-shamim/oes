define(['angular'], function (angular) {

  var question = angular.module('exam').controller('addQuestionsToExamModalController',
    ['$scope', '$http','$state', "$uibModal", 'dataManupulator', 'examService',"toastr",
      function (scope, http,$state, $uibModal, dataManupulator, examService, toastr) {
        var questionFilter = examService.getQuestionFilter();

        var examToBeCreated;
        var modalInstance = examService.getModal();
        scope.loading = true;
        scope.totalItems = 0;
        scope.subjects = [];
        scope.pageSize = 10;
        var edit;
        var selectedQuestions = examService.questions;
        selectedQuestions? edit = true:edit=false;
        scope.totalSelected =selectedQuestions.length;
        scope.baseUrl = "http://localhost:3000/";
        scope.difficultyLevels = [
          {
            name: "Primary",
            value: "Primary"
          },
          {
            name: "Secondary",
            value: "Secondary"
          },
          {
            name: "Expert",
            value: "Expert"
          }
        ]

        scope.save = function () {
          examToBeCreated.questions = selectedQuestions;
          if(!edit){
            dataManupulator.manupulate("insert", {entityName: "exam", entity: examToBeCreated}).then(function (res) {
              toastr.success("Exam created", "Success!");
              $state.go("all-exams");
            }, function(err){
              toastr.error("Something went wrong", "Error!");
            })
          }else{
            var model = {
              entityName: "exam",
              entityId: examToBeCreated._id,
              entity: examToBeCreated
            }
            dataManupulator.manupulate("update", model).then(function (res) {
              toastr.success("Exam updated", "Success!");
              $state.go("all-exams");
            }, function(err){
              toastr.error("Something went wrong", "Error!");
            })
          }
          scope.cancel();
        }
        scope.selectToAdd = function (question) {
          if(question.selected){
            question.selected = false;
            var index = selectedQuestions.indexOf(question._id);
            index?selectedQuestions.splice(index, 1):true;
            scope.totalSelected--;
            scope.canSelect = true;
          }else{
            question.selected = true;
            scope.totalSelected++;
            selectedQuestions.push(question._id);
            scope.totalSelected>=scope.numberOfQuestionToNeeded?scope.canSelect = false:scope.canSelect = true;
          }
        }

        scope.loadQuestions = function () {
          questionFilter.difficultyLevel = scope.selectedDifficultyLevel.value;
          getAllQuestion();
        }


        var getManyFilter = {
          entityName: "question",
          pageNumber: 1,
          pageSize: 100000,
          sort: {},
          filters: questionFilter
        }

        var filter = {};
        scope.updateTableBySubject = function (flag) {
          if (flag) {
            filter.subjectId = scope.selectedSubject._id
          }
          else {
            delete filter.subjectId;
            scope.selectedSubject = null;

          }
          ;
          scope.loadMore(0, scope.pageSize, null, filter, null, null);

        }



        var getAllSubjectFilter = {
          entityName: "subject",
          pageNumber: 1,
          pageSize: 1000000
        }


        function getAllSubject() {
          dataManupulator.manupulate("getMany", getAllSubjectFilter).then(function (response) {
            scope.subjects = response.data.data;
          })
        }

        function getAllQuestion() {
          dataManupulator.manupulate("getMany", getManyFilter).then(function (response) {
            scope.allQuestions = response.data.data;
            scope.totalItems = response.data.totalCount;
            scope.loading = false;

            if (angular.isArray(scope.allQuestions)) {
              scope.allQuestions.forEach(function (item, index) {
                var index = selectedQuestions.indexOf(item._id);
                index>-1?item.selected = true: item.selected = false;
              })
            }
          })
        }

        //getAllQuestion();

        scope.pageTitle = "All Questions";

        scope.options = {
          scrollbarV: false
        };

        scope.cancel = function () {
          modalInstance.close();
        }


        function init() {
          getAllQuestion();
          examToBeCreated = examService.getExamToBeCreated();
          scope.numberOfQuestionToNeeded = examToBeCreated.numberOfQuestion;
          scope.canSelect = true;
        }

        init();
      }]);


  return question;
});

