import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Users } from '@/types/user';

export function useUsersQuery(page = 1, limit = 10) {
  const userQuery = useQuery<Users>({
    queryKey: ['users', { page, limit }],
    queryFn: async () => {
      const response = await api.get('/users', { params: { page, limit } });
      return response.data;
    },
  });

  return {
    userQuery,
  };
}
