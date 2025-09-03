"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function PlatformPerformance() {
  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100",
      followers: "68,542",
      engagement: "5.2%",
      reach: "456K",
      reachChange: "+8%",
      reachChangeColor: "text-green-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-100",
      followers: "42,189",
      engagement: "3.8%",
      reach: "312K",
      reachChange: "+5%",
      reachChangeColor: "text-green-500",
    },
    {
      name: "Facebook",
      icon: Facebook,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      followers: "124,763",
      engagement: "2.4%",
      reach: "289K",
      reachChange: "-2%",
      reachChangeColor: "text-red-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      iconColor: "text-blue-700",
      bgColor: "bg-blue-100",
      followers: "35,876",
      engagement: "4.1%",
      reach: "227K",
      reachChange: "+12%",
      reachChangeColor: "text-green-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Performance</CardTitle>
        <CardDescription>Compare metrics across different social media platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <Card key={platform.name}>
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${platform.bgColor} ${platform.iconColor} mr-3`}
                  >
                    <platform.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">{platform.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Followers</span>
                    <span className="text-sm font-medium">{platform.followers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Engagement</span>
                    <span className="text-sm font-medium">{platform.engagement}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reach</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">{platform.reach}</span>
                      <span className={`text-xs ${platform.reachChangeColor}`}>{platform.reachChange}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
