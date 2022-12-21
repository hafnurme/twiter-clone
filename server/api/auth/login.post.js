import { createClient } from "@supabase/supabase-js";
import { generateToken, sendRefreshToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid Params",
      })
    );
  }

  const { data: user, error } = await supabase
    .from("User")
    .select()
    .eq("username", username);

  if (user.length < 1 || !user) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: "User Tidak Ditemukan",
      })
    );
  }

  const passwordCheck = await bcrypt.compare(password, user[0].password);

  if (!passwordCheck) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Password salah",
      })
    );
  }

  const { accessToken, refreshToken } = generateToken(user[0].id);

  const { data } = await supabase
    .from("RefreshToken")
    .insert({ token: refreshToken, userID: user[0].id });

  sendRefreshToken(event, refreshToken);

  return {
    user: {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      username: user[0].username,
      profileImage: user[0].profileImage,
    },
    access_token: accessToken,
  };
});
