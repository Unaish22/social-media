import { Eye, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaItemProps {
  title: string
  date: string
  size: string
  image: string
  engagement: string
  isLowEngagement?: boolean
}

export function MediaItem({
  title,
  date,
  size,
  image,
  engagement,
  isLowEngagement = false,
}: MediaItemProps) {
  const getEngagementColor = () => {
    if (isLowEngagement) return "bg-red-100 text-red-800"
    const engagementValue = Number.parseFloat(engagement)
    if (engagementValue >= 2.0) return "bg-green-100 text-green-800"
    if (engagementValue >= 1.5) return "bg-green-100 text-green-800"
    return "bg-yellow-100 text-yellow-800"
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getEngagementColor()}`}
          >
            {engagement} <span className="ml-1">↗</span>
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="default" className="h-8 w-8 rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">{date}</span>
          <span className="text-xs text-gray-500">{size}</span>
        </div>
      </div>
    </div>
  )
}
