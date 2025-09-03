import { NextResponse } from "next/server";
import { ollamaGenerate } from "@/lib/ollamaClient";

export async function POST(request: Request) {
  try {
    const { prompt, tone } = await request.json();
    const fullPrompt = `Generate a social media caption with a ${tone} tone: ${prompt}`;
    const text = await ollamaGenerate(fullPrompt);
    return NextResponse.json({ success: true, text });
  } catch (error) {
    console.error("Ollama error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate text" }, { status: 500 });
  }
}
