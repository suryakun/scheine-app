import { Repository } from 'typeorm';
import AppDataSource from '../datasource';
import { User } from '../entities/user';

export const userRepository: Repository<User> = AppDataSource.getRepository(User);
