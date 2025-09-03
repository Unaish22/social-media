"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Lightbulb, RefreshCw, Sparkles, User } from "lucide-react"
import TemplateSectionEnhanced from "@/components/template-section-enhanced"

const CaptionSection = ({ caption }: { caption?: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <div className="flex justify-between mb-2">
      <Label className="text-base font-semibold">Caption</Label>
      <Select defaultValue="friendly">
        <SelectTrigger className="w-[120px] border-gray-300 shadow-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="friendly">Friendly</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="casual">Casual</SelectItem>
          <SelectItem value="persuasive">Persuasive</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Textarea
      className="min-h-[150px] border-gray-200 shadow-sm rounded-lg"
      value={caption ?? "Nothing yet…"}
      readOnly
    />
  </motion.div>
)

const HashtagSection = ({ hashtags }: { hashtags?: string[] }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <Label className="text-base font-semibold mb-2">Hashtags</Label>
    <div className="flex flex-wrap gap-2">
      {(hashtags ?? []).map((h) => (
        <Badge key={h} className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
          {h}
        </Badge>
      ))}
    </div>
  </motion.div>
)

const ImageSection = ({ images }: { images?: string[] }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <Label className="text-base font-semibold mb-2">Generated Images</Label>
    <div className="grid grid-cols-2 gap-4">
      {(images ?? []).map((src, i) => (
        <img
          key={i}
          src={src || "/placeholder.svg"}
          alt={`img-${i}`}
          className="w-full aspect-square object-cover rounded-lg border shadow-sm"
        />
      ))}
    </div>
  </motion.div>
)

const CarouselSection = ({ carousel }: { carousel?: string[] }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <Label className="text-base font-semibold mb-2">Carousel</Label>
    <div className="grid grid-cols-3 gap-2">
      {(carousel ?? []).map((src, i) => (
        <img
          key={i}
          src={src || "/placeholder.svg"}
          alt={`slide-${i}`}
          className="w-full aspect-[4/5] object-cover rounded-lg border shadow-sm"
        />
      ))}
    </div>
  </motion.div>
)

const StorySection = ({ story }: { story?: string[] }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <Label className="text-base font-semibold mb-2">Stories</Label>
    <div className="flex gap-2 overflow-x-auto pb-2">
      {(story ?? []).map((src, i) => (
        <img
          key={i}
          src={src || "/placeholder.svg"}
          alt={`story-${i}`}
          className="h-64 w-36 object-cover rounded-lg border shadow-sm shrink-0"
        />
      ))}
    </div>
  </motion.div>
)

const VideoSection = ({ video }: { video?: string[] }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <Label className="text-base font-semibold mb-2">Videos</Label>
    <div className="space-y-2">
      {(video ?? []).map((src, i) => (
        <video key={i} src={src} controls className="w-full rounded-lg border shadow-sm" />
      ))}
    </div>
  </motion.div>
)

const InspirationSection = ({ query }: { query: string }) => {
  const [posts, setPosts] = useState<any[]>([])
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchInspiration = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/inspiration?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setPosts(data.posts ?? [])
      setSummary(data.summary ?? "")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Label className="mb-2 block text-base font-semibold">Popular Posts in Your Niche</Label>
      {summary && <p className="text-sm italic text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg shadow-sm">{summary}</p>}
      <div className="space-y-4">
        {(loading ? Array(3).fill(0) : posts).map((p, i) =>
          loading ? (
            <Skeleton key={i} className="h-52 w-full rounded-lg" />
          ) : (
            <motion.div
              key={`${p.user}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-0">
                  <img
                    src={p.imageUrl || "/placeholder.svg"}
                    alt={`${p.user}-thumb`}
                    className="w-full h-52 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-700">{p.user}</p>
                    <p className="text-sm mt-1">{p.text}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{p.stats.likes} likes</span>
                      <span>{p.stats.comments} comments</span>
                      <span>{p.stats.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ),
        )}
      </div>
      <Button
        variant="outline"
        disabled={loading || !query.trim()}
        onClick={fetchInspiration}
        className="w-full mt-4 border-gray-300 shadow-sm hover:bg-gray-50 transition-colors bg-transparent"
      >
        <Lightbulb className="mr-2 h-4 w-4" />
        {loading ? "Fetching…" : posts.length ? "Fetch Again" : "Get More Inspiration"}
      </Button>
    </motion.div>
  )
}

export default function GenerateContent() {
  const [prompt, setPrompt] = useState("")
  const [tone, setTone] = useState("friendly")
  const [types, setTypes] = useState<string[]>(["caption", "hashtags", "templates"])
  const [result, setResult] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("Sending request with:", { prompt, types, tone })

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, types, tone }),
      })

      console.log("Response status:", res.status)

      if (!res.ok) {
        const text = await res.text()
        console.error("HTTP error! Status:", res.status, "Response:", text)
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text()
        console.error("Expected JSON but got:", contentType, "Content:", text)
        throw new Error("Server returned non-JSON response")
      }

      const data = await res.json()
      console.log("Response data:", data)
      setResult(data)
    } catch (err: any) {
      console.error("Fetch error:", err.message)
      setError(`Generation failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 max-w-3xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Generate Content</h1>

        <Label htmlFor="prompt" className="text-base font-semibold">
          Content Prompt
        </Label>
        <Textarea
          id="prompt"
          className="min-h-[120px] mt-1 border-gray-200 shadow-sm rounded-lg"
          placeholder="I'm a fashion photographer named Sarah who loves modern, clean designs for my portfolio..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Label className="mt-4 block text-base font-semibold">Tone</Label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="w-[180px] border-gray-200 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="persuasive">Persuasive</SelectItem>
          </SelectContent>
        </Select>

        <fieldset className="my-4">
          <legend className="mb-2 text-sm font-semibold">Assets to generate ✅</legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { label: "Caption", value: "caption" },
              { label: "Hashtags", value: "hashtags" },
              { label: "Image", value: "image" },
              { label: "Carousel", value: "carousel" },
              { label: "Story", value: "story" },
              { label: "Video", value: "video" },
              { label: "Inspiration", value: "inspiration" },
              { label: "Templates", value: "templates" },
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={types.includes(value)}
                  onChange={(e) => setTypes(e.target.checked ? [...types, value] : types.filter((x) => x !== value))}
                />
                <span className="capitalize">{label}</span>
                {value === "templates" && (
                  <Badge className="ml-1 bg-purple-100 text-purple-700">
                    <User className="w-3 h-3 mr-1" />
                    Portfolio Generator
                  </Badge>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <Button
          className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors shadow-sm"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <AnimatePresence>
          {(Object.keys(result).length > 0 || types.includes("inspiration") || types.includes("templates")) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <Tabs defaultValue={types[0]} className="w-full">
                <TabsList
                  className="grid gap-1 bg-gray-100 rounded-lg"
                  style={{ gridTemplateColumns: `repeat(${types.length},1fr)` }}
                >
                  {types.map((t) => (
                    <TabsTrigger key={t} value={t} className="capitalize text-sm">
                      {t.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {types.map((type) => (
                  <TabsContent key={type} value={type}>
                    {type === "caption" && <CaptionSection caption={result.caption} />}
                    {type === "hashtags" && <HashtagSection hashtags={result.hashtags} />}
                    {type === "image" && <ImageSection images={result.images} />}
                    {type === "carousel" && <CarouselSection carousel={result.carousel} />}
                    {type === "story" && <StorySection story={result.story} />}
                    {type === "video" && <VideoSection video={result.video} />}
                    {type === "inspiration" && <InspirationSection query={prompt} />}
                    {type === "templates" && <TemplateSectionEnhanced templates={result.templates} prompt={prompt} />}
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
