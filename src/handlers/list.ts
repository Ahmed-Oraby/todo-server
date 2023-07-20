import { Request, Response } from 'express';
import prisma from '../db';

export const getList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    let user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(400).send({ message: 'User doesnot exist' });
    }

    let list = await prisma.list.findMany({
      where: {
        user,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({ list });
  } catch (error) {
    console.log(error);
  }
};

export const addListItem = async (req: Request, res: Response) => {
  try {
    const { text, auth } = req.body;
    const userId = auth.user.id;

    let user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(400).send({ message: 'User doesnot exist' });
    }

    let newItem = await prisma.list.create({
      data: {
        text,
        userId,
      },
    });

    res.json({ newItem });
  } catch (error) {
    console.log(error);
  }
};

export const deleteListItem = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;

    let list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });
    if (!list) {
      return res.status(400).send({ message: 'Item doesnot exist' });
    }

    await prisma.list.delete({
      where: {
        id: listId,
      },
    });

    res.send({ message: 'deleted item' });
  } catch (error) {
    console.log(error);
  }
};
