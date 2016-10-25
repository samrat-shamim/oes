var mongoose = require('mongoose');

// Create the UserSchema.
var UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
      type: String,
      required: true
    },
    userEmail:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    roles:{
        type: Array,
        default:['user']
    },
    profilePicture:{
      type: String
    },
    tags:{
        type: Array
    }
},
    {
        timestamps: true
    });

// Export the model schema.
module.exports = UserSchema;
