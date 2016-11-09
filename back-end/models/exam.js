var mongoose = require('mongoose');

// Create the ExamSchema.
var ExamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subjectId: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    numberOfQuestion: {
      type: Number,
      required: true
    },
    schedule: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    difficultyLevel: {
      type: String
    },
    questions: {
      type: Array,
      required: true
    },
    instructions: {
      type: String
    },
    needApproval:{
      type: Boolean,
      default: false
    },
    paymentAmount:{
      type: Number
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
module.exports = ExamSchema;
