"use client"

import { Check, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"
import { useOnboarding } from "@/components/onboarding/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Confirmation() {
  const { selectedPlatforms, features, brandVoice, brandAssets, setStep } = useOnboarding()

  const activePlatforms = Object.entries(selectedPlatforms)
    .filter(([_, isActive]) => isActive)
    .map(([platform]) => platform)

  const activeFeatures = Object.entries(features)
    .filter(([_, isActive]) => isActive)
    .map(([feature]) => feature)

  const platformIcons: Record<string, React.ReactNode> = {
    facebook: <Facebook className="h-4 w-4 text-blue-600" />,
    x: <Twitter className="h-4 w-4 text-blue-400" />,
    instagram: <Instagram className="h-4 w-4 text-pink-600" />,
  }

  const featureDescriptions: Record<string, string> = {
    contentGeneration: "AI-powered content creation for your social media posts.",
    analytics: "Detailed insights and performance metrics for your campaigns.",
    scheduling: "Schedule and automate posts across all platforms.",
    engagementMonitoring: "Monitor and respond to audience interactions."
  }

  const formatFeatureName = (feature: string): string => {
    const nameMap: Record<string, string> = {
      contentGeneration: "Content Generation",
      analytics: "Analytics Tracking",
      scheduling: "Post Scheduling",
      engagementMonitoring: "Engagement Monitoring",
    }
    return nameMap[feature] || feature
  }

  const generateBrandVoicePreview = () => {
    let text = "Check out our latest updates!"
    if (brandVoice.tone === "professional") {
      text = "We are thrilled to announce our latest collection, designed with precision and sustainability in mind."
    } else if (brandVoice.tone === "friendly") {
      text = "Hey friends! We've got some awesome new stuff to share with you today!"
    }
    return text + (brandVoice.includeHashtags ? ` ${brandVoice.keywords.map((k) => `#${k.replace(/\s+/g, '')}`).join(" ")}` : "")
  }

  return (
    <TooltipProvider>
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4 animate-pulse">
            <Check className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Setup Complete!</h2>
          <p className="text-gray-600">Your Social Media Maestro account is ready to use.</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 text-gray-800">Connected Accounts</h3>
              <div className="space-y-2">
                {activePlatforms.length > 0 ? (
                  activePlatforms.map((platform) => (
                    <div key={platform} className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 mr-3">
                        {platformIcons[platform]}
                      </div>
                      <span className="text-gray-800">
                        {platform === "x" ? "X" : platform.charAt(0).toUpperCase() + platform.slice(1)} Account
                      </span>
                      <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No platforms connected.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 text-gray-800">Selected Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {activeFeatures.length > 0 ? (
                  activeFeatures.map((feature) => (
                    <Tooltip key={feature}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 mr-2">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-800">{formatFeatureName(feature)}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{featureDescriptions[feature]}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))
                ) : (
                  <p className="text-gray-500">No features selected.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 text-gray-800">Brand Voice Preview</h3>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="font-semibold">B</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">@YourBrand</p>
                    <p className="text-xs text-gray-500">July 25, 2025  4:40 PM</p>
                  </div>
                </div>
                <p className="text-gray-800">{generateBrandVoicePreview()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 text-gray-800">Onboarding Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Platforms:</p>
                  <p className="text-sm text-gray-600">{activePlatforms.map(p => p === "x" ? "X" : p.charAt(0).toUpperCase() + p.slice(1)).join(", ") || "None"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Features:</p>
                  <p className="text-sm text-gray-600">{activeFeatures.map(formatFeatureName).join(", ") || "None"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand Voice:</p>
                  <p className="text-sm text-gray-600">Tone: {brandVoice.tone || "Not set"}, Style: {brandVoice.style || "Not set"}, Keywords: {brandVoice.keywords.join(", ") || "None"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand Assets:</p>
                  <p className="text-sm text-gray-600">Font: {brandAssets.fontFamily}, Colors: {brandAssets.primaryColor}, {brandAssets.secondaryColor}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="animate-pulse"
            >
              Restart Onboarding
            </Button>
            <Link href="/dashboard" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium animate-pulse">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
