<template>
  <section data-cy="hero-section" class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 data-cy="hero-title" class="hero-title">
          Find Your Perfect
          <span class="accent-text">Tattoo Studio</span>
        </h1>
        <p data-cy="hero-subtitle" class="hero-subtitle">
          Discover the best tattoo artists and studios in your area.
          Book appointments, view portfolios, and create your perfect tattoo experience.
        </p>
        <div class="hero-actions">
          <q-btn
            data-cy="download-app-btn"
            class="cta-button"
            size="lg"
            color="accent"
            label="Download App"
            icon="download"
            @click="downloadApp"
          />
        </div>
      </div>
      <div class="hero-image">
        <div class="phone-mockup">
          <div class="phone-screen">
            <div class="app-preview">
              <div class="app-header">
                <div class="status-bar"></div>
                <div class="nav-bar">
                  <div class="nav-title">GuestSpot</div>
                </div>
              </div>
              <div class="app-content">
                <div class="search-bar">
                  <div class="search-placeholder">Search studios...</div>
                </div>
                <div class="studio-cards">
                  <div class="studio-card" v-for="i in 3" :key="i">
                    <div class="studio-image"></div>
                    <div class="studio-info">
                      <div class="studio-name">Studio {{ i }}</div>
                      <div class="studio-rating">★★★★★</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-stats">
      <div class="stat-item">
        <div class="stat-number">500+</div>
        <div class="stat-label">Studios</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">10K+</div>
        <div class="stat-label">Artists</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">50K+</div>
        <div class="stat-label">Happy Customers</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const downloadApp = () => {
  // Track download button click
  if (window.gtag) {
    window.gtag('event', 'download_app_click', {
      event_category: 'engagement',
      event_label: 'hero_section'
    })
  }

  // In a real app, this would redirect to app stores
  window.open('https://apps.apple.com/app/guestspot', '_blank')
}

const scrollToFeatures = () => {
  const featuresSection = document.querySelector('[data-cy="features-section"]')
  if (featuresSection) {
    featuresSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 61, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 61, 0, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  z-index: 1;
  position: relative;
}

.hero-text {
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: white;
}

.accent-text {
  color: #ff3d00;
  background: linear-gradient(45deg, #ff3d00, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #b3b3b3;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  background: linear-gradient(45deg, #ff3d00, #ff6b35) !important;
  border: none !important;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-transform: none;
  font-size: 1.1rem;
}

.secondary-button {
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
  background: transparent !important;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-transform: none;
  font-size: 1.1rem;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-mockup {
  width: 280px;
  height: 560px;
  background: #1a1a1a;
  border-radius: 30px;
  padding: 8px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 22px;
  overflow: hidden;
  position: relative;
}

.app-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: #1a1a1a;
  padding: 1rem;
}

.status-bar {
  height: 20px;
  background: #333;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.app-content {
  flex: 1;
  padding: 1rem;
  background: #000;
}

.search-bar {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.search-placeholder {
  color: #666;
  font-size: 0.9rem;
}

.studio-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.studio-card {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  gap: 0.75rem;
}

.studio-image {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 4px;
}

.studio-info {
  flex: 1;
}

.studio-name {
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.studio-rating {
  color: #ff3d00;
  font-size: 0.8rem;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  margin-top: 4rem;
  z-index: 1;
  position: relative;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff3d00;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #b3b3b3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .phone-mockup {
    width: 240px;
    height: 480px;
  }

  .hero-stats {
    gap: 2rem;
    margin-top: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-button,
  .secondary-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
