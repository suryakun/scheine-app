import { Loader2 } from "lucide-react"

interface LoadingProps {
  size?: number
  className?: string
}

export const Loading = ({ size = 24, className = "" }: LoadingProps) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 size={size} className="animate-spin" />
    </div>
  )
}
