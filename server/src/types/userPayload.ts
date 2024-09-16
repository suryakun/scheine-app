import { User } from '../db/entities/user.entity';

export type TypeUserPayload = Omit<User, 'createdAt' | 'isDeleted' | 'updatedAt'>;
