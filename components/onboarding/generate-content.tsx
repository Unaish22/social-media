"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Lightbulb, RefreshCw, Sparkles, Upload } from "lucide-react"
import Link from "next/link"

export function GenerateContent() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      // Simulate API call (replace with actual /api/text/route.ts call)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setGeneratedContent(true)
    } catch (err) {
      setError("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate Content</h2>
      <p className="text-gray-600 mb-6">
        Create engaging posts with AI. Choose a tool below or describe your content idea.
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {["Image", "Video", "Text", "Carousel", "Story", "Hashtagify"].map((tool) => (
          <motion.div
            key={tool}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${tool.toLowerCase()}`}>
              <Button
                variant="outline"
                className="w-full h-12 text-sm font-medium hover:bg-primary hover:text-white transition-colors"
              >
                {tool} Generator
              </Button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Label htmlFor="prompt" className="text-base font-medium">
            Content Prompt
          </Label>
          <Textarea
            id="prompt"
            placeholder="Promote summer sale for skincare brand with 30% off all products this weekend..."
            className="mt-2 min-h-[120px] border-gray-300 focus:ring-primary"
            disabled={isGenerating}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
          <Button
            className="mt-2 w-full bg-primary hover:bg-primary/90"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </motion.div>

        <AnimatePresence>
          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs defaultValue="caption" className="mt-6">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg">
                  <TabsTrigger value="caption" className="text-sm">Caption</TabsTrigger>
                  <TabsTrigger value="hashtags" className="text-sm">Hashtags</TabsTrigger>
                  <TabsTrigger value="image" className="text-sm">Image</TabsTrigger>
                  <TabsTrigger value="inspiration" className="text-sm">Inspiration</TabsTrigger>
                </TabsList>
                <TabsContent value="caption" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="caption" className="text-base">Caption</Label>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="tone" className="text-sm">Tone:</Label>
                        <Select defaultValue="friendly">
                          <SelectTrigger className="w-[120px] border-gray-300">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="persuasive">Persuasive</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      id="caption"
                      className="min-h-[150px] border-gray-300 focus:ring-primary"
                      value=" SUMMER SALE ALERT! 

Beat the heat with our refreshing skincare collection  now 30% OFF this weekend only! 

Our dermatologist-approved formulas will keep your skin glowing all summer long. Stock up on your favorites or try something new!

Shop now through Sunday at midnight. Link in bio.

#SummerSkincare #WeekendSale"
                    />
                  </motion.div>
                </TabsContent>
                <TabsContent value="hashtags" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="flex justify-between mb-2">
                      <Label className="text-base">Suggested Hashtags</Label>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <Card className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {[
                            "#SummerSkincare",
                            "#WeekendSale",
                            "#SkincareSale",
                            "#SummerGlow",
                            "#SkincareTips",
                            "#SelfCareSunday",
                            "#SkinHealth",
                            "#BeautyDeals",
                            "#SummerBeauty",
                            "#GlowingSkin",
                            "#SkincareLover",
                            "#SkincareCommunity",
                          ].map((hashtag) => (
                            <motion.div
                              key={hashtag}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Badge variant="outline" className="cursor-pointer text-sm">
                                {hashtag}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <div className="mt-4">
                      <Label htmlFor="custom-hashtags" className="text-base">Add Custom Hashtags</Label>
                      <div className="flex mt-2">
                        <Input id="custom-hashtags" placeholder="Enter custom hashtag" className="border-gray-300" />
                        <Button className="ml-2 bg-primary hover:bg-primary/90">Add</Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="image" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="flex justify-between mb-2">
                      <Label className="text-base">Generated Images</Label>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {Array(4).fill(0).map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border rounded-lg p-2 cursor-pointer hover:border-primary"
                        >
                          <img
                            src="/placeholder.svg?height=200&width=200"
                            alt={`Generated image ${i + 1}`}
                            className="w-full aspect-square object-cover rounded-md"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-gray-300">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Your Own Image
                    </Button>
                  </motion.div>
                </TabsContent>
                <TabsContent value="inspiration" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <Label className="mb-2 block text-base">Popular Posts in Your Niche</Label>
                    <div className="space-y-4">
                      {[
                        {
                          user: "@competitor_brand",
                          text: "Summer is here!  Our bestselling SPF moisturizer is now 25% off for a limited time. Protect your skin while keeping it hydrated all day long. #SummerEssentials",
                          stats: { likes: "2.4k", comments: "132", time: "3 days ago" },
                        },
                        {
                          user: "@skincare_influencer",
                          text: "My top 3 summer skincare essentials: 1 Hydrating serum 2 SPF 50 3 Cooling face mist. What are yours? Drop them below! #SkincareTips #SummerRoutine",
                          stats: { likes: "5.7k", comments: "428", time: "1 week ago" },
                        },
                      ].map((post, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <Card className="border-gray-200">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                                  <ImageIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-500">{post.user}</p>
                                  <p className="text-sm">{post.text}</p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span>{post.stats.likes} likes</span>
                                    <span>{post.stats.comments} comments</span>
                                    <span>{post.stats.time}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-gray-300">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Get More Inspiration
                    </Button>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
