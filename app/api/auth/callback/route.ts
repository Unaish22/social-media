import { type NextRequest, NextResponse } from "next/server"

const PLATFORM_CONFIG = {
  facebook: {
    tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
    userUrl: "https://graph.facebook.com/me?fields=id,name,email",
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },
  twitter: {
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    userUrl: "https://api.twitter.com/2/users/me",
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  },
  linkedin: {
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    userUrl: "https://api.linkedin.com/v2/people/~",
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/tokens?error=${error}`)
  }

  if (!code || !state) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/tokens?error=missing_params`)
  }

  try {
    const [platform, userId] = state.split("_")
    const config = PLATFORM_CONFIG[platform as keyof typeof PLATFORM_CONFIG]

    if (!config) {
      throw new Error("Invalid platform")
    }

    // Exchange code for access token
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId!,
        client_secret: config.clientSecret!,
        code,
        redirect_uri: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/auth/callback`,
        grant_type: "authorization_code",
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed: ${tokenResponse.statusText}`)
    }

    const tokenData = await tokenResponse.json()

    // Get user info
    const userResponse = await fetch(config.userUrl, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error(`User info fetch failed: ${userResponse.statusText}`)
    }

    const userData = await userResponse.json()

    // Store token (in a real app, this would go to a database)
    const tokenInfo = {
      platform,
      userId,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      platformUserId: userData.id,
      platformUserName: userData.name || userData.login,
      scopes: tokenData.scope?.split(" ") || [],
    }

    // Store in localStorage via client-side redirect
    const encodedToken = encodeURIComponent(JSON.stringify(tokenInfo))
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/success?token=${encodedToken}`,
    )
  } catch (error) {
    console.error("OAuth callback error:", error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/tokens?error=oauth_failed`)
  }
}
