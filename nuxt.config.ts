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
    apiKey: process.env.NUXT_API_KEY || '',
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
    recaptchaScoreThreshold:
      Number.parseFloat(process.env.RECAPTCHA_SCORE_THRESHOLD || '') || 0.5,
    public: {
      version: pkg.version,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '',
    },
  },
  nitro: {
    preset: 'vercel',
  },
});
