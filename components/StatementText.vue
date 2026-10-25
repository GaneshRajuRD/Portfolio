<template>
  <section ref="sectionRef" class="statement-section" aria-label="Statement">
    <div class="container statement-container">
      <!-- Section Header -->
      <div class="statement-label-group mono-label">
        <span class="statement-counter">01</span>
        <span class="statement-title">Statement</span>
        <div class="statement-line"></div>
      </div>

      <!-- Centered Statement Body: Two-Column Grid (7/12 Text, 5/12 Card) -->
      <div class="statement-body">
        <!-- Left Column: ~7/12 cols with Left Progress Line & Statement Text -->
        <div class="statement-text-col">
          <!-- Thin vertical progress line on the left that fills with reveal -->
          <div class="statement-progress-track" aria-hidden="true">
            <div ref="progressBarRef" class="statement-progress-bar"></div>
          </div>

          <!-- Statement Content -->
          <div class="statement-content">
            <p ref="paragraphRef" class="statement-paragraph" aria-label="Statement text">
              <span
                v-for="word in wordTokens"
                :key="word.id"
                ref="wordRefs"
                class="statement-word"
                :class="{ 'is-highlight': word.isHighlight }"
                :data-highlight="word.isHighlight ? 'true' : 'false'"
              >
                <span class="word-text">{{ word.text }}</span>&nbsp;
              </span>
            </p>
          </div>
        </div>

        <!-- Right Column: ~5/12 cols - What Search Engines See Card -->
        <div ref="cardRef" class="statement-card-col">
          <div class="statement-seo-card">
            <!-- Card Header -->
            <div class="card-header">
              <span class="mono-label card-title-label">WHAT SEARCH ENGINES SEE</span>
              <span class="card-chip mono-label">SSR vs CSR</span>
            </div>

            <!-- Pane 1: Client-rendered -->
            <div ref="pane1Ref" class="card-pane pane-csr">
              <div class="pane-meta">
                <span class="pane-name mono-label">Client-rendered</span>
                <span class="pane-tag muted mono-label">Empty initial HTML</span>
              </div>
              <div class="code-box" aria-label="Client-rendered HTML snippet">
                <pre><code>&lt;<span class="code-tag">div</span> <span class="code-attr">id</span>=<span class="code-str">"app"</span>&gt;&lt;/<span class="code-tag">div</span>&gt;</code></pre>
              </div>
              <div class="pane-caption muted mono-label">
                <span class="caption-icon muted">✕</span>
                <span>No content to index</span>
              </div>
            </div>

            <!-- Pane 2: Nuxt 3 SSR -->
            <div ref="pane2Ref" class="card-pane pane-ssr">
              <div class="pane-meta">
                <span class="pane-name mono-label">Nuxt 3 SSR</span>
                <span class="pane-tag active mono-label">Pre-rendered HTML</span>
              </div>
              <div class="code-box" aria-label="Nuxt 3 SSR HTML snippet">
                <pre><code>&lt;<span class="code-tag">h1</span>&gt;Fast, maintainable web systems&lt;/<span class="code-tag">h1</span>&gt;
&lt;<span class="code-tag">p</span>&gt;Healthcare architecture with full SEO.&lt;/<span class="code-tag">p</span>&gt;
&lt;<span class="code-tag">a</span> <span class="code-attr">href</span>=<span class="code-str">"/work"</span>&gt;Explore production sites&lt;/<span class="code-tag">a</span>&gt;</code></pre>
              </div>
              <div class="pane-caption ready mono-label">
                <span class="caption-icon ready">✓</span>
                <span>Content ready to index</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Scroll Hint (fades out after first scroll) -->
      <div ref="footerRef" class="statement-footer mono-label">
        <span>Scroll to reveal</span>
        <span class="scroll-arrow">↓</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '~/data/about'

const statementText = about.statement

// Only two highlighted phrases, accent colour only (no underline):
// "fast, maintainable" and the final word "read."
const targetPhrases = [
  'fast, maintainable',
  'read.'
]

// Parse statement into token words with highlight metadata
const wordTokens = computed(() => {
  const text = statementText
  const lowerText = text.toLowerCase()
  const ranges = []

  // Identify character index ranges for target phrases
  for (const phrase of targetPhrases) {
    const lowerPhrase = phrase.toLowerCase()
    let startIndex = 0
    while ((startIndex = lowerText.indexOf(lowerPhrase, startIndex)) !== -1) {
      ranges.push({
        start: startIndex,
        end: startIndex + lowerPhrase.length
      })
      startIndex += lowerPhrase.length
    }
  }

  // Tokenize words while tracking character boundaries
  const tokens = []
  const regex = /\S+/g
  let match
  let id = 0

  while ((match = regex.exec(text)) !== null) {
    const wordStart = match.index
    const wordEnd = match.index + match[0].length
    const wordStr = match[0]

    // Overlaps target phrase range OR is the final word ending with / matching 'read'
    const inRange = ranges.some(r => wordStart < r.end && wordEnd > r.start)
    const isFinalRead = wordStr.toLowerCase().replace(/[^a-z]/g, '') === 'read'

    tokens.push({
      id: id++,
      text: wordStr,
      isHighlight: inRange || isFinalRead
    })
  }

  return tokens
})

