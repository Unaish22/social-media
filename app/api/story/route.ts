import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, platform, style, duration } = await request.json()

    if (!text || !platform) {
      return NextResponse.json({ error: "Text and platform are required" }, { status: 400 })
    }

    const config = {
      text,
      platform,
      style: style || "modern",
      duration: duration || 5,
      dimensions: getDimensions(platform),
      fps: 30,
      timestamp: Date.now(),
    }

    return NextResponse.json({ config, success: true })
  } catch (error) {
    console.error("Video generation error:", error)
    return NextResponse.json({ error: "Failed to process video request" }, { status: 500 })
  }
}

function getDimensions(platform: string) {
  const dimensions = {
    "instagram-story": { width: 1080, height: 1920 },
    "instagram-post": { width: 1080, height: 1080 },
    "facebook-post": { width: 1200, height: 630 },
    "twitter-post": { width: 1200, height: 675 },
    youtube: { width: 1920, height: 1080 },
  }

  return dimensions[platform as keyof typeof dimensions] || dimensions["instagram-post"]
}