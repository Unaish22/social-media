import { type NextRequest, NextResponse } from "next/server"

const PLATFORM_APIS = {
  facebook: {
    baseUrl: "https://graph.facebook.com/v18.0",
    endpoints: {
      profile: "/me?fields=id,name,email",
      pages: "/me/accounts",
      post: "/{page-id}/feed",
      insights: "/{page-id}/insights",
    },
  },
  twitter: {
    baseUrl: "https://api.twitter.com/2",
    endpoints: {
      profile: "/users/me",
      tweet: "/tweets",
      followers: "/users/by/username/{username}/followers",
      analytics: "/tweets/{id}/metrics",
    },
  },
  linkedin: {
    baseUrl: "https://api.linkedin.com/v2",
    endpoints: {
      profile: "/people/~",
      companies: "/organizationAcls?q=roleAssignee",
      post: "/ugcPosts",
      analytics: "/organizationalEntityShareStatistics",
    },
  },
}

export async function GET(request: NextRequest, { params }: { params: { platform: string; action: string } }) {
  const { platform, action } = params
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get("accessToken")

  if (!accessToken) {
    return NextResponse.json({ error: "Access token is required" }, { status: 401 })
  }

  const platformApi = PLATFORM_APIS[platform as keyof typeof PLATFORM_APIS]
  if (!platformApi) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 })
  }

  const endpoint = platformApi.endpoints[action as keyof typeof platformApi.endpoints]
  if (!endpoint) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  try {
    const url = `${platformApi.baseUrl}${endpoint}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`${platform} API error:`, error)
    return NextResponse.json({ error: "API request failed" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { platform: string; action: string } }) {
  const { platform, action } = params
  const body = await request.json()
  const { accessToken, ...postData } = body

  if (!accessToken) {
    return NextResponse.json({ error: "Access token is required" }, { status: 401 })
  }

  const platformApi = PLATFORM_APIS[platform as keyof typeof PLATFORM_APIS]
  if (!platformApi) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 })
  }

  const endpoint = platformApi.endpoints[action as keyof typeof platformApi.endpoints]
  if (!endpoint) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  try {
    const url = `${platformApi.baseUrl}${endpoint}`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`${platform} API error:`, error)
    return NextResponse.json({ error: "API request failed" }, { status: 500 })
  }
}
