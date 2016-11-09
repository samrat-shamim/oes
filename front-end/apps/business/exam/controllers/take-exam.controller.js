define(['angular'], function (angular) {

  var exam = angular.module('exam').controller('takeExamController',
    ['$scope', '$state', '$q', "$rootScope", "$uibModal", 'dataManupulator', 'examService','identifier',
      function (scope, $state, $q, $rootScope, $uibModal, dataManupulator, examService,identifier) {

        scope.pageTitle = "Take Exam";
        scope.baseUrl = "http://localhost:3000/";
        scope.bgColor = "background-color: BurlyWood;text-align:center;";
        var examToBeTaken;
        var questionIds = [], answers = [];
        var userInfo = identifier.identity();

        scope.startExam = function () {
          scope.examStarted = true;
          scope.examFinished = false;
          scope.fullScreanClass = "exam-full-screen";
          preventWindowChange();
        }

        scope.setAnswer = function (question, answer) {
          question.ca==answer? question.ca= null: question.ca = answer;
        }

        scope.stopProgress = function () {
          scope.examStarted = false;
        }

        scope.submit = function () {
          scope.examFinished = true;
          scope.result = calculateResult();
          saveAnswerToDB();
        }

        function saveAnswerToDB() {
          var connectionModel = {
            parentEntityId : identifier.identity().userId,
            childEntityId: examToBeTaken._id,
            parentEntityName: "user",
            childEntityName: "exam",
            tags: ["taken"]
          }
          dataManupulator.connect(connectionModel).then(function (res) {
          }, function (err) {
            console.log(err);
          })

          var answerModel = {
            entityName: "answer",
            entity: {
              examineeId: userInfo.userId,
              examId: scope.exam._id,
              questions: questionIds,
              answers: answers,
              totalCorrect: scope.result.correctAnswer,
              totalWrong: scope.result.wrongAnswer,
              totalAnswered: scope.result.totalAnswered
            }
          };

          dataManupulator.manupulate("insert", answerModel);

        }

        function calculateResult() {
          var totalCorrect=0;
          var totalWrong = 0;
          scope.questions.forEach(function (question) {
            if (question.ca == 'a' && question.correctAnswer == "optionA") {
              question.correct = true;
              totalCorrect++;
            } else if (question.ca == 'b' && question.correctAnswer == "optionB") {
              question.correct = true;
              totalCorrect++;
            } else if (question.ca == 'c' && question.correctAnswer == "optionC") {
              question.correct = true;
              totalCorrect++;
            } else if (question.ca == 'd' && question.correctAnswer == "optionD") {
              question.correct = true;
              totalCorrect++;
            }else if(question.ca){
              totalWrong++;
            } else {
              question.correct = false;
            }

            questionIds.push(question._id);
            answers.push(question.ca);
          })
          scope.resultCalculated = true;
          return {
            correctAnswer: totalCorrect,
            wrongAnswer: totalWrong,
            totalAnswered: totalCorrect+totalWrong
          }
        }

        scope.goToAllExams = function () {
          $state.go("all-exams");
        }

        function init() {
          examToBeTaken = examService.getExamToBeTaken();
          examToBeTaken ? scope.exam = examToBeTaken : $state.go('all-exams');
          dataManupulator.manupulate("getMany", {
            entityName: "question",
            filters: {"_id": {$in: examToBeTaken.questions}},
            pageNumber: 1,
            pageSize: 1000
          }).then(function (res) {
            scope.questions = res.data.data;
          })
        }

        init();

        function showConfirmLeavePageModal() {
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/exam/views/leave-page-confirmation-modal.view.html',
            controller: 'leavePageConfirmationController'
          });
          examService.setModal(modal);
        }

        function preventWindowChange() {
          //jquery code
          confirm('If you change the window, you answer will be submitted without notification!');
          $(window).blur(function (e) {
            scope.submit();
          });
          $(window).resize(function (e) {
            scope.submit();
          });
        }
      }]);


  return exam;
});

