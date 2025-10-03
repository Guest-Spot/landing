<template>
  <div class="index-page">
    <!-- Navigation -->
    <AppNavigation />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <FeaturesSection />

    <!-- Salon Application Form -->
    <SalonApplicationForm />

    <!-- Contact Form -->
    <ContactForm />

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavigation from '~/components/AppNavigation.vue'
import HeroSection from '~/components/HeroSection.vue'
import FeaturesSection from '~/components/FeaturesSection.vue'
import SalonApplicationForm from '~/components/SalonApplicationForm.vue'
import ContactForm from '~/components/ContactForm.vue'
import AppFooter from '~/components/AppFooter.vue'

const getHello = async () => {
  const { data, error } = await useFetch('/api/hello')
  console.log('Error: ', error.value);  
  console.log('Data: ', data.value)
}

onMounted(() => {
  getHello()
})
</script>

<style scoped>
.index-page {
  min-height: 100vh;
  background: #000;
}
</style>
