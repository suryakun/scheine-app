import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Doctor, DoctorInput } from '@/types/doctor';

export function useDoctorMutations() {
  const queryClient = useQueryClient();

  const createDoctor = useMutation({
    mutationFn: (newDoctor: DoctorInput) => api.post('/doctors', newDoctor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });

  const updateDoctor = useMutation({
    mutationFn: (updatedDoctor: Doctor) => api.put(`/doctors/${updatedDoctor.id}`, updatedDoctor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });

  const deleteDoctor = useMutation({
    mutationFn: (doctorId: string) => api.delete(`/doctors/${doctorId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
  });

  return {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    isLoading: createDoctor.isPending || updateDoctor.isPending || deleteDoctor.isPending,
  };
}
