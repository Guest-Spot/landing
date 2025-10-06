<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
});

useSeoMeta({
  title: 'GuestSpot',
  description: 'A minimalistic habit tracker application to track and manage your daily habits with ease',
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
