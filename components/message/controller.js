const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {

        if (!user || !message) {
            console.log('[messageController] No hay usuario o menssage')
            return reject('Los  datos son incorrectos');
        }

        let fileUrl = '';
        if(file){
            fileUrl= 'http://localhost:3000/app/files'+ file.filename;
        }
        console.log(file);
        console.log(fileUrl);

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }

        store.add(fullMessage);
        socket.io.emit('message', fullMessage);
        resolve(fullMessage);
    });

}

function getMessage(filteruser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filteruser));
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        console.log(id);
        console.log(message);
        if (!id || !message) {
            reject('Invalid data');
            // El return false evita que mande la cadena de errores en caso de capturar el error
            return false;
        }

        const result = await store.update(id, message);
        resolve(result);
    })

}

function deleteMessage(id) {
    return new Promise((resolve, reject)=>{
        if (!id) {
            reject('Id invalido');
            return false;
        }
        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}


module.exports = {
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage,
};