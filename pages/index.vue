<template>
  <div class="portfolio-page">
    <!-- Fixed Navigation Bar -->
    <TheNav />

    <main id="main-content">
      <!-- 1. Hero Section -->
      <HeroTitle />

      <!-- 2. Statement Section (Word Scrub Pin) -->
      <StatementText />

      <!-- 3. Selected Work (Three.js Depth Gallery or Fallback List) -->
      <WorkGallery />

      <!-- 4. Websites I've Built Section -->
      <section id="websites" ref="websitesSectionRef" class="websites-section" aria-label="Websites I've Built">
        <div class="container">
          <div class="section-label-group mono-label">
            <span class="label-num">03</span>
            <span class="label-text">Websites I've Built</span>
            <div class="section-line"></div>
          </div>

          <TextSlide :delay="60">
            <div class="section-intro">
              <h2 class="section-title">Production Healthcare Platforms</h2>
              <p class="section-subtitle">
                High-performance, SSR-driven websites built for hospitals, clinics, and health-tech enterprises using Nuxt 3, Vue 3, and Strapi CMS.
              </p>
            </div>
          </TextSlide>

          <!-- Websites Cards Grid -->
          <div class="websites-grid">
            <TextSlide
              v-for="(site, idx) in visibleWebsites"
              :key="site.id"
              :delay="(idx % 3) * 55"
              class="h-100"
            >
              <WebsiteCard :website="site" />
            </TextSlide>
          </div>

          <!-- Show More Button -->
          <div v-if="websites.length > 6" class="show-more-wrapper">
            <button class="btn btn-secondary" @click="showAllWebsites = !showAllWebsites">
              {{ showAllWebsites ? 'Show fewer websites' : `Show all websites (${websites.length})` }}
            </button>
          </div>
        </div>
      </section>

      <!-- 5. About Section -->
      <section id="about" ref="aboutSectionRef" class="about-section" aria-label="About Ganesh Raju">
        <div class="container">
          <div class="section-label-group mono-label">
            <span class="label-num">04</span>
            <span class="label-text">About</span>
            <div class="section-line"></div>
          </div>

          <div class="about-grid">
            <!-- Left: Interactive Developer Profile Terminal (Replaced headshot photo) -->
            <div class="about-media-col">
              <TextSlide :delay="80">
                <div class="terminal-card">
                  <!-- Terminal Header -->
                  <div class="terminal-header">
                    <div class="traffic-lights">
                      <span class="dot red"></span>
                      <span class="dot yellow"></span>
                      <span class="dot green"></span>
                    </div>
                    <span class="terminal-title mono-label">developer.profile.ts</span>
                    <span class="terminal-lang mono-label">TypeScript</span>
                  </div>

                  <!-- Terminal Code Canvas -->
                  <div class="terminal-body mono-label">
                    <div class="code-line"><span class="c-keyword">export const</span> <span class="c-const">developer</span>: <span class="c-type">FrontendArchitect</span> = {</div>
                    <div class="code-line indent-1"><span class="c-key">name</span>: <span class="c-str">'Ganesh Raju'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">role</span>: <span class="c-str">'Frontend Developer'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">experience</span>: <span class="c-str">'3+ Years Production'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">specialization</span>: <span class="c-str">'Vue 3 · Nuxt 3 SSR'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">domain</span>: <span class="c-str">'Healthcare Web Platforms'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">productionSites</span>: <span class="c-num">15</span>, <span class="c-comment">// Live client portals</span></div>
                    <div class="code-line indent-1"><span class="c-key">legacyMigrated</span>: <span class="c-str">'5+ PHP to Nuxt 3'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">ciCdFlow</span>: <span class="c-str">'Azure DevOps + PM2'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">routing</span>: <span class="c-str">'Seamless Flow'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">status</span>: <span class="c-str">'Open to Relocate'</span>,</div>
                    <div class="code-line indent-1"><span class="c-key">hubs</span>: [<span class="c-str">'Bengaluru'</span>, <span class="c-str">'Chennai'</span>]</div>
                    <div class="code-line">}</div>
                  </div>

                  <!-- Terminal Status Footer -->
                  <div class="terminal-footer">
                    <div class="terminal-status">
                      <span class="status-pulse"></span>
                      <span class="mono-label">Active · Open for Frontend Roles</span>
                    </div>
                    <a :href="about.resumeUrl" target="_blank" rel="noopener noreferrer" class="terminal-resume-btn mono-label">
                      <span>Resume ↗</span>
                    </a>
                  </div>
                </div>
              </TextSlide>
            </div>

            <!-- Right: Bio Content & 4 Engineering Pillars -->
            <div class="about-text-col">
              <TextSlide :delay="100">
                <h2 class="about-heading">{{ about.aboutHeadline || 'Clean components, fast pages, and releases that go out smoothly.' }}</h2>
              </TextSlide>
              
              <div class="about-bio-paragraphs">
                <TextSlide
                  v-for="(p, idx) in about.bio"
                  :key="idx"
                  :delay="140 + idx * 70"
                >
                  <p class="bio-paragraph">
                    {{ p }}
                  </p>
                </TextSlide>
              </div>

              <!-- 4 Engineering Pillars Grid -->
              <div class="engineering-pillars-grid">
                <div class="pillar-card">
                  <div class="pillar-icon">⚡</div>
                  <h4 class="pillar-title">SSR &amp; Core Web Vitals</h4>
                  <p class="pillar-desc">Sub-second First Contentful Paint, optimized hydration chunks, and 95+ Lighthouse scores for mission-critical portals.</p>
                </div>
                <div class="pillar-card">
                  <div class="pillar-icon">🧩</div>
                  <h4 class="pillar-title">Vue 3 Architecture</h4>
                  <p class="pillar-desc">Modular Composition API architecture, typed composables, Pinia stores, and reusable component design systems.</p>
                </div>
                <div class="pillar-card">
                  <div class="pillar-icon">🛡️</div>
                  <h4 class="pillar-title">Zero-Downtime Delivery</h4>
                  <p class="pillar-desc">Self-hosted Windows agents, PM2 zero-lock deploys, automated multi-tier backups, and sub-14s rollback safety.</p>
                </div>
                <div class="pillar-card">
                  <div class="pillar-icon">🔍</div>
                  <h4 class="pillar-title">Technical SEO &amp; CMS</h4>
                  <p class="pillar-desc">Server-side metadata, dynamic OpenGraph schemas, and Strapi CMS API synchronization that preserve search rank.</p>
                </div>
              </div>

              <!-- Skills Overview Grid -->
              <div class="skills-breakdown">
                <TextSlide :delay="160">
                  <h3 class="skills-title mono-label">Technical Competencies</h3>
                </TextSlide>
                <div class="skills-categories-grid">
                  <TextSlide
                    v-for="(cat, cIdx) in about.skillCategories"
                    :key="cat.category"
                    :delay="200 + cIdx * 70"
                  >
                    <div class="skill-group">
                      <span class="skill-category-name mono-label">{{ cat.category }}</span>
                      <div class="skill-items">
                        <span v-for="skill in cat.items" :key="skill" class="tech-tag">
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                  </TextSlide>
                </div>
              </div>
            </div>
          </div>

          <!-- Fact Cards Row -->
          <div class="fact-cards-row">
            <TextSlide
              v-for="(fact, idx) in about.facts"
              :key="idx"
              :delay="idx * 60"
              class="h-100"
            >
              <FactCard :fact="fact" />
            </TextSlide>
          </div>
        </div>
      </section>

      <!-- 6. Contact & Footer -->
      <ContactBlock />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { websites } from '~/data/websites'
