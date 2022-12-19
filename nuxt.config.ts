// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-windicss"],
  runtimeConfig: {
    jwtAccessToken: process.env.NUXT_accessToken_secret,
    jwtRefreshToken: process.env.NUXT_refreshToken_secret,
  },
});
