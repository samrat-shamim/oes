var mongoose = require('mongoose');

// Create the ExamSchema.
var AnswerSchema = new mongoose.Schema(
  {
    examId: {
      type: String,
      required: true
    },
    examineeId: {
      type: String
    },
    questions: {
      type: Array,
      required: true
    },
    answers: {
      type: Array,
      required: true
    },
    createdById: {
      type: String
    },
    editedById: {
      type: String
    },
    tags: {
      type: Array
    }
  },
  {
    timestamps: true
  }
);

// Export the model schema.
module.exports = AnswerSchema;
