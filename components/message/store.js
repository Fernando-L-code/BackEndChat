const Model = require('./model');


function addMessage(message) {
  const myMessage = new Model(message);
  console.log(myMessage);
  return myMessage.save();
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterUser != null) {
      filter = {
        user: new RegExp(`^${filterUser}$`, "i")
      };
    }

    Model.find(filter)
      .populate('user')
      .exec((error, populated)=>{
          if(error){
            reject(error);
            return false;
          }
          resolve(populated);
      });
  });

}

async function updateText(id, message) {
  const foundMessage = await Model.findOneAndUpdate({
    _id: id
  }, {
    message
  }, {
    new: true
  })

  return foundMessage;
}

function removeMessage(id) {
  return Model.deleteOne({
    _id: id
  });
}

module.exports = {
  add: addMessage,
  list: getMessages,

  //get
  update: updateText,
  remove: removeMessage,
};