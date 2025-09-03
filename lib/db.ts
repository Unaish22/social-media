import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveSocialToken(userId: string, platform: string, token: string) {
  const { error } = await supabase
    .from("tokens")
    .upsert(
      { userId, platform, token, updatedAt: new Date().toISOString() },
      { onConflict: "userId,platform" }
    );

  if (error) {
    console.error("Error saving token:", error.message);
    throw new Error("Failed to save social token");
  }
}

export async function getSocialToken(userId: string, platform: string) {
  const { data, error } = await supabase
    .from("tokens")
    .select("token")
    .eq("userId", userId)
    .eq("platform", platform)
    .single();

  if (error) {
    console.error("Error fetching token:", error.message);
    return null;
  }

  return data?.token || null;
}

export async function saveScheduledPost(postData: any) {
  const { error } = await supabase.from("posts").insert({
    ...postData,
    createdAt: new Date().toISOString(),
  });

  if (error) {
    console.error("Error saving post:", error.message);
    throw new Error("Failed to save scheduled post");
  }
}