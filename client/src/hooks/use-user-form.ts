import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  first_name: z.string().nonempty('First name is required'),
  last_name: z.string().optional(),
  insurance: z.string().optional(),
  email: z.string().email('Invalid email address'),
  address: z.string().nonempty('Address is required'),
  birthday: z.date().min(new Date('1900-01-01'), 'Invalid date'),
});

export const useUserForm = (initVal: Partial<User>) => {
  const form = useForm<User>({
    defaultValues: {
      first_name: initVal.first_name || '',
      last_name: initVal.last_name || '',
      insurance: initVal.insurance || '',
      email: initVal.email || '',
      address: initVal.address || '',
      birthday: initVal.birthday || new Date(),
    },
    resolver: zodResolver(schema),
  });
  return form;
};
