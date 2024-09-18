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
import { useCallback, useState } from "react"
import { User } from "@/types/user"
import { ScheineType } from "@/types/scheine-type"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { format } from "date-fns"
import { AttributeInput } from "./attribute-input"

type EditorInputProps = {
  form: UseFormReturn<FieldValues>
}

export const EditorInput = (props: EditorInputProps) => {
  const [selectedType, setSelectedType] = useState<ScheineType>()

  const onDoctorChange = useCallback((value: Doctor) => {
    props.form.setValue('doctorId', value.id);
    props.form.setValue('attributes.arzt_nr', value.doctor_number)
  }, [props.form])

  const onUserChange = useCallback((value: User) => {
    props.form.setValue('patientId', value.id)
    props.form.setValue('attributes.name', `${value.first_name} ${value.last_name}`)
    props.form.setValue('attributes.birthday', `${format(value.birthday, "PPP")}`)
  }, [props.form])

  const onScheineTypeChange = useCallback((value: ScheineType) => {
    props.form.setValue('typeId', value.id)
    setSelectedType(value)
    const attributes = value.attributeDefinitions.reduce((acc, attr) => {
      acc[attr.key] = props.form.getValues(`attributes[${attr.key}]`) ?? attr.type === 'checkbox' ? false : '';
      return acc;
    }, {} as Record<string, string | boolean>);
    props.form.setValue('attributes', attributes);
  }, [props.form])

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="schein-type">
        <AccordionTrigger className="bg-orange-300 p-4">1. Scheine type</AccordionTrigger>
        <AccordionContent className="p-4">
          <ScheineTypeSearchDropdown form={props.form} onChange={onScheineTypeChange} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="doctor">
        <AccordionTrigger className="bg-orange-300 p-4">2. Doctor data</AccordionTrigger>
        <AccordionContent className="p-4">
          <DoctorSearchDropdown initialValue={props.form.getValues('doctorId')?.toString()} onChange={onDoctorChange} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="patient">
        <AccordionTrigger className="bg-orange-300 p-4">3. Patient data</AccordionTrigger>
        <AccordionContent className="p-4">
          <UserSearchDropdown initialValue={props.form.getValues('patientId')?.toString()} onChange={onUserChange} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="scheine">
        <AccordionTrigger className="bg-orange-300 p-4">4. Form input</AccordionTrigger>
        <AccordionContent className="p-4">
          {selectedType ?
            <AttributeInput selectedType={selectedType} form={props.form} /> : <p>Select scheine type first...</p>
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}