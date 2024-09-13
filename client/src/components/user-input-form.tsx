import { useUserForm } from "@/hooks/use-user-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { useCallback } from "react";
import { User } from "@/types/user";
import { Button } from "./ui/button";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useUserMutations } from "@/hooks/use-user-mutations";

type UserInputFormProps = {
  onSaveComplete: () => void
}

export const UserInputForm = (props: UserInputFormProps) => {
  const { createUser } = useUserMutations();
  const form = useUserForm({});

  const onSubmit = useCallback((value: User) => {
    createUser.mutate(value)
    form.reset();
    props.onSaveComplete();
  }, [createUser, form, props])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          name='first_name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='last_name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='insurance'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance</FormLabel>
              <FormControl>
                <Input placeholder="Insurance" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='birthday'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Birthday</FormLabel>
                <p />
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "font-normal w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onDayClick={field.onChange}
                        initialFocus />
                    </PopoverContent>
                  </Popover>

                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name='address'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="addresss" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button type="submit" disabled={createUser.isPending}><PlusIcon /> Add</Button>
        </div>
      </form>
    </Form>
  )
}