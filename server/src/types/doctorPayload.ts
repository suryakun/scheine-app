import { User } from '../db/entities/user.entity';

export type TypeDoctorPayload = Omit<User, 'createdAt' | 'isDeleted' | 'updatedAt'>;
