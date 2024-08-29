import { Request, Response } from 'express';
import Message from '../models/message';

interface ExtendsRequest extends Request {
  uid?: string;
}

export const getMessages = async (req: ExtendsRequest, res: Response) => {
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
