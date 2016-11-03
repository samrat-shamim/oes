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
        var selectedQuestions = [];
        scope.totalSelected =0;
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
          dataManupulator.manupulate("insert", {entityName: "exam", entity: examToBeCreated}).then(function (res) {
            toastr.success("Exam created", "Success!");
            $state.go("all-exams");
          }, function(err){
            toastr.error("Something went wrong", "Error!");
          })
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

        scope.viewSelected = function () {
          examService.setQuestionToBeViewed(scope.selectedQuestions[0]);
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/question/views/view-question-modal.view.html',
            controller: 'viewQuestionController'
          });
          examService.setModal(modal);
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

        scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
          scope.loading = true;
          makePartialSearchFilter(filterByFields);
          getManyFilter.pageNumber = currentPage + 1;
          getManyFilter.pageSize = pageItems;
          getManyFilter.sort.sortBy = orderBy;
          getManyFilter.filters = filter;
          getAllQuestion();
          scope.selectedQuestions = [];
        }

        function makePartialSearchFilter(object) {
          for (var key in object) {
            filter[key] = {
              $regex: object[key]
            };
          }

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

