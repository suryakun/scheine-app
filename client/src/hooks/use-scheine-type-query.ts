import { useQuery } from '@tanstack/react-query';
import { fetchScheineTypes } from '@/services/scheine-type-service';

export function useScheineTypes() {
  const scheineTypeQuery = useQuery({
    queryKey: ['scheineTypes'],
    queryFn: fetchScheineTypes,
  });

  return {
    scheineTypeQuery,
  };
}
