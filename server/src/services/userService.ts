import { userRepository } from '../db/repositories/appRepository';
import { User } from '../db/entities/user.entity';
import { Like } from 'typeorm';
import { TypeUserPayload } from '../types/userPayload';

export const userService = {
  async fetch(page: number = 1, pageSize: number = 10): Promise<{ users: User[]; total: number }> {
    const [users, total] = await userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { users, total };
  },

  async create(userData: TypeUserPayload): Promise<User> {
    const newUser = userRepository.create(userData);
    return await userRepository.save(newUser);
  },

  async update(id: number, userData: TypeUserPayload): Promise<User | null> {
    await userRepository.update(id, userData);
    return await userRepository.findOne({ where: { id } });
  },

  async searchByName(
    name: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ users: User[]; total: number }> {
    const [users, total] = await userRepository.findAndCount({
      where: { first_name: Like(`%${name}%`) },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { users, total };
  },
};
