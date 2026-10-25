<template>
  <div class="case-study-page">
    <!-- Top Nav with Back Button -->
    <header class="case-study-nav">
      <div class="container case-nav-container">
        <NuxtLink to="/#work" class="back-link interactive-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back to projects</span>
        </NuxtLink>

        <NuxtLink to="/" class="case-nav-logo">
          <span class="mono-label">Ganesh Raju</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Project Not Found Fallback -->
    <main v-if="!project" class="container not-found-section">
      <div class="not-found-box">
        <span class="mono-label">Error 404</span>
        <h1 class="not-found-title">Case study not found</h1>
        <p class="not-found-desc">The requested project case study does not exist or may have been moved.</p>
        <NuxtLink to="/" class="btn btn-primary">Return to home</NuxtLink>
      </div>
    </main>

    <!-- Case Study Content -->
    <main v-else class="case-study-content">
      <!-- Header Banner -->
      <section class="case-hero">
        <div class="container">
          <div ref="metaRowRef" class="case-meta-row">
            <span class="mono-label case-company">{{ project.company }}</span>
            <span class="meta-sep">/</span>
            <span class="mono-label case-period">{{ project.period }}</span>
          </div>

          <h1 ref="titleRef" class="case-title">{{ project.title }}</h1>
          <p ref="taglineRef" class="case-tagline">{{ project.tagline }}</p>

          <!-- Metrics Row -->
          <div class="case-metrics-grid">
            <div v-for="metric in project.metrics" :key="metric.label" class="metric-card">
              <span class="metric-val">{{ metric.value }}</span>
              <span class="mono-label metric-label">{{ metric.label }}</span>
            </div>
          </div>

          <!-- Conditional Live Demo Link -->
          <div v-if="project.demoUrl" class="demo-cta-row">
            <a :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>View live demo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Mobile In-Page Sticky Nav (Only visible on screens <= 768px to eliminate long scroll) -->
      <nav class="mobile-section-nav" aria-label="Case study sections">
        <div class="container mobile-nav-scroll">
          <button
            type="button"
            class="mobile-pill"
            :class="{ active: activeMobileTab === 'story' }"
            @click="jumpToSection('story')"
          >
            <span>The Story</span>
          </button>
          <button
            type="button"
            class="mobile-pill"
            :class="{ active: activeMobileTab === 'specs' }"
            @click="jumpToSection('specs')"
          >
            <span>Tech Specs</span>
          </button>
          <button
            v-if="project.screenshots && project.screenshots.length"
            type="button"
            class="mobile-pill"
            :class="{ active: activeMobileTab === 'visuals' }"
            @click="jumpToSection('visuals')"
          >
            <span>Visuals ({{ project.screenshots.length }})</span>
          </button>
        </div>
      </nav>

      <!-- Main Case Narrative Grid -->
      <section class="case-body-section">
        <div class="container case-grid">
          <!-- Left Column: Story -->
          <div id="case-story-section" class="case-story">
            <!-- Problem -->
            <article class="story-block">
              <div class="story-header mono-label">
                <span>01</span>
                <span>The Challenge</span>
              </div>
              <h2 class="story-heading">Problem Context</h2>
              <p class="story-text">{{ project.problem }}</p>
            </article>

            <!-- What I Built -->
            <article class="story-block">
              <div class="story-header mono-label">
                <span>02</span>
                <span>The Solution</span>
              </div>
              <h2 class="story-heading">What I Built</h2>
              <p class="story-text">{{ project.whatIBuilt }}</p>
            </article>

            <!-- My Role -->
            <article class="story-block">
              <div class="story-header mono-label">
                <span>03</span>
                <span>Responsibilities</span>
              </div>
              <h2 class="story-heading">My Role</h2>
              <p class="story-text">{{ project.myRole }}</p>
            </article>

            <!-- CI/CD Diagram (Specific to cicd-pipeline) -->
            <article v-if="project.slug === 'cicd-pipeline' && project.pipelineSteps" class="story-block">
              <div class="story-header mono-label">
                <span>Architecture</span>
                <span>Release Workflow</span>
              </div>
              <h2 class="story-heading">Azure DevOps Pipeline Architecture</h2>
              <div class="pipeline-diagram">
                <div
                  v-for="(step, idx) in project.pipelineSteps"
                  :key="step.step"
                  class="pipeline-node"
                >
                  <div class="node-number mono-label">Step 0{{ step.step }}</div>
                  <div class="node-title">{{ step.title }}</div>
                  <div class="node-desc">{{ step.desc }}</div>
                  <div v-if="idx < project.pipelineSteps.length - 1" class="node-connector">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <polyline points="19 12 12 19 5 12"/>
                    </svg>
                  </div>
                </div>
              </div>
            </article>

            <!-- What I'd Improve -->
            <article class="story-block">
              <div class="story-header mono-label">
                <span>04</span>
                <span>Retrospective</span>
              </div>
              <h2 class="story-heading">What I'd Improve</h2>
              <p class="story-text">{{ project.improvements }}</p>
            </article>
          </div>

          <!-- Right Column: Tech & Meta Sidebar -->
          <aside id="case-specs-section" class="case-sidebar">
            <div class="sidebar-sticky">
              <div class="sidebar-block">
                <h3 class="sidebar-title mono-label">Technologies Used</h3>
                <div class="tech-tag-cloud">
                  <span v-for="tag in project.tech" :key="tag" class="tech-tag">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="sidebar-block">
                <div class="sidebar-block-header">
                  <h3 class="sidebar-title mono-label">Technical Breakdown</h3>
                  <button
                    v-if="project.techDetails && project.techDetails.length > 2"
                    type="button"
                    class="mobile-expand-btn mono-label"
                    @click="expandAllTech = !expandAllTech"
                  >
                    {{ expandAllTech ? 'Show Less' : `View All (${project.techDetails.length})` }}
                  </button>
                </div>
                <ul class="tech-details-list">
                  <li v-for="item in visibleTechDetails" :key="item.name" class="tech-detail-item">
                    <strong class="tech-detail-name">{{ item.name }}</strong>
                    <p class="tech-detail-text">{{ item.detail }}</p>
                  </li>
                </ul>
              </div>

              <div class="sidebar-block">
                <h3 class="sidebar-title mono-label">Navigation</h3>
                <div class="nav-shortcuts">
                  <NuxtLink to="/#work" class="btn btn-secondary btn-block">
                    Explore Other Projects
                  </NuxtLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <!-- Visual Showcase / Screenshots Grid -->
      <section v-if="project.screenshots && project.screenshots.length" id="case-visuals-section" class="screenshots-section">
        <div class="container">
          <div class="section-label-group mono-label">
            <span class="label-num">05</span>
            <span class="label-text">Visual Showcase</span>
            <div class="section-line"></div>
          </div>

          <!-- Multi-Screenshot Switcher for Mobile & Compact Screens -->
          <div v-if="project.screenshots && project.screenshots.length > 1" class="screenshot-tabs-header">
            <div class="screenshot-pills">
              <button
                v-for="(img, idx) in project.screenshots"
                :key="idx"
                type="button"
                class="screenshot-pill"
                :class="{ active: activeScreenshotIdx === idx && !showAllScreenshots }"
                @click="selectScreenshot(idx)"
              >
                <span class="pill-idx">Fig 0{{ idx + 1 }}</span>
                <span class="pill-label">{{ getScreenshotLabel(img, idx) }}</span>
              </button>
            </div>
            
            <button
              type="button"
              class="screenshot-view-toggle mono-label"
              @click="showAllScreenshots = !showAllScreenshots"
            >
              {{ showAllScreenshots ? 'Compact View' : 'Stack All (' + project.screenshots.length + ')' }}
            </button>
          </div>

          <div class="screenshots-grid" :class="{ 'tabbed-mode': !showAllScreenshots && project.screenshots.length > 1 }">
            <template v-for="(img, idx) in project.screenshots" :key="idx">
              <figure
                v-show="showAllScreenshots || activeScreenshotIdx === idx || project.screenshots.length <= 1"
                class="screenshot-figure"
              >
                <div class="screenshot-frame">
                  <img
                    :src="img.src"
                    :alt="img.alt"
                    loading="lazy"
                    decoding="async"
                    class="screenshot-img"
                  />
                </div>
                <figcaption class="screenshot-caption mono-label">
                  <span class="caption-idx">Fig 0{{ idx + 1 }}.</span>
                  <span>{{ img.caption }}</span>
                </figcaption>
              </figure>
            </template>
          </div>
        </div>
      </section>

      <!-- Next Project Footer Bar -->
      <section class="next-project-section">
        <div class="container next-project-container">
          <div class="next-label mono-label">Next Case Study</div>
          <NuxtLink :to="`/work/${nextProject.slug}`" class="next-link">
            <span class="next-title">{{ nextProject.title }}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </NuxtLink>
        </div>
      </section>
    </main>

    <!-- Footer Component -->
    <ContactBlock />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '~/data/projects'
