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
    rateLimitWindowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || '', 10) || 60_000,
    rateLimitMaxRequests:
      Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '', 10) || 10,
    requestQueueMaxConcurrent:
      Number.parseInt(process.env.REQUEST_QUEUE_MAX_CONCURRENT || '', 10) || 3,
    requestQueueMaxSize:
      Number.parseInt(process.env.REQUEST_QUEUE_MAX_SIZE || '', 10) || 100,
    public: {
      version: pkg.version,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '',
    },
  },
  nitro: {
    preset: 'vercel',
  },
});
