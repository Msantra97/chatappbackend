const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
 
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    passwordUpdatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    
    status: {
        type: String,
     
        
    },
});

const USERS = mongoose.model("users", userSchema);
module.exports = USERS;