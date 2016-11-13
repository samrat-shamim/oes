var mongoose = require('mongoose');

// Create the ApplicationSchema.
var ApplicationSchema = new mongoose.Schema(
    {
        examId: {
            type: String,
            required: true
        },
        examineeId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        transactionId: {
            type: String,
            required: true
        },
        paymentVerified:{
            type: Boolean,
            default: false
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
module.exports = ApplicationSchema;
