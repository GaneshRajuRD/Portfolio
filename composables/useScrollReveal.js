import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollReveal() {
  const triggers = []

  const isReduced = () => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const revealOnScroll = (element, options = {}) => {
    if (!element || isReduced()) return

    const {
      y = 30,
      opacity = 0,
      duration = 0.7,
      ease = 'power3.out',
      delay = 0,
      start = 'top 85%'
    } = options

    const anim = gsap.from(element, {
      y,
      opacity,
      duration,
      ease,
      delay,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
        once: true
      }
    })

    if (anim.scrollTrigger) {
      triggers.push(anim.scrollTrigger)
    }

    return anim
  }

  const cleanup = () => {
    triggers.forEach(t => t.kill())
    triggers.length = 0
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    revealOnScroll,
    cleanup,
    isReduced
  }
}
