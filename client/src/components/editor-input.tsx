import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DoctorSearchDropdown } from "./doctor-search-dropdown"
import { UserSearchDropdown } from "./user-search-dropdown"
import { ScheineTypeSearchDropdown } from "./scheine-type-dropdown"
import { useScheineForm } from "@/hooks/use-scheine-form"
import { Doctor } from "@/types/doctor"
import { useCallback } from "react"
import { User } from "@/types/user"
import { ScheineType } from "@/types/scheine-type"

type EditorInputProps = {
  form: ReturnType<typeof useScheineForm>
}

export const EditorInput = (props: EditorInputProps) => {
  const onDoctorChange = useCallback((value: Doctor) => {
    props.form.setValue('doctorId' as never, value.id as never)
  }, [props.form])

  const onUserChange = useCallback((value: User) => {
    props.form.setValue('patientId' as never, value.id as never)
  }, [props.form])

  const onScheineTypeChange = useCallback((value: ScheineType) => {
    props.form.setValue('scheineTypeId' as never, value.id as never)
  }, [props.form])

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="doctor">
        <AccordionTrigger>Doctor data</AccordionTrigger>
        <AccordionContent>
          <DoctorSearchDropdown onChange={onDoctorChange} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="patient">
        <AccordionTrigger>Patient data</AccordionTrigger>
        <AccordionContent>
          <UserSearchDropdown onChange={onUserChange} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="schein-type">
        <AccordionTrigger>Scheine</AccordionTrigger>
        <AccordionContent>
          <ScheineTypeSearchDropdown onChange={onScheineTypeChange} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}