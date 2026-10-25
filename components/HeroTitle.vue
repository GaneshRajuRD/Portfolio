<template>
  <section
    ref="heroSectionRef"
    class="hero-section"
    aria-label="Introduction"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Desktop Ambient Center Radial Glow -->
    <div class="hero-center-glow d-none d-lg-block" ref="backdropRef"></div>

    <!-- Main Container: Naturally integrated into overall page flow -->
    <div class="container hero-container">
      <!-- Main Row: Left & Right sections vertically aligned at middle from top to bottom -->
      <div class="hero-main-row">
        <!-- Left Column: Role & Kicker -->
        <div class="hero-left">
          <div ref="labelRef" class="hero-kicker mono-label">
            <span class="status-dot"></span>
            <span>Hey, I'm Ganesh Raju</span>
          </div>

          <!-- Role Headline with Line Break -->
          <h1 class="hero-headline" aria-label="Frontend Developer">
            <span ref="line1Ref" class="headline-line">
              <span class="headline-solid">Frontend</span>
              <span ref="line1GradRef" class="headline-gradient" aria-hidden="true">Frontend</span>
            </span>
            <span ref="line2Ref" class="headline-line">
              <span class="headline-solid">Developer</span>
              <span ref="line2GradRef" class="headline-gradient" aria-hidden="true">Developer</span>
            </span>
          </h1>
        </div>

        <!-- Tablet & Mobile Portrait (In-flow, between Left Role and Right Details) -->
        <div class="hero-portrait-mobile d-flex d-lg-none" ref="mobileVisualRef">
          <div class="portrait-stage-mobile" ref="mobileStageRef">
            <div class="mobile-center-glow"></div>
            <img
              ref="mobileImgRef"
              src="/assets/images/hero/ganesh_raju.webp"
              alt="Ganesh Raju - Frontend Developer"
              width="834"
              height="1357"
              class="portrait-image-mobile"
              loading="eager"
              decoding="async"
            />
            <div class="portrait-bottom-blend-mobile"></div>
          </div>
        </div>

        <!-- Right Column: Tech Stack, Description & Meta -->
        <div class="hero-right">
          <!-- Subtitle / Tech Stack Statement -->
          <div ref="subtitleRef" class="hero-tech-badge mono-label">
            <span class="tech-icon">✦</span>
            <span>Vue 3 / Nuxt 3 · Healthcare web platforms</span>
          </div>

          <!-- Brief Narrative -->
          <p ref="descRef" class="hero-desc">
            Engineering resilient, SEO-friendly SSR applications and real-time dashboards for healthcare teams that demand high-availability frontends.
          </p>

          <!-- CTA Buttons (Preserved as commented by user) -->
          <!-- <div ref="actionsRef" class="hero-actions">
            <a href="#work" class="btn btn-primary" @click="handleScrollTo('#work', $event)">
              <span>View work</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
            <a href="#contact" class="btn btn-secondary" @click="handleScrollTo('#contact', $event)">
              <span>Contact me</span>
            </a>
          </div> -->

          <!-- Location & Relocation Footnote -->
          <div ref="metaRef" class="hero-meta mono-label">
            <div class="meta-item">
              <!-- <span class="meta-dot"></span> -->
              <span>Salem, Tamil Nadu</span>
            </div>
            <span class="meta-sep">/</span>
            <div class="meta-item">
              <span class="meta-highlight">Open to relocate:</span>
              <span>Bangalore &amp; Chennai</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Middle Portrait: Position Absolute Full-Size (centered behind text) -->
      <div class="hero-portrait-middle d-none d-lg-flex" ref="visualRef">
        <div class="portrait-stage" ref="portraitStageRef">
          <img
            ref="portraitImgRef"
            src="/assets/images/hero/ganesh_raju.webp"
            alt="Ganesh Raju - Frontend Developer"
            width="834"
            height="1357"
            class="portrait-image"
            loading="eager"
            decoding="async"
          />
          <div class="portrait-bottom-blend"></div>
        </div>
      </div>

      <!-- 4 Core Pillars (#01, #02, #03, #04) spanning across container -->
      <div class="hero-pillars-strip" ref="pillarsRef">
        <div class="pillar-item">
          <span class="pillar-num mono-label">#01</span>
          <span class="pillar-title">Vue 3 / Nuxt 3 SSR</span>
        </div>
        <div class="pillar-item">
          <span class="pillar-num mono-label">#02</span>
          <span class="pillar-title">REST API &amp; Strapi CMS</span>
        </div>
        <div class="pillar-item">
          <span class="pillar-num mono-label">#03</span>
          <span class="pillar-title">Azure DevOps CI/CD</span>
        </div>
        <div class="pillar-item">
          <span class="pillar-num mono-label">#04</span>
          <span class="pillar-title">Technical SEO &amp; Core Web Vitals</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const line1Ref = ref(null)
const line2Ref = ref(null)
const line1GradRef = ref(null)
const line2GradRef = ref(null)

const heroSectionRef = ref(null)
const labelRef = ref(null)
const subtitleRef = ref(null)
const descRef = ref(null)
const actionsRef = ref(null)
const metaRef = ref(null)
const visualRef = ref(null)
const backdropRef = ref(null)
const portraitStageRef = ref(null)
const portraitImgRef = ref(null)
const pillarsRef = ref(null)

// Mobile/Tablet refs
const mobileVisualRef = ref(null)
const mobileStageRef = ref(null)
const mobileImgRef = ref(null)

let masterTimeline = null
let floatTween = null
let scrollTriggerInstance = null
let xToBackdrop = null
let yToBackdrop = null
let xToPortrait = null
let yToPortrait = null
let rotXPortrait = null
let rotYPortrait = null

const handleScrollTo = (targetId, event) => {
  event.preventDefault()
  const el = document.querySelector(targetId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleMouseMove = (event) => {
  if (!heroSectionRef.value || !backdropRef.value || !portraitStageRef.value) return
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return

  const rect = heroSectionRef.value.getBoundingClientRect()
  const normX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  const normY = ((event.clientY - rect.top) / rect.height - 0.5) * 2

  // Center ambient glow subtle parallax counter-shift
  if (xToBackdrop) xToBackdrop(normX * -15)
  if (yToBackdrop) yToBackdrop(normY * -10)

  // Full-size portrait 3D perspective tilt & shift
  if (xToPortrait) xToPortrait(normX * 18)
  if (yToPortrait) yToPortrait(normY * 12)
  if (rotXPortrait) rotXPortrait(normY * -6)
  if (rotYPortrait) rotYPortrait(normX * 6)
}

const handleMouseLeave = () => {
  if (xToBackdrop) xToBackdrop(0)
  if (yToBackdrop) yToBackdrop(0)

  if (xToPortrait) xToPortrait(0)
  if (yToPortrait) yToPortrait(0)
  if (rotXPortrait) rotXPortrait(0)
  if (rotYPortrait) rotYPortrait(0)
}

onMounted(async () => {
  if (!process.client) return

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (isReduced) {
    if (labelRef.value) gsap.set(labelRef.value, { opacity: 1 })
    if (line1Ref.value) gsap.set(line1Ref.value, { opacity: 1, y: 0 })
    if (line2Ref.value) gsap.set(line2Ref.value, { opacity: 1, y: 0 })
    if (line1GradRef.value) gsap.set(line1GradRef.value, { opacity: 1 })
    if (line2GradRef.value) gsap.set(line2GradRef.value, { opacity: 1 })
    if (backdropRef.value) gsap.set(backdropRef.value, { opacity: 1, scale: 1 })
    if (visualRef.value) gsap.set(visualRef.value, { opacity: 1 })
    if (portraitStageRef.value) gsap.set(portraitStageRef.value, { opacity: 1, y: 0, scale: 1 })
    if (mobileVisualRef.value) gsap.set(mobileVisualRef.value, { opacity: 1 })
    if (mobileStageRef.value) gsap.set(mobileStageRef.value, { opacity: 1, y: 0, scale: 1 })
    if (subtitleRef.value) gsap.set(subtitleRef.value, { opacity: 1, y: 0 })
    if (descRef.value) gsap.set(descRef.value, { opacity: 1, y: 0 })
    if (actionsRef.value) gsap.set(actionsRef.value, { opacity: 1, y: 0 })
    if (metaRef.value) gsap.set(metaRef.value, { opacity: 1 })
    if (pillarsRef.value) gsap.set(pillarsRef.value, { opacity: 1, y: 0 })
    return
  }

  // Wait for fonts to load before starting the animation
  if (document.fonts) {
    try {
      await document.fonts.ready
    } catch (e) {
      // Continue anyway if fonts.ready fails
    }
  }

  // Master GSAP Timeline for load animation
  masterTimeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      // Setup quickTo interpolators for silky smooth 3D mouse tracking on desktop
      if (backdropRef.value && portraitStageRef.value) {
        xToBackdrop = gsap.quickTo(backdropRef.value, 'x', { duration: 0.9, ease: 'power2.out' })
        yToBackdrop = gsap.quickTo(backdropRef.value, 'y', { duration: 0.9, ease: 'power2.out' })

        xToPortrait = gsap.quickTo(portraitStageRef.value, 'x', { duration: 0.5, ease: 'power2.out' })
        yToPortrait = gsap.quickTo(portraitStageRef.value, 'y', { duration: 0.5, ease: 'power2.out' })
        rotXPortrait = gsap.quickTo(portraitStageRef.value, 'rotationX', { duration: 0.5, ease: 'power2.out' })
        rotYPortrait = gsap.quickTo(portraitStageRef.value, 'rotationY', { duration: 0.5, ease: 'power2.out' })
      }

      // Continuous subtle breathing floating animation on the portraits
      const imgTargets = [portraitImgRef.value, mobileImgRef.value].filter(Boolean)
      if (imgTargets.length) {
        floatTween = gsap.to(imgTargets, {
          y: -12,
          duration: 3.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }
  })

  const tl = masterTimeline

  // 1. Kicker / Label on left
  tl.to(labelRef.value, {
    opacity: 1,
    duration: 0.5
  })

  // 2. Headline lines reveal smoothly with gradient
  const lineTargets = [line1Ref.value, line2Ref.value].filter(Boolean)
  if (lineTargets.length) {
    tl.to(
      lineTargets,
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out'
      },
      '-=0.2'
    )
  }

  // 3. Center Glow Blooms
  if (backdropRef.value) {
    tl.to(
      backdropRef.value,
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out'
      },
      '-=0.5'
    )
  }

  // 4. Portrait reveals & rises from bottom
  const visualTargets = [visualRef.value, mobileVisualRef.value].filter(Boolean)
  const stageTargets = [portraitStageRef.value, mobileStageRef.value].filter(Boolean)

  if (visualTargets.length) {
    tl.to(
      visualTargets,
      {
        opacity: 1,
        duration: 0.4
      },
      '-=0.8'
    )
  }
  if (stageTargets.length) {
    tl.to(
      stageTargets,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out'
      },
      '-=0.7'
    )
  }

  // 5. Right side: tech badge, desc, actions, meta
  tl.to(
    [subtitleRef.value, descRef.value],
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12
    },
    '-=0.6'
  )

  if (actionsRef.value) {
    tl.to(
      actionsRef.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.5
      },
      '-=0.4'
    )
  }

  tl.to(
    metaRef.value,
    {
      opacity: 1,
      duration: 0.4
    },
    '-=0.2'
  )

  // 6. Pillars strip across bottom
  if (pillarsRef.value) {
    tl.to(
      pillarsRef.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.6
      },
      '-=0.3'
    )
  }

  // 7. Transition headline smoothly from Option 5 color (#164e43) into Luminous Emerald Gradient
  const gradTargets = [line1GradRef.value, line2GradRef.value].filter(Boolean)
  if (gradTargets.length) {
    tl.to(
      gradTargets,
      {
        opacity: 1,
        duration: 1.4,
        stagger: 0.16,
        ease: 'power2.inOut'
      },
      '+=0.45'
    )
  }

  // 8. Register ScrollTrigger parallax on desktop portrait
  gsap.registerPlugin(ScrollTrigger)
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: heroSectionRef.value,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.5,
    onUpdate: (self) => {
      if (portraitStageRef.value) {
        gsap.set(portraitStageRef.value, { yPercent: -self.progress * 12 })
      }
      if (backdropRef.value) {
        gsap.set(backdropRef.value, { yPercent: -self.progress * 6 })
      }
    }
  })
})

