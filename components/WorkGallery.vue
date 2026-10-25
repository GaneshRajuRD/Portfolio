<template>
  <section
    id="work"
    ref="sectionRef"
    class="work-section"
    aria-label="Featured Projects"
  >
    <div class="container work-container">
      <!-- Section Header with Number, Label, and Layout View Switcher -->
      <div class="section-label-group mono-label">
        <span class="label-num">02</span>
        <span class="label-text">Featured Projects</span>
        <div class="section-line"></div>

        <!-- View Mode Switcher: Showcase Deck vs Compact Grid -->
        <div class="view-mode-toggle" role="group" aria-label="Projects layout view">
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'showcase' }"
            @click="viewMode = 'showcase'"
            aria-label="Showcase Deck view"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span>Showcase</span>
          </button>
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
            aria-label="Compact Grid view"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span>Grid</span>
          </button>
        </div>
      </div>

      <!-- Section Intro Heading -->
      <div class="section-intro">
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-subtitle">
          Mission-critical healthcare architectures, automated CI/CD release pipelines, and real-time Vue 3 web systems.
        </p>
      </div>

      <!-- ── MODE A: SHOWCASE DECK (DEFAULT) ── -->
      <div v-if="viewMode === 'showcase'" class="showcase-deck">
        <article
          v-for="(project, index) in projects"
          :key="project.slug"
          :ref="el => setCardRef(el, index)"
          :data-index="index"
          class="project-card"
          :style="{ '--card-index': index, '--accent-color': getProjectColor(index) }"
        >
          <!-- Left Column: Narrative, Architecture & Specs -->
          <div class="card-narrative">
            <!-- Domain Category & Meta -->
            <div class="card-top-meta">
              <span class="category-chip mono-label">
                <span class="category-dot"></span>
                {{ project.category || 'FEATURED WORK' }}
              </span>
              <span class="company-period mono-label">{{ project.company }} · {{ project.period }}</span>
              <span class="watermark-index mono-label">0{{ index + 1 }}</span>
            </div>

            <!-- Title & Tagline -->
            <h3 class="card-title">
              <NuxtLink :to="`/work/${project.slug}`" class="title-link">
                {{ project.title }}
              </NuxtLink>
            </h3>
            <p class="card-tagline">{{ project.tagline }}</p>

            <!-- One-Liner / What I Built excerpt -->
            <p class="card-summary">{{ project.oneLiner }}</p>

            <!-- Metrics Highlight Strip -->
            <div class="card-metrics-row">
              <div
                v-for="metric in project.metrics"
                :key="metric.label"
                class="metric-pill"
              >
                <span class="metric-val">{{ metric.value }}</span>
                <span class="metric-lbl mono-label">{{ metric.label }}</span>
              </div>
            </div>

            <!-- Tech Badges Cloud -->
            <div class="card-tech-cloud">
              <span
                v-for="tech in project.tech.slice(0, 6)"
                :key="tech"
                class="tech-badge"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Action Button -->
            <div class="card-actions">
              <NuxtLink
                :to="`/work/${project.slug}`"
                class="btn btn-primary explore-btn"
                :aria-label="`Explore ${project.title} Case Study`"
              >
                <span>Explore Case Study</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </NuxtLink>

              <span class="explore-hint mono-label">Deep Dive Architecture ↗</span>
            </div>
          </div>

          <!-- Right Column: Interactive Hardware / Browser Showcase -->
          <div class="card-preview">
            <div
              class="device-frame"
              @mousemove="handleTilt($event, index)"
              @mouseleave="resetTilt(index)"
              :ref="el => setFrameRef(el, index)"
            >
              <!-- Browser Header Chrome -->
              <div class="frame-header">
                <div class="traffic-lights">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>

                <div class="url-bar mono-label">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>{{ project.mockupUrl || 'https://mocero.health/production' }}</span>
                </div>

                <div class="live-pill mono-label">
                  <span class="live-pulse"></span>
                  <span>LIVE</span>
                </div>
              </div>

              <!-- Main Interactive Image Viewport -->
              <div class="frame-viewport">
                <NuxtLink :to="`/work/${project.slug}`" class="viewport-link">
                  <img
                    :src="getActiveScreenshot(index)"
                    :alt="`${project.title} interface screenshot`"
                    class="viewport-img"
                    loading="lazy"
                    decoding="async"
                  />

                  <!-- Hover Overlay Shimmer with Direct CTA Hint -->
                  <div class="viewport-overlay">
                    <span class="overlay-badge mono-label">
                      <span>View Case Study</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </span>
                  </div>
                </NuxtLink>

                <!-- Floating Micro Feature Badges -->
                <div v-if="project.previewBadges" class="floating-badge-strip">
                  <span
                    v-for="(badge, bIdx) in project.previewBadges"
                    :key="badge"
                    class="floating-chip mono-label"
                    :style="{ animationDelay: `${bIdx * 0.15}s` }"
                  >
                    {{ badge }}
                  </span>
                </div>
              </div>

              <!-- Multi-screenshot Switcher (if project has more than 1 screenshot) -->
              <div v-if="project.screenshots && project.screenshots.length > 1" class="frame-subnav">
                <button
                  v-for="(shot, sIdx) in project.screenshots"
                  :key="sIdx"
                  class="subnav-btn mono-label"
                  :class="{ active: (activeScreenshotMap[index] ?? 0) === sIdx }"
                  @click="switchScreenshot(index, sIdx)"
                >
                  <span class="subnav-dot"></span>
                  <span>{{ getScreenshotTabLabel(sIdx, project.slug) }}</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- ── MODE B: COMPACT GRID OVERVIEW ── -->
      <div v-else class="projects-grid-view">
        <article
          v-for="(project, index) in projects"
          :key="project.slug"
          class="grid-card"
        >
          <!-- Grid Card Visual Header -->
          <NuxtLink :to="`/work/${project.slug}`" class="grid-card-thumb">
            <img
              :src="project.screenshots[0]?.src"
              :alt="project.title"
              class="grid-img"
              loading="lazy"
            />
            <div class="grid-thumb-overlay">
              <span class="mono-label">View Case Study ↗</span>
            </div>
            <span class="grid-card-idx mono-label">0{{ index + 1 }}</span>
          </NuxtLink>

          <!-- Grid Card Content -->
          <div class="grid-card-content">
            <div class="grid-meta-row mono-label">
              <span class="grid-cat">{{ project.category || 'HEALTHCARE' }}</span>
              <span class="grid-period">{{ project.period }}</span>
            </div>

            <h3 class="grid-title">
              <NuxtLink :to="`/work/${project.slug}`">{{ project.title }}</NuxtLink>
            </h3>

            <p class="grid-summary">{{ project.oneLiner }}</p>

            <div class="grid-metrics">
              <div v-for="m in project.metrics.slice(0, 2)" :key="m.label" class="grid-metric">
                <span class="gm-val">{{ m.value }}</span>
                <span class="gm-lbl mono-label">{{ m.label }}</span>
              </div>
            </div>

            <div class="grid-footer">
              <div class="grid-tags">
                <span v-for="t in project.tech.slice(0, 3)" :key="t" class="grid-tag">
                  {{ t }}
                </span>
              </div>
              <NuxtLink :to="`/work/${project.slug}`" class="btn btn-secondary grid-btn">
                <span>Details</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { projects } from '~/data/projects'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
