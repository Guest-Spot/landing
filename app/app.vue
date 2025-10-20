<script setup lang="ts">
const siteUrl = 'https://guestspot.app';
const previewImage = `${siteUrl}/og-image.png`;
const metaTitle = 'GuestSpot — Discover & Book Tattoo Studios Near You';
const metaDescription =
  'GuestSpot connects you with verified tattoo studios and artists. Explore portfolios, compare reviews, and book appointments with confidence.';

useHead({
  htmlAttrs: { lang: 'en' },
});

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  twitterTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  twitterDescription: metaDescription,
  ogType: 'website',
  ogSiteName: 'GuestSpot',
  ogLocale: 'en_US',
  ogUrl: `${siteUrl}/`,
  ogImage: previewImage,
  ogImageType: 'image/png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  twitterCard: 'summary_large_image',
  twitterImage: previewImage,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@use '@/assets/scss/app.scss';
</style>
