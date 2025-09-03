import { NextRequest, NextResponse } from "next/server";
import { getSession } from "supertokens-node/recipe/session";
import { saveSocialToken } from "@/lib/db";
import { encrypt } from "@/lib/encryption";

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  const session = await getSession(request, NextResponse.next());
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userId = session.getUserId();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const platform = params.platform;
  const clientId = process.env[`NEXT_PUBLIC_${platform.toUpperCase()}_CLIENT_ID`];
  const clientSecret = process.env[`${platform.toUpperCase()}_CLIENT_SECRET`];
  const redirectUri = process.env[`NEXT_PUBLIC_${platform.toUpperCase()}_REDIRECT_URI`];

  const oauthConfigs: {
    [key: string]: { url: string; method: string; body?: any; headers?: Record<string, string> };
  } = {
    facebook: {
      url: `https://graph.facebook.com/v23.0/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`,
      method: "GET",
    },
    instagram: {
      url: "https://api.instagram.com/oauth/access_token",
      method: "POST",
      body: new URLSearchParams({
        client_id: clientId || "",
        client_secret: clientSecret || "",
        grant_type: "authorization_code",
        redirect_uri: redirectUri || "",
        code,
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
    twitter: {
      url: "https://api.twitter.com/2/oauth2/token",
      method: "POST",
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri || "",
        code_verifier: "challenge",
      }),
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  };

  try {
    const config = oauthConfigs[platform];
    if (!config) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const tokenResponse = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.body,
    });
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return NextResponse.json(
        { error: tokenData.error_description || tokenData.error.message },
        { status: 400 }
      );
    }

    const encryptedToken = encrypt(tokenData.access_token);
    await saveSocialToken(userId, platform, encryptedToken);

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error(`${platform} OAuth error:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}