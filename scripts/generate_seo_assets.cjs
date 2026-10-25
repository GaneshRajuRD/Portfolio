const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAssets() {
  const publicDir = path.resolve(__dirname, '..', 'public');

  // 1. Generate Favicon 32x32 PNG from favicon.svg
  const svgFavicon = fs.readFileSync(path.join(publicDir, 'favicon.svg'));
  await sharp(svgFavicon)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated public/favicon-32x32.png');

  // 2. Generate Apple Touch Icon 180x180 PNG
  await sharp(svgFavicon)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated public/apple-touch-icon.png');

  // 3. Generate 1200x630 Open Graph Image PNG
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#041214"/>
        <stop offset="100%" stop-color="#082024"/>
      </linearGradient>
      <radialGradient id="glow1" cx="85%" cy="15%" r="45%">
        <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#14b8a6" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="15%" cy="85%" r="50%">
        <stop offset="0%" stop-color="#0f766e" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0f766e" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Base Canvas -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <rect width="1200" height="630" fill="url(#glow1)"/>
    <rect width="1200" height="630" fill="url(#glow2)"/>

    <!-- Outer Border -->
    <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#153f44" stroke-width="2" stroke-dasharray="6 6"/>
    <rect x="40" y="40" width="1120" height="550" rx="20" fill="rgba(6, 22, 25, 0.6)" stroke="#1f575e" stroke-width="1.5"/>

    <!-- Header Badge -->
    <g transform="translate(80, 80)">
      <rect width="380" height="38" rx="19" fill="rgba(20, 184, 166, 0.12)" stroke="#14b8a6" stroke-width="1"/>
      <circle cx="22" cy="19" r="5" fill="#10b981"/>
      <text x="38" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#5eead4" letter-spacing="1.5">FRONTEND DEVELOPER · VUE 3 / NUXT</text>
    </g>

    <!-- Name / Headline -->
    <text x="80" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="68" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Ganesh Raju</text>

    <!-- Tagline -->
    <text x="80" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#94a3b8">
      Production healthcare web platforms, Vue 3 SSR architectures, and automated CI/CD.
    </text>

    <!-- 4 Feature Cards -->
    <g transform="translate(80, 310)">
      <!-- Card 1 -->
      <g transform="translate(0, 0)">
        <rect width="240" height="135" rx="14" fill="#071a1d" stroke="#1a4b52" stroke-width="1"/>
        <text x="24" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#2dd4bf">3+ Years</text>
        <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Production Frontend</text>
        <text x="24" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#64748b">Vue 3 and Nuxt 3 Core</text>
      </g>
      <!-- Card 2 -->
      <g transform="translate(266, 0)">
        <rect width="240" height="135" rx="14" fill="#071a1d" stroke="#1a4b52" stroke-width="1"/>
        <text x="24" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#2dd4bf">15+ Sites</text>
        <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Healthcare Portals</text>
        <text x="24" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#64748b">Hospitals, Labs and Rehab</text>
      </g>
      <!-- Card 3 -->
      <g transform="translate(532, 0)">
        <rect width="240" height="135" rx="14" fill="#071a1d" stroke="#1a4b52" stroke-width="1"/>
        <text x="24" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#2dd4bf">Nuxt 3 SSR</text>
        <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Technical SEO</text>
        <text x="24" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#64748b">Optimized Core Web Vitals</text>
      </g>
      <!-- Card 4 -->
      <g transform="translate(798, 0)">
        <rect width="240" height="135" rx="14" fill="#071a1d" stroke="#1a4b52" stroke-width="1"/>
        <text x="24" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#2dd4bf">100% Auto</text>
        <text x="24" y="82" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Azure CI/CD</text>
        <text x="24" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#64748b">Zero-Downtime Rollbacks</text>
      </g>
    </g>

    <!-- Bottom Footer Row -->
    <g transform="translate(80, 520)">
      <line x1="0" y1="-20" x2="1040" y2="-20" stroke="#153f44" stroke-width="1"/>
      <text x="0" y="12" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Salem, Tamil Nadu · Open to relocate: Bangalore &amp; Chennai</text>
      <text x="1040" y="12" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#2dd4bf" letter-spacing="0.5">ganeshraju.dev</text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Generated public/og-image.png (1200x630)');
}

generateAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
