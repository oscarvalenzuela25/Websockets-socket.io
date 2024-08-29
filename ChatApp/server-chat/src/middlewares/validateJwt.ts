import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface ExtendsRequest extends Request {
  uid?: string;
}

export const validateJwt = (
  req: ExtendsRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      error: 'x-token header is required',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED || '') as {
      uid: string;
    };
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid Token',
    });
  }
};