const viewMode = ref('showcase')

// Active screenshot index per project card
const activeScreenshotMap = reactive({
  0: 0,
  1: 0,
  2: 0
})

const cardRefs = []
const frameRefs = []

const setCardRef = (el, idx) => {
  if (el) cardRefs[idx] = el
}

const setFrameRef = (el, idx) => {
  if (el) frameRefs[idx] = el
}

const getProjectColor = (index) => {
  const colors = ['#0f766e', '#0284c7', '#0d9488']
  return colors[index % colors.length]
}

const getActiveScreenshot = (projectIndex) => {
  const proj = projects[projectIndex]
  if (!proj || !proj.screenshots || !proj.screenshots.length) return ''
  const shotIdx = activeScreenshotMap[projectIndex] ?? 0
  return proj.screenshots[shotIdx]?.src || proj.screenshots[0].src
}

const switchScreenshot = (projectIndex, shotIndex) => {
  activeScreenshotMap[projectIndex] = shotIndex
}

const getScreenshotTabLabel = (sIdx, slug) => {
  if (slug === 'queue-management') {
    return sIdx === 0 ? 'Operator Dashboard' : 'Public Display TV'
  }
  if (slug === 'ai-chatbot') {
    return sIdx === 0 ? 'Desktop Widget' : 'Mobile Responsive'
  }
  if (slug === 'cicd-pipeline') {
    return sIdx === 0 ? 'Architecture Flowchart' : 'Release Pipeline'
  }
  return `View 0${sIdx + 1}`
}

