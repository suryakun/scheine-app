import { Scheine } from "@/types/scheine"
import { Card } from "./ui/card"
import { useTemplateQuery } from "@/hooks/use-template-query"
import { Loading } from "./loading"
import Handlebars from 'handlebars'
import { useEffect, useMemo, useRef } from "react"

type PreviewProps = {
  values: Scheine
}
export const Preview = (props: PreviewProps) => {
  const { templateQuery } = useTemplateQuery(props.values.typeId)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const renderedTemplate = useMemo(() => {
    if (templateQuery.data?.pdfTemplate) {
      try {
        const template = Handlebars.compile(templateQuery.data.pdfTemplate)
        return template(props.values.attributes)
      } catch (error) {
        console.error('Error compiling or rendering template:', error)
        return 'Error rendering template'
      }
    }
    return ''
  }, [templateQuery.data, props.values])

  useEffect(() => {
    if (iframeRef.current) {
      const blob = new Blob([renderedTemplate], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      iframeRef.current.src = url

      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [renderedTemplate])

  if (templateQuery.isLoading) return <Loading />

  return (
    <Card className="w-[700px] h-[800px]">
      <iframe
        ref={iframeRef}
        title="Template Preview"
        className="w-full h-full border-none"
        sandbox="allow-scripts"
      />
    </Card>
  )

}