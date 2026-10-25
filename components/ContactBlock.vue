<template>
  <footer id="contact" class="contact-section" aria-label="Contact and Footer">
    <div class="container contact-container">
      <div class="section-label-group mono-label">
        <span class="label-num">05</span>
        <span class="label-text">Contact</span>
        <div class="section-line"></div>
      </div>

      <div class="contact-main">
        <TextSlide :delay="60">
          <h2 class="contact-title">Let's build something durable together.</h2>
        </TextSlide>

        <TextSlide :delay="140">
          <p class="contact-subtitle">
            Open to frontend engineering roles in Bangalore and Chennai, as well as high-impact remote healthcare platforms.
          </p>
        </TextSlide>

        <!-- Simple Minimalist Copy Email Pill -->
        <TextSlide :delay="220">
          <div class="email-pill-wrapper">
            <button
              type="button"
              class="email-pill"
              :class="{ 'is-copied': copied }"
              @click="copyEmail"
              :aria-label="copied ? 'Email address copied' : 'Copy email address'"
            >
              <span class="pill-mail-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>

              <span class="pill-email-text mono-label">{{ email }}</span>

              <span class="pill-action-tag mono-label" :class="{ 'tag-copied': copied }">
                <svg
                  v-if="copied"
                  class="tag-icon check"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <svg
                  v-else
                  class="tag-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
              </span>
            </button>
          </div>
        </TextSlide>

        <!-- Links Row -->
        <TextSlide :delay="300">
          <div class="contact-links">
            <div class="contact-btn-item">
              <a
                :href="`mailto:${email}`"
                class="btn btn-secondary"
                aria-label="Open email client"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Send Email
              </a>
            </div>

            <div class="contact-btn-item">
              <a
                :href="about.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
                aria-label="Visit LinkedIn profile (opens in new tab)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
            </div>

            <div class="contact-btn-item">
              <a
                :href="about.resumeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
                aria-label="Download resume PDF (opens in new tab)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </TextSlide>
      </div>

      <!-- Footer Sub-bar -->
      <TextSlide :delay="100">
        <div class="footer-bar">
          <div class="footer-left">
            <p class="mono-label">© {{ currentYear }} Ganesh Raju · Salem, Tamil Nadu</p>
          </div>
          <div class="footer-right">
            <p class="mono-label">Built with Nuxt 3</p>
          </div>
        </div>
      </TextSlide>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { about } from '~/data/about'

const email = about.email
const copied = ref(false)
const currentYear = new Date().getFullYear()

const copyEmail = async () => {
  try {
    if (navigator?.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = email
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2200)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}
</script>

<style scoped>
.contact-section {
  padding-top: clamp(4rem, 8vw, 7rem);
  padding-bottom: 1rem;
  background-color: var(--bg-surface);
  border-top: 1px solid var(--border-subtle);
  position: relative;
}

.contact-container {
  display: flex;
  flex-direction: column;
}

.contact-main {
  margin: 2rem 0 4rem;
}

.contact-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-cream);
  line-height: 1.1;
  max-width: 850px;
  margin-bottom: 1.25rem;
  will-change: transform, opacity;
}

.contact-subtitle {
  font-size: var(--text-base);
  color: var(--text-muted);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 2.25rem;
  will-change: transform, opacity;
}

/* Simple Minimalist Copy Email Pill */
.email-pill-wrapper {
  margin-bottom: 2.25rem;
  will-change: transform, opacity;
}

.email-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.5rem 0.65rem 0.5rem 1.15rem;
  background-color: var(--bg-surface-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  color: var(--text-main);
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(17, 34, 32, 0.03);
  transition: transform var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
  max-width: 100%;
}

.email-pill:hover {
  border-color: var(--accent);
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(15, 118, 110, 0.1);
}

.email-pill:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.email-pill.is-copied {
  border-color: #10b981;
  background-color: #f0fdf4;
}

.pill-mail-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.pill-email-text {
  font-size: clamp(0.8rem, 2vw, 1.05rem);
  font-weight: 600;
  color: var(--text-main);
  letter-spacing: -0.01em;
  user-select: all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.pill-action-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 999px;
  background-color: #ffffff;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  transition: all var(--duration-fast) var(--ease-out);
  flex-shrink: 0;
}

.email-pill:hover .pill-action-tag {
  background-color: var(--accent-light);
  border-color: rgba(15, 118, 110, 0.3);
  color: var(--accent);
}

.pill-action-tag.tag-copied {
  background-color: #d1fae5;
  border-color: #10b981;
  color: #065f46;
}

.tag-icon {
  display: inline-block;
  line-height: 1;
}

.tag-icon.check {
  color: #059669;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.contact-btn-item {
  display: inline-flex;
  will-change: transform, opacity;
}

.footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
  gap: 1rem;
  will-change: transform, opacity;
}

@media (max-width: 640px) {
  .email-pill {
    padding: 0.45rem 0.6rem 0.45rem 0.85rem;
    gap: 0.5rem;
    max-width: 100%;
  }
  .pill-email-text {
    font-size: 0.8rem;
  }
  .pill-action-tag {
    padding: 0.3rem 0.6rem;
    font-size: 0.72rem;
  }
  .contact-links {
    flex-direction: column;
    align-items: stretch;
  }
  .contact-btn-item {
    width: 100%;
  }
  .contact-btn-item .btn {
    width: 100%;
  }
  .footer-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
