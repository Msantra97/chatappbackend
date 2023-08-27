const MESSAGE = require("./models/message")

module.exports = async function createMessage(senderId, receiverId, content, timeStamp) {

    const createMessage = await  MESSAGE.create({
        senderId: senderId,
        receiverId: receiverId,
        content: content,
        timeStamp: timeStamp,


    })
        return
}