onUnmounted(() => {
  if (masterTimeline) masterTimeline.kill()
  if (floatTween) floatTween.kill()
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
})
</script>

<style scoped>
.hero-section {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: calc(var(--nav-height) + 1.25rem);
  padding-bottom: 2.5rem;
  position: relative;
  background-color: var(--bg-primary);
  overflow: hidden;
}

/* Ambient Radial Glow centered behind portrait on desktop */
.hero-center-glow {
  position: absolute;
  left: 50%;
  bottom: 12%;
  transform: translateX(-50%) scale(0.9);
  width: min(840px, 70vw);
  height: min(840px, 70vw);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, rgba(15, 118, 110, 0.1) 45%, transparent 72%);
  filter: blur(65px);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  will-change: transform, opacity;
}

.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - var(--nav-height) - 4rem);
}

/* Main Row: Left and Right sections vertically aligned at middle from top to bottom */
.hero-main-row {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center; /* Vertically align content at middle from top to bottom */
  justify-content: space-between;
  gap: 2.5rem;
  flex: 1;
  padding: 1.5rem 0;
  margin-top: auto;
  margin-bottom: auto;
}

/* Left Column: Role & Kicker */
.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 440px;
  z-index: 3;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  opacity: 0;
  padding: 0.35rem 0.85rem;
  background-color: rgba(15, 118, 110, 0.08);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 6.2vw, 5.6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.98;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
}

