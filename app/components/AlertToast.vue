<template>
  <Teleport to="body">
    <transition name="alert-toast">
      <div
        v-if="visible && message"
        class="alert-toast"
        :class="typeClass"
        role="status"
        aria-live="polite"
      >
        <span class="alert-toast__text">{{ message }}</span>
        <button type="button" class="alert-toast__close" @click="handleClose" aria-label="Close alert">
          <i class="mdi mdi-close" aria-hidden="true"></i>
        </button>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  visible: boolean
  type: 'success' | 'error'
  message: string
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const typeClass = computed(() => {
  return props.type === 'success' ? 'alert-toast--success' : 'alert-toast--error'
})

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.alert-toast {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 280px;
  max-width: min(90vw, 420px);
  padding: 1rem 1.25rem;
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  color: #fff;
  background: rgba(18, 18, 18, 0.95);
  z-index: 9999;
  border: 1px solid transparent;
}

.alert-toast--success {
  background: rgba(25, 130, 72, 0.95);
  border-color: rgba(25, 130, 72, 0.6);
}

.alert-toast--error {
  background: rgba(191, 53, 53, 0.95);
  border-color: rgba(191, 53, 53, 0.6);
}

.alert-toast__text {
  flex: 1;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.alert-toast__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  i {
    font-size: 14px;
  }
}

.alert-toast__close:hover {
  background: rgba(0, 0, 0, 0.35);
  transform: scale(1.05);
}

.alert-toast__close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 2px;
}

.alert-toast-enter-active,
.alert-toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.alert-toast-enter-from,
.alert-toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
