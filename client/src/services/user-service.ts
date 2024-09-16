import api from '../lib/api';
import { UserInput } from '@/types/user';

export const fetchUser = (page: number, limit: number) =>
  api.get(`/users`, { params: { page, limit } });

export const createUser = (userData: UserInput) => api.post('/users', userData);

export const updateUser = (userId: string, userData: UserInput) =>
  api.put(`/users/${userId}`, userData);
