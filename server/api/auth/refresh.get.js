import { createClient } from "@supabase/supabase-js";
import { generateToken } from "../../utils/jwt.js";
import { decodeRefreshToken } from "../../utils/jwt.js";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, "refreshToken");

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
    const { data: user } = await supabase
      .from("User")
      .select()
      .eq("id", token.userId);

    const { accessToken } = generateToken(user[0].id);

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
});
