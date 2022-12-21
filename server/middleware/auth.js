import { createClient } from "@supabase/supabase-js";
import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const endpoint = ["api/auth/user"];

  const isHandledByThisMiddleware = endpoint.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.req.url);
  });

  if (!isHandledByThisMiddleware) {
    event.context.gg = { msg: "gg" };
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

    const { data } = await supabase.from("User").select().eq("id", userId);

    event.context.user = data;
  } catch (error) {
    return;
  }
});
