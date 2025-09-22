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

<script>
import { defineComponent } from 'vue'
import AppNavigation from 'src/components/AppNavigation.vue'
import HeroSection from 'src/components/HeroSection.vue'
import FeaturesSection from 'src/components/FeaturesSection.vue'
import SalonApplicationForm from 'src/components/SalonApplicationForm.vue'
import ContactForm from 'src/components/ContactForm.vue'
import AppFooter from 'src/components/AppFooter.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    AppNavigation,
    HeroSection,
    FeaturesSection,
    SalonApplicationForm,
    ContactForm,
    AppFooter
  }
})
</script>

<style scoped>
.index-page {
  min-height: 100vh;
  background: #000;
}
</style>
