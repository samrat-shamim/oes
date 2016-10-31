var mongoose = require('mongoose');

// Create the QuestionSchema.
var QuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        difficultyLevel: {
            type: String,
            required: true
        },
        titleFigure:{
          type: String
        },
        optionA:{
            type: String,
            required: true
        },
        optionAFigure:{
            type: String
        },
        optionB:{
        type: String,
        required: true
        },
        optionBFigure:{
            type: String
        },
        optionC:{
            type: String,
            required: true
        },
        optionCFigure:{
            type: String
        },
        optionD:{
            type: String,
            required: true
        },
        optionDFigure:{
            type: String
        },
        correctAnswer:{
            type: String,
            required: true
        },
        subjectId:{
          type: String,
          required: true
        },
        note:{
            type: String
        },
        createdById:{
            type: String
        },
        editedById:{
        type: String
        },
        tags:{
            type: Array
        }
    },
    {
    timestamps: true
    }
);

// Export the model schema.
module.exports = QuestionSchema;
