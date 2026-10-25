<template>
  <header
    ref="navRef"
    class="site-nav"
    :class="{
      'nav-hidden': isHidden && !mobileMenuOpen,
      'nav-scrolled': isScrolled
    }"
  >
    <div class="container nav-container">
      <!-- Logo / Name -->
      <NuxtLink to="/" class="nav-logo" @click="closeMobileMenu">
        <span class="logo-name">Ganesh Raju</span>
        <span class="logo-role mono-label">Frontend Dev</span>
      </NuxtLink>

      <!-- Desktop Links -->
      <nav class="desktop-nav" aria-label="Main Navigation">
        <ul class="nav-links">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="nav-link interactive-link"
              :class="{ 'is-active': activeSection === item.id }"
              @click="handleNavClick($event, item.href)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <a
          href="/Ganesh_Raju_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary resume-btn"
          aria-label="Download resume PDF (opens in new tab)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Resume
        </a>
      </nav>

      <!-- Mobile Hamburger Toggle -->
      <button
        class="hamburger-btn"
        :class="{ 'is-active': mobileMenuOpen }"
        aria-label="Toggle mobile menu"
        :aria-expanded="mobileMenuOpen"
        @click="toggleMobileMenu"
      >
        <span class="hamburger-bar top"></span>
        <span class="hamburger-bar middle"></span>
        <span class="hamburger-bar bottom"></span>
      </button>
    </div>

    <!-- Scroll Progress Indicator -->
    <div class="scroll-progress-track">
      <div class="scroll-progress-bar" :style="{ transform: `scaleX(${scrollProgress})` }"></div>
    </div>

    <!-- Mobile Drawer Overlay & Content (Teleported to body) -->
    <Teleport to="body">
      <div
        v-if="mobileMenuOpen"
        class="mobile-backdrop"
        @click="closeMobileMenu"
      ></div>

      <Transition name="drawer">
        <div v-if="mobileMenuOpen" class="mobile-drawer" role="dialog" aria-modal="true">
          <div class="mobile-drawer-header">
            <span class="mono-label">Navigation</span>
            <button class="mobile-close-btn" @click="closeMobileMenu" aria-label="Close menu">✕</button>
          </div>

          <ul class="mobile-links">
            <li
              v-for="(item, index) in navItems"
              :key="item.href"
            >
              <a
                :href="item.href"
                class="mobile-nav-link"
                :class="{ 'is-active': activeSection === item.id }"
                @click="handleNavClick($event, item.href)"
              >
                <span class="mobile-nav-index mono-label">{{ item.num }}</span>
                <span class="mobile-nav-text">{{ item.label }}</span>
              </a>
            </li>
          </ul>

          <div class="mobile-drawer-footer">
            <a
              href="/Ganesh_Raju_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary btn-block"
              @click="closeMobileMenu"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume (PDF)
            </a>
            <p class="mono-label mobile-location">Salem, TN · Open to Bangalore / Chennai</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navItems = [
  { num: '02', label: 'Projects', href: '#work', id: 'work' },
  { num: '03', label: 'Websites', href: '#websites', id: 'websites' },
  { num: '04', label: 'About', href: '#about', id: 'about' },
  { num: '05', label: 'Contact', href: '#contact', id: 'contact' }
]

const navRef = ref(null)
const isHidden = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)
const activeSection = ref('')
const mobileMenuOpen = ref(false)

let lastScrollY = 0

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    isHidden.value = false
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  } else {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const handleNavClick = (event, href) => {
  closeMobileMenu()
  if (href.startsWith('#')) {
    event.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const onScroll = () => {
  if (mobileMenuOpen.value) {
    isHidden.value = false
    return
  }

  const currentScrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight

  scrollProgress.value = maxScroll > 0 ? Math.min(1, Math.max(0, currentScrollY / maxScroll)) : 0
  isScrolled.value = currentScrollY > 30

  const scrollDelta = currentScrollY - lastScrollY

  // Hide on scroll down, reveal on scroll up
  if (Math.abs(scrollDelta) > 6) {
    if (currentScrollY > 100 && scrollDelta > 0) {
      isHidden.value = true
    } else if (scrollDelta < 0) {
      isHidden.value = false
    }
  }

  // Always show navbar near top of page
  if (currentScrollY <= 60) {
    isHidden.value = false
  }

  lastScrollY = currentScrollY

  const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean)
  const scrollPos = currentScrollY + 200

  for (let i = sections.length - 1; i >= 0; i--) {
    const el = sections[i]
    if (el && el.offsetTop <= scrollPos) {
      activeSection.value = el.id
      return
    }
  }
  activeSection.value = ''
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
              background-color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
  background-color: transparent;
  border-bottom: 1px solid transparent;
  will-change: transform;
}

.site-nav.nav-hidden {
  transform: translateY(-100%);
}

.nav-scrolled {
  background-color: rgba(237, 245, 244, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--border-subtle);
  box-shadow: 0 4px 20px rgba(17, 34, 32, 0.04);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav-logo {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.logo-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.logo-role {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2.25rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  list-style: none;
}

.nav-link {
  font-size: var(--text-sm);
  color: var(--text-muted);
  font-weight: 500;
  transition: color var(--duration-fast) var(--ease-out);
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--text-main);
}

.resume-btn {
  padding: 0.55rem 1.15rem;
  font-size: 0.8125rem;
}

/* Scroll progress */
.scroll-progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: transparent;
}

.scroll-progress-bar {
  height: 100%;
  background-color: var(--text-main);
  transform-origin: left center;
  transition: transform 0.05s linear;
}

/* Hamburger */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-right: -8px;
  z-index: 1002;
  border-radius: 8px;
}

.hamburger-bar {
  width: 22px;
  height: 2px;
  background-color: var(--text-main);
  border-radius: 2px;
  transition: transform var(--duration-fast) var(--ease-out),
              opacity var(--duration-fast) var(--ease-out);
}

.hamburger-btn.is-active .top {
  transform: translateY(7px) rotate(45deg);
}

.hamburger-btn.is-active .middle {
  opacity: 0;
}

.hamburger-btn.is-active .bottom {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Drawer */
.mobile-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(17, 34, 32, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 99998;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(340px, 85vw);
  height: 100vh;
  height: 100dvh;
  max-height: -webkit-fill-available;
  background-color: var(--bg-surface);
  border-left: 1px solid var(--border-subtle);
  padding: calc(1.5rem + env(safe-area-inset-top, 0px)) 1.5rem calc(1.5rem + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 99999;
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.15);
}

.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.25rem;
  cursor: pointer;
}

.mobile-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 3rem 0;
}

.mobile-nav-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-main);
  transition: color var(--duration-fast) var(--ease-out);
}

.mobile-nav-link.is-active,
.mobile-nav-link:hover {
  color: var(--accent);
}

.mobile-nav-index {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.btn-block {
  width: 100%;
}

.mobile-location {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.75rem;
}

/* Drawer Transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform var(--duration-base) var(--ease-out);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

@media (max-width: 991px) {
  .site-nav {
    height: 64px;
  }
  .site-nav.nav-scrolled {
    background-color: rgba(237, 245, 244, 0.96);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-subtle);
    box-shadow: 0 2px 14px rgba(17, 34, 32, 0.06);
  }
  .desktop-nav {
    display: none;
  }
  .hamburger-btn {
    display: flex;
  }
}
</style>
