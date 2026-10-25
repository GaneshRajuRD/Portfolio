<template>
  <div
    ref="textSlideRef"
    :class="['text-slide', { 'text-slide-visible': isVisible }]"
    :style="slideStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 22
  }
})

const textSlideRef = ref(null)
const isVisible = ref(false)
const hasAnimated = ref(false)
let observer = null

const slideStyle = computed(() => ({
  transitionDelay: `${props.delay}ms`,
  '--slide-y': `${props.y}px`
}))

onMounted(() => {
  if (!process.client) return

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) {
    isVisible.value = true
    hasAnimated.value = true
    return
  }

  const isMobile = window.innerWidth < 830
  const threshold = isMobile ? 0.02 : 0.05
  const rootMargin = isMobile ? '0px 0px -20px 0px' : '0px 0px -40px 0px'

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated.value) {
        isVisible.value = true
        hasAnimated.value = true
        if (observer) {
          observer.disconnect()
          observer = null
        }
      }
    },
    {
      threshold,
      rootMargin
    }
  )

  if (textSlideRef.value) {
    observer.observe(textSlideRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
.text-slide {
  opacity: 0;
  transform: translate3d(0, var(--slide-y, 22px), 0);
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.text-slide-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.text-slide.h-100 {
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media (prefers-reduced-motion: reduce) {
  .text-slide {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
