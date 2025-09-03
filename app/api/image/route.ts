// app/api/image/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';          // fastest on Vercel

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get('prompt') || 'A vibrant social media post';
  const width = Number(searchParams.get('w') || 1024);
  const height = Number(searchParams.get('h') || 1024);

  // Pollinations free endpoint
  const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=${width}&height=${height}&nologo=true`;

  // 1. Download the image
  const res0 = await fetch(imgUrl, { next: { revalidate: 3600 } });
  if (!res0.ok)
    return NextResponse.json({ error: 'Pollinations error' }, { status: 500 });

  const buffer = Buffer.from(await res0.arrayBuffer());

  // 2. Return PNG
  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}