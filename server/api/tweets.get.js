import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async () => {
  const { data, error } = await supabase
    .from("Tweet")
    .select(
      "id, text, User(username,name,profileImage), MediaFiles(id, url, providerPublicId), Tweet(id, text, MediaFiles(id, url, providerPublicId), User(username,name,profileImage))"
    )
    .is("replyToId", null)
    .limit(5);

  if (error) {
    return {
      msg: "fetch tweet failed",
      error,
    };
  }

  return {
    data,
  };
});
