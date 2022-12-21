import { createClient } from "@supabase/supabase-js";
import { generateToken, sendRefreshToken } from "../../utils/jwt.js";
import { decodeRefreshToken } from "../../utils/jwt.js";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refreshToken");
  //   const refreshToken = cookie.refresh_token;

  if (!refreshToken) {
    return sendError(
      (event,
      createError({
        statusMessage: "refreshToken invalid",
        statusCode: 401,
      }))
    );
  }

  const rToken = await supabase
    .from("RefreshToken")
    .select()
    .eq("token", refreshToken);

  if (!rToken) {
    return sendError(
      (event,
      createError({
        statusMessage: "refreshToken invalid",
        statusCode: 401,
      }))
    );
  }

  const token = decodeRefreshToken(refreshToken);

  try {
    const user = await supabase.from("User").select().eq("id", token.userId);

    const { accessToken } = generateToken(user);

    return {
      access_token: accessToken,
    };
  } catch (error) {
    return sendError(
      (event,
      createError({
        statusMessage: "Something Went Wrong",
        statusCode: 500,
      }))
    );
  }
  return {
    msg: "hell",
  };
});
