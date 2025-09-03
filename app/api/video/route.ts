// app/api/video/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import https from 'https';

const PEXELS_KEY = process.env.PEXELS_API_KEY!;

/* ---------- helper: stream a file over HTTPS ---------- */
async function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        res.pipe(file);
        file.on('finish', () => file.close());
        file.on('close', resolve);
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {}); // clean up partial file
        reject(err);
      });
  });
}

/* ---------- GET /api/video?q=fitness&perPage=12 ---------- */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query   = searchParams.get('q')      || 'fitness';
  const perPage = Number(searchParams.get('perPage') ?? 12);

  /* 1. Search Pexels */
  const pexelsRes = await fetch(
    `https://api.pexels.com/videos/search?query=${encodeURIComponent(
      query
    )}&per_page=${perPage}`,
    { headers: { Authorization: PEXELS_KEY } }
  );

  if (!pexelsRes.ok) {
    return NextResponse.json({ error: 'Pexels API error' }, { status: 502 });
  }

  const data = await pexelsRes.json();
  const videosRaw: any[] = data.videos || [];

  /* 2. Build the payload and download missing files */
  const videos = await Promise.all(
    videosRaw.map(async (v) => {
      // pick best quality file
      const fileObj =
        v.video_files.find((f: any) => f.quality === 'hd') || v.video_files[0];
      if (!fileObj) return null;

      const fileUrl  = fileObj.link;
      const fileName = `${v.id}.mp4`;
      const localPath = path.join(process.cwd(), 'public', 'videos', fileName);

      // ensure the /public/videos folder exists
      const dir = path.dirname(localPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      // download once, skip if already cached
      if (!fs.existsSync(localPath)) {
        try {
          await download(fileUrl, localPath);
        } catch (err) {
          console.error(`Download failed for ${fileUrl}`, err);
          return null; // gracefully skip this video
        }
      }

      return { id: v.id, path: `/videos/${fileName}` };
    })
  );

  /* 3. Remove any null entries */
  return NextResponse.json(videos.filter(Boolean));
}