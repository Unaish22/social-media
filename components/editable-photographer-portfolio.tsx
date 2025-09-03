"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Edit3, Save, Upload, Palette, Download } from "lucide-react"

interface TemplateData {
  name: string
  profession: string
  quote: string
  imageUrl: string
  colorScheme: "beige" | "blue" | "green" | "purple" | "pink"
}

const colorSchemes = {
  beige: { from: "#c4a484", to: "#e8ddd4", name: "Warm Beige" },
  blue: { from: "#7c9cbf", to: "#b8d4f0", name: "Ocean Blue" },
  green: { from: "#8fbc8f", to: "#c8e6c9", name: "Sage Green" },
  purple: { from: "#b19cd9", to: "#e1bee7", name: "Lavender" },
  pink: { from: "#f8bbd9", to: "#fce4ec", name: "Rose Pink" },
}

export default function EditablePhotographerPortfolio() {
  const [isEditing, setIsEditing] = useState(false)
  const [templateData, setTemplateData] = useState<TemplateData>({
    name: "RAJ SINGH",
    profession: "FASHION PHOTOGRAPHER",
    quote: "A PICTURE IS A SECRET ABOUT A SECRET.\nTHE MORE IT TELLS YOU THE LESS YOU KNOW.",
    imageUrl: "/images/profile-photo.jpg",
    colorScheme: "beige",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setTemplateData((prev) => ({
          ...prev,
          imageUrl: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you could save to localStorage or send to a server
    localStorage.setItem("photographerTemplate", JSON.stringify(templateData))
  }

  const handleExport = () => {
    // Create a downloadable JSON file with the template data
    const dataStr = JSON.stringify(templateData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "photographer-template.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const currentColorScheme = colorSchemes[templateData.colorScheme]

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${currentColorScheme.from}, ${currentColorScheme.to})`,
        }}
      />

      {/* Edit Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className="bg-white/90 hover:bg-white text-gray-800"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          {isEditing ? "Preview" : "Edit"}
        </Button>

        {isEditing && (
          <>
            <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleExport}
              size="sm"
              variant="outline"
              className="bg-white/90 hover:bg-white text-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </>
        )}
      </div>

      {/* Edit Panel */}
      {isEditing && (
        <Card className="absolute top-4 left-4 z-10 p-4 w-80 bg-white/95 backdrop-blur-sm">
          <h3 className="font-semibold mb-4 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Customize Template
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input
                value={templateData.name}
                onChange={(e) => setTemplateData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Profession</label>
              <Input
                value={templateData.profession}
                onChange={(e) => setTemplateData((prev) => ({ ...prev, profession: e.target.value }))}
                placeholder="Enter profession"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Quote</label>
              <Textarea
                value={templateData.quote}
                onChange={(e) => setTemplateData((prev) => ({ ...prev, quote: e.target.value }))}
                placeholder="Enter inspirational quote"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Profile Image</label>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Color Scheme</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(colorSchemes).map(([key, scheme]) => (
                  <Button
                    key={key}
                    onClick={() => setTemplateData((prev) => ({ ...prev, colorScheme: key as any }))}
                    variant={templateData.colorScheme === key ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ background: `linear-gradient(to right, ${scheme.from}, ${scheme.to})` }}
                    />
                    {scheme.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Main Content */}
      <div className="relative z-0 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm">
                <Image
                  src={templateData.imageUrl || "/placeholder.svg"}
                  alt="Profile Photo"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {isEditing && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  size="sm"
                  className="absolute bottom-4 right-4 rounded-full w-10 h-10 p-0"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Right side - Text Content */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              {isEditing ? (
                <Input
                  value={templateData.name}
                  onChange={(e) => setTemplateData((prev) => ({ ...prev, name: e.target.value }))}
                  className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-[0.3em] text-gray-800 leading-tight bg-transparent border-2 border-dashed border-gray-400 text-center lg:text-left"
                />
              ) : (
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-[0.3em] text-gray-800 leading-tight">
                  {templateData.name}
                </h1>
              )}

              {isEditing ? (
                <Input
                  value={templateData.profession}
                  onChange={(e) => setTemplateData((prev) => ({ ...prev, profession: e.target.value }))}
                  className="text-sm lg:text-base tracking-[0.2em] text-gray-600 font-light bg-transparent border-2 border-dashed border-gray-400 text-center lg:text-left"
                />
              ) : (
                <p className="text-sm lg:text-base tracking-[0.2em] text-gray-600 font-light">
                  {templateData.profession}
                </p>
              )}
            </div>

            {/* Vertical line separator */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-px h-16 bg-gray-400"></div>
            </div>

            {/* Quote */}
            <div className="max-w-md">
              {isEditing ? (
                <Textarea
                  value={templateData.quote}
                  onChange={(e) => setTemplateData((prev) => ({ ...prev, quote: e.target.value }))}
                  className="text-xs lg:text-sm text-gray-600 font-light tracking-wide leading-relaxed bg-transparent border-2 border-dashed border-gray-400 resize-none"
                  rows={3}
                />
              ) : (
                <blockquote className="text-xs lg:text-sm text-gray-600 font-light tracking-wide leading-relaxed">
                  {templateData.quote.split("\n").map((line, index) => (
                    <span key={index}>
                      "{line}"{index < templateData.quote.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