.headline-line {
  position: relative;
  display: inline-block;
  width: fit-content;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(24px);
  will-change: transform, opacity;
}

.headline-solid {
  display: block;
  color: #164e43; /* Option 5: Deep Cypress Emerald */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.headline-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: linear-gradient(135deg, #112220 18%, #0f766e 68%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Right Column: Tech Badge, Narrative, Actions, Meta */
.hero-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 410px;
  z-index: 3;
}

.hero-tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--accent);
  background-color: rgba(15, 118, 110, 0.08);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  padding: 0.4rem 0.95rem;
  margin-bottom: 1.25rem;
  opacity: 0;
  transform: translateY(14px);
}

.tech-icon {
  font-size: 0.75rem;
  color: var(--accent);
}

.hero-desc {
  font-size: clamp(0.95rem, 1.1vw, 1.08rem);
  line-height: 1.65;
  color: var(--text-muted);
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(14px);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(14px);
}

.hero-actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--ease-out);
  text-decoration: none;
}

.hero-actions .btn-primary {
  background-color: var(--text-main);
  color: #ffffff;
  border: 1px solid var(--text-main);
}

.hero-actions .btn-primary:hover {
  background-color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -6px rgba(15, 118, 110, 0.3);
}

.hero-actions .btn-secondary {
  background-color: #ffffff;
  color: var(--text-main);
  border: 1px solid var(--border-medium);
}

