import { NextRequest, NextResponse } from "next/server"
import { scrapeTopPosts } from "@/lib/scraper"

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim()
  if (!q) return NextResponse.json({ error: "Missing query" }, { status: 400 })

  try {
    const posts = await scrapeTopPosts(q)

    let summary = ""
    // OPTIONAL TinyLLaMA stub
    try {
      const llm = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: posts.map(p => p.text) }),
      }).then(r => r.json())
      summary = llm?.text ?? ""
    } catch {
      /* TinyLLaMA not running */
    }

    return NextResponse.json({ posts, summary })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}