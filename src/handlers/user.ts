import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    let user = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save new user
    let newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    //jwt token
    const payload = {
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    };
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret);

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(403).send({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(403).send({ message: 'Invalid email or password' });
    }

    //jwt token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign(payload, secret);

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};
