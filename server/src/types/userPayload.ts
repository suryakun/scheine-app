import { User } from '../db/entities/user';

export type TypeUserPayload = Omit<User, 'password' | 'createdAt' | 'isDeleted' | 'updatedAt'>;