import { about } from '~/data/about'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const showAllWebsites = ref(false)

const visibleWebsites = computed(() => {
  return showAllWebsites.value ? websites : websites.slice(0, 6)
})

const websitesSectionRef = ref(null)
const aboutSectionRef = ref(null)

useHead({
  link: [
    { rel: 'canonical', href: 'https://ganeshraju.dev/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://ganeshraju.dev/#person',
            name: 'Ganesh Raju',
            jobTitle: 'Frontend Developer',
            description: 'Frontend Developer specializing in Vue 3, Nuxt 3 SSR, and production healthcare web platforms.',
            url: 'https://ganeshraju.dev',
            sameAs: [
              'https://linkedin.com/in/ganesh-raju'
            ],
            knowsAbout: [
              'Vue 3',
              'Nuxt 3',
              'JavaScript (ES6+)',
              'TypeScript',
              'Server-Side Rendering (SSR)',
              'Technical SEO',
              'Core Web Vitals',
              'Azure DevOps',
              'CI/CD Release Pipelines',
              'Healthcare Web Platforms'
            ],
            worksFor: {
              '@type': 'Organization',
              name: 'Mocero Health Solutions'
            },
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'Knowledge Institute of Technology'
            }
          },
          {
            '@type': 'WebSite',
            '@id': 'https://ganeshraju.dev/#website',
            url: 'https://ganeshraju.dev/',
            name: 'Ganesh Raju | Frontend Developer Portfolio',
            description: 'High-performance healthcare web platforms, Vue 3, Nuxt 3 SSR, and Azure DevOps CI/CD architectures.',
            publisher: {
              '@id': 'https://ganeshraju.dev/#person'
            },
            inLanguage: 'en-US'
          }
        ]
      })
    }
  ]
})

