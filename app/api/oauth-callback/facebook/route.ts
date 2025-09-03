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

  const clientId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;

  try {
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v23.0/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`
    );
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error.message }, { status: 400 });
    }

    const encryptedToken = encrypt(tokenData.access_token);
    await saveSocialToken(session.user.id, "facebook", encryptedToken);

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Facebook OAuth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}