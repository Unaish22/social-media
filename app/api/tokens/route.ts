import { type NextRequest, NextResponse } from "next/server"

// In a real app, this would use a database
// For now, we'll use a simple in-memory store
let tokenStore: any[] = []

export async function GET() {
  return NextResponse.json({ tokens: tokenStore })
}

export async function POST(request: NextRequest) {
  try {
    const tokenData = await request.json()

    const newToken = {
      id: `${tokenData.platform}_${tokenData.userId}_${Date.now()}`,
      ...tokenData,
      createdAt: new Date().toISOString(),
      lastRefreshed: new Date().toISOString(),
      isActive: true,
    }

    tokenStore.push(newToken)

    return NextResponse.json({ success: true, token: newToken })
  } catch (error) {
    return NextResponse.json({ error: "Failed to store token" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { tokenId, updates } = await request.json()

    const tokenIndex = tokenStore.findIndex((token) => token.id === tokenId)
    if (tokenIndex === -1) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 })
    }

    tokenStore[tokenIndex] = { ...tokenStore[tokenIndex], ...updates }

    return NextResponse.json({ success: true, token: tokenStore[tokenIndex] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update token" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tokenId = searchParams.get("tokenId")

    if (!tokenId) {
      return NextResponse.json({ error: "Token ID is required" }, { status: 400 })
    }

    tokenStore = tokenStore.filter((token) => token.id !== tokenId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete token" }, { status: 500 })
  }
}
