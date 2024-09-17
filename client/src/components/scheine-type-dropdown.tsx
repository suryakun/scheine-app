import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useCallback, useMemo, useState } from 'react'
import { useScheineTypes } from "@/hooks/use-scheine-type-query"
import { ScheineType } from "@/types/scheine-type"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import { UseFormReturn, FieldValues } from 'react-hook-form';

type ScheineTypeSearchDropdownProps = {
  onChange: (value: ScheineType) => void,
  form: UseFormReturn<FieldValues>
}

export function ScheineTypeSearchDropdown(props: ScheineTypeSearchDropdownProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const { scheineTypeQuery } = useScheineTypes()
  const [selectedType, setSelectedType] = useState<ScheineType>()

  const types = useMemo<ScheineType[]>(() => {
    return scheineTypeQuery.data || []
  }, [scheineTypeQuery.data])

  const options = types.map((el: ScheineType) => ({
    value: el.id,
    label: el.name
  }))

  const onTypeChange = useCallback((currentValue: string) => {
    const val = currentValue === value ? "" : currentValue
    setValue(val)
    const selectedType = types.find((d) => d.id?.toString() === val);
    if (selectedType) {
      setSelectedType(selectedType)
      props.onChange(selectedType);
    }
    setOpen(false)
  }, [props, types, value])

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? options.find((opt) => opt.value?.toString() === value)?.label
              : "Select scheine type..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Scheine Type..." />
            <CommandList>
              <CommandEmpty>No scheine type found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value?.toString()}
                    onSelect={onTypeChange}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === opt.value?.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
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
    </>
  )
}
