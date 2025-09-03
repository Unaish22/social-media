"use client"

import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FlameIcon as Fire, Rocket } from "lucide-react"

export function TrendingTopics() {
  const topics = {
    high: ["#SustainableBusiness", "#DigitalTransformation", "#CustomerExperience", "#RemoteWork"],
    medium: ["#ArtificialIntelligence", "#FutureOfWork", "#DataPrivacy", "#InnovationStrategy"],
    emerging: ["#CircularEconomy", "#Web3Marketing", "#AugmentedReality", "#VoiceSearch"],
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Select defaultValue="industry">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="industry">Your Industry</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">High Relevance</h3>
          <Fire className="h-4 w-4 text-green-600" />
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.high.map((topic) => (
            <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Medium Relevance</h3>
          <Fire className="h-4 w-4 text-yellow-600" />
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.medium.map((topic) => (
            <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Emerging Topics</h3>
          <Rocket className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.emerging.map((topic) => (
            <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-primary/10 hover:text-primary">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
