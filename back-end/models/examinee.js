var mongoose = require('mongoose');

// Create the ExamineeSchema.
var ExamineeSchema = new mongoose.Schema({
    accessToken:{
        type: String,
        required: true
    },
    accessTokenValidityTime:{
        type: Date,
        required: true
    },
    tags:{
        type: Array
    }
},
    {
        timestamps: true
    });

// Export the model schema.
module.exports = ExamineeSchema;