var mongoose = require('mongoose');

// Create the ExamSchema.
var NoticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
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
module.exports = NoticeSchema;
