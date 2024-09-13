import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doctorService } from '../services/doctor-service';
import { Doctor, DoctorInput, DoctorSearchParams } from '@/types/doctor';

export function useDoctor(doctorId?: string) {
  const queryClient = useQueryClient();

  const doctorQuery = useQuery<Doctor>({
    queryKey: ['doctor', doctorId],
    queryFn: () => doctorService.fetchDoctor(doctorId!),
    enabled: !!doctorId,
  });

  const createDoctorMutation = useMutation<Doctor, Error, DoctorInput>({
    mutationFn: doctorService.createDoctor,
    onSuccess: (newDoctor: Doctor) => {
      queryClient.setQueryData(['doctor', newDoctor.id], newDoctor);
    },
  });
  const updateDoctorMutation = useMutation<Doctor, Error, { id: string } & Partial<DoctorInput>>({
    mutationFn: ({ id, ...data }) => doctorService.updateDoctor(id, data),
    onSuccess: (updatedDoctor: Doctor) => {
      queryClient.setQueryData(['doctor', updatedDoctor.id], updatedDoctor);
    },
  });

  return {
    doctor: doctorQuery.data,
    isLoading: doctorQuery.isLoading,
    error: doctorQuery.error,
    createDoctor: createDoctorMutation.mutate,
    updateDoctor: updateDoctorMutation.mutate,
    isCreating: createDoctorMutation.isPending,
    isUpdating: updateDoctorMutation.isPending,
  };
}

export function useDoctorSearch(params: DoctorSearchParams) {
  return useQuery({
    queryKey: ['doctors', params],
    queryFn: () => doctorService.searchDoctors(params),
  });
}
