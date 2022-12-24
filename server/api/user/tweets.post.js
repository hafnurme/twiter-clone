import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import { uploadToCloudinary } from "~~/server/utils/cloudinary";

const supabaseUrl = process.env.NUXT_supabaseUrl;
const supabaseKey = process.env.NUXT_supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, field, files) => {
      if (err) {
        reject(err);
      }
      resolve({ field, files });
    });
  });

  const userId = event.context.auth.data.id;

  const { field, files } = response;

  const tweetsData = {
    text: field.text,
    authorId: userId,
  };

  const { data: createTweet, error: createTweetError } = await supabase
    .from("Tweet")
    .insert(tweetsData)
    .select("id, text");

  if (files.image.size === 0 || files.image.originalName) {
    return {
      msg: "succes upload tweet without image",
    };
  }

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key];

    if (createTweetError) {
      return;
    }

    const cloudinaryResource = await uploadToCloudinary(file.filepath);

    return supabase.from("MediaFiles").insert({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: createTweet[0].id,
    });
  });

  await Promise.all(filePromises);

  return {
    msg: "succesed post",
  };
});
