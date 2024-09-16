import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createScheineSchema = (fields: any[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach(field => {
    switch (field.type) {
      case 'text':
        schemaFields[field.key] = z.string().optional();
        break;
      case 'number':
        schemaFields[field.key] = z.number().optional();
        break;
      case 'date':
        schemaFields[field.key] = z.string().optional();
        break;
      default:
        schemaFields[field.key] = z.string().optional();
        break;
    }
  });

  return z.object(schemaFields);
};

export const useScheineForm = ({ defaultValues = {}, fields = [] }) => {
  const schema = createScheineSchema(fields);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return form;
};
