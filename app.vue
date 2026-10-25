<template>
  <div class="app-root">
    <NuxtLoadingIndicator color="#b45309" :height="2" />
    <NuxtPage />

    <!-- Back to top button -->
    <button
      v-show="showBackToTop"
      class="back-to-top-btn"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenisInstance = null
const showBackToTop = ref(false)

const isTouchDevice = () => {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
}

const scrollToTop = () => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 })
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    showBackToTop.value = window.scrollY > 450
  }
}

onMounted(async () => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initialize Lenis only on non-touch and non-reduced-motion devices
    if (!prefersReduced && !isTouchDevice()) {
      try {
        const { default: Lenis } = await import('lenis')
        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 2
        })

        lenisInstance.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
          lenisInstance?.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)
      } catch (e) {
        console.warn('Lenis could not be initialized:', e)
      }
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
})
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  color: var(--text-cream);
  position: relative;
}

.back-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 99;
  transition: transform var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.back-to-top-btn:hover {
  transform: translateY(-3px);
  background-color: var(--text-main);
  color: #ffffff;
  border-color: var(--text-main);
}

@media (max-width: 640px) {
  .back-to-top-btn {
    bottom: 1.25rem;
    right: 1.25rem;
    width: 40px;
    height: 40px;
  }
}
</style>
