define(['angular'], function (angular) {

    var exam = angular.module('exam').controller('takeExamController',
        ['$scope', '$state','$q',"$rootScope","$uibModal",'dataManupulator','examService',
          function (scope, $state,$q,$rootScope,$uibModal, dataManupulator, examService) {

            scope.pageTitle = "Take Exam";
            scope.baseUrl = "http://localhost:3000/";
            scope.bgColor = "background-color: BurlyWood;text-align:center;";
            var examToBeTaken;

            scope.startExam = function () {
              scope.examStarted = true;
              scope.examFinished = false;
              scope.fullScreanClass ="exam-full-screen";
              preventWindowChange();
            }

            scope.stopProgress = function() {
              scope.examStarted = false;
            }
            function init() {
              examToBeTaken = examService.getExamToBeTaken();
              examToBeTaken? scope.exam = examToBeTaken:$state.go('all-exams');
              dataManupulator.manupulate("getMany", {entityName: "question", filters:{"_id":{$in:examToBeTaken.questions}}, pageNumber:1, pageSize:1000}).then(function (res) {
                scope.questions = res.data.data;
              })
            }
            init();

            function showConfirmLeavePageModal(){
              var modal = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-top',
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'apps/business/exam/views/leave-page-confirmation-modal.view.html',
                controller: 'leavePageConfirmationController'
              });
              examService.setModal(modal);
            }

            function preventWindowChange(){
              //jquery code
              $(window).blur(function(e) {
                e.stopImmediatePropagation();
                if(!scope.examFinished)
                   e.preventDefault();
                if(confirm('If you change the window, you answer will be submitted!')){
                  scope.examFinished = true;
                  $state.go('all-exams');
                } else{
                  console.log("canceled");
                }

              });
            }


        }]);


    return exam;
});

