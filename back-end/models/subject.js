var mongoose = require('mongoose');

// Create the ExamSchema.
var SubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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
module.exports = SubjectSchema;
