const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,

    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,

    },

    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },

    timestamp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },


   
})
const   MESSAGE = mongoose.model("message", messageSchema);
module.exports =  MESSAGE;
