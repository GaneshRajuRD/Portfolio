// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Ganesh Raju | Frontend Developer (Vue 3 / Nuxt 3)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Frontend Developer with 3+ years experience building production healthcare web platforms with Vue 3, Nuxt 3, SSR, and Azure DevOps CI/CD.'
        },
        { name: 'author', content: 'Ganesh Raju' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#edf5f4' },
        // Open Graph
        { property: 'og:site_name', content: 'Ganesh Raju | Frontend Developer' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ganeshraju.dev' },
        { property: 'og:title', content: 'Ganesh Raju | Frontend Developer (Vue 3 / Nuxt 3)' },
        {
          property: 'og:description',
          content: 'Frontend Developer specializing in Vue 3, Nuxt 3 SSR, and production healthcare web platforms.'
        },
        { property: 'og:image', content: 'https://ganeshraju.dev/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Ganesh Raju - Frontend Developer Portfolio' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ganesh Raju | Frontend Developer (Vue 3 / Nuxt 3)' },
        {
          name: 'twitter:description',
          content: 'Frontend Developer with 3+ years experience building production healthcare web platforms with Vue 3, Nuxt 3, SSR, and Azure DevOps CI/CD.'
        },
        { name: 'twitter:image', content: 'https://ganeshraju.dev/og-image.png' },
        { name: 'twitter:image:alt', content: 'Ganesh Raju - Frontend Developer Portfolio' }
      ],
      link: [
        { rel: 'canonical', href: 'https://ganeshraju.dev' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'lenis/dist/lenis.css',
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxt/image',
    '@nuxt/fonts'
  ],

  image: {
    format: ['webp']
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('three')) {
              return 'three-vendor'
            }
            if (id.includes('gsap')) {
              return 'gsap-vendor'
            }
          }
        }
      }
    }
  },

  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Space Mono', provider: 'google', weights: [400, 700] }
    ]
  },

  components: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/work/queue-management',
        '/work/cicd-pipeline',
        '/work/ai-chatbot'
      ]
    }
  },

  compatibilityDate: '2025-02-04'
})
