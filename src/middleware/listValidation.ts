import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateAddItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send({ message: validation.error.details[0].message });
  }

  next();
};
