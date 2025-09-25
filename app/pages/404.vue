<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-description">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <div class="error-actions">
        <button
          class="btn btn-primary btn-lg home-button"
          @click="goHome"
        >
          <i class="mdi mdi-home"></i>
          Go Home
        </button>
        <button
          class="btn btn-outline btn-lg back-button"
          @click="goBack"
        >
          <i class="mdi mdi-arrow-left"></i>
          Go Back
        </button>
      </div>
    </div>

    <div class="error-illustration">
      <div class="tattoo-needle">
        <div class="needle-tip"></div>
        <div class="needle-body"></div>
        <div class="needle-handle"></div>
      </div>
      <div class="ink-drops">
        <div class="drop drop-1"></div>
        <div class="drop drop-2"></div>
        <div class="drop drop-3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue imports are auto-imported in Nuxt 3

const router = useRouter()

const goHome = () => {
  void router.push('/')
}

const goBack = () => {
  window.history.back()
}

onMounted(() => {
  // Track 404 error
  if (window.gtag) {
    window.gtag('event', 'page_not_found', {
      event_category: 'error',
      page_location: window.location.href
    })
  }
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.error-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 61, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(255, 61, 0, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.error-content {
  text-align: center;
  z-index: 1;
  position: relative;
  max-width: 600px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  color: #ff3d00;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff3d00, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 61, 0, 0.3);
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.error-description {
  font-size: 1.25rem;
  color: #b3b3b3;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.home-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  text-transform: none;
  font-size: 1.1rem;
  box-shadow: 0 8px 25px rgba(255, 61, 0, 0.3);
  transition: all 0.3s ease;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 61, 0, 0.4);
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  text-transform: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  transform: translateY(-2px);
}

.error-illustration {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.1;
  z-index: 0;
}

.tattoo-needle {
  position: relative;
  width: 200px;
  height: 300px;
}

.needle-tip {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 20px;
  background: linear-gradient(45deg, #ff3d00, #ff6b35);
  border-radius: 2px;
}

.needle-body {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 200px;
  background: #666;
  border-radius: 1px;
}

.needle-handle {
  position: absolute;
  top: 220px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 60px;
  background: linear-gradient(45deg, #333, #555);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.ink-drops {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}

.drop {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #ff3d00;
  border-radius: 50%;
  animation: drip 3s ease-in-out infinite;
}

.drop-1 {
  left: -30px;
  animation-delay: 0s;
}

.drop-2 {
  left: 0;
  animation-delay: 1s;
}

.drop-3 {
  left: 30px;
  animation-delay: 2s;
}

@keyframes drip {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(50px) scale(1.2);
    opacity: 0.3;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .error-description {
    font-size: 1.1rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .home-button,
  .back-button {
    width: 100%;
    max-width: 300px;
  }

  .error-illustration {
    display: none;
  }
}

@media (max-width: 480px) {
  .error-page {
    padding: 1rem;
  }

  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.75rem;
  }

  .error-description {
    font-size: 1rem;
  }

  .home-button,
  .back-button {
    padding: 0.625rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