.hero-actions .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.95);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.hero-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: normal;
  gap: 0.5rem 0.75rem;
  font-size: var(--text-xs);
  color: var(--text-muted);
  opacity: 0;
  padding-top: 1rem;
  letter-spacing: 0px;
  border-top: 1px solid var(--border-subtle);
  width: 100%;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.meta-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--accent);
}

.meta-highlight {
  color: var(--text-main);
  font-weight: 600;
}

.meta-sep {
  opacity: 0.4;
}

/* Desktop Middle Portrait (Position Absolute, full size, blended behind text) */
.hero-portrait-middle {
  position: absolute;
  left: 48%;
  bottom: 0;
  transform: translateX(-48%);
  height: 92%;
  max-height: 860px;
  align-items: flex-end;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
  perspective: 1200px;
  opacity: 0;
  will-change: transform, opacity;
}

.portrait-stage {
  position: relative;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: translateY(50px) scale(0.96);
  transform-style: preserve-3d;
  will-change: transform;
}

.portrait-image {
  height: 100%;
  width: auto;
  max-height: 860px;
  object-fit: contain;
  object-position: bottom center;
  /* filter: drop-shadow(0 20px 40px rgba(17, 34, 32, 0.12)); */
  display: block;
  will-change: transform;
  pointer-events: none;
  user-select: none;
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

.portrait-bottom-blend {
  position: absolute;
  bottom: 0;
  left: 0%;
  right: 0%;
  height: 80px;
  background: linear-gradient(to top, var(--bg-primary) 0%, rgba(237, 245, 244, 0.6) 20%, transparent 100%);
  /* background: linear-gradient(to top, #e3eeed 0%, rgba(237, 245, 244, 0.6) 40%, transparent 100%); */
  pointer-events: none;
  z-index: 4;
}

/* Mobile & Tablet Responsive Portrait */
.hero-portrait-mobile {
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 1.75rem auto 2.25rem;
  z-index: 2;
  opacity: 0;
}

.portrait-stage-mobile {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  max-width: 360px;
  transform: translateY(30px) scale(0.96);
  will-change: transform;
}

.mobile-center-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(45, 212, 191, 0.35) 0%, rgba(15, 118, 110, 0.12) 50%, transparent 75%);
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

