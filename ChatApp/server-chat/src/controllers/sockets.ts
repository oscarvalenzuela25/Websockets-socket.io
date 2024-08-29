import Message from '../models/message';
import User from '../models/user';

export const userConnected = async (uid: string) => {
  const user = await User.findById(uid);
  if (user) {
    user.online = true;
    await user.save();
    return user;
  }
};

export const userDisconnected = async (uid: string) => {
  const user = await User.findById(uid);
  if (user) {
    user.online = false;
    await user.save();
    return user;
  }
};

export const getUsers = async () => {
  const users = await User.find().sort('-online');
  return users;
};

export const saveMessages = async (payload: {
  from: string;
  to: string;
  message: string;
}) => {
  try {
    const message = new Message(payload);
    await message.save();

    return message;
  } catch (error) {
    return false;
  }
};
