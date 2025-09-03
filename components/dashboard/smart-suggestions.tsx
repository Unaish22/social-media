"use client"

import { Button } from "@/components/ui/button"
import { Clock, FileText, Lightbulb } from "lucide-react"

export function SmartSuggestions() {
  const suggestions = [
    {
      id: 1,
      title: "Optimize Post Timing",
      description:
        "Your audience is most active between 7-9 PM. Consider rescheduling your evening posts to this timeframe for 28% higher engagement.",
      icon: Clock,
      iconColor: "text-blue-600 bg-blue-100",
    },
    {
      id: 2,
      title: "Content Gap Opportunity",
      description:
        "Your competitors are getting traction with tutorial content. Consider creating a how-to series for your product features.",
      icon: FileText,
      iconColor: "text-purple-600 bg-purple-100",
    },
    {
      id: 3,
      title: "Trending Hashtag Alert",
      description:
        "#SustainableBusiness is trending in your industry. Add this to your next post about your eco-friendly initiatives.",
      icon: Lightbulb,
      iconColor: "text-green-600 bg-green-100",
    },
  ]

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="rounded-lg bg-accent/50 p-4">
          <div className="flex items-start gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${suggestion.iconColor}`}>
              <suggestion.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{suggestion.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm">Apply</Button>
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
