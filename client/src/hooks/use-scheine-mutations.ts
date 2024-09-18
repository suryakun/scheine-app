import api from '@/lib/api';
import { downloadPdf } from '@/lib/utils';
import { Scheine } from '@/types/scheine';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useScheineMutations = () => {
  const queryClient = useQueryClient();
  const createScheine = useMutation({
    mutationFn: async (newScheine: Scheine) => {
      const resp = await api.post('/scheine', newScheine, {
        responseType: 'arraybuffer',
      });
      downloadPdf(resp.data, `${new Date().getTime()}-data.pdf`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheine'] });
    },
  });

  return { createScheine };
};
