define(['angular'], function (angular) {

    var question = angular.module('question').controller('createQuestionController',
        ['$scope', '$http','dataManupulator','FileUploader', function (scope, http, dataManupulator, FileUploader) {

            scope.pageTitle = "Create Question";

            scope.uploader = new FileUploader({
                url: "http://localhost:3000/upload"
            });

            scope.questionModel = {};

            scope.questionSchema = [
                {
                    key: 'title',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Question Title',
                        placeholder: 'Enter the question',
                        required: true
                    }
                },
                {
                    key: 'optionA',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option A',
                        placeholder: 'Enter option A',
                        required: true
                    }
                },
                {
                    key: 'optionB',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option B',
                        placeholder: 'Enter option B',
                        required: true
                    }
                },
                {
                    key: 'optionC',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option C',
                        placeholder: 'Enter option C',
                        required: true
                    }
                },
                {
                    key: 'optionD',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Option D',
                        placeholder: 'Enter option D',
                        required: true
                    }
                },
                {
                    key: 'correctAnswer',
                    type: 'select',
                    templateOptions: {
                        label: 'Correct Answer',
                        placeholder: 'Select the correct answer',
                        options:[
                            {
                                "name": "Option A",
                                "value": "optionA"
                            },
                            {
                                "name": "Option B",
                                "value": "optionB"
                            },
                            {
                                "name": "Option C",
                                "value": "optionC"
                            },
                            {
                                "name": "Option D",
                                "value": "optionD"
                            }
                        ],
                        required: true
                    }
                },
            ]

            scope.createQuestion = function(){
                var model = {
                    "entityName": "question"
                };
                model.entity = scope.questionModel;
                dataManupulator.manupulate("insert",model);
            }
        }]);


    return question;
});

