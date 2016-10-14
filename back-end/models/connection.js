var mongoose = require('mongoose');

// Create the ConnectionSchema.
var ConnectionSchema = new mongoose.Schema(
    {
        childEntityName: {
            type: String,
            required: true
        },
        parentEntityName: {
            type: String,
            required: true
        },
        childEntityId : {
            type: String,
            required: true
        },
        parentEntityId : {
            type: String,
            required: true
        },
        tags:{
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    });

// Export the model schema.
module.exports = ConnectionSchema;