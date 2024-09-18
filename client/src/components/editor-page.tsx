import { useScheineForm } from "@/hooks/use-scheine-form"
import { EditorInput } from "./editor-input"
import { Form } from "./ui/form"
import { useCallback } from "react"
import { useWatch } from "react-hook-form"
import { Preview } from "./preview"
import { Scheine } from "@/types/scheine"
import { Button } from "./ui/button"
import { DownloadIcon } from "lucide-react"
import { useScheineMutations } from "@/hooks/use-scheine-mutations"
import { Loading } from "./loading"

export const EditorPage = () => {
  const form = useScheineForm()
  const values = useWatch({ control: form.control })
  const { createScheine } = useScheineMutations();

  const onSubmit = useCallback(async () => {
    console.log('test')
    await createScheine.mutateAsync(form.getValues() as Scheine)
  }, [createScheine, form])

  if (createScheine.isPending) {
    return (<div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      <Loading />
      <p>Generating PDF...</p>
    </div>)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex h-[calc(100vh-100px)] gap-4 pt-4 relative">
          <section className="basis-[40%] overflow-y-scroll">
            <EditorInput form={form} />
          </section>
          <section className="basis-[60%] bg-slate-200 flex justify-center items-center">
            <Preview values={values as Scheine} />
          </section>
          <Button className="absolute right-4 bottom-4" type="submit"><DownloadIcon /> Generate PDF</Button>
        </div>
      </form>
    </Form>
  )
}