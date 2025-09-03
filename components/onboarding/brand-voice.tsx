// File: brand-voice.tsx
"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { useOnboarding } from "@/components/onboarding/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function BrandVoice() {
  const { brandVoice, updateBrandVoice, setStep } = useOnboarding()

  // ------------- LOCAL STATE -------------
  const [keywords, setKeywords] = useState<string[]>(brandVoice.keywords || ["Fashion Trend", "Sustainable", "Style Guide"])
  const [keywordInput, setKeywordInput] = useState("")
  const [includeHashtags, setIncludeHashtags] = useState(brandVoice.includeHashtags ?? true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // ------------- CONSTANTS -------------
  const MAX_KEYWORDS = 10
  const SUGGESTED_KEYWORDS = ["Eco-Friendly", "Chic", "Modern", "Bold", "Minimalist", "Luxury", "Trendy", "Vibrant"]

  // ------------- PREVIEW TEXT (MEMOIZED) -------------
  const previewText = useMemo(() => {
    if (brandVoice.tone === "professional") {
      return "We're excited to announce our latest collection that perfectly blends comfort with style. These pieces aren't just fashion statements—they're sustainable choices that make you look good while doing good."
    }
    if (brandVoice.tone === "friendly") {
      return "Hey there! We've got something awesome to share with you today - our new collection is here and it's all about feeling good while looking amazing!"
    }
    return "Excited to unveil our latest collection that perfectly blends comfort with style! These pieces aren't just fashion statements—they're sustainable choices that make you look good while doing good."
  }, [brandVoice.tone, brandVoice.style, keywords, includeHashtags])

  // ------------- SYNC TO CONTEXT (ONLY WHEN NEEDED) -------------
  useEffect(() => {
    // keywords
    const current = brandVoice.keywords
    if (current.length !== keywords.length || !current.every((k, i) => k === keywords[i])) {
      updateBrandVoice("keywords", keywords)
    }
  }, [keywords, brandVoice.keywords, updateBrandVoice])

  useEffect(() => {
    // includeHashtags
    if (brandVoice.includeHashtags !== includeHashtags) {
      updateBrandVoice("includeHashtags", includeHashtags)
    }
  }, [includeHashtags, brandVoice.includeHashtags, updateBrandVoice])

  // ------------- HANDLERS -------------
  const handleToneChange = useCallback((tone: string) => updateBrandVoice("tone", tone), [updateBrandVoice])
  const handleStyleChange = useCallback((style: string) => updateBrandVoice("style", style), [updateBrandVoice])

  const addKeyword = () => {
    if (keywordInput.trim() !== "" && keywords.length < MAX_KEYWORDS) {
      const capitalized = keywordInput.trim().replace(/\b\w/g, c => c.toUpperCase())
      setKeywords(prev => [...prev, capitalized])
      setKeywordInput("")
    }
  }

  const removeKeyword = (index: number) =>
    setKeywords(prev => prev.filter((_, i) => i !== index))

  const clearAllKeywords = () => setKeywords([])

  const resetForm = () => {
    updateBrandVoice("tone", "")
    updateBrandVoice("style", "")
    setKeywords([])
    setIncludeHashtags(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIncludeHashtags(e.target.checked)

  const handleNext = () => setStep(5)
  const handleBack = () => setStep(3)
  const toggleDarkMode = () => setIsDarkMode(prev => !prev)

  // ------------- RENDER -------------
  return (
    <TooltipProvider>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 transition-colors">
          {/* Page Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">Brand Voice</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Define your brand's tone and style to ensure consistent messaging across all platforms.
            </p>
            <Button variant="outline" onClick={toggleDarkMode} className="mt-4">
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Button>
          </div>

          {/* Tone Selection */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Tone Selection</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Choose a tone that best represents how your brand communicates.
              </p>
              <div className="mb-6">
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Define Your Tone
                </label>
                <select
                  id="tone"
                  value={brandVoice.tone}
                  onChange={(e) => handleToneChange(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2.5 text-gray-700 dark:text-gray-200"
                >
                  <option value="">Select a tone</option>
                  {["friendly", "professional", "playful", "bold", "candid", "sophisticated", "informative", "concise"]
                    .map(t => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {["friendly", "professional", "playful", "bold"].map(tone => (
                  <Tooltip key={tone}>
                    <TooltipTrigger asChild>
                      <div
                        className={`cursor-pointer p-3 border rounded hover:border-primary transition-all ${brandVoice.tone === tone ? "border-primary bg-gray-50 dark:bg-gray-700" : "border-gray-200 dark:border-gray-600"}`}
                        onClick={() => handleToneChange(tone)}
                      >
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">{tone}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to select</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{`Set tone to ${tone}`}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Style Selection */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Style Selection</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Select a writing style that complements your brand's personality.
              </p>
              <div className="mb-6">
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Define Your Style
                </label>
                <select
                  id="style"
                  value={brandVoice.style}
                  onChange={(e) => handleStyleChange(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2.5 text-gray-700 dark:text-gray-200"
                >
                  <option value="">Select a style</option>
                  {["casual", "formal", "unique", "quirky", "minimalistic", "descriptive"].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {["casual", "formal", "unique"].map(style => (
                  <Tooltip key={style}>
                    <TooltipTrigger asChild>
                      <div
                        className={`cursor-pointer p-4 border rounded hover:border-primary transition-all ${brandVoice.style === style ? "border-primary bg-gray-50 dark:bg-gray-700" : "border-gray-200 dark:border-gray-600"}`}
                        onClick={() => handleStyleChange(style)}
                      >
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">{style}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to select</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{`Set style to ${style}`}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Brand Keywords */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Brand Keywords</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add up to {MAX_KEYWORDS} keywords relevant to your brand.
              </p>

              <div className="mb-6">
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Add Keywords
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="keywords"
                    className="flex-grow border border-gray-300 dark:border-gray-600 rounded-l-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-200"
                    placeholder="e.g., Fashion Trend"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={keywords.length >= MAX_KEYWORDS}
                  />
                  <Button onClick={addKeyword} disabled={keywords.length >= MAX_KEYWORDS || !keywordInput.trim()} className="rounded-l-none">
                    Add
                  </Button>
                </div>

                {keywords.length >= MAX_KEYWORDS && (
                  <p className="text-sm text-red-500 mt-2">Maximum of {MAX_KEYWORDS} keywords reached.</p>
                )}

                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Suggested:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SUGGESTED_KEYWORDS.map(s => (
                      <Button
                        key={s}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (keywords.length < MAX_KEYWORDS && !keywords.includes(s)) {
                            setKeywords(prev => [...prev, s])
                          }
                        }}
                        disabled={keywords.includes(s) || keywords.length >= MAX_KEYWORDS}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap mb-4">
                {keywords.map((kw, i) => (
                  <div key={i} className="inline-flex items-center bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                    {kw}
                    <button onClick={() => removeKeyword(i)} className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100">
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <Button variant="outline" onClick={clearAllKeywords} disabled={keywords.length === 0} className="mb-4">
                Clear All
              </Button>

              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={includeHashtags} onChange={handleHashtagChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Include keywords as hashtags</span>
              </label>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Preview Your Brand Voice</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                See how your selected tone, style, and keywords might appear in a social media post.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">B</div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">@YourBrand</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">July 17, 2025 • 7:38 PM</p>
                  </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200 mb-4">{previewText}</p>
                {includeHashtags && (
                  <div className="text-primary text-sm">
                    {keywords.map(kw => `#${kw.replace(/\s+/g, '')}`).join(" ")}
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Voice: <span className="font-medium">{brandVoice.tone || "None"} + {brandVoice.style || "None"}</span>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}