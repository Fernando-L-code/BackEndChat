const Model = require('./model');

function addMessage(chat) {
    const myChat = new Model(chat);
    console.log(myChat);
    return myChat.save();
}

function getMessages(chat) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (chat != null) {
            filter = {
                users: new RegExp(`^${chat}$`, "i")
            };
        }

        Model.find(filter)
            .populate('users')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    });

}

module.exports = {
    add: addMessage,
    list: getMessages,
    //get
};