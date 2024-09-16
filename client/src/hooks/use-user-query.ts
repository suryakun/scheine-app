import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/services/user-service';
import { Users } from '@/types/user';

export function useUsersQuery(page = 1, limit = 10) {
  const userQuery = useQuery<Users>({
    queryKey: ['users', { page, limit }],
    queryFn: async () => {
      const response = await fetchUser(page, limit);
      return response.data;
    },
  });

  return {
    userQuery,
  };
}
