import { NextRequest, NextResponse } from "next/server"

let settings = {
  autoRefresh: true,
  encryptTokens: true,
  notifyEmail: true,
}

export async function GET() {
  return NextResponse.json(settings)
}

export async function POST(req: NextRequest) {
  settings = await req.json()
  return NextResponse.json(settings)
}