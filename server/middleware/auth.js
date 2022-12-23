import { createClient } from "@supabase/supabase-js";
import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const endpoint = ["/api/auth/user", "/api/user/tweets"];

  const isHandledByThisMiddleware = endpoint.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.req.url);
  });

  if (!isHandledByThisMiddleware) {
    return;
  }

  const token = event.node.req.headers["authorization"]?.split(" ")[1];

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  try {
    const userId = decoded.userId;

    const { data } = await supabase
      .from("User")
      .select("id, email ,name , username, profileImage")
      .eq("id", userId.data[0].id);

    event.context.auth = { data: data[0] };
  } catch (error) {
    return;
  }
});
