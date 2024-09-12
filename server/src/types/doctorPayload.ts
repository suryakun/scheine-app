import { User } from '../db/entities/user';

export type TypeDoctorPayload = Omit<User, 'createdAt' | 'isDeleted' | 'updatedAt'>;
