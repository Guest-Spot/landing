<template>
  <nav class="app-navigation">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <q-icon name="local_fire_department" class="brand-icon" />
          <span class="brand-text">GuestSpot</span>
        </router-link>
      </div>

      <div class="nav-menu" :class="{ 'nav-menu-open': isMenuOpen }">
        <ul class="nav-links">
          <li><a href="#features" class="nav-link" @click="closeMenu">Features</a></li>
          <li><a href="#for-studios" class="nav-link" @click="closeMenu">For Studios</a></li>
          <li><a href="#contact" class="nav-link" @click="closeMenu">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <q-btn
            class="download-btn"
            color="accent"
            label="Download App"
            icon="download"
            @click="downloadApp"
          />
        </div>
      </div>

      <div class="nav-toggle" @click="toggleMenu">
        <q-icon :name="isMenuOpen ? 'close' : 'menu'" class="toggle-icon" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const downloadApp = () => {
  // Track download button click
  if (window.gtag) {
    window.gtag('event', 'download_app_click', {
      event_category: 'engagement',
      event_label: 'navigation'
    })
  }

  // In a real app, this would redirect to app stores
  window.open('https://apps.apple.com/app/guestspot', '_blank')
  closeMenu()
}
</script>

<style scoped>
.app-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.brand-link:hover {
  color: #ff3d00;
}

.brand-icon {
  color: #ff3d00;
  font-size: 2rem;
}

.brand-text {
  background: linear-gradient(45deg, #ffffff, #ff3d00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-link {
  color: #b3b3b3;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-link:hover {
  color: #ff3d00;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.download-btn {
  background: linear-gradient(45deg, #ff3d00, #ff6b35) !important;
  border: none !important;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  text-transform: none;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(255, 61, 0, 0.3);
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 61, 0, 0.4);
}

.nav-toggle {
  display: none;
  cursor: pointer;
  padding: 0.5rem;
  color: white;
  font-size: 1.5rem;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 0.5rem 0;
  }

  .nav-actions {
    width: 100%;
    justify-content: center;
  }

  .download-btn {
    width: 100%;
    max-width: 250px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }

  .nav-toggle {
    display: block;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 1rem;
  }

  .brand-text {
    font-size: 1.25rem;
  }

  .brand-icon {
    font-size: 1.75rem;
  }

  .nav-menu {
    padding: 1.5rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    font-size: 1rem;
  }
}

/* Scroll behavior */
.app-navigation.scrolled {
  background: rgba(0, 0, 0, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

/* Smooth scrolling for anchor links */
.nav-link[href^="#"] {
  scroll-behavior: smooth;
}
</style>
