const User = require('../models/user');
const Message = require('../models/message');

module.exports.userConnected = async uid => {
  const user = await User.findById(uid);
  if (user) {
    user.online = true;
    await user.save();
    return user;
  }
};

module.exports.userDisconnected = async uid => {
  const user = await User.findById(uid);
  if (user) {
    user.online = false;
    await user.save();
    return user;
  }
};

module.exports.getUsers = async () => {
  const users = await User.find().sort('-online');
  return users;
};

module.exports.saveMessages = async payload => {
  try {
    const message = new Message(payload);
    await message.save();

    return message;
  } catch (error) {
    return false;
  }
};
