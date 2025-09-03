"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ScheduledPosts() {
  const posts = [
    {
      id: 1,
      title: "Product Launch Announcement",
      description: "Introducing our new spring collection with exclusive early-bird discounts.",
      time: "9:30 AM",
      platform: "instagram",
    },
    {
      id: 2,
      title: "Industry News Update",
      description: "Breaking: New market trends show 32% increase in digital engagement. Our analysis coming soon!",
      time: "12:00 PM",
      platform: "twitter",
    },
    {
      id: 3,
      title: "Case Study Publication",
      description: "How we helped TechCorp increase conversion rates by 45% in just 3 months.",
      time: "3:45 PM",
      platform: "linkedin",
    },
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      default:
        return null
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-pink-100 text-pink-800 border-pink-800"
      case "twitter":
        return "bg-blue-100 text-blue-800 border-blue-800"
      case "facebook":
        return "bg-indigo-100 text-indigo-800 border-indigo-800"
      case "linkedin":
        return "bg-blue-100 text-blue-800 border-blue-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex items-start gap-4 rounded-lg border p-4 transition-all hover:bg-accent/50">
          <div className="min-w-[60px] text-center">
            <div className="text-sm font-medium text-muted-foreground">{post.time}</div>
            <Badge variant="outline" className={`mt-1 ${getPlatformColor(post.platform)}`}>
              <span className="flex items-center gap-1">
                {getPlatformIcon(post.platform)}
                {post.platform}
              </span>
            </Badge>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Scheduled Posts
      </Button>
    </div>
  )
}
