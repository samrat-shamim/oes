define(['angular'], function (angular) {

  var question = angular.module('exam').controller('addQuestionsToExamModalController',
    ['$scope', '$http', "$uibModal", 'dataManupulator', 'examService',
      function (scope, http, $uibModal, dataManupulator, examService) {
        var questionFilter = examService.getQuestionFilter();
        var examToBeCreated;
        scope.loading = true;
        scope.totalItems = 0;
        scope.subjects = [];
        scope.pageSize = 10;
        scope.selectedQuestions = [];
        scope.baseUrl = "http://localhost:3000/";
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
        scope.save = function () {
          scope.allQuestions.forEach(function (item) {
            item.selected ? scope.selectedQuestions.push(item._id) : true;
          })

          console.log(scope.selectedQuestions);
          scope.cancel();
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
            console.log(scope.allQuestions);

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

        scope.cancel = function () {
          modalInstance.close();
        }


        function init() {
          getAllQuestion();
          examToBeCreated = examService.getExamToBeCreated();
        }

        init();
      }]);


  return question;
});

