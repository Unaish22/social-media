import { NextResponse } from "next/server"
import { ollamaGenerate } from "@/lib/ollamaClient"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const prompt = body.prompt || ""
    const tone = body.tone || "neutral"

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required" }, { status: 400 })
    }

    const fullPrompt = `Generate a social media caption with a ${tone} tone: ${prompt}`
    const text = await ollamaGenerate(fullPrompt)

    return NextResponse.json({ success: true, text })
  } catch (error: any) {
    console.error("Ollama error:", error?.message || error)
    return NextResponse.json({ success: false, error: "Failed to generate text" }, { status: 500 })
  }
}
