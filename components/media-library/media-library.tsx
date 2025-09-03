"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Search, Upload, X } from "lucide-react"
import { MediaItem } from "@/components/media-library/media-item"

export function MediaLibrary() {
  const [thumbnailSize, setThumbnailSize] = useState(2)

  const handleSizeChange = (value: number[]) => {
    setThumbnailSize(value[0])
  }

  const getGridCols = () => {
    switch (thumbnailSize) {
      case 1:
        return "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
      case 2:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      default:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search media by name, tag, or description" className="pl-10" />
        </div>

        <div className="flex gap-2">
          <Tabs defaultValue="uploaded" className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
              <TabsTrigger value="ai-generated">AI-Generated</TabsTrigger>
              <TabsTrigger value="stock">Stock</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select defaultValue="recent">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>

          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer bg-background">
          #photography
          <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
            <X className="h-3 w-3" />
          </Button>
        </Badge>
        <Badge variant="outline" className="cursor-pointer bg-background">
          #marketing
          <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
            <X className="h-3 w-3" />
          </Button>
        </Badge>
        <Badge variant="outline" className="cursor-pointer bg-background">
          #blog
          <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0">
            <X className="h-3 w-3" />
          </Button>
        </Badge>
        <Badge variant="outline" className="cursor-pointer bg-background">
          <Plus className="h-3 w-3 mr-1" />
          Add Tag
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-64 shrink-0">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-4">Filter</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">File Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="images" defaultChecked />
                        <Label htmlFor="images" className="ml-2 text-sm">
                          Images
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(124)</span>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="videos" />
                        <Label htmlFor="videos" className="ml-2 text-sm">
                          Videos
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(38)</span>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="documents" />
                        <Label htmlFor="documents" className="ml-2 text-sm">
                          Documents
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(15)</span>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="audio" />
                        <Label htmlFor="audio" className="ml-2 text-sm">
                          Audio
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(7)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Date Range</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="last-7-days" defaultChecked />
                        <Label htmlFor="last-7-days" className="ml-2 text-sm">
                          Last 7 days
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="last-30-days" />
                        <Label htmlFor="last-30-days" className="ml-2 text-sm">
                          Last 30 days
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="last-3-months" />
                        <Label htmlFor="last-3-months" className="ml-2 text-sm">
                          Last 3 months
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="custom-range" />
                        <Label htmlFor="custom-range" className="ml-2 text-sm">
                          Custom range
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Usage Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="used" />
                        <Label htmlFor="used" className="ml-2 text-sm">
                          Used in posts
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(87)</span>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="unused" />
                        <Label htmlFor="unused" className="ml-2 text-sm">
                          Unused
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(97)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Performance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="high-engagement" />
                        <Label htmlFor="high-engagement" className="ml-2 text-sm">
                          High engagement (2x+)
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(32)</span>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="average-engagement" />
                        <Label htmlFor="average-engagement" className="ml-2 text-sm">
                          Average engagement
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(64)</span>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="low-engagement" />
                        <Label htmlFor="low-engagement" className="ml-2 text-sm">
                          Low engagement
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground">(18)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Thumbnail Size</h3>
                <Slider defaultValue={[2]} max={3} min={1} step={1} onValueChange={handleSizeChange} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="uploaded">
            <TabsContent value="uploaded" className="mt-0">
              <div className={`grid ${getGridCols()} gap-4`}>
                <MediaItem
                  title="Team Meeting.jpg"
                  date="Apr 23, 2025"
                  size="2.4 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="2.3x"
                />
                <MediaItem
                  title="Product_Phone.jpg"
                  date="Apr 21, 2025"
                  size="1.8 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="1.8x"
                />
                <MediaItem
                  title="Workspace_Coffee.jpg"
                  date="Apr 20, 2025"
                  size="3.2 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="1.2x"
                />
                <MediaItem
                  title="Executive_Portrait.jpg"
                  date="Apr 18, 2025"
                  size="2.7 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="2.1x"
                />
                <MediaItem
                  title="Analytics_Dashboard.jpg"
                  date="Apr 17, 2025"
                  size="1.5 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="0.8x"
                  isLowEngagement
                />
                <MediaItem
                  title="Creative_Desk.jpg"
                  date="Apr 15, 2025"
                  size="2.9 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="1.9x"
                />
                <MediaItem
                  title="Tech_Interface.jpg"
                  date="Apr 14, 2025"
                  size="2.2 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="1.4x"
                />
                <MediaItem
                  title="Office_Building.jpg"
                  date="Apr 12, 2025"
                  size="3.5 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="2.5x"
                />
                <MediaItem
                  title="Annual_Conference.jpg"
                  date="Apr 10, 2025"
                  size="4.1 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="1.3x"
                />
                <MediaItem
                  title="Content_Setup.jpg"
                  date="Apr 8, 2025"
                  size="2.3 MB"
                  image="/placeholder.svg?height=225&width=400"
                  engagement="1.7x"
                />
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">1-10</span> of <span className="font-medium">184</span> items
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-generated" className="mt-0">
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">No AI-generated media yet</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New Media
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stock" className="mt-0">
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Connect to stock photo services</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Connect Stock Service
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
