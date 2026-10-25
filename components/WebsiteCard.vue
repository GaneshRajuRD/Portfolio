<template>
  <article class="website-card">
    <div class="card-media-wrapper">
      <img
        :src="website.image"
        :alt="`${website.name} screenshot`"
        :width="website.imageWidth || 1905"
        :height="website.imageHeight || 1841"
        loading="lazy"
        decoding="async"
        class="card-screenshot"
      />
      <div class="card-media-overlay"></div>
    </div>

    <div class="card-details">
      <div class="card-header">
        <h3 class="card-name">{{ website.name }}</h3>
        <span class="mono-label card-category">{{ website.tagline }}</span>
      </div>

      <p class="card-desc">{{ website.contribution }}</p>

      <div class="card-tech">
        <span
          v-for="tag in website.tech"
          :key="tag"
          class="tech-tag"
        >
          {{ tag }}
        </span>
      </div>

      <div class="card-actions">
        <a
          :href="website.url"
          target="_blank"
          rel="noopener noreferrer"
          class="visit-link interactive-link"
          :aria-label="`Visit ${website.name} (opens in new window)`"
        >
          <span>Visit site</span>
          <svg class="visit-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/>
            <polyline points="7 7 17 7 17 17"/>
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  website: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.website-card {
  height: 100%;
  flex: 1 1 auto;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
}

.website-card:hover {
  transform: translateY(-5px);
  border-color: rgba(24, 22, 20, 0.25);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.06);
}

.card-media-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: var(--bg-surface-elevated);
}

.card-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform var(--duration-base) var(--ease-out);
}

.website-card:hover .card-screenshot {
  transform: scale(1.05);
}

.card-media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 70%, rgba(24, 22, 20, 0.05) 100%);
  pointer-events: none;
}

.card-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header {
  margin-bottom: 0.75rem;
}

.card-name {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-cream);
  letter-spacing: -0.01em;
  margin-bottom: 0.25rem;
}

.card-category {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.card-desc {
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.card-actions {
  display: flex;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
}

.visit-link {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-cream);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.visit-arrow {
  transition: transform var(--duration-fast) var(--ease-out);
}

.website-card:hover .visit-arrow {
  transform: translate(2px, -2px);
}

@media (max-width: 640px) {
  .card-details {
    padding: 1.15rem 1rem;
  }
  .card-desc {
    margin-bottom: 1rem;
  }
  .card-tech {
    margin-bottom: 1.15rem;
  }
  .visit-link {
    padding: 0.35rem 0;
    min-height: 40px;
  }
}
</style>
