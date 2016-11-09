﻿define(['angular'], function (angular) {

  var exam = angular.module('exam').controller('examsController',
    ['$scope', '$state', "$uibModal", 'dataManupulator', 'examService','templateService','identifier',
      function (scope, $state, $uibModal, dataManupulator, examService, templateService, identifier) {
        scope.totalItems = 0;
        scope.subjects = [];
        scope.pageSize = 10;
        scope.selectedExams = [];
        var examDate;
        var dateNow = Date.now();
        scope.$watchCollection("selectedExams", function () {
          scope.canApply = false;
          scope.canTake = false;
          scope.seeResult = false;
          if (scope.selectedExams.length == 1) {
            scope.showMenu = true;
            scope.multiSelect = false;
            var timeOk;
            examDate = new Date(scope.selectedExams[0].schedule);
            examDate = examDate.getTime();
            timeOk = examDate<=dateNow;
            if(scope.selectedExams[0].taken){
              scope.seeResult = true;
            } else if(timeOk && (scope.selectedExams[0].approved || !scope.selectedExams[0].needApproval)){
              scope.canTake = true;
            } else if(!timeOk && scope.selectedExams[0].needApproval && !scope.selectedExams[0].applied){
              scope.canApply = true;
            }
          } else if (scope.selectedExams.length > 1) {
            scope.showMenu = true;
            scope.multiSelect = true;
          } else scope.showMenu = false;
        });
        scope.$on("exam-deleted", function (e, arg) {
          if (arg.ids) {
            arg.ids.forEach(function (id) {
              scope.allExams.forEach(function (item, index) {
                if (item._id == id) {
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
        function canTakeExam(){
          if(scope.roleWeight!=1){
            return false;
          }
          var ex = scope.selectedExams[0];
          var timeOk;
          examDate = new Date(ex.schedule);
          examDate = examDate.getTime();
          timeOk = examDate<=dateNow;
          if(timeOk){
            if(ex.needApproval){
              return checkApproval(ex);
            } else{
              return true;
            }
          } else{
            checkApproval(ex, false);
          }
        }

        function checkApproval(ex, timeOk){
          if(!ex.applied) scope.shouldApply = true;
          if(ex.approved) return false;
          return true;
        }
        scope.editSelected = function () {
          examService.setExamToBeEdited(scope.selectedExams[0]);
          $state.go('edit-exam');
        }
        scope.viewSelected = function () {
          examService.setExamToBeViewed(scope.selectedExams[0]);
          var modal = $uibModal.open({
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
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/exam/views/delete-exam-confirmation-modal.view.html',
            controller: 'deleteExamController'
          });
          examService.setModal(modal);
        }

        scope.apply = function(){
          examService.setExamToBeViewed(scope.selectedExams[0]);
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/exam/views/apply-for-exam-modal.view.html',
            controller: 'applyForExamController'
          });
          examService.setModal(modal);

        }

        var getManyFilter = {
          entityName: "exam",
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
          ;
          scope.loadMore(0, 10, null, filter, null, null);

        }

        scope.loadMore = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
          scope.loading = true;
          makePartialSearchFilter(filterByFields);
          getManyFilter.pageNumber = currentPage + 1;
          getManyFilter.pageSize = pageItems;
          getManyFilter.sort.sortBy = orderBy;
          getManyFilter.filters = filter;
          if(scope.roleWeight==1 && scope.initLoad)getManyFilter.filters['schedule'] = {"$gt":Date.now()};
          scope.initLoad = false;
          getAllExam();
          scope.selectedExams = [];
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

        function getAllExam() {
          dataManupulator.manupulate("getMany", getManyFilter).then(function (response) {
            scope.allExams = response.data.data;
            scope.totalItems = response.data.totalCount;
            scope.loading = false;
            if (angular.isArray(scope.allExams)) {
              scope.allExams.forEach(function (item, index) {
                dataManupulator.manupulate("getById", {
                  entityName: 'subject',
                  entityId: item.subjectId
                }).then(function (res) {
                  scope.allExams[index].subject = res.data.title;
                })
              });
              if(scope.roleWeight==1) {
                checkApplications();
                checkApproved();
                checkTaken();
              }
            }
          })
        }

        function checkApplications(next){
          var getAppliedConnectionFilter = {
            pageNumber: 1,
            pageSize: 100000,
            expandParent: false,
            expandChild: false,
            filters: {
              childEntityName: "exam",
              parentEntityName: "user",
              parentEntityId: identifier.identity().userId,
              tags: "applied"
            }
          }
          dataManupulator.getConnections(getAppliedConnectionFilter).then(function (res) {
            var connections = res.data.data;
           if(next){
             scope.appliedExamIds = [];
             connections.forEach(function (con) {
               scope.appliedExamIds.push(con.childEntityId);
             })

             getManyFilter.filters['_id'] = {"$in": scope.appliedExamIds};
             next();
           } else{

             if(angular.isArray(connections)){
               connections.forEach(function (item) {
                 if(angular.isArray(scope.allExams)){
                   scope.allExams.forEach(function (exam) {
                     if(item.childEntityId == exam._id){
                       exam.applied = true;
                     }
                   })
                 }
               })
             }
           }
          }, function (err) {
            console.log(err);
          });
        }
        function checkTaken(next){
          var getAppliedConnectionFilter = {
            pageNumber: 1,
            pageSize: 100000,
            expandParent: false,
            expandChild: false,
            filters: {
              childEntityName: "exam",
              parentEntityId: identifier.identity().userId,
              parentEntityName: "user",
              tags: "taken"
            }
          }
          dataManupulator.getConnections(getAppliedConnectionFilter).then(function (res) {
            var connections = res.data.data;
            if(next){
              scope.takenExamIds = [];
              connections.forEach(function (con) {
                scope.takenExamIds.push(con.childEntityId);
              })

              getManyFilter.filters['_id'] = {"$in": scope.takenExamIds};
              next();
            } else{

              if(angular.isArray(connections)){
                connections.forEach(function (item) {
                  if(angular.isArray(scope.allExams)){
                    scope.allExams.forEach(function (exam) {
                      if(item.childEntityId == exam._id){
                        exam.taken = true;
                      }
                    })
                  }
                })
              }
            }
          }, function (err) {
            console.log(err);
          });
        }
        function checkApproved(next){
          var getAppliedConnectionFilter = {
            pageNumber: 1,
            pageSize: 100000,
            expandParent: false,
            expandChild: false,
            filters: {
              childEntityName: "exam",
              parentEntityId: identifier.identity().userId,
              parentEntityName: "user",
              tags: "approved"
            }
          }
          dataManupulator.getConnections(getAppliedConnectionFilter).then(function (res) {
            var connections = res.data.data;
            if(next){
              scope.approvedExamIds = [];
              connections.forEach(function (con) {
                scope.approvedExamIds.push(con.childEntityId);
              })

              getManyFilter.filters['_id'] = {"$in": scope.approvedExamIds};
              next();
            } else{

              if(angular.isArray(connections)){
                connections.forEach(function (item) {
                  if(angular.isArray(scope.allExams)){
                    scope.allExams.forEach(function (exam) {
                      if(item.childEntityId == exam._id){
                        exam.approved = true;
                      }
                    })
                  }
                })
              }
            }
          }, function (err) {
            console.log(err);
          });
        }

        //getAllExam();

        scope.pageTitle = "All Exams";

        scope.options = {
          scrollbarV: false
        };


        function init() {
          getAllSubject();
          scope.initLoad = true;
        }

        if(identifier.identity()){
          scope.roleWeight = templateService.roleWeight[identifier.identity().roles[0]];
        } else{
          scope.$on("authenticated", function () {
            scope.roleWeight = templateService.roleWeight[identifier.identity().roles[0]];
            if(scope.roleWeight==1){
              getManyFilter.filters['schedule'] = {"$gt":Date.now()};            }
          })
        }

        scope.$on("state-params-changed", function () {
          scope.selectedExams = [];
          if(templateService.getStateparams() == "upcoming"){
            getManyFilter.filters = {};
            getManyFilter.filters['schedule'] = {"$gt":Date.now()};
            getAllExam();
          } else if(templateService.getStateparams() == "taken"){
            getManyFilter.filters = {};
            checkTaken(getAllExam);
          }else if(templateService.getStateparams() == "applied"){
            getManyFilter.filters = {};
            checkApplications(getAllExam);
            ;
          }
        })


        init();
      }]);


  return exam;
});

