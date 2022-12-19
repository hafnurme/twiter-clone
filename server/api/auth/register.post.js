import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const config = useRuntimeConfig();
const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, name } = body;
  const encryptPw = bcrypt.hashSync(password, 10);

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
    .insert({ username, email, password: encryptPw, name })
    .select();

  return {
    data,
    error,
  };
});
