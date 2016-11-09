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
        type: String
    },
    roles:{
        type: Array,
        default:['examinee']
    },
    profilePicture:{
      type: String
    },
    createdById:{
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
