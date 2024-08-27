const Message = require('../models/message');

module.exports.getMessages = async (req, res) => {
  const myId = req.uid;
  const fromUserId = req.params.fromUserId;

  const messages = await Message.find({
    $or: [
      { from: myId, to: fromUserId },
      { from: fromUserId, to: myId },
    ],
  })
    .sort({ createdAt: 'asc' })
    .limit(30);

  return res.json(messages);
};
