import { EditorInput } from "./editor-input"

export const EditorPage = () => {
  return (
    <div className="flex h-[calc(100vh-100px)] gap-4 pt-4">
      <section className="basis-[40%]">
        <EditorInput />
      </section>
      <section className="basis-[60%] bg-slate-200">
      </section>
    </div>
  )
}