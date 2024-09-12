import { Router } from 'express';
import { User } from '../db/entities/user';
import { userRepository } from '../db/repositories/userRepository';

export const userController: Router = Router();

userController.get('/', async (req, res) => {
  const users = await userRepository.find();
  res.json(users);
});

userController.post('/', async (req, res) => {
  const newUser = userRepository.create(req.body);
  const results = await userRepository.save(newUser);
  res.json(results);
});
