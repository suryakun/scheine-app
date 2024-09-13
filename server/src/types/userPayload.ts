import { User } from '../db/entities/user';

export type TypeUserPayload = Omit<User, 'createdAt' | 'isDeleted' | 'updatedAt'>;
