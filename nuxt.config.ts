// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-windicss"],
  runtimeConfig: {
    supabaseUrl: "https://uwmvwzjbggsmtlmctanx.supabase.co",
    supabaseKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bXZ3empiZ2dzbXRsbWN0YW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0MTk3NTQsImV4cCI6MTk4Njk5NTc1NH0.rWITJ-NTLlmXyZB5oF6i03FxdwavNL_P6nduxxk-hjY",
  },
});