useSeoMeta({
  title: 'Ganesh Raju | Frontend Developer (Vue 3 / Nuxt 3)',
  description: 'Frontend Developer with 3+ years experience building production healthcare web platforms with Vue 3, Nuxt 3, SSR, and Azure DevOps CI/CD.',
  ogTitle: 'Ganesh Raju | Frontend Developer (Vue 3 / Nuxt 3)',
  ogDescription: 'Frontend Developer specializing in Vue 3, Nuxt 3 SSR, and production healthcare web platforms.',
  ogUrl: 'https://ganeshraju.dev/',
  ogImage: 'https://ganeshraju.dev/og-image.png',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://ganeshraju.dev/og-image.png'
})

let ctx = null

onMounted(() => {
  if (process.client) {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isReduced) {
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Section line reveal on scroll
        const sectionHeaders = document.querySelectorAll('.section-label-group')
        sectionHeaders.forEach(header => {
          const line = header.querySelector('.section-line')
          const text = header.querySelector('.label-text')
          if (line && text) {
            gsap.from(line, {
              scaleX: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                once: true
              }
            })
            gsap.from(text, {
              opacity: 0,
              x: -10,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                once: true
              }
            })
          }
        })
      })
    }
  }
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.portfolio-page {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-cream);
}

/* Websites Section */
.websites-section {
  padding-top: clamp(4rem, 8vw, 7rem);
  padding-bottom: clamp(4rem, 8vw, 7rem);
  border-bottom: 1px solid var(--border-subtle);
  background-color: var(--bg-primary);
}

.section-intro {
  margin-bottom: 3.5rem;
  max-width: 780px;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-cream);
  margin-bottom: 0.75rem;
}

.section-subtitle {
  font-size: var(--text-base);
  color: var(--text-muted);
  line-height: 1.6;
}

.websites-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.show-more-wrapper {
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
}

/* About Section */
.about-section {
  padding-top: clamp(4rem, 8vw, 7rem);
  padding-bottom: clamp(4rem, 8vw, 7rem);
  border-bottom: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
}

.about-grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  align-items: flex-start;
  margin-bottom: 4rem;
}

/* Terminal Card (Replaced headshot photo) */
.terminal-card {
  background-color: #07191b;
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: transform var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
  will-change: transform, opacity;
}

