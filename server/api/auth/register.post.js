import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, name } = body;
  const encryptPw = bcrypt.hashSync(password, 10);

  const randomNum = Math.floor(Math.random() * Date.now());

  const invalidParams = () => {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid params",
      })
    );
  };

  if (!username || !email || !password || !repeatPassword || !name)
    invalidParams();

  if (password != repeatPassword) invalidParams();

  const { data, error } = await supabase
    .from("User")
    .insert({
      username,
      email,
      password: encryptPw,
      name,
      profileImage: `https://avatars.dicebear.com/api/micah/${randomNum}.svg`,
    })
    .select("username,email,name");

  return {
    data,
    error,
  };
});
