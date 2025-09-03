import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export async function GET() {
  const { data: { user } } = await supabase.auth.getUser();
  return NextResponse.json({ isAuthenticated: !!user });
}