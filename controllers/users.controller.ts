import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `The user with the id ${id} dosen't exists`,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const emailUnique = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailUnique) {
      return res.status(404).json({
        msg: `Email is already in use`,
      });
    }

    const user = new User(body);
    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact support',
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: `User with ${id} dosen't exits`,
      });
    }

    await user.update(body);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact support',
    });
  }
};

export const deleteUser = async(req: Request, res: Response) => {
  const { id } = req.params;

   const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: `User with ${id} dosen't exits`,
      });
    }

  await user.update({
    estado: false
  });

  res.json(user);
};
