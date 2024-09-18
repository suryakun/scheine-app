import { ScheineType } from "@/types/scheine-type"
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

type AttributeInputProps = {
  selectedType: ScheineType,
  form: UseFormReturn<FieldValues>
}
export const AttributeInput = (props: AttributeInputProps) => {
  const { selectedType } = props;
  return (
    <div className="pt-4">
      {selectedType !== undefined ?
        (
          <section className="flex flex-col gap-4">
            <Form {...props.form}>
              {selectedType.attributeDefinitions.map((attr, index) => {
                return <FormField
                  key={index}
                  control={props.form.control}
                  defaultValue={props.form.getValues(`attributes[${attr.key}]`)}
                  name={`attributes[${attr.key}]`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{attr.label}</FormLabel>
                        <FormControl>
                          {attr.type === 'text' ? (
                            <Input placeholder={attr.key} {...field} />
                          ) : (
                            <Checkbox
                              onBlur={field.onBlur}
                              ref={field.ref}
                              name={field.name}
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              })}
            </Form>
          </section>
        ) : null
      }
    </div>
  )
}