// 3D Perspective Tilt on Hover
const handleTilt = (e, idx) => {
  const frame = frameRefs[idx]
  if (!frame) return

  const rect = frame.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const xPercent = (x / rect.width - 0.5) * 2
  const yPercent = (y / rect.height - 0.5) * 2

  const rotateY = xPercent * 4 // Max 4 deg
  const rotateX = -yPercent * 4 // Max 4 deg

  frame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
}

const resetTilt = (idx) => {
  const frame = frameRefs[idx]
  if (!frame) return
  frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
}

let scrollTriggers = []

onMounted(() => {
  if (process.client) {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.registerPlugin(ScrollTrigger)

    nextTick(() => {
      // Smooth entrance animation for each card as you scroll down
      if (!isReduced) {
        cardRefs.forEach((card) => {
          if (!card) return

          const st = gsap.from(card, {
            y: 45,
            opacity: 0.15,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true
            }
          })
          if (st.scrollTrigger) scrollTriggers.push(st.scrollTrigger)
        })
      }
    })
  }
})

onUnmounted(() => {
  scrollTriggers.forEach(st => st.kill())
  scrollTriggers = []
})
</script>

<style scoped>
.work-section {
  position: relative;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-subtle);
  padding-top: clamp(2rem, 3.5vw, 3.5rem);
  padding-bottom: clamp(3.5rem, 6vw, 6rem);
}

.work-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Section Header */
.section-label-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.25rem;
}

.section-intro {
  /* margin-top: 0.5rem; */
  /* margin-bottom: 1.75rem; */
  max-width: 760px;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--text-muted);
  line-height: 1.6;
}

.view-mode-toggle {
  display: flex;
  align-items: center;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  padding: 3px;
  gap: 2px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all var(--duration-fast) var(--ease-out);
}

.toggle-btn.active {
  background-color: var(--text-main);
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(17, 34, 32, 0.12);
}

/* ── SHOWCASE DECK ── */
.showcase-deck {
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 4.5vw, 3.75rem);
  margin-top: 0.5rem;
}

.project-card {
  position: relative;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 24px;
  padding: clamp(1.75rem, 3.25vw, 3rem);
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;
  box-shadow: 0 16px 40px rgba(17, 34, 32, 0.05);
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
  will-change: transform, box-shadow;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(15, 118, 110, 0.35);
  box-shadow: 0 24px 60px rgba(17, 34, 32, 0.1);
}

/* Left Narrative Column */
.card-narrative {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.card-top-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--accent);
  background-color: var(--accent-light);
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  letter-spacing: 0.05em;
}

.category-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent);
}

.company-period {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.watermark-index {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-dim);
  opacity: 0.5;
}

.card-title {
  font-size: clamp(1.6rem, 2.2vw, 2.4rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--text-main);
  margin-top: 0.15rem;
  overflow-wrap: break-word;
  word-break: break-word;
}

.title-link {
  color: inherit;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.title-link:hover {
  color: var(--accent);
}

.card-tagline {
  font-size: var(--text-base);
  color: var(--accent);
  font-weight: 600;
  line-height: 1.45;
}

.card-summary {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: 1.65;
}

/* Metrics Row */
.card-metrics-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin: 0.4rem 0;
}

.metric-pill {
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  overflow: hidden;
}

.metric-val {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.metric-lbl {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* Tech Badges */
.card-tech-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.2rem;
}

.tech-badge {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.28rem 0.65rem;
  border-radius: 6px;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  transition: border-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}

.tech-badge:hover {
  border-color: var(--accent);
  color: var(--text-main);
}

/* Action CTA */
.card-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 0.75rem;
}