const sectionRef = ref(null)
const paragraphRef = ref(null)
const progressBarRef = ref(null)
const footerRef = ref(null)
const cardRef = ref(null)
const pane1Ref = ref(null)
const pane2Ref = ref(null)
const wordRefs = ref([])

let scrollTimeline = null

onMounted(() => {
  if (!process.client) return

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Under prefers-reduced-motion: show all text, highlights, card, and panes immediately
  if (isReduced) {
    if (wordRefs.value) {
      wordRefs.value.forEach(word => {
        if (!word) return
        const isHigh = word.dataset.highlight === 'true'
        word.style.opacity = '1'
        word.style.color = isHigh ? 'var(--accent)' : 'var(--text-cream)'
        const textEl = word.querySelector('.word-text')
        if (textEl && isHigh) {
          textEl.style.color = 'var(--accent)'
          // textEl.style.backgroundColor = 'rgba(15, 118, 110, 0.12)'
        }
      })
    }
    if (progressBarRef.value) {
      progressBarRef.value.style.transform = 'scaleY(1)'
    }
    if (cardRef.value) {
      cardRef.value.style.opacity = '1'
      cardRef.value.style.transform = 'none'
    }
    if (pane2Ref.value) {
      pane2Ref.value.style.opacity = '1'
      pane2Ref.value.style.transform = 'none'
    }
    if (footerRef.value) {
      footerRef.value.style.display = 'none'
    }
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  const words = wordRefs.value.filter(Boolean)
  const totalWords = words.length

  // Build scrubbed timeline pinned to viewport
  scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: '+=70%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1
    }
  })

  // 1. Fade out the "SCROLL TO REVEAL" hint after the first scroll (first 10% of scroll)
  if (footerRef.value) {
    scrollTimeline.to(footerRef.value, {
      opacity: 0,
      y: 8,
      duration: 0.1,
      ease: 'power1.out'
    }, 0)
  }

  // 2. Animate vertical progress line filling with the reveal
  if (progressBarRef.value) {
    scrollTimeline.to(progressBarRef.value, {
      scaleY: 1,
      duration: 1,
      ease: 'none'
    }, 0)
  }

  // 3. Stagger reveal words: normal words in normal text color, highlights in accent + soft marker (no underline)
  words.forEach((el, idx) => {
    const isHigh = el.dataset.highlight === 'true'
    const startTime = (idx / totalWords) * 0.8
    const duration = 0.16
    const textEl = el.querySelector('.word-text')

    if (isHigh) {
      scrollTimeline.to(el, {
        opacity: 1,
        color: '#0f766e',
        duration: duration,
        ease: 'power1.out'
      }, startTime)

      if (textEl) {
        scrollTimeline.to(textEl, {
          // backgroundColor: 'rgba(15, 118, 110, 0.12)',
          color: '#0f766e',
          duration: duration,
          ease: 'power1.out'
        }, startTime)
      }
    } else {
      scrollTimeline.to(el, {
        opacity: 1,
        color: 'var(--text-cream)',
        duration: duration,
        ease: 'power1.out'
      }, startTime)
    }
  })

  // 4. Right Card fades in with reveal progress
  if (cardRef.value) {
    scrollTimeline.fromTo(cardRef.value,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      0.15
    )
  }

  // 5. Pane 2 slides in last (around 0.65 to 0.95 as reveal approaches "read.")
  if (pane2Ref.value) {
    scrollTimeline.fromTo(pane2Ref.value,
      { opacity: 0, x: 20, y: 8 },
      { opacity: 1, x: 0, y: 0, duration: 0.3, ease: 'power2.out' },
      0.65
    )
  }
})

onUnmounted(() => {
  if (scrollTimeline) {
    if (scrollTimeline.scrollTrigger) {
      scrollTimeline.scrollTrigger.kill()
    }
    scrollTimeline.kill()
    scrollTimeline = null
  }
})
</script>

<style scoped>
.statement-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  overflow: hidden;
  padding: 0;
}

.statement-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  position: relative;
}

.statement-label-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  color: var(--text-muted);
}

.statement-counter {
  color: var(--text-cream);
  font-weight: 700;
}

.statement-line {
  flex: 1;
  height: 1px;
  background-color: var(--border-subtle);
}

/* Two-Column Grid: Text takes ~7/12 (58.3%), Card takes ~5/12 (41.7%) */
.statement-body {
  display: grid;
  grid-template-columns: 7fr 5fr;
  align-items: center;
  gap: clamp(2rem, 3.5vw, 3.5rem);
  width: 100%;
  margin: auto 0;
}

