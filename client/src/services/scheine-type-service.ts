import api from '../lib/api';
import { ScheineType } from '../types/scheine-type';

export const fetchScheineTypes = () => api.get<ScheineType[]>('/scheine-types');

export const fetchScheineType = (id: number) => api.get<ScheineType>(`/scheine-types/${id}`);
