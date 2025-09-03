import { NextResponse } from "next/server";
import { getSocialToken, saveScheduledPost } from "@/lib/db";
import { decrypt } from "@/lib/encryption";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export async function POST(request: Request) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const body = await request.json();
  const { platforms, content, images, videos, date, scheduleType, repeat } = body;

  if (!platforms || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const tokens: { [key: string]: string } = {};
    for (const platform of Object.keys(platforms)) {
      const token = await getSocialToken(session.user.id, platform);
      if (!token) {
        return NextResponse.json(
          { error: `No token found for ${platform}` },
          { status: 400 }
        );
      }
      tokens[platform] = decrypt(token);
    }

    await saveScheduledPost({
      userId: session.user.id,
      platforms,
      content,
      images,
      videos,
      scheduleType,
      date,
      repeat,
    });

    const n8nResponse = await fetch(`${process.env.N8N_WEBHOOK_URL}/${scheduleType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.N8N_JWT_SECRET}`,
      },
      body: JSON.stringify({ userId: session.user.id, platforms, content, images, videos, token: tokens, date, repeat }),
    });

    if (!n8nResponse.ok) {
      throw new Error("Failed to trigger n8n workflow");
    }

    return NextResponse.json({ message: "Post scheduled successfully" });
  } catch (error) {
    console.error("Schedule post error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}