.explore-btn {
  padding: 0.85rem 1.6rem;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  box-shadow: 0 6px 20px rgba(15, 118, 110, 0.2);
  transition: all var(--duration-fast) var(--ease-out);
}

.explore-btn svg {
  transition: transform var(--duration-fast) var(--ease-out);
}

.explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(15, 118, 110, 0.3);
}

.explore-btn:hover svg {
  transform: translateX(4px);
}

.explore-hint {
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* ── Right Column: Device Frame Showcase ── */
.card-preview {
  width: 100%;
}

.device-frame {
  background-color: #0c1a1c;
  border: 1px solid #1a4246;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(11, 26, 28, 0.2);
  transition: transform 0.15s ease-out, box-shadow 0.3s ease-out;
  transform-style: preserve-3d;
  will-change: transform;
}

.device-frame:hover {
  box-shadow: 0 28px 65px rgba(15, 118, 110, 0.22);
}

/* Frame Header Chrome */
.frame-header {
  background-color: #081416;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #15383d;
  gap: 0.75rem;
}

.traffic-lights {
  display: flex;
  align-items: center;
  gap: 6px;
}

.traffic-lights .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red { background-color: #ff5f56; }
.dot.yellow { background-color: #ffbd2e; }
.dot.green { background-color: #27c93f; }

.url-bar {
  flex: 1;
  min-width: 0;
  max-width: 320px;
  background-color: #0f2428;
  border: 1px solid #1a3c42;
  border-radius: 6px;
  padding: 0.25rem 0.65rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.68rem;
  color: #7dd3fc;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.live-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.65rem;
  font-weight: 700;
  color: #34d399;
  background-color: rgba(16, 185, 129, 0.12);
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.live-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 8px #10b981;
}

/* Frame Viewport & Image */
.frame-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: #060e10;
}

.viewport-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

.viewport-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.6s var(--ease-out), filter 0.4s var(--ease-out);
}

.viewport-link:hover .viewport-img {
  transform: scale(1.03);
}

/* Hover Shimmer Overlay */
.viewport-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(15, 118, 110, 0.4) 0%, rgba(6, 14, 16, 0.7) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.viewport-link:hover .viewport-overlay {
  opacity: 1;
}

.overlay-badge {
  background-color: #ffffff;
  color: #0f172a;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transform: translateY(8px);
  transition: transform var(--duration-fast) var(--ease-out);
}

.viewport-link:hover .overlay-badge {
  transform: translateY(0);
}

/* Floating Micro Feature Badges */
.floating-badge-strip {
  position: absolute;
  bottom: 0.85rem;
  left: 0.85rem;
  right: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  pointer-events: none;
  z-index: 10;
}

.floating-chip {
  background-color: rgba(6, 20, 22, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #5eead4;
  border: 1px solid rgba(20, 184, 166, 0.4);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.68rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: floatFade 0.6s var(--ease-out) both;
}

@keyframes floatFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Screenshot Switcher Tabs under Mockup */
.frame-subnav {
  background-color: #081416;
  border-top: 1px solid #15383d;
  padding: 0.45rem 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.frame-subnav::-webkit-scrollbar {
  display: none;
}

.subnav-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #94a3b8;
  font-size: 0.7rem;
  font-family: var(--font-mono);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all var(--duration-fast) var(--ease-out);
}

.subnav-btn:hover {
  color: #ffffff;
  background-color: #102629;
}

.subnav-btn.active {
  background-color: #143639;
  color: #5eead4;
  font-weight: 700;
  border-color: #225a5f;
}

.subnav-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: currentColor;
}

/* ── MODE B: COMPACT GRID VIEW ── */
.projects-grid-view {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 1rem;
}

.grid-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}

.grid-card:hover {
  transform: translateY(-6px);
  border-color: rgba(15, 118, 110, 0.3);
  box-shadow: 0 16px 36px rgba(17, 34, 32, 0.08);
}

.grid-card-thumb {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: #081416;
}

.grid-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s var(--ease-out);
}

.grid-card:hover .grid-img {
  transform: scale(1.04);
}

.grid-thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 118, 110, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.grid-card-thumb:hover .grid-thumb-overlay {
  opacity: 1;
}

.grid-card-idx {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
}

