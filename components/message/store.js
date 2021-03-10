
const Model = require('./model');


function addMessage(message) {
  const myMessage = new Model(message);
  console.log(myMessage);
  return myMessage.save();
}

async function getMessages(filterUser) {
  // return list;
  let filter = {};
  if (filterUser != null) {
    filter = { user: new RegExp(`^${filterUser}$`, "i") };
  }
  const messages = await Model.find(filter);
  console.log('------------');
  console.log(messages);
  return messages;
}

async function updateText(id, message) {
  const foundMessage = await Model.findOneAndUpdate(
    { _id: id },
    { message },
    { new: true }
  )
  
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
  remove:removeMessage,
};