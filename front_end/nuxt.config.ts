// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  // runtimeConfig: {
  //   public: {
  //     apiBase: 'http://127.0.0.1:8000',
  //   },
  // },
  modules: ['@nuxt/image'],
})