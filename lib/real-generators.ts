// Fully typed, zero API keys (where possible), zero RapidAPI, lifetime free

import { templateDataset, type Template } from "./template-dataset"
import { TemplateGenerator } from "./template-generator"

/* 0️⃣  UTIL ------------------------------------------------------ */
async function ollamaGenerate(prompt: string, model = "tinyllama"): Promise<string> {
  try {
    const res = await fetch("/api/ollama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, model }),
    })

    if (!res.ok) {
      console.warn("Ollama API not available, using fallback")
      return generateFallbackText(prompt)
    }

    const data = await res.json()
    return typeof data === "string" ? data : data.response || generateFallbackText(prompt)
  } catch (error) {
    console.warn("Ollama generation failed, using fallback:", error)
    return generateFallbackText(prompt)
  }
}

function generateFallbackText(prompt: string): string {
  const templates = [
    `🌟 Exciting news about ${prompt}! This is going to be amazing. #innovation #exciting`,
    `✨ Check out this incredible ${prompt}! You won't believe what's possible. #amazing #trending`,
    `🚀 Ready to explore ${prompt}? Let's dive into something extraordinary! #explore #discover`,
    `💫 Here's something special about ${prompt} that will inspire you today! #inspiration #motivation`,
    `🎯 Focus on ${prompt} and watch the magic happen! #focus #success`,
  ]
  return templates[Math.floor(Math.random() * templates.length)]
}

/* 1️⃣  CAPTION --------------------------------------------------- */
export async function generateText(prompt: string, tone = "friendly"): Promise<string> {
  const fullPrompt = `Write a short social-media caption for: ${prompt}.
Tone: ${tone}. Max 2 sentences, include emoji & 2 hashtags.`
  return ollamaGenerate(fullPrompt)
}

/* 2️⃣  HASHTAGS -------------------------------------------------- */
export async function generateHashtags(prompt: string): Promise<string[]> {
  const fullPrompt = `Return 12 high-engagement hashtags for: ${prompt}.
Output only the hashtags separated by commas.`
  const raw = await ollamaGenerate(fullPrompt)
  return raw
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean)
}

/* 3️⃣  IMAGE ----------------------------------------------------- */
export async function generateImage(prompt: string, count = 4): Promise<string[]> {
  return Array.from({ length: count }).map(
    (_, i) => `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${i}`,
  )
}

/* 4️⃣  CAROUSEL -------------------------------------------------- */
export async function generateCarousel(prompt: string): Promise<string[]> {
  return generateImage(`${prompt} carousel slide`, 3)
}

/* 5️⃣  STORY ----------------------------------------------------- */
export async function generateStory(prompt: string): Promise<string[]> {
  const urls = await generateImage(`${prompt} instagram story`, 2)
  return urls.map((u) => u.replace("1024x1024", "1080x1920")) // Adjust resolution
}

/* 6️⃣  VIDEO ----------------------------------------------------- */
export async function generateVideo(keyword: string, perPage = 3): Promise<string[]> {
  const res = await fetch(
    `https://api.pexels.com/videos/search?query=${encodeURIComponent(keyword)}&per_page=${perPage}`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY || "",
      },
    },
  )

  if (!res.ok) return []
  const data = await res.json()
  return data.videos
    ?.map((v: any) => v.video_files.find((f: any) => f.quality === "hd")?.link || v.video_files[0]?.link)
    .filter(Boolean)
}

/* 7️⃣  TEMPLATES ------------------------------------------------- */
export async function generateTemplates(prompt: string): Promise<Template[]> {
  try {
    // Generate a custom template based on the prompt
    const customTemplate = TemplateGenerator.generateFromText(prompt)

    // Get relevant pre-built templates based on detected profession
    const words = prompt.toLowerCase().split(" ")
    const relevantTemplates = templateDataset.filter(
      (template) =>
        template.tags.some((tag) => words.some((word) => word.includes(tag))) ||
        words.some((word) => template.category.toLowerCase().includes(word)),
    )

    // Return custom template plus relevant pre-built ones
    return [customTemplate, ...relevantTemplates.slice(0, 3)]
  } catch (error) {
    console.error("Template generation error:", error)
    // Fallback to first few templates if generation fails
    return templateDataset.slice(0, 4)
  }
}

/* 8️⃣  SOCIAL MEDIA GENERATOR ------------------------------------ */
export async function generateSocialMediaGenerator(prompt: string): Promise<any> {
  // This can be your existing social media generator logic
  // For now, returning a placeholder
  return {
    type: "social_media_generator",
    content: `Generated social media content for: ${prompt}`,
    timestamp: new Date().toISOString(),
  }
}
