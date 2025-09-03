"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Upload, Download, Maximize2, X, Palette, Type, ImageIcon, Layout, Undo, Redo } from "lucide-react"
import { colorSchemes, type Template } from "../lib/template-dataset"

interface TemplateEditorProps {
  template: Template
  onSave?: (template: Template) => void
  onClose?: () => void
}

export default function TemplateEditor({ template, onSave, onClose }: TemplateEditorProps) {
  const [editedTemplate, setEditedTemplate] = useState<Template>(template)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("text")
  const [history, setHistory] = useState<Template[]>([template])
  const [historyIndex, setHistoryIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateTemplate = (updates: Partial<Template["data"]>) => {
    const newTemplate = {
      ...editedTemplate,
      data: { ...editedTemplate.data, ...updates },
    }
    setEditedTemplate(newTemplate)

    // Add to history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newTemplate)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setEditedTemplate(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setEditedTemplate(history[historyIndex + 1])
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateTemplate({ imageUrl: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onSave?.(editedTemplate)
    localStorage.setItem(`template-${editedTemplate.id}`, JSON.stringify(editedTemplate))
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(editedTemplate, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `${editedTemplate.data.name.toLowerCase().replace(/\s+/g, "-")}-template.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const currentColorScheme = colorSchemes[editedTemplate.data.colorScheme as keyof typeof colorSchemes]

  const renderFullTemplate = () => {
    const { data } = editedTemplate

    const getFullContainerClass = () => {
      switch (data.format) {
        case "square":
          return "w-96 h-96"
        case "vertical":
          return "w-80 h-[568px]"
        case "horizontal":
          return "w-full max-w-6xl h-80"
        default:
          return "w-full max-w-4xl h-96"
      }
    }

    switch (data.layout) {
      case "modern":
        return (
          <div
            className={`${getFullContainerClass()} flex ${data.format === "vertical" ? "flex-col" : "flex-row"} items-center gap-12`}
          >
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 leading-none">
                  {data.name}
                </h1>
                <p className="text-xl tracking-[0.3em] text-gray-700 font-medium">{data.profession}</p>
              </div>
              <div className="w-20 h-1 bg-gray-900"></div>
              <blockquote className="text-lg text-gray-600 font-light leading-relaxed max-w-lg">
                {data.quote.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < data.quote.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </blockquote>
            </div>
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={data.imageUrl || "/placeholder.svg"}
                alt="Profile Photo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        )

      case "minimal":
        return (
          <div
            className={`${getFullContainerClass()} ${data.format === "horizontal" ? "flex items-center gap-12" : "text-center space-y-12"}`}
          >
            {data.format !== "horizontal" && (
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={data.imageUrl || "/placeholder.svg"}
                  alt="Profile Photo"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}
            <div className={`${data.format === "horizontal" ? "flex-1" : ""} space-y-6`}>
              <h1 className="text-4xl lg:text-5xl font-light tracking-[0.5em] text-gray-800">{data.name}</h1>
              <p className="text-sm tracking-[0.4em] text-gray-500 uppercase">{data.profession}</p>
              <div className={`w-12 h-px bg-gray-300 ${data.format === "horizontal" ? "" : "mx-auto"}`}></div>
              <blockquote className="text-sm text-gray-600 font-light leading-loose max-w-md mx-auto">
                {data.quote.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < data.quote.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </blockquote>
            </div>
            {data.format === "horizontal" && (
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={data.imageUrl || "/placeholder.svg"}
                  alt="Profile Photo"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}
          </div>
        )

      case "creative":
        return (
          <div className={`${getFullContainerClass()} relative`}>
            <div
              className={`grid ${data.format === "horizontal" ? "grid-cols-4" : "grid-cols-1 lg:grid-cols-3"} gap-8 items-center`}
            >
              <div className={`${data.format === "horizontal" ? "col-span-3" : "lg:col-span-2"} space-y-8`}>
                <div className="transform -rotate-2">
                  <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-none">
                    {data.name.split(" ")[0]}
                  </h1>
                  <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-none transform translate-x-8">
                    {data.name.split(" ")[1] || ""}
                  </h1>
                </div>
                <div className="transform rotate-1 bg-white p-4 shadow-lg inline-block">
                  <p className="text-lg tracking-[0.2em] text-gray-700 font-bold">{data.profession}</p>
                </div>
                <div className="transform -rotate-1 bg-gray-900 text-white p-6 max-w-lg">
                  <blockquote className="text-sm font-light leading-relaxed">
                    {data.quote.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < data.quote.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </blockquote>
                </div>
              </div>
              <div className="transform rotate-3">
                <div className="w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src={data.imageUrl || "/placeholder.svg"}
                    alt="Profile Photo"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default: // classic
        return (
          <div
            className={`${getFullContainerClass()} grid ${data.format === "horizontal" ? "grid-cols-3" : "grid-cols-1 lg:grid-cols-2"} gap-12 items-center`}
          >
            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm">
                <Image
                  src={data.imageUrl || "/placeholder.svg"}
                  alt="Profile Photo"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div
              className={`${data.format === "horizontal" ? "col-span-2" : ""} flex flex-col justify-center space-y-8 text-center lg:text-left`}
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-[0.3em] text-gray-800 leading-tight">
                  {data.name}
                </h1>
                <p className="text-sm lg:text-base tracking-[0.2em] text-gray-600 font-light">{data.profession}</p>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div className="w-px h-16 bg-gray-400"></div>
              </div>

              <div className="max-w-md">
                <blockquote className="text-xs lg:text-sm text-gray-600 font-light tracking-wide leading-relaxed">
                  {data.quote.split("\n").map((line, index) => (
                    <span key={index}>
                      "{line}"{index < data.quote.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </blockquote>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="w-full">
      {/* Editor Header */}
      <div className="flex justify-between items-center mb-4 p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Template Editor</h2>
          <div className="flex gap-1">
            {editedTemplate.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={undo} disabled={historyIndex === 0} size="sm" variant="outline">
            <Undo className="w-4 h-4" />
          </Button>
          <Button onClick={redo} disabled={historyIndex === history.length - 1} size="sm" variant="outline">
            <Redo className="w-4 h-4" />
          </Button>

          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Screen
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full">
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>{editedTemplate.name} - Full Screen Preview</span>
                  <Button onClick={() => setIsFullscreen(false)} size="sm" variant="ghost">
                    <X className="w-4 h-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div
                className="flex-1 flex items-center justify-center p-8 rounded-lg overflow-auto"
                style={{
                  background: `linear-gradient(to right, ${currentColorScheme.from}, ${currentColorScheme.to})`,
                }}
              >
                {renderFullTemplate()}
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleExport} size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {onClose && (
            <Button onClick={onClose} size="sm" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="text" className="text-xs">
                    <Type className="w-3 h-3 mr-1" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="image" className="text-xs">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="text-xs">
                    <Palette className="w-3 h-3 mr-1" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="text-xs">
                    <Layout className="w-3 h-3 mr-1" />
                    Layout
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <Input
                      value={editedTemplate.data.name}
                      onChange={(e) => updateTemplate({ name: e.target.value })}
                      placeholder="Enter name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Profession</Label>
                    <Input
                      value={editedTemplate.data.profession}
                      onChange={(e) => updateTemplate({ profession: e.target.value })}
                      placeholder="Enter profession"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Quote</Label>
                    <Textarea
                      value={editedTemplate.data.quote}
                      onChange={(e) => updateTemplate({ quote: e.target.value })}
                      placeholder="Enter inspirational quote"
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Profile Image</Label>
                    <div className="space-y-3">
                      <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                          src={editedTemplate.data.imageUrl || "/placeholder.svg"}
                          alt="Current image"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Your Image
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Image URL</Label>
                    <Input
                      value={editedTemplate.data.imageUrl}
                      onChange={(e) => updateTemplate({ imageUrl: e.target.value })}
                      placeholder="Enter image URL or upload above"
                      className="text-xs"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="colors" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Color Scheme</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(colorSchemes).map(([key, scheme]) => (
                        <Button
                          key={key}
                          onClick={() => updateTemplate({ colorScheme: key })}
                          variant={editedTemplate.data.colorScheme === key ? "default" : "outline"}
                          size="sm"
                          className="justify-start"
                        >
                          <div
                            className="w-4 h-4 rounded-full mr-3"
                            style={{ background: `linear-gradient(to right, ${scheme.from}, ${scheme.to})` }}
                          />
                          {scheme.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Layout Style</Label>
                    <div className="space-y-2">
                      {[
                        { value: "classic", label: "Classic", desc: "Traditional circular layout" },
                        { value: "modern", label: "Modern", desc: "Bold contemporary design" },
                        { value: "minimal", label: "Minimal", desc: "Clean and simple" },
                        { value: "creative", label: "Creative", desc: "Artistic and dynamic" },
                      ].map((layout) => (
                        <Button
                          key={layout.value}
                          onClick={() => updateTemplate({ layout: layout.value as any })}
                          variant={editedTemplate.data.layout === layout.value ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start text-left"
                        >
                          <div>
                            <div className="font-medium">{layout.label}</div>
                            <div className="text-xs text-gray-500">{layout.desc}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Format</Label>
                    <div className="space-y-2">
                      {[
                        { value: "classic", label: "Classic", desc: "Traditional 4:3 format" },
                        { value: "square", label: "Square", desc: "Perfect for Instagram posts" },
                        { value: "vertical", label: "Vertical", desc: "Great for stories" },
                        { value: "horizontal", label: "Horizontal", desc: "Website banners & headers" },
                      ].map((format) => (
                        <Button
                          key={format.value}
                          onClick={() => updateTemplate({ format: format.value as any })}
                          variant={editedTemplate.data.format === format.value ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start text-left"
                        >
                          <div>
                            <div className="font-medium">{format.label}</div>
                            <div className="text-xs text-gray-500">{format.desc}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div
                className="min-h-[500px] flex items-center justify-center p-8 rounded-lg"
                style={{
                  background: `linear-gradient(to right, ${currentColorScheme.from}, ${currentColorScheme.to})`,
                }}
              >
                {renderFullTemplate()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
