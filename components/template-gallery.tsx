"use client"

import { useState } from "react"
import { templateDataset, colorSchemes, type Template } from "../lib/template-dataset"
import { TemplateGenerator } from "../lib/template-generator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Wand2, Shuffle, Sparkles, Square, RectangleVertical, RectangleHorizontal } from "lucide-react"

interface TemplateGalleryProps {
  onSelectTemplateAction: (template: Template) => void
  currentTemplate?: Template
}

export default function TemplateGallery({ onSelectTemplateAction, currentTemplate }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [textPrompt, setTextPrompt] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFormat, setSelectedFormat] = useState("all")

  // Fix: Convert Set to Array properly
  const categories = ["all", ...Array.from(new Set(templateDataset.map((t) => t.category.toLowerCase())))]

  const filteredTemplates = templateDataset.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category.toLowerCase() === selectedCategory

    const matchesFormat = selectedFormat === "all" || template.data.format === selectedFormat

    return matchesSearch && matchesCategory && matchesFormat
  })

  const handleTextToTemplate = () => {
    if (!textPrompt.trim()) return

    const generatedTemplate = TemplateGenerator.generateFromText(textPrompt)
    onSelectTemplateAction(generatedTemplate)
    setTextPrompt("")
  }

  const handleRandomGenerate = () => {
    const randomTemplate = TemplateGenerator.generateRandom()
    onSelectTemplateAction(randomTemplate)
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "square":
        return <Square className="w-4 h-4" />
      case "vertical":
        return <RectangleVertical className="w-4 h-4" />
      case "horizontal":
        return <RectangleHorizontal className="w-4 h-4" />
      default:
        return null
    }
  }

  const TemplatePreview = ({ template }: { template: Template }) => {
    const colorScheme = colorSchemes[template.data.colorScheme as keyof typeof colorSchemes]
    const isSelected = currentTemplate?.id === template.id

    return (
      <Card
        className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? "ring-2 ring-blue-500" : ""}`}
        onClick={() => onSelectTemplateAction(template)}
      >
        <CardContent className="p-0">
          <div
            className={`${
              template.data.format === "square"
                ? "h-32"
                : template.data.format === "vertical"
                  ? "h-40"
                  : template.data.format === "horizontal"
                    ? "h-24"
                    : "h-32"
            } rounded-t-lg`}
            style={{
              background: `linear-gradient(to right, ${colorScheme.from}, ${colorScheme.to})`,
            }}
          >
            <div className="p-4 h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="font-bold text-lg tracking-wider">{template.data.name}</h3>
                <p className="text-sm opacity-90">{template.data.profession}</p>
                <div className="mt-2 flex justify-center">{getFormatIcon(template.data.format)}</div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-semibold mb-1">{template.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {template.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                {getFormatIcon(template.data.format)}
                {template.data.format || "classic"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {template.data.layout}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Template Gallery</h2>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Templates</TabsTrigger>
            <TabsTrigger value="generate">Text to Template</TabsTrigger>
            <TabsTrigger value="random">Auto Generate</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Formats</option>
                <option value="classic">Classic</option>
                <option value="square">Square</option>
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <TemplatePreview key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="generate" className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Describe Your Template
              </h3>
              <p className="text-gray-600 mb-4">
                Tell us about yourself and we'll generate a personalized template for you.
              </p>

              <Textarea
                placeholder="Example: I'm a modern UI designer named Sarah who loves clean, minimal designs with blue colors for Instagram posts..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                rows={4}
                className="mb-4"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Preferred Format</label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTextPrompt(textPrompt + " square format for Instagram posts")}
                  >
                    <Square className="w-4 h-4 mr-1" />
                    Square
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTextPrompt(textPrompt + " vertical format for Instagram stories")}
                  >
                    <RectangleVertical className="w-4 h-4 mr-1" />
                    Vertical
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTextPrompt(textPrompt + " horizontal format for website banners")}
                  >
                    <RectangleHorizontal className="w-4 h-4 mr-1" />
                    Horizontal
                  </Button>
                </div>
              </div>

              <Button onClick={handleTextToTemplate} disabled={!textPrompt.trim()} className="w-full">
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Template
              </Button>

              <div className="mt-4 text-sm text-gray-500">
                <p className="font-medium mb-1">Try mentioning:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Your profession (photographer, designer, writer, etc.)</li>
                  <li>Your name</li>
                  <li>Style preferences (modern, minimal, creative, warm)</li>
                  <li>Format preferences (square for posts, vertical for stories, horizontal for banners)</li>
                  <li>Color preferences</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="random" className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                <Shuffle className="w-5 h-5 mr-2 text-green-600" />
                Random Template Generator
              </h3>
              <p className="text-gray-600 mb-4">
                Let our AI create a completely random template for you with unique combinations.
              </p>

              <Button onClick={handleRandomGenerate} size="lg" className="bg-green-600 hover:bg-green-700">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Random Template
              </Button>

              <div className="mt-4 text-sm text-gray-500">
                <p>Each generation creates a unique combination of:</p>
                <p>
                  • Random profession and specialty • Random color scheme • Random layout style • Random format
                  (square/vertical/horizontal) • Random inspirational quote
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
