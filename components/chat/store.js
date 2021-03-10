const Model = require('./model');

function addChat(chat) {
    const myChat = new Model(chat);
    console.log(myChat);
    return myChat.save();
}

function listChats(chat) {
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
    add: addChat,
    list: listChats,
    //get
};