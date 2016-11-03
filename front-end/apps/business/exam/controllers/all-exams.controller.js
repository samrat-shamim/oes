define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('examsController',
        ['$scope', '$state',"$uibModal",'dataManupulator','examService',
          function (scope, $state,$uibModal, dataManupulator, examService) {
          scope.totalItems=0;
          scope.subjects = [];
            scope.pageSize = 10;
            scope.selectedExams = [];
            scope.$watchCollection("selectedExams", function(){
                if(scope.selectedExams.length==1){
                    scope.showMenu = true;
                    scope.multiSelect = false;
                }else if(scope.selectedExams.length>1){
                    scope.showMenu = true;
                    scope.multiSelect = true;
                }else scope.showMenu = false;
            });

            scope.$on("exam-deleted", function (e, arg) {
              if(arg.ids){
                arg.ids.forEach(function (id) {
                  scope.allExams.forEach(function (item, index) {
                    if (item._id == id){
                      delete scope.allExams[index];
                      scope.totalItems--;
                        scope.selectedExams = [];
                    }
                  })
                })
              }
            })

              scope.takeExam = function () {
                  examService.setExamToBeTaken(scope.selectedExams[0]);
                  $state.go("take-exam");
              }

            scope.editSelected = function () {
              examService.setExamToBeEdited(scope.selectedExams[0]);
             var modal= $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'apps/business/exam/views/edit-exam-modal.view.html',
                controller: 'editExamController'
              });
              examService.setModal(modal);
            }
            scope.viewSelected = function () {
              examService.setExamToBeViewed(scope.selectedExams[0]);
              var modal= $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'apps/business/exam/views/view-exam-modal.view.html',
                controller: 'viewExamController'
              });
              examService.setModal(modal);
            }

            scope.deleteSelected = function () {
              examService.setExamsToBeDeleted(scope.selectedExams);
              var modal= $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'apps/business/exam/views/delete-exam-confirmation-modal.view.html',
                controller: 'deleteExamController'
              });
              examService.setModal(modal);
            }

            var getManyFilter = {
                entityName: "exam",
                pageNumber:1,
                pageSize: scope.pageSize,
                sort:{},
                filters:{}
            }

          var filter={};
          scope.updateTableBySubject = function (flag) {
              if(flag){
                  filter.subjectId = scope.selectedSubject._id
              }
              else{
                  delete filter.subjectId;
                  scope.selectedSubject = null;

              };
              scope.loadMore(0, 10,null, filter,null, null);

          }

          scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
              scope.loading = true;
              makePartialSearchFilter(filterByFields);
              getManyFilter.pageNumber = currentPage+1;
              getManyFilter.pageSize = pageItems;
              getManyFilter.sort.sortBy = orderBy;
              getManyFilter.filters = filter;
              getAllExam();
            scope.selectedExams = [];
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

            function getAllExam(){
                dataManupulator.manupulate("getMany", getManyFilter).then(function(response){
                    scope.allExams = response.data.data;
                  scope.totalItems = response.data.totalCount;
                    scope.loading= false;
                    if(angular.isArray(scope.allExams)){
                        scope.allExams.forEach(function (item, index) {
                            dataManupulator.manupulate("getById",{entityName: 'subject', entityId: item.subjectId}).then(function (res) {
                                scope.allExams[index].subject = res.data.title;
                            })
                        })
                    }
                })
            }
            //getAllExam();

            scope.pageTitle = "All Exams";

            scope.options = {
                scrollbarV: false
            };



          function init() {
              getAllSubject();
          }
          init();
        }]);


    return exam;
});

