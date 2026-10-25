<template>
  <div class="work-list">
    <article
      v-for="(project, index) in projects"
      :key="project.slug"
      class="work-card"
    >
      <div class="work-card-header">
        <span class="mono-label card-index">0{{ index + 1 }}</span>
        <span class="mono-label card-period">{{ project.company }} · {{ project.period }}</span>
      </div>

      <div class="work-card-body">
        <h3 class="card-title">{{ project.title }}</h3>
        <p class="card-tagline">{{ project.tagline }}</p>
        <p class="card-outcome">{{ project.oneLiner }}</p>

        <div class="card-tech-list">
          <span
            v-for="tag in project.tech"
            :key="tag"
            class="tech-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="work-card-footer">
        <NuxtLink :to="`/work/${project.slug}`" class="btn btn-secondary card-link" aria-label="View Case Study">
          <span>View Case Study</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<script setup>
import { projects } from '~/data/projects'
</script>

<style scoped>
.work-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.work-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: clamp(1.75rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  transition: transform var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.work-card:hover {
  transform: translateY(-4px);
  border-color: rgba(24, 22, 20, 0.25);
  background-color: var(--bg-surface-elevated);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
}

.work-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 1rem;
}

.card-index {
  color: var(--text-cream);
  font-weight: 700;
  font-size: 0.875rem;
}

.card-period {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-cream);
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.card-tagline {
  font-size: var(--text-base);
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.card-outcome {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 750px;
}

.card-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.work-card-footer {
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
}

.card-link {
  font-size: var(--text-xs);
  padding: 0.6rem 1.25rem;
}

.card-link svg {
  transition: transform var(--duration-fast) var(--ease-out);
}

.card-link:hover svg {
  transform: translateX(4px);
}
</style>
