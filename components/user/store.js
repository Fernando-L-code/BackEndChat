const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    console.log(myUser);
    return myUser.save();
}

async function getUser(filterUser) {
    // return list;
    let filter = {};
    if (filterUser != null) {
      filter = { name: new RegExp(`^${filterUser}$`, "i") };
    }
    const user = await Model.find(filter);
    console.log('------------');
    console.log(user);
    return user;
  }

module.exports = {
    add: addUser,
    list: getUser,
    // update: updateText,
    // remove: removeMessage,
};