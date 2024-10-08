import { Router, Request, Response } from 'express';
import { userService } from '../services/userService';
import { CreateUserDto } from '../types/user.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const userController: Router = Router();

userController.get('/', async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    const { users, total } = await userService.fetch(page, pageSize);
    res.json({ users, total, page, pageSize });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

userController.get('/search', async (req: Request, res: Response) => {
  try {
    const name: string = req.query.name as string;
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    const { users, total } = await userService.searchByName(name, page, pageSize);
    res.json({ users, total, page, pageSize });
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error });
  }
});

userController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const user = await userService.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

userController.post('/', async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(userData);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const newUser = await userService.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

userController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const userData: CreateUserDto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(userData);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const updatedUser = await userService.update(id, userData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});