.grid-card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 1;
}

.grid-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.68rem;
  color: var(--text-muted);
}

.grid-cat {
  color: var(--accent);
  font-weight: 700;
}

.grid-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.25;
}

.grid-title a {
  color: inherit;
  text-decoration: none;
}

.grid-summary {
  font-size: 0.825rem;
  color: var(--text-muted);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.grid-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.65rem 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.grid-metric {
  display: flex;
  flex-direction: column;
}

.gm-val {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-main);
}

.gm-lbl {
  font-size: 0.62rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.grid-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.grid-tags {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.grid-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  color: var(--text-muted);
}

.grid-btn {
  font-size: 0.75rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

/* ── RESPONSIVE MEDIA QUERIES ── */
@media (max-width: 1100px) {
  .project-card {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .card-narrative {
    order: 2;
  }
  .card-preview {
    order: 1;
  }
  .projects-grid-view {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-intro {
    margin-bottom: 1.5rem;
  }
  .section-title {
    font-size: 1.65rem;
  }
  .projects-grid-view {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .card-metrics-row {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.45rem;
  }
  .card-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
  }
  .explore-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .section-label-group {
    flex-wrap: wrap;
    gap: 0.65rem 0.85rem;
    margin-bottom: 0.5rem;
  }
  .view-mode-toggle {
    margin-left: auto;
  }
  .toggle-btn {
    padding: 0.28rem 0.65rem;
    font-size: 0.7rem;
  }
  .project-card {
    padding: 1.25rem 1rem;
    border-radius: 18px;
    gap: 1.25rem;
  }
  .card-narrative {
    gap: 0.95rem;
  }
  .watermark-index {
    display: none;
  }
  .category-chip {
    font-size: 0.65rem;
    padding: 0.25rem 0.6rem;
  }
  .company-period {
    font-size: 0.7rem;
  }
  .card-title {
    font-size: clamp(1.35rem, 5.5vw, 1.75rem);
    line-height: 1.2;
  }
  .card-tagline {
    font-size: 0.88rem;
    line-height: 1.4;
  }
  .card-summary {
    font-size: 0.8rem;
    line-height: 1.5;
  }
  .metric-pill {
    padding: 0.55rem 0.4rem;
    border-radius: 8px;
  }
  .metric-val {
    font-size: clamp(0.78rem, 2.5vw, 0.92rem);
    text-align: center;
  }
  .metric-lbl {
    font-size: 0.58rem;
    text-align: center;
  }
  .card-tech-cloud {
    gap: 0.35rem;
  }
  .tech-badge {
    font-size: 0.68rem;
    padding: 0.22rem 0.5rem;
  }
  .explore-btn {
    padding: 0.75rem 1.25rem;
    font-size: 0.82rem;
  }
  .explore-hint {
    display: none;
  }
  .device-frame {
    border-radius: 14px;
  }
  .frame-header {
    padding: 0.45rem 0.7rem;
    gap: 0.4rem;
  }
  .traffic-lights .dot {
    width: 8px;
    height: 8px;
  }
  .url-bar {
    font-size: 0.62rem;
    padding: 0.2rem 0.5rem;
    max-width: 170px;
  }
  .live-pill {
    padding: 0.12rem 0.4rem;
    font-size: 0.58rem;
  }
  .floating-badge-strip {
    display: none;
  }
  .frame-subnav {
    padding: 0.35rem 0.6rem;
    gap: 0.35rem;
  }
  .subnav-btn {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
  }
  .grid-card-content {
    padding: 1.15rem 1rem;
    gap: 0.65rem;
  }
  .grid-title {
    font-size: 1.1rem;
  }
  .grid-summary {
    font-size: 0.8rem;
  }
  .grid-metrics {
    gap: 0.4rem;
    padding: 0.5rem 0;
  }
  .grid-footer {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

@media (max-width: 440px) {
  .section-label-group .section-line {
    display: none;
  }
  .view-mode-toggle {
    width: 100%;
    justify-content: center;
  }
  .toggle-btn {
    flex: 1;
    justify-content: center;
  }
  .card-metrics-row {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 0.35rem;
  }
}

@media (hover: none) {
  .device-frame {
    transform: none !important;
  }
}
</style>
