import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(4).required(),
    password: Joi.string().min(5).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send({ message: validation.error.details[0].message });
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(5).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send({ message: validation.error.details[0].message });
  }

  next();
};