.portrait-image-mobile {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 320px;
  max-height: clamp(260px, 42vh, 380px);
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 16px 28px rgba(17, 34, 32, 0.1));
  display: block;
  mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
  pointer-events: none;
}

.portrait-bottom-blend-mobile {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, var(--bg-primary) 0%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

/* Bottom Row of the Card: 4 Pillars Strip */
.hero-pillars-strip {
  position: relative;
  z-index: 2;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  /* border-top: 1px solid var(--border-subtle); */
  padding-top: 1.5rem;
  margin-top: 2rem;
  opacity: 0;
  transform: translateY(16px);
}

.pillar-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.pillar-num {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--accent);
  opacity: 0.85;
}

.pillar-title {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-main);
  letter-spacing: -0.01em;
}

/* Responsive Breakpoints: Tablet & Mobile */
@media (max-width: 991px) {
  .hero-container {
    min-height: auto;
  }
  .hero-main-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1rem 0;
    margin-top: 0;
    margin-bottom: 2rem;
  }
  .hero-left,
  .hero-right {
    max-width: 100%;
    width: 100%;
  }
  .hero-headline {
    font-size: clamp(2.8rem, 7.5vw, 4.4rem);
  }
  .hero-pillars-strip {
    grid-template-columns: 1fr 1fr;
    margin-top: 1.5rem;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding-top: calc(var(--nav-height) + 0.75rem);
    padding-bottom: 2rem;
  }
  .hero-headline {
    font-size: clamp(2.35rem, 10vw, 3.2rem);
  }
  .hero-portrait-mobile {
    margin: 1.25rem auto 1.75rem;
  }
  .portrait-image-mobile {
    max-height: 280px;
    max-width: 250px;
  }
  .hero-pillars-strip {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    padding-top: 0;
    margin-top: 1.5rem;
  }
  .pillar-item {
    padding: 0.75rem;
    background: #ffffff;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
  }
  .hero-actions {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }
  .hero-actions .btn {
    width: 100%;
  }
  .hero-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
  }
  .hero-meta .meta-sep {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-kicker,
  .headline-line,
  .headline-gradient,
  .hero-tech-badge,
  .hero-desc,
  .hero-actions,
  .hero-meta,
  .hero-center-glow,
  .hero-portrait-middle,
  .portrait-stage,
  .portrait-image,
  .hero-portrait-mobile,
  .portrait-stage-mobile,
  .portrait-image-mobile,
  .hero-pillars-strip {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>
