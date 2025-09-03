"use client"

import { useState, useEffect } from "react"
import { useOnboarding } from "@/components/onboarding/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FeatureSelection() {
  const { features, setFeatures, setStep, selectedPlatforms } = useOnboarding()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const featureDescriptions: Record<string, string> = {
    contentGeneration: "AI-powered content creation for engaging social media posts.",
    analytics: "Track performance metrics like engagement and reach with detailed reports.",
    scheduling: "Schedule posts across platforms with a customizable content calendar.",
    engagementMonitoring: "Monitor and respond to audience interactions from one dashboard.",
  }

  const featurePreviews: Record<string, string> = {
    contentGeneration: "Generate posts like: 'Discover our latest collection! #FashionTrend'",
    analytics: "View charts showing likes, shares, and impressions over time.",
    scheduling: "Plan posts with a drag-and-drop calendar interface.",
    engagementMonitoring: "See all comments and messages in a unified inbox.",
  }

  const suggestFeatures = () => {
    return {
      contentGeneration: selectedPlatforms.instagram || selectedPlatforms.twitter,
      analytics: selectedPlatforms.facebook || selectedPlatforms.instagram,
      scheduling: true,
      engagementMonitoring: selectedPlatforms.twitter,
    }
  }

  useEffect(() => {
    const suggestions = suggestFeatures()
    const newFeatures = {
      ...features,
      ...suggestions,
    }
    if (JSON.stringify(newFeatures) !== JSON.stringify(features)) {
      setFeatures(newFeatures)
    }
  }, [selectedPlatforms, setFeatures, features])

  const handleToggleFeature = (feature: string) => {
    const newFeatures = {
      ...features,
      [feature]: !features[feature as keyof typeof features],
    }
    setFeatures(newFeatures)
  }

  const handleReset = () => {
    setFeatures({
      contentGeneration: false,
      analytics: false,
      scheduling: false,
      engagementMonitoring: false,
    })
  }

  const handleNext = () => {
    if (Object.values(features).some((active) => active)) {
      setStep(4)
      setError(null)
    } else {
      setError("Please select at least one feature to continue.")
    }
  }

  const handleBack = () => {
    setStep(2)
  }

  return (
    <TooltipProvider>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 transition-colors">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">Choose Features</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Select the features to enable for your connected accounts. You can change these later.
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
              <div className="space-y-6">
                {["contentGeneration", "analytics", "scheduling", "engagementMonitoring"].map((feature) => (
                  <Tooltip key={feature}>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={feature}
                          className="absolute opacity-0 w-0 h-0"
                          checked={features[feature as keyof typeof features]}
                          onChange={() => handleToggleFeature(feature)}
                        />
                        <div
                          className="flex cursor-pointer p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                          onClick={() => handleToggleFeature(feature)}
                        >
                          <div className="mr-4 mt-1">
                            <div
                              className={`w-5 h-5 border-2 ${features[feature as keyof typeof features] ? "border-primary bg-primary" : "border-gray-300 dark:border-gray-600"} rounded flex items-center justify-center`}
                            >
                              {features[feature as keyof typeof features] && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-3 w-3"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div>
                            <label htmlFor={feature} className="text-lg font-medium cursor-pointer text-gray-800 dark:text-gray-200">
                              {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{featureDescriptions[feature]}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">{featurePreviews[feature]}</p>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{featureDescriptions[feature]}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">Feature Suggestions</h3>
              <p className="text-gray-600 dark:text-gray-400">Based on your platform selections, we recommend:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(suggestFeatures()).map(([feature, recommended]) => (
                  recommended && (
                    <Button
                      key={feature}
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFeature(feature)}
                    >
                      {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, " $1").trim()}
                    </Button>
                  )
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              Reset Features
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
