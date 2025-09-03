import { NextResponse } from "next/server";
import { saveSocialToken } from "@/lib/db";
import { encrypt } from "@/lib/encryption";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export async function GET(request: Request) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI;

  try {
    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri || "",
        code_verifier: "challenge",
      }),
    });
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
    }

    const encryptedToken = encrypt(tokenData.access_token);
    await saveSocialToken(session.user.id, "twitter", encryptedToken);

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Twitter OAuth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}