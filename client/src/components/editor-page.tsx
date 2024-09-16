import { useScheineForm } from "@/hooks/use-scheine-form"
import { EditorInput } from "./editor-input"
import { Form } from "./ui/form"
import { useCallback } from "react"
import { useWatch } from "react-hook-form"

export const EditorPage = () => {
  const form = useScheineForm()
  const values = useWatch({ control: form.control })

  console.log(values)

  const onSubmit = useCallback(() => {
    console.log(form.getValues())
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex h-[calc(100vh-100px)] gap-4 pt-4">
          <section className="basis-[40%]">
            <EditorInput form={form} />
          </section>
          <section className="basis-[60%] bg-slate-200">
          </section>
        </div>
      </form>
    </Form>
  )
}