import { gsap } from 'gsap'

const route = useRoute()
const slug = computed(() => route.params.slug)

const project = computed(() => {
  return projects.find(p => p.slug === slug.value) || null
})

const currentIndex = computed(() => {
  return projects.findIndex(p => p.slug === slug.value)
})

const nextProject = computed(() => {
  if (currentIndex.value === -1) return projects[0]
  const nextIdx = (currentIndex.value + 1) % projects.length
  return projects[nextIdx]
})

// Elements for entrance sequence
const metaRowRef = ref(null)
const titleRef = ref(null)
const taglineRef = ref(null)

// Responsive & mobile navigation state to eliminate long scrolling
const activeMobileTab = ref('story')
const activeScreenshotIdx = ref(0)
const showAllScreenshots = ref(false)
const expandAllTech = ref(false)
const isMobileScreen = ref(false)

function jumpToSection(sectionId) {
  activeMobileTab.value = sectionId
  if (!process.client) return
  const el = document.getElementById(`case-${sectionId}-section`)
  if (el) {
    const navOffset = 110 // height of sticky nav + quick bar
    const y = el.getBoundingClientRect().top + window.pageYOffset - navOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

function selectScreenshot(idx) {
  activeScreenshotIdx.value = idx
  showAllScreenshots.value = false
}

function getScreenshotLabel(img, idx) {
  const alt = (img.alt || '').toLowerCase()
  if (alt.includes('mobile')) return 'Mobile Architecture'
  if (alt.includes('ui') || alt.includes('interface') || alt.includes('widget')) return 'Interface UI'
  if (alt.includes('display') || alt.includes('monitor')) return 'Display Board'
  if (alt.includes('dashboard')) return 'Dashboard'
  if (alt.includes('pipeline') || alt.includes('flow')) return 'Pipeline Flow'
  return `View 0${idx + 1}`
}

const visibleTechDetails = computed(() => {
  if (!project.value?.techDetails) return []
  if (!isMobileScreen.value || expandAllTech.value) {
    return project.value.techDetails
  }
  return project.value.techDetails.slice(0, 2)
})

let resizeHandler = null

// SEO Metadata & JSON-LD
useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `https://ganeshraju.dev/work/${slug.value}`
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: () => {
        if (!project.value) return ''
        const primaryImage = project.value.screenshots?.[0]?.src
          ? `https://ganeshraju.dev${project.value.screenshots[0].src}`
          : 'https://ganeshraju.dev/og-image.png'
        return JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: `${project.value.title} - Healthcare Frontend Case Study`,
          description: project.value.problem,
          image: primaryImage,
          author: {
            '@type': 'Person',
            name: 'Ganesh Raju',
            url: 'https://ganeshraju.dev'
          },
          publisher: {
            '@type': 'Person',
            name: 'Ganesh Raju'
          },
          keywords: (project.value.tech || []).join(', '),
          about: {
            '@type': 'SoftwareApplication',
            name: project.value.title,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web'
          }
        })
      }
    }
  ]
})

