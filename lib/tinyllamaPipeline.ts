// lib/real-generators.ts
import { ollamaGenerate } from "./ollamaClient"

/* 1️⃣ CAPTION — TinyLlama via Ollama */
export async function generateText(
  prompt: string,
  tone = "friendly"
): Promise<string> {
  const fullPrompt = `Write a short social-media caption for: ${prompt}. Tone: ${tone}. Max 2 sentences, include emojis and 2–3 hashtags.`
  return await ollamaGenerate(fullPrompt)
}

/* 2️⃣ HASHTAGS — TinyLlama via Ollama */
export async function generateHashtags(prompt: string): Promise<string[]> {
  const fullPrompt = `Return 12 high-engagement hashtags for: ${prompt}. Output only the hashtags separated by commas, no extra text.`
  const raw = await ollamaGenerate(fullPrompt)
  return raw.split(",").map((h: string) => h.trim()).filter(Boolean)
}

/* 3️⃣ IMAGE (Pollinations) */
export async function generateImage(prompt: string, count = 4): Promise<string[]> {
  return Array.from({ length: count }).map(
    (_, i) =>
      `https://image.pollinations.ai/prompt/${encodeURIComponent(
        `${prompt} --ar 1:1`
      )}?width=512&height=512&nologo=true&seed=${i}`
  )
}

/* 4️⃣ CAROUSEL (same engine, 3 slides) */
export async function generateCarousel(prompt: string): Promise<string[]> {
  return await generateImage(`${prompt} carousel slide`, 3)
}

/* 5️⃣ STORY (1080×1920) */
export async function generateStory(prompt: string): Promise<string[]> {
  const urls = await generateImage(`${prompt} instagram story`, 2)
  return urls.map((url: string) =>
    url.replace("width=512&height=512", "width=1080&height=1920")
  )
}

/* 6️⃣ VIDEO (Pexels) */
export async function generateVideo(
  keyword: string,
  perPage = 3
): Promise<string[]> {
  const res = await fetch(
    `https://api.pexels.com/videos/search?query=${encodeURIComponent(
      keyword
    )}&per_page=${perPage}`,
    { headers: { Authorization: process.env.PEXELS_API_KEY! } }
  )
  if (!res.ok) return []

  const data = await res.json()
  return data.videos.map((v: any) => {
    const file = v.video_files.find((f: any) => f.quality === "hd") || v.video_files[0]
    return file.link
  })
}