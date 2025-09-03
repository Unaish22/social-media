"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Lightbulb } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function InspirationSection({ query }: { query: string }) {
  const [posts, setPosts]   = useState<any[]>([])
  const [loading, setLoad]  = useState(false)

  const fetchInspiration = async () => {
    setLoad(true)
    try {
      const res   = await fetch(`/api/inspiration?q=${encodeURIComponent(query)}`)
      const json  = await res.json()
      setPosts(json.posts ?? [])
    } finally {
      setLoad(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <label className="mb-2 block text-base font-medium">Popular Posts in Your Niche</label>

      {posts.length === 0 && !loading && (
        <p className="text-sm text-gray-500 mb-3">No inspiration loaded yet.</p>
      )}

      <div className="space-y-4">
        {(loading ? Array(3).fill(0) : posts).map((p, i) =>
          loading ? (
            <Skeleton key={i} className="h-24 w-full rounded-md" />
          ) : (
            <motion.div
              key={`${p.user}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{p.user}</p>
                      <p className="text-sm">{p.text}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{p.stats.likes} likes</span>
                        <span>{p.stats.comments} comments</span>
                        <span>{p.stats.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        )}
      </div>

      <Button
        variant="outline"
        disabled={loading || !query}
        onClick={fetchInspiration}
        className="w-full mt-4 border-gray-300"
      >
        <Lightbulb className="mr-2 h-4 w-4" />
        {loading ? "Loading…" : "Get More Inspiration"}
      </Button>
    </motion.div>
  )
}