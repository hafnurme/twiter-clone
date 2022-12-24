// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-windicss"],
  runtimeConfig: {
    jwtAccessToken: process.env.NUXT_accessToken_secret,
    jwtRefreshToken: process.env.NUXT_refreshToken_secret,
    cloudinaryCloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.NUXT_CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.NUXT_CLOUDINARY_API_SECRET,
  },
});
