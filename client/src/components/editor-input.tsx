import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DoctorSearchDropdown } from "./doctor-search-dropdown"
import { UserSearchDropdown } from "./user-search-dropdown"

export const EditorInput = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="doctor">
        <AccordionTrigger>Doctor data</AccordionTrigger>
        <AccordionContent>
          <DoctorSearchDropdown />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="patient">
        <AccordionTrigger>Patient data</AccordionTrigger>
        <AccordionContent>
          <UserSearchDropdown />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="schein-type">
        <AccordionTrigger>Scheine</AccordionTrigger>
        <AccordionContent>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}