import api from '../lib/api';
import { ScheineType } from '../types/scheine-type';

export const fetchScheineTypes = async () => await api.get<ScheineType[]>('/scheine-types');

export const fetchScheineType = async (id: number) =>
  await api.get<ScheineType>(`/scheine-types/${id}`);
