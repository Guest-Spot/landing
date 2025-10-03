<template>
  <button
    type="button"
    class="btn back-nav-button"
    @click="goBack"
  >
    <i class="mdi mdi-arrow-left"></i>
  </button>
</template>

<script setup lang="ts">
const router = useRouter()

const goBack = () => {
  if (typeof window === 'undefined') {
    return
  }

  if (window.history.length > 1) {
    window.history.back()
  } else {
    void router.push('/')
  }
}
</script>

<style scoped>
.back-nav-button {
  position: fixed;
  left: 20px;
  top: 20px;
  width: 40px;
  height: 40px;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 10px 30px rgba(255, 61, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1;
}

.back-nav-button i {
  font-size: 1.1rem;
}

.back-nav-button:hover {
  background: rgba(255, 61, 0, 0.25);
  border-color: rgba(255, 61, 0, 0.5);
  transform: translateY(-2px);
}

.back-nav-button:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(255, 61, 0, 0.22);
}
</style>