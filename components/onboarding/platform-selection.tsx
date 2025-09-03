"use client"

import { useState, useEffect, useMemo } from "react"
import { useOnboarding } from "@/components/onboarding/onboarding-context"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export function PlatformSelection() {
  const { selectedPlatforms, setSelectedPlatforms, setStep, brandVoice } = useOnboarding()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const platformDescriptions: Record<string, string> = {
    facebook: "Reach a broad audience with versatile posting options.",
    twitter: "Engage with real-time conversations and trending topics.",
    instagram: "Showcase visuals and connect with a creative community.",
  }

  const platformPreviews: Record<string, string> = {
    facebook: "Manage posts, events, and groups from a unified dashboard.",
    twitter: "Monitor mentions and schedule tweets for maximum impact.",
    instagram: "Plan stories, posts, and reels with visual analytics.",
  }

  const suggestPlatforms = useMemo(() => {
    const keywords = brandVoice.keywords.map((k) => k.toLowerCase())
    return {
      facebook: keywords.includes("professional") || keywords.includes("business"),
      twitter: keywords.includes("trendy") || keywords.includes("bold"),
      instagram: keywords.includes("chic") || keywords.includes("visual"),
    }
  }, [brandVoice.keywords])

  useEffect(() => {
    const newPlatforms = {
      ...selectedPlatforms,
      ...suggestPlatforms,
    }
    // Only update if the platforms have changed to prevent infinite loop
    if (JSON.stringify(newPlatforms) !== JSON.stringify(selectedPlatforms)) {
      setSelectedPlatforms(newPlatforms)
    }
  }, [suggestPlatforms, setSelectedPlatforms])

  const handleTogglePlatform = (platform: string) => {
    const newPlatforms = {
      ...selectedPlatforms,
      [platform]: !selectedPlatforms[platform as keyof typeof selectedPlatforms],
    }
    setSelectedPlatforms(newPlatforms)
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleCancel = () => {
    setShowCancelDialog(true)
  }

  const confirmCancel = () => {
    setStep(1)
    setShowCancelDialog(false)
  }

  return (
    <TooltipProvider>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 transition-colors">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">Step 1: Choose Your Platforms</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Select the social media platforms you want to connect to your account.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="mt-4"
            >
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {["facebook", "twitter", "instagram"].map((platform) => (
                  <Tooltip key={platform}>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all animate-pulse`}
                        onClick={() => handleTogglePlatform(platform)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${platform === "facebook" ? "bg-blue-600" : platform === "twitter" ? "bg-blue-400" : "bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500"} text-white`}>
                            {platform === "facebook" && <Facebook className="h-5 w-5" />}
                            {platform === "twitter" && <Twitter className="h-5 w-5" />}
                            {platform === "instagram" && <Instagram className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{platformDescriptions[platform]}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 italic">{platformPreviews[platform]}</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                          checked={selectedPlatforms[platform as keyof typeof selectedPlatforms]}
                          onChange={() => handleTogglePlatform(platform)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{platformDescriptions[platform]}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Platform Suggestions</h3>
              <p className="text-gray-600 dark:text-gray-400">Based on your brand keywords, we recommend:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(suggestPlatforms).map(([platform, recommended]) => (
                  recommended && (
                    <Button
                      key={platform}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePlatform(platform)}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Button>
                  )
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            By connecting your accounts, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>.
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleNext}>
              Next
            </Button>
          </div>

          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Onboarding</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel? Your progress will be lost.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                  Stay
                </Button>
                <Button onClick={confirmCancel}>
                  Confirm Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TooltipProvider>
  )
}
