import { Scheine } from '@/types/scheine';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schemaFields: z.ZodType<Scheine> = z.object({
  patientId: z.number(),
  doctorId: z.number(),
  typeId: z.number(),
  attributes: z.record(z.string(), z.union([z.string(), z.boolean()])),
});

export const useScheineForm = (defaultValues = {}) => {
  const schema = schemaFields;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return form;
};
