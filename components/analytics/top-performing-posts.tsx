"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Instagram, Linkedin, MessageCircle } from "lucide-react"

export function TopPerformingPosts() {
  const posts = [
    {
      id: 1,
      platform: "Instagram",
      platformIcon: Instagram,
      platformColor: "text-pink-600",
      image: "/placeholder.svg?height=300&width=400",
      title:
        "Monday motivation: Finding your productivity sweet spot in a remote work environment. What's your favorite productivity hack? #WorkFromHome",
      likes: "8,742",
      comments: "346",
      date: "April 20, 2025",
      engagement: "2.1x",
    },
    {
      id: 2,
      platform: "LinkedIn",
      platformIcon: Linkedin,
      platformColor: "text-blue-700",
      image: "/placeholder.svg?height=300&width=400",
      title:
        "Excited to announce our new partnership with TechSolutions Inc! Together we'll be revolutionizing how teams collaborate. What partnerships have transformed your business?",
      likes: "5,128",
      comments: "283",
      date: "April 18, 2025",
      engagement: "1.8x",
    },
    {
      id: 3,
      platform: "Instagram",
      platformIcon: Instagram,
      platformColor: "text-pink-600",
      image: "/placeholder.svg?height=300&width=400",
      title:
        "Behind the scenes at our spring collection photoshoot! Which look is your favorite? Comment below! #SpringFashion #NewCollection",
      likes: "7,463",
      comments: "512",
      date: "April 15, 2025",
      engagement: "1.9x",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Posts</CardTitle>
        <CardDescription>Your most engaging content across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white text-gray-900">
                    <post.platformIcon className={`h-3 w-3 mr-1 ${post.platformColor}`} />
                    {post.platform}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    {post.engagement}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm line-clamp-2 font-medium mb-2">{post.title}</p>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center text-gray-500 text-xs">
                    <Heart className="h-3 w-3 mr-1" />
                    {post.likes} likes
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {post.comments} comments
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span>Posted on {post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
