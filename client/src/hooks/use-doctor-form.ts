import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DoctorInput } from '@/types/doctor';

const doctorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  specialization: z.string().min(1, 'Specialty is required'),
  email: z.string().email('Invalid email address'),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;

export function useDoctorForm({ defaultValues = {} }) {
  const form = useForm<DoctorInput>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: '',
      specialization: '',
      email: '',
      ...defaultValues,
    },
  });

  return form;
}
