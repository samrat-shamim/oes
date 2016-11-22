define(['angular'], function (angular) {

  var question = angular.module('question').controller('questionsController',
    ['$scope', '$http', "$uibModal", 'dataManupulator', 'questionService',
      function (scope, http, $uibModal, dataManupulator, questionService) {
        scope.loading = true;
        scope.totalItems = 0;
        scope.subjects = [];
        scope.pageSize = 10;
        scope.selectedQuestions = [];
        scope.$watchCollection("selectedQuestions", function () {
          if (scope.selectedQuestions.length == 1) {
            scope.showMenu = true;
            scope.multiSelect = false;
          } else if (scope.selectedQuestions.length > 1) {
            scope.showMenu = true;
            scope.multiSelect = true;
          } else scope.showMenu = false;
        });

        scope.$on("question-deleted", function (e, arg) {
          if (arg.ids) {
            arg.ids.forEach(function (id) {
              scope.allQuestions.forEach(function (item, index) {
                if (item._id == id) {
                  delete scope.allQuestions[index];
                  scope.totalItems--;
                  scope.selectedQuestions = [];
                }
              })
            })
          }
        })

        scope.editSelected = function () {
          questionService.setQuestionToBeEdited(scope.selectedQuestions[0]);
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/question/views/edit-question-modal.view.html',
            controller: 'editQuestionController'
          });
          questionService.setModal(modal);
        }
        scope.viewSelected = function () {
          questionService.setQuestionToBeViewed(scope.selectedQuestions[0]);
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/question/views/view-question-modal.view.html',
            controller: 'viewQuestionController'
          });
          questionService.setModal(modal);
        }

        scope.deleteSelected = function () {
          questionService.setQuestionsToBeDeleted(scope.selectedQuestions);
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/question/views/delete-question-confirmation-modal.view.html',
            controller: 'deleteQuestionController'
          });
          questionService.setModal(modal);
        }

        var getManyFilter = {
          entityName: "question",
          pageNumber: 1,
          pageSize: scope.pageSize,
          sort: {},
          filters: {}
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
          scope.cleared = true;
          scope.loadMore(0, scope.pageSize, null, filter, null, null);

        }

        scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
          scope.loading = true;
          if(!scope.cleared){
            makePartialSearchFilter(filterByFields);
          }else{
            scope.cleared = false;
          }
          getManyFilter.pageNumber = currentPage + 1;
          getManyFilter.pageSize = pageItems;
          getManyFilter.sort.sortBy = orderBy || orderByReverse;
          getManyFilter.sort.sortOrder = orderBy?"dsc":"asc";
          getManyFilter.filters = filter;
          getAllQuestion();
          scope.selectedQuestions = [];
        }

        function makePartialSearchFilter(object) {
          filter = {};
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
                dataManupulator.manupulate("getById", {
                  entityName: 'subject',
                  entityId: item.subjectId
                }).then(function (res) {
                  scope.allQuestions[index].subject = res.data.title;
                })
              })
            }
          })
        }

        //getAllQuestion();

        scope.pageTitle = "All Questions";

        scope.options = {
          scrollbarV: false
        };

        scope.data = [
          {name: 'Austin', gender: 'Male'},
          {name: 'Marjan', gender: 'Male'}
        ];

        function init() {
          getAllSubject();
        }

        scope.exportQuestions = function () {
          var csvJson = [];
          scope.selectedQuestions.forEach(function (item) {
            var json = {
              subjectId: item.subjectId,
              difficultyLevel: item.difficultyLevel,
              title: item.title,
              optionA: item.optionA,
              optionB: item.optionB,
              optionC: item.optionC,
              optionD: item.optionD,
              correctAnswer: item.correctAnswer
            }
            csvJson.push(json);
          })
          alasql('SELECT * INTO CSV("questions.csv",{headers:true}) FROM ?', [csvJson]);
        }

        init();
      }]);


  return question;
});