useSeoMeta({
  title: () => project.value ? `${project.value.title} | Case Study | Ganesh Raju` : 'Case Study | Ganesh Raju',
  description: () => project.value ? project.value.oneLiner : 'Frontend Developer Case Study',
  ogTitle: () => project.value ? `${project.value.title} · Frontend Case Study | Ganesh Raju` : 'Frontend Case Study',
  ogDescription: () => project.value ? project.value.oneLiner : 'Frontend Developer Case Study',
  ogUrl: () => `https://ganeshraju.dev/work/${slug.value}`,
  ogImage: () => project.value?.screenshots?.[0]?.src ? `https://ganeshraju.dev${project.value.screenshots[0].src}` : 'https://ganeshraju.dev/og-image.png',
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterImage: () => project.value?.screenshots?.[0]?.src ? `https://ganeshraju.dev${project.value.screenshots[0].src}` : 'https://ganeshraju.dev/og-image.png'
})

onMounted(() => {
  if (process.client) {
    isMobileScreen.value = window.innerWidth <= 768
    showAllScreenshots.value = window.innerWidth > 900

    resizeHandler = () => {
      isMobileScreen.value = window.innerWidth <= 768
    }
    window.addEventListener('resize', resizeHandler, { passive: true })

    if (project.value) {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!isReduced) {
        // Sequence: meta row, title, then tagline
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        if (metaRowRef.value) tl.from(metaRowRef.value, { opacity: 0, y: 15, duration: 0.5 })
        if (titleRef.value) tl.from(titleRef.value, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        if (taglineRef.value) tl.from(taglineRef.value, { opacity: 0, y: 15, duration: 0.5 }, '-=0.3')
      }
    }
  }
})

