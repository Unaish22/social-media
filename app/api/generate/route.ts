import { type NextRequest, NextResponse } from "next/server"
import {
  generateText,
  generateHashtags,
  generateImage,
  generateCarousel,
  generateStory,
  generateVideo,
  generateTemplates,
  generateSocialMediaGenerator,
} from "@/lib/real-generators"

const PREDIS_KEY = process.env.NEXT_PUBLIC_PREDIS_API_KEY

async function generatePredisPost(prompt: string, tone: string) {
  if (!PREDIS_KEY) {
    console.warn("PREDIS_KEY not found, skipping Predis generation")
    return { error: "PREDIS_KEY not configured" }
  }

  try {
    const res = await fetch("https://api.predis.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PREDIS_KEY}`,
      },
      body: JSON.stringify({
        text: prompt,
        brand_tone: tone,
        post_type: "post",
        platforms: ["instagram"],
      }),
    })

    if (!res.ok) {
      console.error("Failed to generate Predis post:", await res.text())
      return { error: "Failed to generate Predis post" }
    }

    const json = await res.json()
    return { predis: json }
  } catch (error) {
    console.error("Predis generation error:", error)
    return { error: "Predis generation failed" }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, types, tone } = body

    console.log("API received:", { prompt, types, tone })

    if (!prompt || !types || !Array.isArray(types)) {
      return NextResponse.json({ error: "Missing required fields: prompt, types" }, { status: 400 })
    }

    const results: Record<string, any> = {}

    // Process each type sequentially to avoid overwhelming the system
    for (const type of types) {
      try {
        switch (type) {
          case "caption":
            results.caption = await generateText(prompt, tone)
            break
          case "hashtags":
            results.hashtags = await generateHashtags(prompt)
            break
          case "image":
            results.images = await generateImage(prompt)
            break
          case "carousel":
            results.carousel = await generateCarousel(prompt)
            break
          case "story":
            results.story = await generateStory(prompt)
            break
          case "video":
            results.video = await generateVideo(prompt)
            break
          case "templates":
            results.templates = await generateTemplates(prompt)
            break
          case "socialMediaGenerator":
            results.socialMediaGenerator = await generateSocialMediaGenerator(prompt)
            break
          case "predis":
            const predisResult = await generatePredisPost(prompt, tone)
            results.predis = predisResult.predis
            break
          default:
            console.warn(`Unknown generation type: ${type}`)
        }
      } catch (error) {
        console.error(`Error generating ${type}:`, error)
        // Set fallback values for failed generations
        switch (type) {
          case "caption":
            results.caption = `Check out this amazing ${prompt}! 🌟 #awesome #${prompt.split(" ")[0]}`
            break
          case "hashtags":
            results.hashtags = [`#${prompt.split(" ")[0]}`, "#awesome", "#trending"]
            break
          case "image":
            results.images = [`/placeholder.svg?height=400&width=400&query=${encodeURIComponent(prompt)}`]
            break
          case "carousel":
            results.carousel = [`/placeholder.svg?height=400&width=400&query=${encodeURIComponent(prompt + " slide")}`]
            break
          case "story":
            results.story = [`/placeholder.svg?height=800&width=400&query=${encodeURIComponent(prompt + " story")}`]
            break
          case "video":
            results.video = []
            break
          case "templates":
            results.templates = []
            break
          case "socialMediaGenerator":
            results.socialMediaGenerator = { error: "Generation failed" }
            break
          case "predis":
            results.predis = null
            break
        }
      }
    }

    console.log("API returning:", Object.keys(results))
    return NextResponse.json(results)
  } catch (err: any) {
    console.error("Generate route error:", err)
    return NextResponse.json({ error: `Generation failed: ${err.message}` }, { status: 500 })
  }
}
