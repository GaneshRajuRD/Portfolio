<template>
  <div ref="cardRef" class="fact-card">
    <div class="fact-top">
      <div class="fact-number-wrapper">
        <span
          ref="numberRef"
          class="fact-number"
          :class="{ 'fact-number-text': Boolean(fact.textValue) }"
        >{{ displayValue }}</span>
        <span v-if="fact.suffix" class="fact-suffix">{{ fact.suffix }}</span>
      </div>
    </div>
    <div class="fact-content">
      <div class="fact-label">{{ fact.label }}</div>
      <div class="fact-subtext mono-label">{{ fact.subtext }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  fact: {
    type: Object,
    required: true
  }
})

const cardRef = ref(null)
const numberRef = ref(null)
const displayValue = ref(props.fact.textValue || '0')
let triggerInstance = null

onMounted(() => {
  if (!process.client) return

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // If text value or reduced motion, show final state directly
  if (props.fact.textValue || isReduced) {
    displayValue.value = props.fact.textValue || props.fact.number
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  const targetNum = props.fact.number || 0
  const counterObj = { val: 0 }

  triggerInstance = ScrollTrigger.create({
    trigger: cardRef.value,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(counterObj, {
        val: targetNum,
        duration: 1.4,
        ease: 'power3.out',
        onUpdate: () => {
          displayValue.value = Math.floor(counterObj.val)
        },
        onComplete: () => {
          displayValue.value = targetNum
        }
      })
    }
  })
})

onUnmounted(() => {
  if (triggerInstance) {
    triggerInstance.kill()
    triggerInstance = null
  }
})
</script>

<style scoped>
.fact-card {
  height: 100%;
  flex: 1 1 auto;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 1.65rem 1.45rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  transition: transform var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
  will-change: transform;
  position: relative;
}

.fact-card:hover {
  transform: translateY(-4px);
  border-color: rgba(15, 118, 110, 0.35);
  box-shadow: 0 12px 28px rgba(17, 34, 32, 0.06);
}

.fact-top {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.fact-number-wrapper {
  display: inline-flex;
  align-items: baseline;
  gap: 0.15rem;
  line-height: 1;
}

.fact-number {
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 2.9vw, 3.1rem);
  font-weight: 700;
  color: var(--text-cream);
  line-height: 1;
  letter-spacing: -0.04em;
}

.fact-number.fact-number-text {
  font-size: clamp(1.2rem, 1.3rem + 0.45vw, 1.65rem);
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.fact-suffix {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2vw, 2.1rem);
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  margin-left: 0.1rem;
}

.fact-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.fact-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-cream);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.fact-subtext {
  font-size: 0.76rem;
  color: var(--text-muted);
  line-height: 1.45;
}

@media (max-width: 640px) {
  .fact-card {
    padding: 1.15rem 1rem;
    gap: 0.85rem;
    border-radius: 12px;
  }
  .fact-number {
    font-size: clamp(1.85rem, 5vw, 2.4rem);
  }
  .fact-number.fact-number-text {
    font-size: clamp(1.1rem, 4vw, 1.35rem);
  }
  .fact-suffix {
    font-size: clamp(1.4rem, 4vw, 1.8rem);
  }
  .fact-label {
    font-size: 0.85rem;
  }
  .fact-subtext {
    font-size: 0.7rem;
  }
}
</style>
