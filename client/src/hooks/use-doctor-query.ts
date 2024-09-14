import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Doctors } from '@/types/doctor';

export function useDoctorsQuery(page: number = 1, limit: number = 10) {
  const doctorsQuery = useQuery<Doctors>({
    queryKey: ['doctors', { page, limit }],
    queryFn: async () => {
      const response = await api.get('/doctors', { params: { page, limit } });
      return response.data;
    },
  });
  return { doctorsQuery };
}