/* Left Column: Progress line + Statement Text */
.statement-text-col {
  display: flex;
  align-items: stretch;
  gap: clamp(1rem, 2vw, 1.75rem);
  min-width: 0;
}

/* Thin vertical progress line on the left that fills with reveal */
.statement-progress-track {
  width: 2px;
  background-color: var(--border-subtle);
  border-radius: 2px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  margin: 0.4rem 0;
}

.statement-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  border-radius: 2px;
  transform-origin: top center;
  transform: scaleY(0);
  will-change: transform;
}

.statement-content {
  flex: 1;
  min-width: 0;
}

/* Paragraph size: clamp(2rem, 3.6vw, 3.5rem) */
.statement-paragraph {
  font-size: clamp(2rem, 3.6vw, 3.5rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: var(--text-dim);
}

.statement-word {
  display: inline-block;
  opacity: 0.12;
  color: var(--text-dim);
  transition: opacity 0.1s linear, color 0.1s linear;
  will-change: opacity, color;
}

.statement-word .word-text {
  display: inline-block;
  position: relative;
  border-radius: 6px;
  padding: 0.04em 0.22em;
}

/* Only two highlighted phrases, accent colour only (NO underline), soft marker ~12% */
.statement-word.is-highlight .word-text {
  color: var(--accent);
  background-color: transparent;
  will-change: background-color, color;
}

/* Right Column: Card Column */
.statement-card-col {
  min-width: 0;
  will-change: opacity, transform;
}

/* What Search Engines See Card */
.statement-seo-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: clamp(1.25rem, 2vw, 1.65rem);
  box-shadow: 0 10px 28px rgba(17, 34, 32, 0.04);
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
}

.card-title-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.card-chip {
  font-size: 0.68rem;
  color: var(--text-muted);
  background-color: var(--bg-surface-elevated);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
}

/* Panes */
.card-pane {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 0.95rem 1.05rem;
  transition: transform var(--duration-fast) var(--ease-out);
}

.pane-ssr {
  border-color: rgba(15, 118, 110, 0.28);
  background-color: rgba(240, 249, 248, 0.75);
}

.pane-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pane-name {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-main);
}

.pane-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.pane-tag.muted {
  color: var(--text-muted);
  background-color: rgba(78, 107, 102, 0.1);
}

.pane-tag.active {
  color: var(--accent);
  background-color: rgba(15, 118, 110, 0.12);
  font-weight: 600;
}

/* Code box */
.code-box {
  background-color: #ffffff;
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 0.65rem 0.85rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
}

.code-box pre {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--text-main);
  white-space: pre-wrap;
  word-break: break-word;
}

.code-tag {
  color: var(--accent);
  font-weight: 600;
}

.code-attr {
  color: #2563eb;
}

.code-str {
  color: #b45309;
}

/* Caption */
.pane-caption {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.72rem;
}

.pane-caption.muted {
  color: var(--text-muted);
}

.pane-caption.ready {
  color: var(--accent);
  font-weight: 600;
}

.caption-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  font-size: 0.65rem;
  line-height: 1;
}

.caption-icon.muted {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}

.caption-icon.ready {
  color: #ffffff;
  background-color: var(--accent);
}

/* Footer Hint */
.statement-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-dim);
  font-size: var(--text-xs);
  transition: opacity 0.25s ease;
}

.scroll-arrow {
  animation: bounceDown 1.8s infinite;
}

@keyframes bounceDown {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

/* Mobile & Tablet Responsiveness: Stack card below text */
@media (max-width: 991px) {
  .statement-section {
    min-height: auto;
  }
  .statement-container {
    height: auto;
    min-height: auto;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    justify-content: flex-start;
    gap: 2rem;
  }
  .statement-body {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 0;
  }
  .statement-paragraph {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
  }
  .statement-footer {
    display: none;
  }
}

@media (max-width: 640px) {
  .statement-container {
    padding-top: 2rem;
    padding-bottom: 2rem;
    gap: 1.5rem;
  }
  .statement-text-col {
    gap: 0.75rem;
  }
  .statement-paragraph {
    font-size: clamp(1.5rem, 6vw, 2rem);
    line-height: 1.25;
  }
  .statement-seo-card {
    padding: 1.15rem;
  }
  .code-box pre {
    font-size: 0.7rem;
  }
}

/* Accessibility: Prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .statement-word {
    opacity: 1 !important;
    color: var(--text-cream) !important;
  }
  .statement-word.is-highlight .word-text {
    color: var(--accent) !important;
    background-color: rgba(15, 118, 110, 0.12) !important;
  }
  .statement-progress-bar {
    transform: scaleY(1) !important;
  }
  .statement-card-col,
  .pane-ssr {
    opacity: 1 !important;
    transform: none !important;
  }
  .statement-footer {
    display: none !important;
  }
  .scroll-arrow {
    animation: none !important;
  }
}
</style>
