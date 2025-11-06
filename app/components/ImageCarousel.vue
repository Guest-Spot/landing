<template>
  <div 
    class="carousel-container"
    @mouseenter="stopCarousel"
    @mouseleave="startCarousel"
  >
    <div class="carousel-indicators">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="indicator"
        :class="{ 
          active: currentSlide === index,
          completed: currentSlide > index
        }"
      >
        <div
          v-if="currentSlide === index"
          :key="`progress-${currentSlide}`"
          class="indicator-progress"
          :class="{ paused: isPaused }"
          :style="{ animationDuration: `${slideDuration}ms` }"
        ></div>
        <div
          v-else-if="currentSlide > index"
          class="indicator-progress completed"
        ></div>
      </div>
    </div>
    <div class="carousel-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-slide"
        :class="{ active: currentSlide === index }"
      >
        <img :src="slide.image" :alt="slide.alt" class="carousel-image">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface CarouselSlide {
  image: string
  alt: string
}

interface Props {
  slides: CarouselSlide[]
  slideDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  slideDuration: 2000
})

const currentSlide = ref(0)
const isPaused = ref(false)
let carouselInterval: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout> | null = null
let slideStartTime: number = 0
let remainingTime: number = 0

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
  slideStartTime = Date.now()
  remainingTime = props.slideDuration
}

const startCarousel = () => {
  isPaused.value = false
  
  if (carouselInterval) {
    clearTimeout(carouselInterval as unknown as ReturnType<typeof setTimeout>)
    clearInterval(carouselInterval as unknown as ReturnType<typeof setInterval>)
  }
  
  // If there's remaining time, use it; otherwise use full duration
  const timeToNextSlide = remainingTime > 0 ? remainingTime : props.slideDuration
  
  carouselInterval = setTimeout(() => {
    nextSlide()
    // After the first slide with remaining time, switch to regular interval
    carouselInterval = setInterval(nextSlide, props.slideDuration)
  }, timeToNextSlide) as ReturnType<typeof setTimeout>
}

const stopCarousel = () => {
  isPaused.value = true
  
  if (carouselInterval) {
    clearTimeout(carouselInterval as unknown as ReturnType<typeof setTimeout>)
    clearInterval(carouselInterval as unknown as ReturnType<typeof setInterval>)
    carouselInterval = null
    
    // Calculate remaining time for current slide
    const elapsed = Date.now() - slideStartTime
    remainingTime = Math.max(0, props.slideDuration - elapsed)
  }
}

onMounted(() => {
  slideStartTime = Date.now()
  remainingTime = props.slideDuration
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})
</script>

<style scoped>
/* Carousel Styles */
.carousel-container {
  position: relative;
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  /* overflow: hidden; */
}

.carousel-indicators {
  position: absolute;
  top: -12px;
  left: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
  z-index: 10;
}

.indicator {
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.indicator-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: white;
  border-radius: 2px;
  animation: progressFill linear forwards;
}

.indicator-progress.completed {
  width: 100%;
  animation: none;
}

.indicator-progress.paused {
  animation-play-state: paused;
}

@keyframes progressFill {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  min-height: 0;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
  visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
}

.carousel-slide.active {
  position: relative;
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}

.carousel-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

/* Responsive Design */
@media (max-width: 768px) {
  .carousel-indicators {
    top: -8px;
    left: 8px;
    right: 8px;
    gap: 4px;
  }

  .indicator {
    height: 2px;
  }
}
</style>

