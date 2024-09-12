import { UserPayload } from '@/types/user-payload';
import api from '../lib/api';

export const fetchUser = (userId: string) => api.get(`/users/${userId}`);

export const createUser = (userData: UserPayload) => api.post('/users', userData);

// Or using the custom methods:
export const updateUser = (userId: string, userData: UserPayload) =>
  api.put(`/users/${userId}`, userData);
