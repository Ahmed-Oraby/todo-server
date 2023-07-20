import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization;
  const token = bearer?.split(' ')[1] as string;

  if (!bearer || !token) {
    return res.status(401).send({ message: 'Unauthorized.' });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    req.body.auth = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: 'Unauthorized.' });
  }
}
