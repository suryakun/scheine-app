import { useScheineForm } from "@/hooks/use-scheine-form"
import { EditorInput } from "./editor-input"
import { Form } from "./ui/form"
import { useCallback } from "react"
import { useWatch } from "react-hook-form"
import { Preview } from "./preview"
import { Scheine } from "@/types/scheine"

export const EditorPage = () => {
  const form = useScheineForm()
  const values = useWatch({ control: form.control })

  const onSubmit = useCallback(() => {
    console.log(form.getValues())
  }, [form])

  console.log(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex h-[calc(100vh-100px)] gap-4 pt-4">
          <section className="basis-[40%] overflow-y-scroll">
            <EditorInput form={form} />
          </section>
          <section className="basis-[60%] bg-slate-200 flex justify-center items-center">
            <Preview values={values as Scheine} />
          </section>
        </div>
      </form>
    </Form>
  )
}