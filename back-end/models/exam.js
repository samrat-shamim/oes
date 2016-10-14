var mongoose = require('mongoose');

// Create the ExamSchema.
var ExamSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        numberOfQuestion: {
            type: Number,
            required: true
        },
        timeSchedule: {
            type: Date,
            required: true
        },
        difficultyLevel:{
            type: Number
        },
        questions: {
            type: Array,
            required: true
        },
        instructions: {
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
module.exports = ExamSchema;