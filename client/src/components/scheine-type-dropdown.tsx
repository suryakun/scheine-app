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
import { useState } from 'react'
import { useScheineTypes } from "@/hooks/use-scheine-type-query"
import { ScheineType } from "@/types/scheine-type"

type ScheineTypeSearchDropdownProps = {
  onChange: (value: ScheineType) => void
}

export function ScheineTypeSearchDropdown(props: ScheineTypeSearchDropdownProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const { scheineTypeQuery } = useScheineTypes()
  const types = scheineTypeQuery.data || []

  const options = types.map((el: ScheineType) => ({
    value: el.id,
    label: el.name
  }))

  return (
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
                  onSelect={(currentValue) => {
                    const val = currentValue === value ? "" : currentValue
                    setValue(val)
                    const selectedType = types.find((d) => d.id?.toString() === val);
                    if (selectedType) {
                      props.onChange(selectedType);
                    }
                    setOpen(false)
                  }}
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
  )
}
