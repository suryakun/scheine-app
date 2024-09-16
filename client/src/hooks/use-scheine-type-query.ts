import { useQuery } from '@tanstack/react-query';
import { fetchScheineTypes } from '@/services/scheine-type-service';
import { ScheineType } from '@/types/scheine-type';

export function useScheineTypes() {
  const scheineTypeQuery = useQuery<ScheineType[]>({
    queryKey: ['scheineTypes'],
    queryFn: async () => {
      const response = await fetchScheineTypes();
      return response.data;
    },
  });

  return {
    scheineTypeQuery,
  };
}