.terminal-card:hover {
  transform: translateY(-4px);
  border-color: rgba(20, 184, 166, 0.5);
  box-shadow: 0 20px 48px rgba(20, 184, 166, 0.08);
}

.terminal-header {
  background-color: #0a2325;
  border-bottom: 1px solid rgba(20, 184, 166, 0.15);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.terminal-title {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

.terminal-lang {
  font-size: 0.65rem;
  background: rgba(20, 184, 166, 0.15);
  color: #5eead4;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
}

.terminal-body {
  padding: 1.25rem 1.25rem 1.5rem;
  font-size: 0.76rem;
  line-height: 1.7;
  background-color: #061517;
  overflow-x: auto;
}

.code-line {
  white-space: pre-wrap;
  word-break: break-all;
}

.indent-1 {
  padding-left: 1.25rem;
}

.indent-2 {
  padding-left: 2.25rem;
}

.c-keyword { color: #c084fc; font-weight: 700; }
.c-const { color: #38bdf8; font-weight: 700; }
.c-type { color: #5eead4; font-weight: 600; }
.c-key { color: #cbd5e1; }
.c-str { color: #a7f3d0; }
.c-num { color: #fcd34d; font-weight: 700; }
.c-bool { color: #fb7185; font-weight: 700; }
.c-comment { color: #64748b; font-style: italic; }

.terminal-footer {
  background-color: #092022;
  border-top: 1px solid rgba(20, 184, 166, 0.15);
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.terminal-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: #94a3b8;
}

.terminal-resume-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  background: rgba(20, 184, 166, 0.15);
  border: 1px solid rgba(20, 184, 166, 0.3);
  color: #5eead4;
  font-size: 0.7rem;
  font-weight: 700;
  text-decoration: none;
  transition: all var(--duration-fast);
}

.terminal-resume-btn:hover {
  background: var(--accent);
  color: #042f2e;
  border-color: var(--accent);
}

.status-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #55c57a;
  box-shadow: 0 0 8px rgba(85, 197, 122, 0.6);
}

.about-heading {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-cream);
  line-height: 1.2;
  margin-bottom: 1.75rem;
  will-change: transform, opacity;
}

.about-bio-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.bio-paragraph {
  font-size: var(--text-base);
  color: var(--text-muted);
  line-height: 1.7;
  will-change: transform, opacity;
}

/* 4 Engineering Pillars Grid */
.engineering-pillars-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2.25rem;
}

.pillar-card {
  background: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.15rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: all var(--duration-fast) var(--ease-out);
}

.pillar-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 118, 110, 0.08);
}

.pillar-icon {
  font-size: 1.35rem;
  margin-bottom: 0.15rem;
}

.pillar-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-cream);
  letter-spacing: -0.01em;
}

.pillar-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.skills-breakdown {
  border-top: 1px solid var(--border-subtle);
  padding-top: 2rem;
}

.skills-title {
  color: var(--text-cream);
  font-size: 0.75rem;
  margin-bottom: 1.25rem;
  display: block;
  will-change: transform, opacity;
}

.skills-categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  will-change: transform, opacity;
}

.skill-category-name {
  font-size: 0.7rem;
  color: var(--accent);
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

/* Fact Cards Row */
.fact-cards-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  align-items: stretch;
}

@media (max-width: 1080px) {
  .websites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .about-grid {
    grid-template-columns: 1fr;
  }
  .fact-cards-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .websites-section,
  .about-section {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }
  .section-intro {
    margin-bottom: 2rem;
  }
  .websites-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  .show-more-wrapper {
    margin-top: 2.25rem;
  }
  .about-grid {
    gap: 2rem;
    margin-bottom: 2.5rem;
  }
  .terminal-body {
    padding: 1rem 0.85rem;
    font-size: 0.72rem;
  }
  .engineering-pillars-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .fact-cards-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  .skills-categories-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

@media (max-width: 380px) {
  .fact-cards-row {
    grid-template-columns: 1fr;
  }
}
</style>
