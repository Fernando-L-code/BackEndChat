const store = require('./store')

function addUsersChat(users) {
    return new Promise((resolve, reject) => {

        if (!users || !Array.isArray(users)) {
            console.log('[ChatController] No hay usuario o menssage')
            return reject('Los  datos son incorrectos');
        }

        const chat = {
            users: users,
        }
        console.log(chat);
        store.add(chat);
        resolve(chat);
    });

}

function getchats(filteruser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filteruser));
    });
}


module.exports = {
    addUsersChat,
    getchats,
}