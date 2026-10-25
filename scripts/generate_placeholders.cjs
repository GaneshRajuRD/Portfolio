const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const makeSvg = (title, subtitle, badge, width = 1600, height = 1000) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="100%" stop-color="#f4efe6"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#faf8f5"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#181614" flood-opacity="0.06"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  
  <!-- Subtle Grid lines -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e8e2d8" stroke-width="1"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)" opacity="0.6"/>

  <!-- Window Header / Frame -->
  <rect x="80" y="80" width="${width - 160}" height="${height - 160}" rx="18" fill="url(#cardGrad)" stroke="#dfd8cb" stroke-width="2" filter="url(#shadow)"/>
  <rect x="80" y="80" width="${width - 160}" height="56" rx="18" fill="#f4efe8"/>
  <rect x="80" y="120" width="${width - 160}" height="16" fill="#f4efe8"/>
  
  <!-- Window Controls -->
  <circle cx="116" cy="108" r="7" fill="#ff5f56"/>
  <circle cx="138" cy="108" r="7" fill="#ffbd2e"/>
  <circle cx="160" cy="108" r="7" fill="#27c93f"/>

  <text x="200" y="113" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="600" fill="#6b6457">Preview · Healthcare Platform Interface</text>

  <!-- Badge -->
  <rect x="140" y="195" width="200" height="34" rx="17" fill="#f0ebe1" stroke="#ded5c5" stroke-width="1"/>
  <text x="240" y="217" font-family="'Space Mono', monospace" font-size="12" font-weight="bold" fill="#b45309" text-anchor="middle" letter-spacing="1">${badge}</text>

  <!-- Title & Subtitle -->
  <text x="140" y="295" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="44" font-weight="bold" fill="#181614">${title}</text>
  <text x="140" y="345" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="22" fill="#6b6457">${subtitle}</text>

  <!-- Mockup UI Panels -->
  <rect x="140" y="405" width="${(width - 320) * 0.3}" height="385" rx="14" fill="#faf8f5" stroke="#e6e0d4" stroke-width="1.5"/>
  <rect x="${140 + (width - 320) * 0.33}" y="405" width="${(width - 320) * 0.67}" height="385" rx="14" fill="#faf8f5" stroke="#e6e0d4" stroke-width="1.5"/>

  <!-- Left panel wireframe lines -->
  <rect x="165" y="440" width="140" height="14" rx="4" fill="#181614" opacity="0.8"/>
  <rect x="165" y="470" width="100" height="10" rx="4" fill="#c5bdb0"/>
  <rect x="165" y="510" width="180" height="38" rx="8" fill="#ffffff" stroke="#e6e0d4"/>
  <rect x="165" y="560" width="180" height="38" rx="8" fill="#ffffff" stroke="#e6e0d4"/>
  <rect x="165" y="610" width="180" height="38" rx="8" fill="#ffffff" stroke="#e6e0d4"/>
  <rect x="165" y="660" width="180" height="38" rx="8" fill="#ffffff" stroke="#e6e0d4"/>

  <!-- Right panel wireframe lines -->
  <rect x="${165 + (width - 320) * 0.33}" y="440" width="240" height="18" rx="4" fill="#181614"/>
  <rect x="${165 + (width - 320) * 0.33}" y="480" width="380" height="12" rx="4" fill="#8c8472"/>
  <rect x="${165 + (width - 320) * 0.33}" y="520" width="${(width - 320) * 0.63}" height="230" rx="10" fill="#ffffff" stroke="#e2dbce" stroke-width="1.5"/>
</svg>
`;

const makeAvatarSvg = (width = 800, height = 800) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf7f2"/>
      <stop offset="100%" stop-color="#ede5d8"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#avatarBg)"/>
  <circle cx="400" cy="310" r="140" fill="#ded5c4" stroke="#c5bca9" stroke-width="2"/>
  <path d="M 210 650 Q 400 480 590 650 Z" fill="#cfc5b0" stroke="#b8ad97" stroke-width="2"/>
  <text x="400" y="730" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="28" font-weight="bold" fill="#181614" text-anchor="middle">Ganesh Raju</text>
  <text x="400" y="765" font-family="'Space Mono', monospace" font-size="16" fill="#6b6457" text-anchor="middle">Frontend Developer</text>
</svg>
`;

async function main() {
  const images = [
    {
      file: 'D:/Nuxt Vue/portfolio/public/assets/images/queue/queue_dashboard.webp',
      svg: makeSvg('Queue Dashboard', 'Counter Operations &amp; Live Patient Flow Workflows', 'MOCERO HEALTH')
    },
    {
      file: 'D:/Nuxt Vue/portfolio/public/assets/images/queue/token_display.webp',
      svg: makeSvg('Token Display Board', 'Waiting, Called, In-Service &amp; Room Routing', 'PATIENT MONITOR')
    },
    {
      file: 'D:/Nuxt Vue/portfolio/public/assets/images/cicd/pipeline_flow.webp',
      svg: makeSvg('Azure DevOps CI/CD', 'Automated Build, Secrets &amp; PM2 Zero-Lock Sync', 'PIPELINE ARCHITECTURE')
    },
    {
      file: 'D:/Nuxt Vue/portfolio/public/assets/images/chatbot/chatbot_interface.webp',
      svg: makeSvg('AI Chatbot Widget', 'Thread Memory, Typewriter Streaming &amp; AbortController', 'VUE 3 POPUP')
    },
    {
      file: 'D:/Nuxt Vue/portfolio/public/assets/images/chatbot/chatbot_mobile.webp',
      svg: makeSvg('Chatbot Mobile View', 'Responsive Modal with Real-time Cancellation', 'MOBILE VIEW', 900, 1200)
    },
    {
      file: 'D:/Nuxt Vue/portfolio/public/assets/images/about/ganesh_photo.webp',
      svg: makeAvatarSvg(800, 800)
    }
  ];

  for (const item of images) {
    const dir = path.dirname(item.file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await sharp(Buffer.from(item.svg))
      .webp({ quality: 92 })
      .toFile(item.file);
    console.log('Generated:', item.file);
  }
}

main().catch(console.error);
