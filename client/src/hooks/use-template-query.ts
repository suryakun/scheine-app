import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Template } from '@/types/template';

export function useTemplateQuery(scheineTypeId: number) {
  const templateQuery = useQuery<Template>({
    queryKey: ['template', scheineTypeId],
    queryFn: async () => {
      const response = await api.get('/templates/scheine-type/' + scheineTypeId);
      return response.data;
    },
    enabled: !!scheineTypeId,
  });
  return { templateQuery };
}
