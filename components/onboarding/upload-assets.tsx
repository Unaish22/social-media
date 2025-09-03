"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useOnboarding } from "@/components/onboarding/onboarding-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function UploadAssets() {
  const { brandAssets, updateBrandAsset, setStep } = useOnboarding()
  const [logoPreview, setLogoPreview] = useState<string | null>(brandAssets.logo || null)
  const [aiSuggestions, setAiSuggestions] = useState<{
    logoStyle: string;
    suggestedFonts: string[];
    suggestedColors: string[];
    suggestedVariants: string[];
    suggestedTone: string;
  }>({
    logoStyle: "",
    suggestedFonts: [],
    suggestedColors: [],
    suggestedVariants: [],
    suggestedTone: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogoPreview(result)
        updateBrandAsset("logo", result)
        analyzeLogo(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeLogo = (file: File) => {
    // Simulated AI analysis (replace with actual AI service call if available)
    const logoStyle = file.size < 100000 ? "minimalist" : file.name.endsWith(".svg") ? "modern" : "classic"
    const suggestedFonts = logoStyle === "minimalist"
      ? ["Inter", "Arial", "Helvetica"]
      : logoStyle === "modern"
      ? ["Roboto", "Montserrat", "Lato"]
      : ["Georgia", "Times New Roman", "Garamond"]
    const suggestedColors = logoStyle === "minimalist"
      ? ["#000000", "#4B5EAA"]
      : logoStyle === "modern"
      ? ["#1A73E8", "#F4B400"]
      : ["#8B0000", "#FFD700"]
    const suggestedVariants = logoStyle === "minimalist"
      ? ["icon"]
      : logoStyle === "modern"
      ? ["full", "icon"]
      : ["full", "text"]
    const suggestedTone = logoStyle === "minimalist"
      ? "concise"
      : logoStyle === "modern"
      ? "bold"
      : "professional"

    setAiSuggestions({
      logoStyle,
      suggestedFonts,
      suggestedColors,
      suggestedVariants,
      suggestedTone,
    })
  }

  const applyAiSuggestions = () => {
    updateBrandAsset("fontFamily", aiSuggestions.suggestedFonts[0] || brandAssets.fontFamily)
    updateBrandAsset("primaryColor", aiSuggestions.suggestedColors[0] || brandAssets.primaryColor)
    updateBrandAsset("secondaryColor", aiSuggestions.suggestedColors[1] || brandAssets.secondaryColor)
    updateBrandAsset("logoVariants", aiSuggestions.suggestedVariants)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorType: "primaryColor" | "secondaryColor") => {
    updateBrandAsset(colorType, e.target.value)
  }

  const handleFontChange = (font: string) => {
    updateBrandAsset("fontFamily", font)
  }

  const handleNext = () => {
    setStep(6)
  }

  const handleBack = () => {
    setStep(4)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Page Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">Upload Logo & Brand Assets</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Customize your brand identity with logos, colors, and typography
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div
            className="upload-zone bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-colors"
            onClick={triggerFileInput}
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Uploaded logo"
                className="max-h-40 max-w-full object-contain mb-4"
              />
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Drag and drop your logo here</h3>
                <p className="text-gray-500 mb-4 text-center">or click to browse files from your computer</p>
                <p className="text-sm text-gray-400">Supported formats: PNG, JPG, SVG (max 5MB)</p>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleLogoUpload}
            />
          </div>
          {aiSuggestions.logoStyle && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">AI Analysis: Detected logo style - {aiSuggestions.logoStyle}</p>
              <p className="text-sm text-gray-600">Suggested Fonts: {aiSuggestions.suggestedFonts.join(", ")}</p>
              <p className="text-sm text-gray-600">Suggested Colors: {aiSuggestions.suggestedColors.join(", ")}</p>
              <p className="text-sm text-gray-600">Suggested Variants: {aiSuggestions.suggestedVariants.join(", ")}</p>
              <p className="text-sm text-gray-600">Suggested Tone: {aiSuggestions.suggestedTone}</p>
              <Button onClick={applyAiSuggestions} className="mt-2">Apply AI Suggestions</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Brand Assets Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Logo Management */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 flex items-center justify-center text-primary mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Logo</h2>
            </div>

            <div className="mb-6">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-40 mb-4">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="max-h-32 max-w-full object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={triggerFileInput}
                  className="flex-1"
                >
                  Replace
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLogoPreview(null)
                    updateBrandAsset("logo", null)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Size</label>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Small</span>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={brandAssets.fontSize === "small" ? 1 : brandAssets.fontSize === "medium" ? 2 : 3}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value)
                      updateBrandAsset("fontSize", value === 1 ? "small" : value === 2 ? "medium" : "large")
                    }}
                    className="mx-2"
                  />
                  <span className="text-xs text-gray-500">Large</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Variants</label>
                <div className="space-y-2">
                  {["full", "icon", "text"].map((variant) => (
                    <div key={variant} className="flex items-center">
                      <div
                        className={`w-5 h-5 border-2 ${brandAssets.logoVariants.includes(variant) ? "border-primary bg-primary" : "border-gray-300 bg-white"} rounded flex items-center justify-center cursor-pointer`}
                        onClick={() => {
                          const newVariants = [...brandAssets.logoVariants]
                          if (newVariants.includes(variant)) {
                            updateBrandAsset("logoVariants", newVariants.filter((v) => v !== variant))
                          } else {
                            updateBrandAsset("logoVariants", [...newVariants, variant])
                          }
                        }}
                      >
                        {brandAssets.logoVariants.includes(variant) && (
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
                      <span className="ml-2 text-sm text-gray-700">
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Selection */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 flex items-center justify-center text-primary mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Typography</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Font</label>
              <select
                value={brandAssets.fontFamily}
                onChange={(e) => handleFontChange(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700"
              >
                {[
                  "Inter",
                  "Arial",
                  "Helvetica",
                  "Georgia",
                  "Times New Roman",
                  "Verdana",
                  ...aiSuggestions.suggestedFonts,
                ].filter((font, index, self) => self.indexOf(font) === index).map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                <div className="grid grid-cols-3 gap-2">
                  {["small", "medium", "large"].map((weight) => (
                    <Button
                      key={weight}
                      variant={brandAssets.fontSize === weight ? "default" : "outline"}
                      onClick={() => updateBrandAsset("fontSize", weight)}
                    >
                      {weight === "small" ? "Light" : weight === "medium" ? "Regular" : "Bold"}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Text</label>
                <div className="bg-gray-50 rounded-lg p-3" style={{ fontFamily: brandAssets.fontFamily }}>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Heading Text</h4>
                  <p className="text-sm text-gray-700">
                    This is how your body text will appear across your brand materials.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 flex items-center justify-center text-primary mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="13.5" cy="6.5" r="2.5" />
                  <circle cx="17.5" cy="10.5" r="2.5" />
                  <circle cx="8.5" cy="7.5" r="2.5" />
                  <circle cx="6.5" cy="12.5" r="2.5" />
                  <path d="M12 22v-6" />
                  <path d="M20 22v-3" />
                  <path d="M4 22v-8" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Color Palette</h2>
            </div>

            <div className="mb-6">
              <Button className="w-full" onClick={applyAiSuggestions}>
                Apply AI-Suggested Colors
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={brandAssets.primaryColor}
                    onChange={(e) => handleColorChange(e, "primaryColor")}
                    className="w-10 h-10 rounded-md border border-gray-300"
                  />
                  <input
                    type="text"
                    value={brandAssets.primaryColor}
                    onChange={(e) => handleColorChange(e, "primaryColor")}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={brandAssets.secondaryColor}
                    onChange={(e) => handleColorChange(e, "secondaryColor")}
                    className="w-10 h-10 rounded-md border border-gray-300"
                  />
                  <input
                    type="text"
                    value={brandAssets.secondaryColor}
                    onChange={(e) => handleColorChange(e, "secondaryColor")}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color Preview</label>
                <div className="grid grid-cols-5 gap-2">
                  <div className="h-10 rounded" style={{ backgroundColor: brandAssets.primaryColor }}></div>
                  <div className="h-10 rounded" style={{ backgroundColor: `${brandAssets.primaryColor}CC` }}></div>
                  <div className="h-10 rounded" style={{ backgroundColor: `${brandAssets.primaryColor}99` }}></div>
                  <div className="h-10 rounded" style={{ backgroundColor: `${brandAssets.primaryColor}66` }}></div>
                  <div className="h-10 rounded" style={{ backgroundColor: `${brandAssets.primaryColor}33` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Brand Preview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 flex items-center justify-center text-primary mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Smart Brand Preview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ fontFamily: brandAssets.fontFamily }}>
              <div className="px-4 py-3 flex items-center" style={{ backgroundColor: brandAssets.primaryColor }}>
                {logoPreview ? (
                  <img src={logoPreview} alt="Brand Logo" className="h-8" />
                ) : (
                  <span className="text-lg font-['Pacifico'] text-white">Your Brand</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Card</h3>
                <p className="text-gray-700 mb-3">Your logo and colors on a professional business card.</p>
                <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Business Card Preview" className="max-h-32 object-contain" />
                  ) : (
                    <p className="text-gray-500 text-sm">Business card preview</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ fontFamily: brandAssets.fontFamily }}>
              <div className="px-4 py-3 flex items-center" style={{ backgroundColor: brandAssets.primaryColor }}>
                {logoPreview ? (
                  <img src={logoPreview} alt="Brand Logo" className="h-8" />
                ) : (
                  <span className="text-lg font-['Pacifico'] text-white">Your Brand</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Post</h3>
                <p className="text-gray-700 mb-3">Your branding in a social media context.</p>
                <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Post Preview" className="max-h-32 object-contain" />
                  ) : (
                    <p className="text-gray-500 text-sm">Social media post preview</p>
                  )}
                </div>
                <Button className="mt-3" style={{ backgroundColor: brandAssets.primaryColor }}>
                  Share Now
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ fontFamily: brandAssets.fontFamily }}>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Brand Logo" className="h-8 mr-auto" />
                  ) : (
                    <span className="text-lg font-['Pacifico'] text-primary mr-auto">Your Brand</span>
                  )}
                  <Button style={{ backgroundColor: brandAssets.primaryColor }}>
                    Sign Up
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Banner Ad</h3>
                <p className="text-gray-700 mb-3">Your branding in a digital banner ad.</p>
                <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Banner Preview" className="max-h-32 object-contain" />
                  ) : (
                    <p className="text-gray-500 text-sm">Banner ad preview</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
