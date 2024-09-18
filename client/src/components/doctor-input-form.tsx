import { useDoctorForm } from '@/hooks/use-doctor-form';
import { useDoctorMutations } from '@/hooks/use-doctor-mutations';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { DoctorInput } from '@/types/doctor';

type DoctorFormProps = {
  onSaveComplete: () => void
}

export const DoctorForm = (props: DoctorFormProps) => {
  const form = useDoctorForm({});
  const { createDoctor, isLoading } = useDoctorMutations();

  const onSubmit = (data: DoctorInput) => {
    createDoctor.mutate(data, {
      onSuccess: () => {
        form.reset();
        props.onSaveComplete()
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialty</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doctor_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doctor number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          <PlusIcon />{isLoading ? 'Adding...' : 'Add Doctor'}
        </Button>
      </form>
    </Form>
  );
};
