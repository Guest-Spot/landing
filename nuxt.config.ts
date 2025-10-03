import pkg from './package.json';
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  colorMode: {
    preference: 'dark',
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL || '',
    public: {
      version: pkg.version,
    },
  },
  nitro: {
    preset: 'vercel',
  },
});
