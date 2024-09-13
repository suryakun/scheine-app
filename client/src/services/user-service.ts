import api from '../lib/api';
import { UserInput } from '@/types/user';

export const fetchUser = (userId: string) => api.get(`/users/${userId}`);

export const createUser = (userData: UserInput) => api.post('/users', userData);

export const updateUser = (userId: string, userData: UserInput) =>
  api.put(`/users/${userId}`, userData);