onUnmounted(() => {
  if (process.client && resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style scoped>
.case-study-page {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-cream);
}

.case-study-nav {
  position: sticky;
  top: 0;
  height: var(--nav-height);
  background-color: rgba(237, 245, 244, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 4px 20px rgba(17, 34, 32, 0.04);
  z-index: 100;
}

.case-nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: var(--text-sm);
  color: var(--text-muted);
  font-weight: 500;
  transition: color var(--duration-fast) var(--ease-out);
}

.back-link:hover {
  color: var(--text-cream);
}

.case-hero {
  padding-top: clamp(3rem, 6vw, 5rem);
  padding-bottom: clamp(3rem, 5vw, 4.5rem);
  border-bottom: 1px solid var(--border-subtle);
}

.case-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  color: var(--text-muted);
}

.case-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text-cream);
  margin-bottom: 1rem;
  max-width: 950px;
}

.case-tagline {
  font-size: var(--text-lg);
  color: var(--accent);
  max-width: 800px;
  line-height: 1.5;
  margin-bottom: 2.5rem;
}

.case-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
  max-width: 780px;
}

.metric-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.metric-val {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-cream);
  overflow-wrap: break-word;
  word-break: normal;
}

.metric-label {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.demo-cta-row {
  margin-top: 2rem;
}

/* Case Body Grid */
.case-body-section {
  padding-top: clamp(3rem, 6vw, 5rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.case-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  align-items: flex-start;
}

.case-story {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.story-block {
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 3.5rem;
}

.story-block:last-child {
  border-bottom: none;
}

.story-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: var(--text-xs);
  margin-bottom: 0.75rem;
}

.story-heading {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-cream);
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}

.story-text {
  font-size: var(--text-base);
  color: var(--text-muted);
  line-height: 1.75;
}

/* Pipeline Architecture Diagram (CI/CD) */
.pipeline-diagram {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.pipeline-node {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  position: relative;
}

.node-number {
  color: var(--accent);
  font-size: 0.75rem;
  margin-bottom: 0.35rem;
}

.node-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-cream);
  margin-bottom: 0.25rem;
}

.node-desc {
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: 1.5;
}

.node-connector {
  display: flex;
  justify-content: center;
  color: var(--text-dim);
  margin-top: 0.75rem;
}

/* Sidebar */
.case-sidebar {
  width: 100%;
}

