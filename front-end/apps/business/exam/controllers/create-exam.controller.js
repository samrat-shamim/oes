define(['angular'], function (angular) {

  var exam = angular.module('exam').controller('createExamController',
    ['$scope', '$state', 'dataManupulator', '$q', "$uibModal", 'dataManupulator', 'identifier', "toastr", "examService",
      function (scope, $state, dataManupulator, $q, $uibModal, dataManupulator, identifier, toastr, examService) {

        scope.pageTitle = "Create Exam";
        scope.generateQuestionAuto = false;

        scope.examModel = {
          subject: "580de2b22b0786194c1ab760",
          difficultyLevel: "primary",
            needApproval: false
        };
        var subjects = [];

         scope.examSchema = [
         {
         key: 'subjectId',
         type: 'select',
         templateOptions: {
         label: 'Subject',
         placeholder: 'Select a subject',
         options: subjects,
         required: true
         }
         },
         {
         key: 'difficultyLevel',
         type: 'select',
         templateOptions: {
         label: 'Difficulty Level',
         placeholder: 'Select a level',
         options: [
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
         ],
         required: true
         }
         },
         {
         key: 'title',
         type: 'input',
         templateOptions: {
         type: 'text',
         label: 'Exam Title',
         placeholder: 'Enter the exam title',
         required: true
         }
         },
         {
         key: 'numberOfQuestion',
         type: 'input',
         templateOptions: {
         type: 'number',
         label: 'Number of Question',
         placeholder: 'Enter number of question',
         min: 5,
         required: true
         }
         },
         {
         key: 'schedule',
         type: 'datetimepicker',
         templateOptions: {
         label: 'Exam Schedule',
         required: true,
         datepickerPopup: 'dd-MMMM-yyyy'
         }
         },
         {
         key: 'duration',
         type: 'input',
         templateOptions: {
         type: 'number',
         label: 'Exam Duration',
         placeholder: 'Enter exam duration(minutes)',
         required: true,
         min:5
         }
         },
         {
         key: 'instructions',
         type: 'textarea',
         templateOptions: {
         type: 'textarea',
         label: 'Instructions',
         placeholder: 'Enter instructions'
         }
         },
             {
                 key: 'needApproval',
                 type: 'checkbox',
                 templateOptions: { label: '' },
                 expressionProperties: {
                     'templateOptions.label': function(){
                         return "Need approval?";
                     }
                 }
             },
             {
                 key: 'paymentAmount',
                 type: 'input',
                 expressionProperties: {
                     'templateOptions.placeholder': function(){
                         return "Payment Amount";
                     }
                 },
                 hideExpression: function () {
                     return !scope.examModel.needApproval;
                 },
                 templateOptions: {
                     label: 'Payment Amount',
                     placeholder: 'Enter payment amount',
                     type: "number"
                 }
             },
         ]
       /* scope.examSchema = [
          {
            key: 'subjectId',
            type: 'select',
            templateOptions: {
              label: 'Subject',
              placeholder: 'Select a subject',
              options: subjects
            }
          },
          {
            key: 'difficultyLevel',
            type: 'select',
            templateOptions: {
              label: 'Difficulty Level',
              placeholder: 'Select a level',
              options: [
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
            }
          },
          {
            key: 'title',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Exam Title',
              placeholder: 'Enter the exam title'
            }
          },
          {
            key: 'numberOfQuestion',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Number of Question',
              placeholder: 'Enter number of question',
              min: 5
            }
          },
          {
            key: 'schedule',
            type: 'datetimepicker',
            templateOptions: {
              label: 'Exam Schedule',
              required: true,
              datepickerPopup: 'dd-MMMM-yyyy'
            }
          },
          {
            key: 'duration',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Exam Duration',
              placeholder: 'Enter exam duration(minutes)',
                min:5
            }
          },
          {
            key: 'instructions',
            type: 'textarea',
            templateOptions: {
              type: 'textarea',
              label: 'Instructions',
              placeholder: 'Enter instructions'
            }
          }
        ]*/


        scope.createExam = function (auto) {
          if (auto) {
            getAllQuestion(scope.examModel.subject._id, scope.examModel.difficultyLevel).then(function (response) {
              if (response.length < (scope.examModel.numberOfQuestion * 2)) {
                toastr.warning("Please make this question manually!", "Insufficient question");
              } else {
                generateExamQuestion(response);

                dataManupulator.manupulate("insert", {entityName: "exam", entity: scope.examModel}).then(function (res) {
                  if(res.data.success){
                    toastr.success("Exam created", "Success!");
                    $state.go('all-exams');
                  }else{
                    toastr.error("Something went wrong, failed to create exam.", "Error");
                  }

                }, function (err) {
                  toastr.error("Something went wrong, failed to create exam.", "Error");
                });

              }
            });
          } else {
            showQuestionsToAddToExam();
          }
        }
        function showQuestionsToAddToExam() {
          examService.setQuestionFilter({
            subjectId: scope.examModel.subject,
            difficultyLevel: scope.examModel.difficultyLevel
          });
          examService.setExamToBeCreated(scope.examModel);
          showAddQuestionsToExamModal();
        }

        function showAddQuestionsToExamModal() {
          var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'apps/business/exam/views/add-questions-to-exam-modal.view.html',
            controller: 'addQuestionsToExamModalController'
          });
          examService.setModal(modal);
        }


        function generateExamQuestion(response) {
          var selectedQuestionIds = [];
          var totalQuestionCount = response.length;
          for (var i = 0; i < scope.examModel.numberOfQuestion; i++) {
            var index = Math.floor(Math.random() * --totalQuestionCount);
            selectedQuestionIds.push(response[index]._id);
            response.splice(index, 1);
          }
          scope.examModel.questions = selectedQuestionIds;
        }

        function getAllQuestion(subId, diffLevel) {
          var getManyQuestionFilter = {
            entityName: "question",
            pageNumber: 1,
            pageSize: 10000000,
            filters: {
              subjectId: subId,
              difficultyLevel: diffLevel
            }
          }
          return $q(function (resolve, reject) {
            dataManupulator.manupulate("getMany", getManyQuestionFilter).then(function (response) {
              resolve(response.data.data);
            }, function (error) {
              reject(error);
            })
          })

        }

        var getManySubjectFilter = {
          entityName: "subject",
          pageNumber: 1,
          pageSize: 10
        }


        function getAllSubject() {
          return $q(function (resolve, reject) {
            dataManupulator.manupulate("getMany", getManySubjectFilter).then(function (response) {
              response.data.data.forEach(function (item) {
                var subject = {
                  name: item.title,
                  value: item._id
                }
                subjects.push(subject);
              })
              resolve(subjects);
            }, function (err) {
              reject(err);
            })
          })
        }

        getAllSubject();

      }]);


  return exam;
});

