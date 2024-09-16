import { Check, ChevronsUpDown } from "lucide-react"
import { useDoctorsQuery } from "@/hooks/use-doctor-query"

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
import { Doctor } from "@/types/doctor"

type DoctorSearchDropdownProps = {
  onChange: (value: Doctor) => void
}

export function DoctorSearchDropdown(props: DoctorSearchDropdownProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const { doctorsQuery } = useDoctorsQuery(1, 100);
  const doctors = doctorsQuery.data?.doctors || [];

  const options = doctors.map((el: Doctor) => ({
    value: el.id,
    label: `${el.first_name} ${el.last_name}`
  }))

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
              ? options.find((opt) => opt.value.toString() === value)?.label
              : "Select doctor..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search doctor..." />
            <CommandList>
              <CommandEmpty>No doctor found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value.toString()}
                    onSelect={(currentValue) => {
                      const val = currentValue === value ? "" : currentValue;
                      setValue(val);
                      const selectedDoctor = doctors.find((d) => d.id.toString() === val);
                      if (selectedDoctor) {
                        props.onChange(selectedDoctor);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === opt.value.toString() ? "opacity-100" : "opacity-0"
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
