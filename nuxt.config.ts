import pkg from './package.json';
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: [
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@nuxt/ui',
    'nuxt-swiper',
    [
      'yandex-metrika-module-nuxt3',
      {
        id: 101394683,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        debug: process.env.NODE_ENV !== 'production',
      },
    ],
  ],
  colorMode: {
    preference: 'dark',
  },
  runtimeConfig: {
    apiUrl: process.env.NUXT_API_URL || '',
    public: {
      version: pkg.version,
    },
  },
});
