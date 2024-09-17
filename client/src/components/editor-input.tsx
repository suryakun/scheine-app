import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DoctorSearchDropdown } from "./doctor-search-dropdown"
import { UserSearchDropdown } from "./user-search-dropdown"
import { ScheineTypeSearchDropdown } from "./scheine-type-dropdown"
import { Doctor } from "@/types/doctor"
import { useCallback } from "react"
import { User } from "@/types/user"
import { ScheineType } from "@/types/scheine-type"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { format } from "date-fns"

type EditorInputProps = {
  form: UseFormReturn<FieldValues>
}

export const EditorInput = (props: EditorInputProps) => {
  const onDoctorChange = useCallback((value: Doctor) => {
    props.form.setValue('doctorId' as never, value.id as never)
  }, [props.form])

  const onUserChange = useCallback((value: User) => {
    props.form.setValue('patientId', value.id)
    props.form.setValue('attributes.name', `${value.first_name} ${value.last_name}`)
    props.form.setValue('attributes.birthday', `${format(value.birthday, "PPP")}`)
  }, [props.form])

  const onScheineTypeChange = useCallback((value: ScheineType) => {
    props.form.setValue('scheineTypeId' as never, value.id as never)
    const attributes = value.attributeDefinitions.reduce((acc, attr) => {
      acc[attr.key] = props.form.getValues(`attributes[${attr.key}]`) ?? attr.type === 'checkbox' ? false : '';
      return acc;
    }, {} as Record<string, string | boolean>);
    console.log(attributes)
    props.form.setValue('attributes', attributes);
  }, [props.form])

  return (
    <Accordion type="multiple" className="w-full">
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
          <ScheineTypeSearchDropdown form={props.form} onChange={onScheineTypeChange} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}