.sidebar-sticky {
  position: sticky;
  top: calc(var(--nav-height) + 2rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-block {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 1.5rem;
}

.sidebar-title {
  color: var(--text-muted);
  font-size: 0.75rem;
  margin-bottom: 1rem;
  display: block;
}

.tech-tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-details-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-detail-name {
  font-size: 0.85rem;
  color: var(--text-cream);
  display: block;
  margin-bottom: 0.2rem;
}

.tech-detail-text {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Screenshots Showcase */
.screenshots-section {
  padding-bottom: 5rem;
}

.screenshots-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2rem;
}

.screenshot-figure {
  margin: 0;
}

.screenshot-frame {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
}

.screenshot-img {
  width: 100%;
  height: auto;
  display: block;
}

.screenshot-caption {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.caption-idx {
  color: var(--text-cream);
  font-weight: 700;
}

/* Next Project Bar */
.next-project-section {
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  padding: 3rem 0;
}

.next-project-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.next-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-cream);
  font-size: var(--text-xl);
  font-weight: 700;
  transition: transform var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}

.next-link:hover {
  transform: translateX(6px);
  color: var(--accent);
}

/* 404 Box */
.not-found-section {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-box {
  text-align: center;
  max-width: 500px;
  padding: 3rem 2rem;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
}

.not-found-title {
  font-size: var(--text-2xl);
  margin: 0.75rem 0;
  color: var(--text-cream);
}

.not-found-desc {
  color: var(--text-muted);
  margin-bottom: 2rem;
}

/* Mobile Quick Section Bar */
.mobile-section-nav {
  display: none;
  position: sticky;
  top: var(--nav-height);
  background-color: rgba(237, 245, 244, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border-subtle);
  z-index: 90;
  padding: 0.5rem 0;
}

.mobile-nav-scroll {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.mobile-nav-scroll::-webkit-scrollbar {
  display: none;
}

.mobile-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--duration-fast) var(--ease-out);
}

.mobile-pill:hover,
.mobile-pill.active {
  background: var(--accent);
  color: #042f2e;
  border-color: var(--accent);
}

/* Sidebar Block Header with Collapse Control */
.sidebar-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.sidebar-block-header .sidebar-title {
  margin-bottom: 0;
}

.mobile-expand-btn {
  font-size: 0.7rem;
  color: var(--accent);
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: background var(--duration-fast);
}

.mobile-expand-btn:hover {
  background: rgba(15, 118, 110, 0.1);
}

/* Screenshot Switcher for Mobile & Compact Screens */
.screenshot-tabs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.screenshot-pills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.screenshot-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.78rem;
  transition: all var(--duration-fast) var(--ease-out);
}

.screenshot-pill:hover {
  border-color: var(--border-medium);
  color: var(--text-cream);
}

.screenshot-pill.active {
  background: var(--bg-primary);
  border-color: var(--accent);
  color: var(--text-cream);
  box-shadow: 0 0 12px rgba(15, 118, 110, 0.15);
}

.screenshot-pill .pill-idx {
  color: var(--accent);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.72rem;
}

.screenshot-pill .pill-label {
  font-weight: 600;
}

.screenshot-view-toggle {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all var(--duration-fast);
}

.screenshot-view-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 900px) {
  .case-grid {
    grid-template-columns: 1fr;
  }
  .sidebar-sticky {
    position: static;
  }
}

@media (max-width: 768px) {
  .case-study-nav {
    height: 56px;
  }

  .mobile-section-nav {
    display: block;
    top: 56px;
  }

  .case-hero {
    padding-top: 2rem;
    padding-bottom: 1.5rem;
  }

  .case-title {
    font-size: clamp(1.65rem, 6vw, 2.2rem);
    margin-bottom: 0.6rem;
    line-height: 1.15;
  }

  .case-tagline {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
    line-height: 1.45;
  }

  .case-metrics-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
  }

  .metric-card {
    padding: 0.65rem 0.45rem;
    text-align: center;
    border-radius: 8px;
    gap: 0.2rem;
  }

  .metric-val {
    font-size: 1.05rem;
  }

  .metric-label {
    font-size: 0.6rem;
  }

  .demo-cta-row {
    margin-top: 1.25rem;
  }

  .case-body-section {
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
  }

  .case-story {
    gap: 1.5rem;
  }

  .story-block {
    padding-bottom: 1.5rem;
  }

  .story-heading {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }

  .story-text {
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .pipeline-diagram {
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .pipeline-node {
    padding: 1rem 1.1rem;
  }

  .case-sidebar {
    margin-top: 0.5rem;
  }

  .sidebar-sticky {
    gap: 1.25rem;
  }

  .sidebar-block {
    padding: 1.15rem;
    border-radius: 12px;
  }

  .tech-details-list {
    gap: 0.6rem;
    padding-left: 0;
  }

  .tech-detail-item {
    padding: 0.65rem 0.8rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    border: 1px solid var(--border-subtle);
  }

  .tech-detail-name {
    font-size: 0.8rem;
    margin-bottom: 0.15rem;
  }

  .tech-detail-text {
    font-size: 0.74rem;
    line-height: 1.4;
  }

  .screenshots-section {
    padding-bottom: 2.5rem;
  }

  .screenshots-grid {
    gap: 1.25rem;
    margin-top: 1rem;
  }

  .screenshot-frame {
    max-height: 480px;
    border-radius: 12px;
  }

  .next-project-section {
    padding: 1.75rem 0;
  }
}

@media (max-width: 460px) {
  .next-project-container {
    flex-direction: column;
    gap: 10px;
  }
}
@media (max-width: 400px) {
  .case-metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
