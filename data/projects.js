// Editable Case Studies Data
// Source of truth: Resume & verified CI/CD implementation documentation
export const projects = [
  {
    slug: 'queue-management',
    title: 'Queue Management System',
    company: 'Mocero Health Solutions',
    period: 'Feb 2026 – Jul 2026',
    category: 'HEALTHCARE OPERATIONS',
    mockupUrl: 'https://mocero.health/queue-management/dashboard',
    previewBadges: ['⚡ Live SLA Monitor', '🏥 Multi-Counter Workstations', '✨ Seamless Patient Flow'],
    tagline: 'Healthcare queue tracking, seamless patient flow routing & live counter orchestration',
    oneLiner: 'Real-time patient flow system coordinating seamless queue routing across outpatient service counters.',
    tech: ['Vue 3', 'Nuxt 3', 'JavaScript', 'REST APIs', 'SSR', 'Responsive UI'],
    demoUrl: null,
    metrics: [
      { label: 'Flow States', value: '6 States' },
      { label: 'Patient Routing', value: 'Seamless Flow' },
      { label: 'Counter SLA', value: '< 15 Min' }
    ],
    problem: 'Healthcare outpatient departments faced serious bottlenecks with patient registration, unpredictable wait times, and poor communication between reception desks, consultation rooms, and pharmacies. The previous workflow lacked real-time visibility across counters, leading to overcrowding and delayed patient consultations.',
    whatIBuilt: 'Architected and built a production healthcare queue management system covering the full patient lifecycle: instant token generation, dynamic counter routing, and responsive monitor displays. Implemented state-based workflows handling waiting, called, in-service, completed, cancelled, and no-show states. Developed real-time counter dashboards with low-latency status updates and patient queue notifications.',
    myRole: 'Led the frontend design and implementation in Vue 3 and Nuxt 3. Designed modular component hierarchy for patient kiosks, counter operator screens, and public display boards. Integrated backend REST APIs for token state transitions and optimized real-time queue monitoring.',
    techDetails: [
      { name: 'Vue 3 & Nuxt 3', detail: 'Component-based reactive UI using Composition API and script setup for fast counter interactions.' },
      { name: 'State-Based Workflows', detail: 'Strict state machines handling waiting, called, in-service, completed, cancelled, and no-show token states.' },
      { name: 'REST API Integration', detail: 'Clean asynchronous data fetching and token lifecycle synchronization.' },
      { name: 'Responsive Layouts', detail: 'Tailored views optimized for handheld tablets, desktop operator terminals, and large public display monitors.' }
    ],
    screenshots: [
      {
        src: '/assets/images/queue/queue_dashboard.webp',
        alt: 'Queue Management operator dashboard interface',
        caption: 'Operator counter interface with active queue list and quick-action state controls.'
      },
      {
        src: '/assets/images/queue/token_display.webp',
        alt: 'Queue public token display board',
        caption: 'Public-facing token announcement screen with multi-counter status indicators.'
      }
    ],
    improvements: 'Plan to integrate WebSockets for bidirectional event pushing to further reduce polling overhead, and add offline fallback queue storage for intermittent clinic network disconnects.'
  },
  {
    slug: 'cicd-pipeline',
    title: 'Azure DevOps CI/CD & PM2 Pipeline',
    company: 'Mocero Health Solutions',
    period: 'June 2023 – July 2026',
    category: 'DEVOPS & CLOUD ARCHITECTURE',
    mockupUrl: 'https://dev.azure.com/mocero-one/pipelines/release',
    previewBadges: ['🛡️ Zero Windows DLL Lock', '⚡ < 14s Auto-Rollback', '📦 90-Day Smart Backup'],
    tagline: 'Multi-site automated deployment with commit tags, smart backup & zero-downtime rollback',
    oneLiner: 'Designed multi-site Azure DevOps release pipelines with commit-driven targets, automated backup, and PM2 process orchestration.',
    tech: ['Azure DevOps', 'YAML Pipelines', 'Self-Hosted Agent', 'PM2', 'PowerShell', 'Windows Server', 'Nuxt 3 SSR'],
    demoUrl: null,
    metrics: [
      { label: 'Deployment', value: '100% Automated' },
      { label: 'Rollback Speed', value: '< 14 Seconds' },
      { label: 'Retention', value: '90-Day Backups' }
    ],
    problem: 'Deploying multiple production healthcare websites (Movewell, SUT Hospital, Uniscans) previously required manual FTP/SSH uploads, manual Windows service restarts, and risky in-place file overwrites. This led to occasional Windows DLL file locks during file replacement, inconsistent Node runtime versions between sites, lack of automated rollbacks, and potential hospital website downtime during critical operating hours.',
    whatIBuilt: 'Architected and built an end-to-end automated multi-site CI/CD deployment system using Azure DevOps YAML pipelines and a self-hosted Windows agent. Integrated commit-message based target routing (#test, #live, #both, #rollback), NodeTool@0 version isolation (Node 18 vs Node 20), an automated smart backup engine archiving builds to F:\\WebsiteBackUp with 90-day auto-pruning, graceful PM2 process stop to eliminate file locks, robocopy sync for .output/public and server artifacts, and instantaneous single-command rollback.',
    myRole: 'Authored pipeline YAML definitions, configured the self-hosted Windows agent service (C:\\azagent-website), implemented PowerShell deployment scripts, set up PM2 ecosystem configurations, resolved DLL locking issues, and conducted KT documentation for the infrastructure and engineering teams.',
    pipelineSteps: [
      { step: '1', title: 'Git Push & Commit Tag Parsing', desc: 'Developer pushes to site branch (e.g., movewell-website). Pipeline parses commit tags (#test, #live, #both, #rollback) to determine destination.' },
      { step: '2', title: 'Node Version Control (NodeTool@0)', desc: 'Dynamically installs Node 20.x or 18.x per pipeline without affecting server-wide global Node configurations.' },
      { step: '3', title: 'Nuxt 3 SSR Build & Test', desc: 'Runs clean npm install, compiles Nuxt 3 SSR production bundles, and validates build output artifacts.' },
      { step: '4', title: 'Smart Pre-Deployment Backup', desc: 'Archives current public and server directories to F:\\WebsiteBackUp\\MONTH-YYYY\\ddMMyy\\ with 90-day retention pruning.' },
      { step: '5', title: 'Graceful PM2 Stop & Sync', desc: 'Gracefully stops PM2 process to release Windows file locks, robocopies updated artifacts, and restores ecosystem config.' },
      { step: '6', title: 'PM2 Startup & Health Check', desc: 'Restarts PM2 cluster with saved config, executes HTTP health check, and triggers auto-rollback if health check fails.' }
    ],
    techDetails: [
      { name: 'Commit-Tag Deployment Control', detail: 'Syntax support for #test, #live, #both, and timestamped rollbacks (#rollback:ddMMyy_HH-mm) directly from git commit messages.' },
      { name: 'Smart Backup Engine', detail: 'Automated zip archiving of working builds to F:\\WebsiteBackUp with daily deduplication and 90-day cleanup.' },
      { name: 'Zero-Lock PM2 Orchestration', detail: 'Eliminated Windows process DLL lock contention during deployment via graceful service stop and cluster reloads.' },
      { name: 'Self-Hosted Agent Infrastructure', detail: 'Configured Windows service agent in C:\\azagent-website with dedicated PAT token permissions and agent pool routing.' }
    ],
    screenshots: [
      {
        src: '/assets/images/cicd/pipeline_flow.webp',
        alt: 'Azure DevOps CI/CD deployment pipeline architecture',
        caption: 'Multi-stage release pipeline with commit tag parsing, smart backup, and PM2 zero-downtime deployment.'
      }
    ],
    improvements: 'Add Slack/Teams webhook notifications for deployment success/failure alerts, and introduce automated Lighthouse performance gates.'
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot Widget',
    company: 'Healthcare Platform Integration',
    period: '2025',
    category: 'VUE 3 INTERFACE & LLM STREAMING',
    mockupUrl: 'https://uniscans.health/portal/assistant',
    previewBadges: ['💬 AbortController Stream', '🧠 LocalStorage Thread Memory'],
    tagline: 'Lightweight Vue 3 popup widget with thread memory, typewriter streaming & request abort',
    oneLiner: 'Responsive Vue 3 AI chat widget with streaming effect, thread persistence, and request cancellation.',
    tech: ['Vue 3', 'REST APIs', 'AbortController', 'LocalStorage', 'CSS3', 'Markdown'],
    demoUrl: null,
    metrics: [
      { label: 'Component', value: 'Vue 3 Widget' },
      { label: 'Streaming UX', value: 'Dynamic Typewriter' },
      { label: 'Memory', value: 'Thread-based' }
    ],
    problem: 'Healthcare visitors needed immediate answers to common appointment inquiries and clinic procedures without navigating complex navigation menus. Existing third-party chat widgets were heavy (>500KB JS), lacked theme coherence, and did not support seamless request cancellation when users changed their query mid-response.',
    whatIBuilt: 'Engineered a lightweight, standalone Vue 3 conversational assistant popup widget. Built with responsive modal layout, dark/light theme support, persistent thread-based conversation memory via localStorage, and a client-side server endpoint integration (/api/chat). Featured simulated streaming typewriter text output with variable speeds, AbortController cancellation for in-flight requests, and lightweight markdown parsing for code and rich responses.',
    myRole: 'Designed and built the complete Vue 3 widget component, state management for message threads, abort lifecycle, and typewriter streaming effect.',
    techDetails: [
      { name: 'Vue 3 Popup Architecture', detail: 'Floating toggle widget with responsive width constraint, auto-scrolling, and clean dark/light mode toggle.' },
      { name: 'AbortController Integration', detail: 'Instant cancellation of in-flight HTTP requests when user interrupts or enters a new message.' },
      { name: 'Simulated Streaming Effect', detail: 'Smooth character-by-character typewriter animation pacing dynamically calibrated to message length.' },
      { name: 'Lightweight Markdown', detail: 'Zero-dependency markdown parser formatting code blocks, inline code, bold, italics, and lists.' },
      { name: 'Thread Persistence', detail: 'LocalStorage session synchronization preserving active chat history across page navigations.' }
    ],
    screenshots: [
      {
        src: '/assets/images/chatbot/chatbot_interface.webp',
        alt: 'AI Chatbot widget conversational UI',
        caption: 'Floating chat popup with typing indicator, rich markdown response formatting, and dark mode support.'
      },
      {
        src: '/assets/images/chatbot/chatbot_mobile.webp',
        alt: 'AI Chatbot responsive mobile view',
        caption: 'Responsive modal layout optimized for mobile screens with seamless touch interaction.'
      }
    ],
    improvements: 'Support direct Server-Sent Events (SSE) streaming from backend LLM endpoints for genuine streaming tokens.'
  }
]
