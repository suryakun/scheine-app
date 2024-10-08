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
import { UseFormReturn, FieldValues } from 'react-hook-form';

type ScheineTypeSearchDropdownProps = {
  onChange: (value: ScheineType) => void,
  form: UseFormReturn<FieldValues>
}

export function ScheineTypeSearchDropdown(props: ScheineTypeSearchDropdownProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(props.form.getValues('scheineTypeId')?.toString())
  const { scheineTypeQuery } = useScheineTypes()

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
    </>
  )
}
