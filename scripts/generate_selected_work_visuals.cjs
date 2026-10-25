const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Helper to escape XML
const escapeXml = (unsafe) => unsafe.replace(/[<>&'"]/g, (c) => {
  switch (c) {
    case '<': return '&lt;';
    case '>': return '&gt;';
    case '&': return '&amp;';
    case '\'': return '&apos;';
    case '"': return '&quot;';
  }
});

// 1. Queue Dashboard Image Generator (1600 x 1000)
function createQueueDashboardSvg() {
  const width = 1600;
  const height = 1000;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f2b2b"/>
      <stop offset="100%" stop-color="#091c1d"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#143434"/>
      <stop offset="100%" stop-color="#0e2424"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#14b8a6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  
  <!-- Subtle Grid -->
  <pattern id="qGrid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#164e4a" stroke-width="0.75" opacity="0.3"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#qGrid)"/>

  <!-- Top App Navigation Bar -->
  <rect x="0" y="0" width="${width}" height="64" fill="#0c2021" stroke="#164e4a" stroke-width="1"/>
  
  <!-- Logo / Brand -->
  <rect x="32" y="16" width="32" height="32" rx="8" fill="url(#accentGrad)"/>
  <text x="48" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">M</text>
  <text x="76" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Mocero One Platform</text>
  <text x="268" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">/ Queue Operations Management</text>

  <!-- Live Status & User Info -->
  <rect x="1340" y="18" width="100" height="28" rx="14" fill="#042f2e" stroke="#0d9488" stroke-width="1"/>
  <circle cx="1356" cy="32" r="4" fill="#10b981"/>
  <text x="1368" y="36" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#5eead4">LIVE OPD</text>
  <text x="1465" y="37" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#e2e8f0">Salem Main OPD</text>

  <!-- Page Header Banner -->
  <g transform="translate(48, 88)">
    <rect width="1504" height="68" rx="12" fill="url(#cardGrad)" stroke="#1a4d4a" stroke-width="1" filter="url(#shadow)"/>
    <text x="24" y="34" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="800" fill="#ffffff">Queue Operations Dashboard</text>
    <text x="24" y="52" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">Real-time seamless patient flow, multi-counter dispatching and SLA monitoring</text>
    
    <!-- Header Buttons -->
    <rect x="1140" y="18" width="160" height="32" rx="6" fill="#0c2021" stroke="#1f5d59" stroke-width="1"/>
    <text x="1220" y="39" font-family="'Space Mono', monospace" font-size="12" fill="#5eead4" text-anchor="middle">DATE: 24/10/2026</text>
    
    <rect x="1320" y="18" width="160" height="32" rx="6" fill="url(#accentGrad)"/>
    <text x="1400" y="39" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#091c1d" text-anchor="middle">+ Generate Token</text>
  </g>

  <!-- 6 Key Metrics Row -->
  <!-- Metric 1: Patient Flow (Seamless Routing) -->
  <g transform="translate(48, 176)">
    <rect width="234" height="106" rx="12" fill="#102f31" stroke="#14b8a6" stroke-width="1.5" filter="url(#shadow)"/>
    <circle cx="36" cy="36" r="16" fill="#042f2e"/>
    <text x="36" y="42" font-family="'Space Mono', monospace" font-size="14" fill="#2dd4bf" text-anchor="middle">⚡</text>
    <text x="64" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">PATIENT FLOW</text>
    <text x="64" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="800" fill="#ffffff">Seamless Flow</text>
    <text x="64" y="82" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#5eead4">Active Dynamic Routing</text>
  </g>

  <!-- Metric 2: Waiting -->
  <g transform="translate(302, 176)">
    <rect width="234" height="106" rx="12" fill="#102f31" stroke="#f59e0b" stroke-width="1.5" filter="url(#shadow)"/>
    <circle cx="36" cy="36" r="16" fill="#382103"/>
    <text x="36" y="42" font-family="'Space Mono', monospace" font-size="14" fill="#fbbf24" text-anchor="middle">⏱</text>
    <text x="64" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">WAITING IN QUEUE</text>
    <text x="64" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="26" font-weight="800" fill="#fbbf24">19</text>
    <text x="64" y="82" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#fde68a">Across all counters</text>
  </g>

  <!-- Metric 3: Active Counters -->
  <g transform="translate(556, 176)">
    <rect width="234" height="106" rx="12" fill="#102f31" stroke="#38bdf8" stroke-width="1.5" filter="url(#shadow)"/>
    <circle cx="36" cy="36" r="16" fill="#082f49"/>
    <text x="36" y="42" font-family="'Space Mono', monospace" font-size="14" fill="#38bdf8" text-anchor="middle">🖥</text>
    <text x="64" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">ACTIVE COUNTERS</text>
    <text x="64" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="26" font-weight="800" fill="#38bdf8">6 <tspan font-size="16" fill="#94a3b8">/ 8</tspan></text>
    <text x="64" y="82" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#bae6fd">75% Capacity In-Use</text>
  </g>

  <!-- Metric 4: Avg Wait Time -->
  <g transform="translate(810, 176)">
    <rect width="234" height="106" rx="12" fill="#102f31" stroke="#a855f7" stroke-width="1.5" filter="url(#shadow)"/>
    <circle cx="36" cy="36" r="16" fill="#2e1065"/>
    <text x="36" y="42" font-family="'Space Mono', monospace" font-size="14" fill="#c084fc" text-anchor="middle">⏳</text>
    <text x="64" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">AVG WAIT TIME</text>
    <text x="64" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="26" font-weight="800" fill="#c084fc">11.4 <tspan font-size="16" fill="#94a3b8">min</tspan></text>
    <text x="64" y="82" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#4ade80">↓ 2.4 min (Within SLA)</text>
  </g>

  <!-- Metric 5: SLA Breaches -->
  <g transform="translate(1064, 176)">
    <rect width="234" height="106" rx="12" fill="#102f31" stroke="#10b981" stroke-width="1.5" filter="url(#shadow)"/>
    <circle cx="36" cy="36" r="16" fill="#064e3b"/>
    <text x="36" y="42" font-family="'Space Mono', monospace" font-size="14" fill="#34d399" text-anchor="middle">🛡</text>
    <text x="64" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">SLA BREACHES</text>
    <text x="64" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="26" font-weight="800" fill="#34d399">0</text>
    <text x="64" y="82" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#a7f3d0">Target &lt; 30 min wait</text>
  </g>

  <!-- Metric 6: No-Show Rate -->
  <g transform="translate(1318, 176)">
    <rect width="234" height="106" rx="12" fill="#102f31" stroke="#f43f5e" stroke-width="1.5" filter="url(#shadow)"/>
    <circle cx="36" cy="36" r="16" fill="#4c0519"/>
    <text x="36" y="42" font-family="'Space Mono', monospace" font-size="14" fill="#fb7185" text-anchor="middle">✕</text>
    <text x="64" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">NO-SHOW RATE</text>
    <text x="64" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="26" font-weight="800" fill="#fb7185">2.1%</text>
    <text x="64" y="82" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#fecdd3">4 cancelled sessions</text>
  </g>

  <!-- Main Content Split: Left (Status Distribution) & Right (Active Counters) -->
  <!-- Left Panel: Token Lifecycle & Status Distribution -->
  <g transform="translate(48, 304)">
    <rect width="520" height="420" rx="12" fill="url(#cardGrad)" stroke="#1a4d4a" stroke-width="1" filter="url(#shadow)"/>
    <text x="24" y="34" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="700" fill="#f8fafc">Patient Flow Lifecycle Distribution</text>
    <text x="24" y="52" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#94a3b8">Live tracking across 6 distinct lifecycle states</text>

    <!-- Status 1: Waiting -->
    <g transform="translate(24, 80)">
      <circle cx="8" cy="12" r="6" fill="#f59e0b"/>
      <text x="24" y="16" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Waiting in Lobby</text>
      <text x="440" y="16" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#fbbf24" text-anchor="end">19</text>
      <rect x="24" y="26" width="440" height="8" rx="4" fill="#1b3f3e"/>
      <rect x="24" y="26" width="80" height="8" rx="4" fill="#f59e0b"/>
    </g>

    <!-- Status 2: Called -->
    <g transform="translate(24, 140)">
      <circle cx="8" cy="12" r="6" fill="#38bdf8"/>
      <text x="24" y="16" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Called to Counter</text>
      <text x="440" y="16" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#38bdf8" text-anchor="end">4</text>
      <rect x="24" y="26" width="440" height="8" rx="4" fill="#1b3f3e"/>
      <rect x="24" y="26" width="35" height="8" rx="4" fill="#38bdf8"/>
    </g>

    <!-- Status 3: In-Service -->
    <g transform="translate(24, 200)">
      <circle cx="8" cy="12" r="6" fill="#a855f7"/>
      <text x="24" y="16" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">In-Service (Active Consultation)</text>
      <text x="440" y="16" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#c084fc" text-anchor="end">6</text>
      <rect x="24" y="26" width="440" height="8" rx="4" fill="#1b3f3e"/>
      <rect x="24" y="26" width="48" height="8" rx="4" fill="#a855f7"/>
    </g>

    <!-- Status 4: Completed -->
    <g transform="translate(24, 260)">
      <circle cx="8" cy="12" r="6" fill="#10b981"/>
      <text x="24" y="16" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">Completed Consultation</text>
      <text x="440" y="16" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#34d399" text-anchor="end">151</text>
      <rect x="24" y="26" width="440" height="8" rx="4" fill="#1b3f3e"/>
      <rect x="24" y="26" width="360" height="8" rx="4" fill="#10b981"/>
    </g>

    <!-- Status 5: No-Show & Cancelled -->
    <g transform="translate(24, 320)">
      <circle cx="8" cy="12" r="6" fill="#f43f5e"/>
      <text x="24" y="16" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">No-Show / Cancelled</text>
      <text x="440" y="16" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#fb7185" text-anchor="end">4</text>
      <rect x="24" y="26" width="440" height="8" rx="4" fill="#1b3f3e"/>
      <rect x="24" y="26" width="22" height="8" rx="4" fill="#f43f5e"/>
    </g>
  </g>

  <!-- Right Panel: Live Counter Operations -->
  <g transform="translate(592, 304)">
    <rect width="960" height="420" rx="12" fill="url(#cardGrad)" stroke="#1a4d4a" stroke-width="1" filter="url(#shadow)"/>
    <text x="24" y="34" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="700" fill="#f8fafc">Counter Workstation Operations</text>
    <text x="24" y="52" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#94a3b8">Active counter dispatching, assigned doctors, and patient turnarounds</text>

    <!-- Counter Row 1 -->
    <g transform="translate(24, 76)">
      <rect width="912" height="52" rx="8" fill="#102f31" stroke="#1d4e4c" stroke-width="1"/>
      <rect x="14" y="12" width="48" height="28" rx="6" fill="#14b8a6"/>
      <text x="38" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#042f2e" text-anchor="middle">#01</text>
      <text x="76" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#f1f5f9">Dr. Arvind Swaminathan</text>
      <text x="76" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">General Medicine OPD · Room 101</text>
      
      <rect x="420" y="12" width="130" height="28" rx="6" fill="#042f2e" stroke="#0d9488" stroke-width="1"/>
      <text x="485" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#5eead4" text-anchor="middle">Token: A-042</text>
      
      <rect x="580" y="12" width="110" height="28" rx="14" fill="#3b0764" stroke="#a855f7" stroke-width="1"/>
      <text x="635" y="31" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#d8b4fe" text-anchor="middle">● Serving</text>

      <text x="880" y="32" font-family="'Space Mono', monospace" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="end">42 Served</text>
    </g>

    <!-- Counter Row 2 -->
    <g transform="translate(24, 138)">
      <rect width="912" height="52" rx="8" fill="#102f31" stroke="#1d4e4c" stroke-width="1"/>
      <rect x="14" y="12" width="48" height="28" rx="6" fill="#14b8a6"/>
      <text x="38" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#042f2e" text-anchor="middle">#02</text>
      <text x="76" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#f1f5f9">Dr. Priya Menon</text>
      <text x="76" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Pediatric Care OPD · Room 104</text>
      
      <rect x="420" y="12" width="130" height="28" rx="6" fill="#042f2e" stroke="#0d9488" stroke-width="1"/>
      <text x="485" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#5eead4" text-anchor="middle">Token: P-019</text>
      
      <rect x="580" y="12" width="110" height="28" rx="14" fill="#3b0764" stroke="#a855f7" stroke-width="1"/>
      <text x="635" y="31" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#d8b4fe" text-anchor="middle">● Serving</text>

      <text x="880" y="32" font-family="'Space Mono', monospace" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="end">31 Served</text>
    </g>

    <!-- Counter Row 3 -->
    <g transform="translate(24, 200)">
      <rect width="912" height="52" rx="8" fill="#102f31" stroke="#1d4e4c" stroke-width="1"/>
      <rect x="14" y="12" width="48" height="28" rx="6" fill="#14b8a6"/>
      <text x="38" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#042f2e" text-anchor="middle">#03</text>
      <text x="76" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#f1f5f9">Triage &amp; Vitals Assessment</text>
      <text x="76" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Nurse Desk A · Fast Track</text>
      
      <rect x="420" y="12" width="130" height="28" rx="6" fill="#082f49" stroke="#0284c7" stroke-width="1"/>
      <text x="485" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">Calling: T-068</text>
      
      <rect x="580" y="12" width="110" height="28" rx="14" fill="#082f49" stroke="#38bdf8" stroke-width="1"/>
      <text x="635" y="31" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#7dd3fc" text-anchor="middle">● Calling</text>

      <text x="880" y="32" font-family="'Space Mono', monospace" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="end">56 Served</text>
    </g>

    <!-- Counter Row 4 -->
    <g transform="translate(24, 262)">
      <rect width="912" height="52" rx="8" fill="#102f31" stroke="#1d4e4c" stroke-width="1"/>
      <rect x="14" y="12" width="48" height="28" rx="6" fill="#14b8a6"/>
      <text x="38" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#042f2e" text-anchor="middle">#04</text>
      <text x="76" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#f1f5f9">Diagnostic Sample Collection</text>
      <text x="76" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Pathology &amp; Blood Tests · Counter 4</text>
      
      <rect x="420" y="12" width="130" height="28" rx="6" fill="#042f2e" stroke="#0d9488" stroke-width="1"/>
      <text x="485" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#5eead4" text-anchor="middle">Token: L-031</text>
      
      <rect x="580" y="12" width="110" height="28" rx="14" fill="#3b0764" stroke="#a855f7" stroke-width="1"/>
      <text x="635" y="31" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#d8b4fe" text-anchor="middle">● Serving</text>

      <text x="880" y="32" font-family="'Space Mono', monospace" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="end">61 Served</text>
    </g>

    <!-- Counter Row 5 -->
    <g transform="translate(24, 324)">
      <rect width="912" height="52" rx="8" fill="#102f31" stroke="#1d4e4c" stroke-width="1"/>
      <rect x="14" y="12" width="48" height="28" rx="6" fill="#14b8a6"/>
      <text x="38" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#042f2e" text-anchor="middle">#05</text>
      <text x="76" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#f1f5f9">Outpatient Pharmacy &amp; Billing</text>
      <text x="76" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Ground Floor Dispense</text>
      
      <rect x="420" y="12" width="130" height="28" rx="6" fill="#042f2e" stroke="#0d9488" stroke-width="1"/>
      <text x="485" y="31" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#5eead4" text-anchor="middle">Token: B-088</text>
      
      <rect x="580" y="12" width="110" height="28" rx="14" fill="#3b0764" stroke="#a855f7" stroke-width="1"/>
      <text x="635" y="31" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#d8b4fe" text-anchor="middle">● Serving</text>

      <text x="880" y="32" font-family="'Space Mono', monospace" font-size="13" font-weight="600" fill="#94a3b8" text-anchor="end">78 Served</text>
    </g>
  </g>

  <!-- Bottom Matrix / SLA Health Bar -->
  <g transform="translate(48, 748)">
    <rect width="1504" height="204" rx="12" fill="url(#cardGrad)" stroke="#1a4d4a" stroke-width="1" filter="url(#shadow)"/>
    <text x="24" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Department Queue Health Matrix</text>
    
    <!-- Table Header -->
    <rect x="24" y="48" width="1456" height="34" rx="6" fill="#0c2425"/>
    <text x="44" y="70" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#94a3b8">DEPARTMENT QUEUE</text>
    <text x="420" y="70" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#f59e0b">WAITING</text>
    <text x="600" y="70" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#38bdf8">CALLED</text>
    <text x="780" y="70" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#c084fc">IN-SERVICE</text>
    <text x="980" y="70" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#34d399">COMPLETED</text>
    <text x="1200" y="70" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#fb7185">NO-SHOW</text>
    <text x="1380" y="70" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#2dd4bf">STATUS</text>

    <!-- Row 1: General Medicine -->
    <text x="44" y="112" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#f1f5f9">General Medicine OPD</text>
    <text x="420" y="112" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#f59e0b">8</text>
    <text x="600" y="112" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">1</text>
    <text x="780" y="112" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#c084fc">2</text>
    <text x="980" y="112" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#34d399">52</text>
    <text x="1200" y="112" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#fb7185">1</text>
    <rect x="1370" y="98" width="75" height="20" rx="10" fill="#042f2e"/>
    <text x="1407" y="112" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">🟢 Optimal</text>

    <!-- Row 2: Pediatric Care -->
    <text x="44" y="146" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#f1f5f9">Pediatrics &amp; Immunization</text>
    <text x="420" y="146" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#f59e0b">4</text>
    <text x="600" y="146" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">1</text>
    <text x="780" y="146" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#c084fc">1</text>
    <text x="980" y="146" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#34d399">34</text>
    <text x="1200" y="146" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#fb7185">1</text>
    <rect x="1370" y="132" width="75" height="20" rx="10" fill="#042f2e"/>
    <text x="1407" y="146" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">🟢 Optimal</text>

    <!-- Row 3: Diagnostic Lab -->
    <text x="44" y="180" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#f1f5f9">Diagnostic Sample Collection</text>
    <text x="420" y="180" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#f59e0b">7</text>
    <text x="600" y="180" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#38bdf8">2</text>
    <text x="780" y="180" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#c084fc">3</text>
    <text x="980" y="180" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#34d399">65</text>
    <text x="1200" y="180" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#fb7185">2</text>
    <rect x="1370" y="166" width="75" height="20" rx="10" fill="#042f2e"/>
    <text x="1407" y="180" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399" text-anchor="middle">🟢 Optimal</text>
  </g>
</svg>
  `;
}

// 2. Token Display Board Image Generator (1600 x 1000)
function createTokenDisplaySvg() {
  const width = 1600;
  const height = 1000;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tvBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1518"/>
      <stop offset="100%" stop-color="#060c0e"/>
    </linearGradient>
    <linearGradient id="tvCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#112226"/>
      <stop offset="100%" stop-color="#0b171a"/>
    </linearGradient>
    <linearGradient id="glowTeal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0d9488"/>
      <stop offset="100%" stop-color="#14b8a6"/>
    </linearGradient>
    <filter id="tvGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#14b8a6" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#tvBg)"/>

  <!-- Monitor Top Bar -->
  <rect x="0" y="0" width="${width}" height="84" fill="#0b191c" stroke="#13363b" stroke-width="1"/>
  
  <!-- Hospital Banner -->
  <text x="48" y="44" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="1">MOCERO HEALTHCARE CLINIC</text>
  <text x="48" y="66" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#14b8a6">OUTPATIENT DEPARTMENT · PUBLIC LIVE QUEUE MONITOR</text>

  <!-- Live Stats Badge -->
  <g transform="translate(980, 24)">
    <rect width="360" height="38" rx="19" fill="#082326" stroke="#134e4a" stroke-width="1"/>
    <text x="24" y="24" font-family="'Space Mono', monospace" font-size="13" fill="#94a3b8">WAITING: <tspan font-weight="700" fill="#f59e0b">19</tspan></text>
    <text x="140" y="24" font-family="'Space Mono', monospace" font-size="13" fill="#94a3b8">SERVING: <tspan font-weight="700" fill="#38bdf8">4</tspan></text>
    <text x="250" y="24" font-family="'Space Mono', monospace" font-size="13" fill="#94a3b8">DONE: <tspan font-weight="700" fill="#34d399">151</tspan></text>
  </g>

  <!-- Realtime Clock & Live Indicator -->
  <g transform="translate(1380, 24)">
    <circle cx="16" cy="19" r="6" fill="#10b981"/>
    <text x="32" y="24" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#34d399">LIVE</text>
    <text x="85" y="25" font-family="'Space Mono', monospace" font-size="18" font-weight="700" fill="#ffffff">10:45 AM</text>
  </g>

  <!-- 4 Big Display Screens (2x2 Grid) -->
  <!-- Card 1: General Medicine -->
  <g transform="translate(48, 114)">
    <rect width="732" height="380" rx="16" fill="url(#tvCardGrad)" stroke="#1a3d42" stroke-width="1.5"/>
    <rect x="0" y="0" width="732" height="60" rx="16" fill="#0d2327"/>
    <text x="24" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">GENERAL MEDICINE CONSULTATION</text>
    <rect x="580" y="16" width="128" height="28" rx="6" fill="#0f766e"/>
    <text x="644" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">COUNTER 01</text>

    <!-- Serving Box -->
    <text x="24" y="100" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#14b8a6" letter-spacing="2">NOW SERVING</text>
    <rect x="24" y="115" width="684" height="135" rx="12" fill="#071b1e" stroke="#14b8a6" stroke-width="2" filter="url(#tvGlow)"/>
    <text x="56" y="208" font-family="'Space Mono', monospace" font-size="88" font-weight="900" fill="#ffffff">A-042</text>
    <text x="440" y="170" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="700" fill="#e2e8f0">Rajesh Kumar</text>
    <text x="440" y="196" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">Room 101 · Dr. Arvind Swaminathan</text>

    <!-- Next In Queue -->
    <text x="24" y="285" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">NEXT TOKENS IN QUEUE:</text>
    <rect x="24" y="300" width="130" height="50" rx="8" fill="#142e33" stroke="#235057" stroke-width="1"/>
    <text x="89" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#5eead4" text-anchor="middle">A-043</text>

    <rect x="170" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="235" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">A-044</text>

    <rect x="316" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="381" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">A-045</text>

    <text x="708" y="333" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="end">8 WAITING</text>
  </g>

  <!-- Card 2: Pediatric Care -->
  <g transform="translate(820, 114)">
    <rect width="732" height="380" rx="16" fill="url(#tvCardGrad)" stroke="#1a3d42" stroke-width="1.5"/>
    <rect x="0" y="0" width="732" height="60" rx="16" fill="#0d2327"/>
    <text x="24" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">PEDIATRIC CARE &amp; IMMUNIZATION</text>
    <rect x="580" y="16" width="128" height="28" rx="6" fill="#0f766e"/>
    <text x="644" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">COUNTER 02</text>

    <text x="24" y="100" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#14b8a6" letter-spacing="2">NOW SERVING</text>
    <rect x="24" y="115" width="684" height="135" rx="12" fill="#071b1e" stroke="#14b8a6" stroke-width="2" filter="url(#tvGlow)"/>
    <text x="56" y="208" font-family="'Space Mono', monospace" font-size="88" font-weight="900" fill="#ffffff">P-019</text>
    <text x="440" y="170" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="700" fill="#e2e8f0">Baby Aarav S.</text>
    <text x="440" y="196" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">Room 104 · Dr. Priya Menon</text>

    <text x="24" y="285" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">NEXT TOKENS IN QUEUE:</text>
    <rect x="24" y="300" width="130" height="50" rx="8" fill="#142e33" stroke="#235057" stroke-width="1"/>
    <text x="89" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#5eead4" text-anchor="middle">P-020</text>

    <rect x="170" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="235" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">P-021</text>

    <rect x="316" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="381" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">P-022</text>

    <text x="708" y="333" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="end">4 WAITING</text>
  </g>

  <!-- Card 3: Diagnostic Lab -->
  <g transform="translate(48, 520)">
    <rect width="732" height="380" rx="16" fill="url(#tvCardGrad)" stroke="#1a3d42" stroke-width="1.5"/>
    <rect x="0" y="0" width="732" height="60" rx="16" fill="#0d2327"/>
    <text x="24" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">DIAGNOSTIC &amp; PATHOLOGY LAB</text>
    <rect x="580" y="16" width="128" height="28" rx="6" fill="#0f766e"/>
    <text x="644" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">COUNTER 04</text>

    <text x="24" y="100" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#14b8a6" letter-spacing="2">NOW SERVING</text>
    <rect x="24" y="115" width="684" height="135" rx="12" fill="#071b1e" stroke="#14b8a6" stroke-width="2" filter="url(#tvGlow)"/>
    <text x="56" y="208" font-family="'Space Mono', monospace" font-size="88" font-weight="900" fill="#ffffff">L-031</text>
    <text x="440" y="170" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="700" fill="#e2e8f0">Meera Nair</text>
    <text x="440" y="196" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">Blood Sample Collection &amp; Routine Tests</text>

    <text x="24" y="285" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">NEXT TOKENS IN QUEUE:</text>
    <rect x="24" y="300" width="130" height="50" rx="8" fill="#142e33" stroke="#235057" stroke-width="1"/>
    <text x="89" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#5eead4" text-anchor="middle">L-032</text>

    <rect x="170" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="235" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">L-033</text>

    <rect x="316" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="381" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">L-034</text>

    <text x="708" y="333" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="end">6 WAITING</text>
  </g>

  <!-- Card 4: Pharmacy -->
  <g transform="translate(820, 520)">
    <rect width="732" height="380" rx="16" fill="url(#tvCardGrad)" stroke="#1a3d42" stroke-width="1.5"/>
    <rect x="0" y="0" width="732" height="60" rx="16" fill="#0d2327"/>
    <text x="24" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">OUTPATIENT PHARMACY &amp; BILLING</text>
    <rect x="580" y="16" width="128" height="28" rx="6" fill="#0f766e"/>
    <text x="644" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">COUNTER 05</text>

    <text x="24" y="100" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#14b8a6" letter-spacing="2">NOW SERVING</text>
    <rect x="24" y="115" width="684" height="135" rx="12" fill="#071b1e" stroke="#14b8a6" stroke-width="2" filter="url(#tvGlow)"/>
    <text x="56" y="208" font-family="'Space Mono', monospace" font-size="88" font-weight="900" fill="#ffffff">B-088</text>
    <text x="440" y="170" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="700" fill="#e2e8f0">Suresh Kannan</text>
    <text x="440" y="196" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">Medicine Dispense &amp; Invoice Billing</text>

    <text x="24" y="285" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#94a3b8">NEXT TOKENS IN QUEUE:</text>
    <rect x="24" y="300" width="130" height="50" rx="8" fill="#142e33" stroke="#235057" stroke-width="1"/>
    <text x="89" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#5eead4" text-anchor="middle">B-089</text>

    <rect x="170" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="235" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">B-090</text>

    <rect x="316" y="300" width="130" height="50" rx="8" fill="#0f262a" stroke="#1d4349" stroke-width="1"/>
    <text x="381" y="333" font-family="'Space Mono', monospace" font-size="20" font-weight="700" fill="#94a3b8" text-anchor="middle">B-091</text>

    <text x="708" y="333" font-family="'Space Mono', monospace" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="end">3 WAITING</text>
  </g>

  <!-- Bottom Broadcast Ticker -->
  <g transform="translate(0, 930)">
    <rect width="${width}" height="70" fill="#08181b" stroke="#153b40" stroke-width="1"/>
    <rect x="48" y="18" width="180" height="34" rx="6" fill="#14b8a6"/>
    <text x="138" y="40" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#061f22" text-anchor="middle">ANNOUNCEMENTS</text>
    <text x="250" y="41" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" fill="#f1f5f9">
      🔊 Token calls will be announced automatically · Please have your appointment card ready when proceeding to your designated counter.
    </text>
  </g>
</svg>
  `;
}

// 3. AI Chatbot Interface Generator (1600 x 1000)
function createChatbotInterfaceSvg() {
  const width = 1600;
  const height = 1000;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="chatPortalBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#edf5f4"/>
      <stop offset="100%" stop-color="#e0eeec"/>
    </linearGradient>
    <linearGradient id="widgetHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#1f2937"/>
    </linearGradient>
    <filter id="widgetShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="28" flood-color="#0f172a" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Hospital Website Backdrop -->
  <rect width="${width}" height="${height}" fill="url(#chatPortalBg)"/>

  <!-- Hospital Website Header -->
  <rect x="0" y="0" width="${width}" height="72" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
  <rect x="64" y="20" width="32" height="32" rx="8" fill="#0f766e"/>
  <text x="80" y="42" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">U</text>
  <text x="110" y="43" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="800" fill="#0f172a">Uniscans &amp; Labs</text>
  <text x="280" y="43" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#64748b">Diagnostic Services · MRI/CT · Blood Tests · Pathology</text>

  <!-- Hospital Web Content Wireframe (Left Area) -->
  <g transform="translate(64, 120)">
    <rect width="900" height="260" rx="16" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
    <text x="48" y="60" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="32" font-weight="800" fill="#0f172a">Advanced Diagnostics &amp; Scan Center</text>
    <text x="48" y="96" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" fill="#475569">Same-day reporting with 3 Tesla MRI, Low-Dose 128 Slice CT, and Automated Biochemistry</text>
    
    <rect x="48" y="130" width="180" height="44" rx="8" fill="#0f766e"/>
    <text x="138" y="157" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Book Scan Online</text>

    <rect x="244" y="130" width="180" height="44" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="334" y="157" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#334155" text-anchor="middle">Download Reports</text>

    <!-- 3 Quick Info Cards -->
    <g transform="translate(48, 200)">
      <text x="0" y="24" font-family="'Space Mono', monospace" font-size="12" fill="#0f766e" font-weight="700">✓ NABL ACCREDITED</text>
      <text x="240" y="24" font-family="'Space Mono', monospace" font-size="12" fill="#0f766e" font-weight="700">✓ 24/7 EMERGENCY SCAN</text>
      <text x="520" y="24" font-family="'Space Mono', monospace" font-size="12" fill="#0f766e" font-weight="700">✓ HOME SAMPLE PICKUP</text>
    </g>
  </g>

  <!-- 3 Service Highlights Grid (Cleanly Wrapped, Zero Text Overflow) -->
  <g transform="translate(64, 410)">
    <!-- Card 1: Pathology Tests -->
    <g transform="translate(0, 0)">
      <rect width="280" height="200" rx="14" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
      <circle cx="48" cy="48" r="20" fill="#ccfbf1"/>
      <text x="48" y="55" font-family="'Space Mono', monospace" font-size="16" fill="#0f766e" text-anchor="middle">🔬</text>
      <text x="32" y="100" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="700" fill="#0f172a">Pathology Tests</text>
      <text x="32" y="125" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#64748b">CBC, Thyroid, Lipid Profile,</text>
      <text x="32" y="145" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#64748b">HbA1c &amp; Renal Panels</text>
      <text x="32" y="174" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#0f766e">SAME-DAY RESULTS</text>
    </g>

    <!-- Card 2: MRI & CT Scans -->
    <g transform="translate(310, 0)">
      <rect width="280" height="200" rx="14" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
      <circle cx="48" cy="48" r="20" fill="#e0e7ff"/>
      <text x="48" y="55" font-family="'Space Mono', monospace" font-size="16" fill="#4338ca" text-anchor="middle">🩻</text>
      <text x="32" y="100" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="700" fill="#0f172a">MRI &amp; CT Scans</text>
      <text x="32" y="125" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#64748b">High-definition neuro, spine,</text>
      <text x="32" y="145" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#64748b">abdominal &amp; cardiac scans</text>
      <text x="32" y="174" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#4338ca">3T MRI · 128 SLICE</text>
    </g>

    <!-- Card 3: Preventive Health -->
    <g transform="translate(620, 0)">
      <rect width="280" height="200" rx="14" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
      <circle cx="48" cy="48" r="20" fill="#fef3c7"/>
      <text x="48" y="55" font-family="'Space Mono', monospace" font-size="16" fill="#b45309" text-anchor="middle">❤️</text>
      <text x="32" y="100" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="700" fill="#0f172a">Preventive Health</text>
      <text x="32" y="125" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#64748b">Comprehensive master health</text>
      <text x="32" y="145" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#64748b">and executive checkups</text>
      <text x="32" y="174" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#b45309">CUSTOM PACKAGES</text>
    </g>
  </g>

  <!-- Technical Feature Highlights on Left (Zero Overflow, Height 85px) -->
  <g transform="translate(64, 640)">
    <text x="0" y="24" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="800" fill="#0f172a">ENGINEERED VUE 3 CHAT ARCHITECTURE</text>
    
    <g transform="translate(0, 44)">
      <rect width="280" height="85" rx="10" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f766e">Typewriter Streaming UX</text>
      <text x="16" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#64748b">Dynamic ms pacing calibrated</text>
      <text x="16" y="66" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#64748b">smoothly to message length</text>
    </g>

    <g transform="translate(310, 44)">
      <rect width="280" height="85" rx="10" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f766e">AbortController In-Flight</text>
      <text x="16" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#64748b">Instant cancellation of ongoing</text>
      <text x="16" y="66" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#64748b">HTTP response stream</text>
    </g>

    <g transform="translate(620, 44)">
      <rect width="280" height="85" rx="10" fill="#ffffff" stroke="#d1e5e2" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f766e">LocalStorage Memory</text>
      <text x="16" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#64748b">Thread persistence across</text>
      <text x="16" y="66" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#64748b">full visitor session</text>
    </g>
  </g>

  <!-- THE ACTIVE VUE 3 CHATBOT WIDGET (Right Floating Popup - Matches ChatBot.vue) -->
  <g transform="translate(1020, 110)" filter="url(#widgetShadow)">
    <rect width="520" height="820" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>

    <!-- Widget Header (Dark mode #212121 from ChatBot.vue) -->
    <rect width="520" height="68" rx="18" fill="url(#widgetHeaderGrad)"/>
    <rect y="40" width="520" height="28" fill="url(#widgetHeaderGrad)"/>
    
    <circle cx="36" cy="34" r="8" fill="#10b981"/>
    <text x="56" y="39" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="700" fill="#ffffff">Uniscans AI Assistant</text>
    <rect x="360" y="20" width="80" height="26" rx="13" fill="#374151"/>
    <text x="400" y="37" font-family="'Space Mono', monospace" font-size="11" fill="#e2e8f0" text-anchor="middle">ONLINE</text>
    <text x="480" y="39" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" fill="#9ca3af" font-weight="400">✕</text>

    <!-- Chat Body Canvas -->
    <rect x="0" y="68" width="520" height="670" fill="#f8fafc"/>

    <!-- Logo / Brand Container inside Chat -->
    <g transform="translate(24, 88)">
      <rect width="472" height="60" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <rect x="16" y="14" width="32" height="32" rx="8" fill="#0f766e"/>
      <text x="32" y="36" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">U</text>
      <text x="60" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#0f172a">Uniscans &amp; Labs Diagnostic Assistant</text>
      <text x="60" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#64748b">Instant test booking, fasting rules &amp; report status</text>
    </g>

    <!-- Message 1: Assistant Welcome Bubble -->
    <g transform="translate(24, 164)">
      <rect width="430" height="68" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <text x="20" y="28" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#1e293b">Welcome to Uniscans! How may I assist you with</text>
      <text x="20" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#1e293b">scan appointments, fasting instructions, or test prices?</text>
    </g>

    <!-- Message 2: User Inquiry Bubble -->
    <g transform="translate(110, 248)">
      <rect width="386" height="64" rx="16" fill="#0f766e"/>
      <text x="20" y="28" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="500" fill="#ffffff">Can I book an Abdominal Ultrasound?</text>
      <text x="20" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="500" fill="#ffffff">What fasting is required before the test?</text>
    </g>

    <!-- Message 3: Assistant Detailed Answer -->
    <g transform="translate(24, 328)">
      <rect width="456" height="190" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <text x="20" y="28" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f766e">Abdominal Ultrasound Preparation:</text>
      
      <circle cx="28" cy="54" r="3" fill="#0f766e"/>
      <text x="40" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#334155"><tspan font-weight="700">Fasting:</tspan> Strictly 4 to 6 hours fasting prior to scan.</text>

      <circle cx="28" cy="84" r="3" fill="#0f766e"/>
      <text x="40" y="88" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#334155"><tspan font-weight="700">Hydration:</tspan> Drink 3–4 glasses of water 1 hr prior.</text>
      <text x="40" y="106" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#64748b">Full bladder required for acoustic clarity.</text>

      <circle cx="28" cy="132" r="3" fill="#0f766e"/>
      <text x="40" y="136" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#334155"><tspan font-weight="700">Earliest Slots:</tspan> Today at 3:30 PM or Tomorrow 9:00 AM.</text>

      <rect x="20" y="152" width="160" height="26" rx="6" fill="#ccfbf1"/>
      <text x="100" y="169" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">SLOT CONFIRMED: USG-44</text>
    </g>

    <!-- Message 4: User Follow-up -->
    <g transform="translate(180, 534)">
      <rect width="316" height="42" rx="16" fill="#0f766e"/>
      <text x="20" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="500" fill="#ffffff">What are sample collection timings?</text>
    </g>

    <!-- Message 5: Assistant Streaming Response -->
    <g transform="translate(24, 592)">
      <rect width="456" height="96" rx="16" fill="#ffffff" stroke="#0d9488" stroke-width="1.5"/>
      <text x="20" y="28" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#334155">Blood sample counters are open from <tspan font-weight="700" fill="#0f766e">7:00 AM to 8:30 PM</tspan>.</text>
      <text x="20" y="52" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#334155">Glucose and lipid panels are advised before 9:30 AM.</text>
      <text x="20" y="76" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#0f766e">Would you like a phlebotomist home visit?</text>
      <rect x="306" y="63" width="3" height="15" fill="#0f766e"/>
    </g>

    <!-- Bottom Input & AbortController Cancel Bar -->
    <g transform="translate(0, 738)">
      <rect width="520" height="82" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
      <rect width="520" height="20" fill="#ffffff"/>

      <rect x="20" y="18" width="370" height="46" rx="23" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
      <text x="44" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">Ask a question...</text>

      <rect x="404" y="18" width="96" height="46" rx="23" fill="#fee2e2" stroke="#f87171" stroke-width="1"/>
      <text x="452" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#ef4444" text-anchor="middle">Cancel ■</text>
    </g>
  </g>
</svg>
  `;
}

// 4. Chatbot Mobile View Generator - NOW A BALANCED 1600 x 1000 WIDESCREEN PRESENTATION
// This eliminates vertical scroll bloat completely while showing phone mockup + mobile engineering highlights!
function createChatbotMobileSvg() {
  const width = 1600;
  const height = 1000;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="phoneStageBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e2325"/>
      <stop offset="100%" stop-color="#081718"/>
    </linearGradient>
    <filter id="phoneShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#phoneStageBg)"/>

  <!-- Blueprint Grid -->
  <pattern id="mGrid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#134e4a" stroke-width="0.75" opacity="0.3"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#mGrid)"/>

  <!-- Top Title Bar -->
  <g transform="translate(64, 48)">
    <text x="0" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      AI CHATBOT · RESPONSIVE MOBILE ARCHITECTURE
    </text>
    <text x="0" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">
      Standalone Vue 3 Modal Integration · Touch Gestures · Streaming Throttling · Thread Persistence
    </text>

    <rect x="1360" y="10" width="180" height="38" rx="8" fill="#042f2e" stroke="#14b8a6" stroke-width="1.5"/>
    <text x="1450" y="34" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#5eead4" text-anchor="middle">
      &lt; 12KB GZIPPED
    </text>
  </g>

  <!-- ── LEFT: SMARTPHONE DEVICE MOCKUP (440 x 840) ── -->
  <g transform="translate(90, 115)" filter="url(#phoneShadow)">
    <rect width="440" height="840" rx="36" fill="#1e293b" stroke="#334155" stroke-width="3"/>
    <rect x="8" y="8" width="424" height="824" rx="30" fill="#ffffff"/>

    <!-- Dynamic Island -->
    <rect x="162" y="16" width="100" height="22" rx="11" fill="#0f172a"/>

    <!-- Status Bar -->
    <text x="36" y="32" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#0f172a">10:45</text>
    <text x="390" y="32" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#0f172a" text-anchor="end">5G 98%</text>

    <!-- Chat App Header inside Phone -->
    <g transform="translate(8, 48)">
      <rect width="424" height="52" fill="#111827"/>
      <circle cx="28" cy="26" r="5" fill="#10b981"/>
      <text x="42" y="31" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffffff">Uniscans Diagnostic Assistant</text>
      <text x="395" y="31" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" fill="#94a3b8" text-anchor="end">✕</text>
    </g>

    <!-- Chat Body -->
    <g transform="translate(8, 100)">
      <rect width="424" height="660" fill="#f8fafc"/>

      <!-- Welcome Banner -->
      <g transform="translate(16, 16)">
        <rect width="392" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="25" cy="25" r="12" fill="#0f766e"/>
        <text x="25" y="30" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">U</text>
        <text x="48" y="22" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Uniscans Health Assistant</text>
        <text x="48" y="38" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#64748b">Ask about MRI, Blood Tests &amp; Preparation</text>
      </g>

      <!-- User Message -->
      <g transform="translate(110, 80)">
        <rect width="298" height="52" rx="14" fill="#0f766e"/>
        <text x="14" y="22" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#ffffff">Is fasting required for Thyroid &amp;</text>
        <text x="14" y="40" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#ffffff">Lipid Profile blood tests?</text>
      </g>

      <!-- Assistant Message with Fasting Rules -->
      <g transform="translate(16, 146)">
        <rect width="392" height="150" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="14" y="24" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f766e">Test Preparation Guidelines:</text>
        
        <circle cx="20" cy="45" r="2.5" fill="#0f766e"/>
        <text x="28" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10.5" fill="#334155"><tspan font-weight="700">Lipid Profile:</tspan> 10–12h overnight fasting.</text>
        
        <circle cx="20" cy="68" r="2.5" fill="#0f766e"/>
        <text x="28" y="71" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10.5" fill="#334155"><tspan font-weight="700">Thyroid (TSH):</tspan> Early morning sample before</text>
        <text x="28" y="85" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10.5" fill="#334155">daily thyroid medication.</text>

        <circle cx="20" cy="106" r="2.5" fill="#0f766e"/>
        <text x="28" y="109" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10.5" fill="#334155"><tspan font-weight="700">Water:</tspan> Plain water is allowed &amp; advised.</text>

        <rect x="14" y="122" width="150" height="20" rx="4" fill="#ccfbf1"/>
        <text x="89" y="136" font-family="'Space Mono', monospace" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">HOME COLLECTION</text>
      </g>

      <!-- User Message 2 -->
      <g transform="translate(170, 312)">
        <rect width="238" height="36" rx="14" fill="#0f766e"/>
        <text x="14" y="23" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#ffffff">What are clinic timings?</text>
      </g>

      <!-- Assistant Message 2 (Streaming) -->
      <g transform="translate(16, 362)">
        <rect width="392" height="76" rx="14" fill="#ffffff" stroke="#14b8a6" stroke-width="1.5"/>
        <text x="14" y="24" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#334155">Primary center open <tspan font-weight="700" fill="#0f766e">7:00 AM – 8:30 PM</tspan></text>
        <text x="14" y="44" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#334155">Monday to Saturday. Reports ready online in 4h.</text>
        
        <circle cx="20" cy="62" r="3" fill="#0f766e"/>
        <circle cx="30" cy="62" r="3" fill="#0f766e" opacity="0.6"/>
        <circle cx="40" cy="62" r="3" fill="#0f766e" opacity="0.3"/>
        <text x="54" y="66" font-family="'Space Mono', monospace" font-size="9" fill="#64748b">Streaming response...</text>
      </g>
    </g>

    <!-- Mobile Input Bar -->
    <g transform="translate(8, 760)">
      <rect width="424" height="66" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <rect x="14" y="12" width="340" height="40" rx="20" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
      <text x="32" y="37" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Ask a question...</text>

      <circle cx="385" cy="32" r="18" fill="#0f766e"/>
      <text x="385" y="37" font-family="'Space Mono', monospace" font-size="13" fill="#ffffff" text-anchor="middle">➤</text>
    </g>

    <!-- Bottom Indicator -->
    <rect x="160" y="818" width="120" height="4" rx="2" fill="#0f172a"/>
  </g>

  <!-- ── RIGHT: 4 MOBILE ARCHITECTURE & UX FEATURE HIGHLIGHTS ── -->
  <g transform="translate(600, 140)">
    <!-- Feature 1: Responsive Modal Constraint -->
    <g transform="translate(0, 0)">
      <rect width="940" height="175" rx="16" fill="#102f31" stroke="#1d4e4c" stroke-width="1.5"/>
      <circle cx="44" cy="44" r="22" fill="#042f2e"/>
      <text x="44" y="51" font-family="'Space Mono', monospace" font-size="16" fill="#2dd4bf" text-anchor="middle">📱</text>
      <text x="84" y="40" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">Adaptive Viewport &amp; Keyboard Handling</text>
      <text x="84" y="64" font-family="'Space Mono', monospace" font-size="12" fill="#2dd4bf" font-weight="700">100dvh Dynamic Viewport Support · Zero Virtual Keyboard Jump</text>
      <text x="84" y="96" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">Built with dynamic viewport units (100dvh) ensuring the chat input bar stays anchored above</text>
      <text x="84" y="116" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">iOS and Android virtual keyboards without layout truncation or accidental viewport zoom.</text>
      <text x="84" y="142" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Auto-scrolls smoothly to the active message during streaming responses.</text>
      <text x="84" y="162" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Touch-friendly 48px tap targets compliant with WCAG AAA accessibility standards.</text>
    </g>

    <!-- Feature 2: In-Flight Request Cancellation -->
    <g transform="translate(0, 205)">
      <rect width="940" height="175" rx="16" fill="#102f31" stroke="#1d4e4c" stroke-width="1.5"/>
      <circle cx="44" cy="44" r="22" fill="#382103"/>
      <text x="44" y="51" font-family="'Space Mono', monospace" font-size="16" fill="#fbbf24" text-anchor="middle">⚡</text>
      <text x="84" y="40" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">Mobile AbortController In-Flight Cancellation</text>
      <text x="84" y="64" font-family="'Space Mono', monospace" font-size="12" fill="#fbbf24" font-weight="700">Instant Network Free · Zero Battery Drain on Interrupted Queries</text>
      <text x="84" y="96" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">Mobile users frequently switch tasks or tap away mid-response. Built with native browser</text>
      <text x="84" y="116" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">AbortController: closing popup or typing a new question immediately aborts active fetch signal.</text>
      <text x="84" y="142" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Halts character typewriter loop and frees JavaScript timer thread instantly.</text>
      <text x="84" y="162" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Preserves mobile battery life and reduces cellular data consumption.</text>
    </g>

    <!-- Feature 3: LocalStorage Thread Memory -->
    <g transform="translate(0, 410)">
      <rect width="940" height="175" rx="16" fill="#102f31" stroke="#1d4e4c" stroke-width="1.5"/>
      <circle cx="44" cy="44" r="22" fill="#082f49"/>
      <text x="44" y="51" font-family="'Space Mono', monospace" font-size="16" fill="#38bdf8" text-anchor="middle">🧠</text>
      <text x="84" y="40" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">Session Persistence Across Navigation</text>
      <text x="84" y="64" font-family="'Space Mono', monospace" font-size="12" fill="#38bdf8" font-weight="700">Thread ID &amp; Message History Synchronized to LocalStorage</text>
      <text x="84" y="96" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">Patients navigating between hospital test pricing, doctor lists, and booking pages never lose</text>
      <text x="84" y="116" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">their ongoing chat thread. The conversation state is serialized seamlessly to localStorage.</text>
      <text x="84" y="142" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Seamless multi-page continuity without requiring user authentication.</text>
      <text x="84" y="162" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Includes auto-sanitization to guard against stale thread identifiers.</text>
    </g>

    <!-- Feature 4: Lightweight Markdown & Fast Pacing -->
    <g transform="translate(0, 615)">
      <rect width="940" height="175" rx="16" fill="#102f31" stroke="#1d4e4c" stroke-width="1.5"/>
      <circle cx="44" cy="44" r="22" fill="#2e1065"/>
      <text x="44" y="51" font-family="'Space Mono', monospace" font-size="16" fill="#c084fc" text-anchor="middle">🚀</text>
      <text x="84" y="40" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">Zero Heavy Dependencies (&lt; 12KB Gzipped)</text>
      <text x="84" y="64" font-family="'Space Mono', monospace" font-size="12" fill="#c084fc" font-weight="700">Replaces Heavy 500KB Third-Party Chatbots with Vue 3 Micro-Component</text>
      <text x="84" y="96" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">Third-party enterprise chatbots load heavy analytics, trackers, and bloated external CSS.</text>
      <text x="84" y="116" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#94a3b8">Our custom Vue 3 widget executes natively with pure reactive state and lightweight regex parsing.</text>
      <text x="84" y="142" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• 100/100 Lighthouse Performance score impact on host healthcare portal.</text>
      <text x="84" y="162" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1">• Regex-based parser formats code blocks, bold, italics, and lists without heavy libraries.</text>
    </g>
  </g>
</svg>
  `;
}

// 5. Azure CI/CD Architecture Flowchart (1800 x 1100)
// WITH ZERO TEXT OVERFLOW: 316px wide columns, 284px cards, 252px code boxes, with all lines safely wrapped
function createCicdFlowchartSvg() {
  const width = 1800;
  const height = 1100;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cicdBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f2b2b"/>
      <stop offset="100%" stop-color="#081819"/>
    </linearGradient>
    <linearGradient id="nodeGradAzure" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="nodeGradBuild" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d9488"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>
    <linearGradient id="nodeGradBackup" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="nodeGradPM2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="nodeGradVerify" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <filter id="diagShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#cicdBg)"/>

  <!-- Blueprint Grid -->
  <pattern id="diagGrid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#134e4a" stroke-width="0.75" opacity="0.35"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#diagGrid)"/>

  <!-- Title & Subtitle Banner -->
  <g transform="translate(38, 48)">
    <text x="0" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      AZURE DEVOPS MULTI-SITE CI/CD &amp; PM2 ZERO-DOWNTIME PIPELINE
    </text>
    <text x="0" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#94a3b8">
      Architected for Production Healthcare Nuxt 3 SSR Portals (Movewell, SUT Hospital, Uniscans) · Windows Server Host
    </text>

    <rect x="1474" y="10" width="250" height="38" rx="8" fill="#042f2e" stroke="#14b8a6" stroke-width="1.5"/>
    <text x="1599" y="34" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#5eead4" text-anchor="middle">
      100% AUTOMATED DELIVERY
    </text>
  </g>

  <!-- ── STAGE 1: TRIGGER & COMMIT TAG ROUTING (x: 38) ── -->
  <g transform="translate(38, 150)" filter="url(#diagShadow)">
    <rect width="316" height="850" rx="16" fill="#0e2627" stroke="#1a5350" stroke-width="1.5"/>
    <rect width="316" height="56" rx="16" fill="url(#nodeGradAzure)"/>
    <text x="20" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff">01. GIT COMMIT &amp; ROUTING</text>

    <!-- Node 1: Git Push -->
    <g transform="translate(16, 80)">
      <rect width="284" height="90" rx="10" fill="#143638" stroke="#226462" stroke-width="1"/>
      <text x="16" y="28" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Developer Git Push</text>
      <text x="16" y="48" font-family="'Space Mono', monospace" font-size="11" fill="#38bdf8">git push origin [branch]</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Branches: movewell, sut, uni</text>
    </g>

    <text x="16" y="200" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#38bdf8">TAG PARSER SYNTAX:</text>

    <!-- Tag 1: #test -->
    <g transform="translate(16, 215)">
      <rect width="284" height="80" rx="10" fill="#143638" stroke="#0284c7" stroke-width="1"/>
      <rect x="12" y="12" width="70" height="24" rx="6" fill="#0369a1"/>
      <text x="47" y="29" font-family="'Space Mono', monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">#test</text>
      <text x="16" y="55" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">Target: Staging Server</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Port 3001 · QA Staging Environment</text>
    </g>

    <!-- Tag 2: #live -->
    <g transform="translate(16, 310)">
      <rect width="284" height="80" rx="10" fill="#143638" stroke="#10b981" stroke-width="1"/>
      <rect x="12" y="12" width="70" height="24" rx="6" fill="#047857"/>
      <text x="47" y="29" font-family="'Space Mono', monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">#live</text>
      <text x="16" y="55" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">Target: Live Production</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Port 3000 · Hospital Domain Traffic</text>
    </g>

    <!-- Tag 3: #both -->
    <g transform="translate(16, 405)">
      <rect width="284" height="80" rx="10" fill="#143638" stroke="#a855f7" stroke-width="1"/>
      <rect x="12" y="12" width="70" height="24" rx="6" fill="#6d28d9"/>
      <text x="47" y="29" font-family="'Space Mono', monospace" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">#both</text>
      <text x="16" y="55" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#e2e8f0">Deploy Test Then Live</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Sequential automated dual deployment</text>
    </g>

    <!-- Tag 4: #rollback -->
    <g transform="translate(16, 500)">
      <rect width="284" height="96" rx="10" fill="#143638" stroke="#f43f5e" stroke-width="1"/>
      <rect x="12" y="12" width="85" height="24" rx="6" fill="#be123c"/>
      <text x="54" y="29" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">#rollback</text>
      <text x="16" y="55" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#fecdd3">Instant Snapshot Recovery</text>
      <text x="16" y="72" font-family="'Space Mono', monospace" font-size="10" fill="#94a3b8">#rollback:ddMMyy_HH-mm</text>
      <text x="16" y="87" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#fda4af">Bypasses build, restores backup dir</text>
    </g>

    <!-- Key Architecture Highlight Box -->
    <g transform="translate(16, 620)">
      <rect width="284" height="200" rx="10" fill="#091c1d" stroke="#1d4e4c" stroke-width="1"/>
      <text x="16" y="26" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#14b8a6">KEY HIGHLIGHT:</text>
      
      <text x="16" y="50" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Zero Config Overhead</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Commit messages drive release targets</text>
      <text x="16" y="86" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">without manually changing pipeline YAML.</text>

      <text x="16" y="122" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Regex Tag Validation</text>
      <text x="16" y="142" font-family="'Space Mono', monospace" font-size="10" fill="#5eead4">ParseCommitMessage.ps1</text>
      <text x="16" y="162" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Extracts tokens before stage execution.</text>
    </g>
  </g>

  <!-- Flow Connector 1 -> 2 -->
  <path d="M 354 320 L 378 320" stroke="#14b8a6" stroke-width="3" stroke-dasharray="6,4" fill="none"/>
  <polygon points="378,314 390,320 378,326" fill="#14b8a6"/>

  <!-- ── STAGE 2: AZURE PIPELINE & DYNAMIC RUNTIME (x: 390) ── -->
  <g transform="translate(390, 150)" filter="url(#diagShadow)">
    <rect width="316" height="850" rx="16" fill="#0e2627" stroke="#1a5350" stroke-width="1.5"/>
    <rect width="316" height="56" rx="16" fill="url(#nodeGradBuild)"/>
    <text x="20" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff">02. BUILD &amp; NODE RUNTIME</text>

    <!-- Node 1: Self Hosted Agent -->
    <g transform="translate(16, 80)">
      <rect width="284" height="96" rx="10" fill="#143638" stroke="#14b8a6" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#5eead4">Self-Hosted Agent</text>
      <text x="16" y="46" font-family="'Space Mono', monospace" font-size="11" fill="#94a3b8">C:\azagent-website</text>
      <text x="16" y="66" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Dedicated Windows Service</text>
      <text x="16" y="84" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#5eead4">PAT Token Authentication</text>
    </g>

    <!-- Node 2: NodeTool Isolation -->
    <g transform="translate(16, 196)">
      <rect width="284" height="150" rx="10" fill="#143638" stroke="#0ea5e9" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#38bdf8">NodeTool@0 Control</text>
      <text x="16" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Dynamic runtime per pipeline:</text>
      
      <rect x="16" y="56" width="252" height="30" rx="6" fill="#0c2021"/>
      <text x="28" y="76" font-family="'Space Mono', monospace" font-size="11" fill="#38bdf8">Movewell: Node 20.x</text>

      <rect x="16" y="92" width="252" height="30" rx="6" fill="#0c2021"/>
      <text x="28" y="112" font-family="'Space Mono', monospace" font-size="11" fill="#38bdf8">Legacy Portal: Node 18.x</text>
      <text x="16" y="138" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">No host-wide global conflicts</text>
    </g>

    <!-- Node 3: Nuxt 3 SSR Compilation -->
    <g transform="translate(16, 366)">
      <rect width="284" height="210" rx="10" fill="#143638" stroke="#10b981" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#34d399">Nuxt 3 SSR Compilation</text>
      
      <rect x="16" y="38" width="252" height="26" rx="4" fill="#0c2021"/>
      <text x="24" y="55" font-family="'Space Mono', monospace" font-size="10" fill="#a7f3d0">npm ci --prefer-offline</text>

      <rect x="16" y="70" width="252" height="26" rx="4" fill="#0c2021"/>
      <text x="24" y="87" font-family="'Space Mono', monospace" font-size="10" fill="#a7f3d0">npx nuxi build</text>

      <text x="16" y="118" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#e2e8f0">Build Artifacts Generated:</text>
      <text x="16" y="140" font-family="'Space Mono', monospace" font-size="11" fill="#5eead4">📁 .output/server</text>
      <text x="16" y="158" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Nitro Node engine chunks</text>

      <text x="16" y="180" font-family="'Space Mono', monospace" font-size="11" fill="#5eead4">📁 .output/public</text>
      <text x="16" y="198" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Prerendered HTML &amp; static assets</text>
    </g>

    <!-- Key Architecture Highlight Box -->
    <g transform="translate(16, 596)">
      <rect width="284" height="224" rx="10" fill="#091c1d" stroke="#1d4e4c" stroke-width="1"/>
      <text x="16" y="26" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#14b8a6">KEY HIGHLIGHT:</text>
      
      <text x="16" y="50" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Full Node Version Isolation</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Healthcare sites require different</text>
      <text x="16" y="86" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Node versions. NodeTool isolates</text>
      <text x="16" y="102" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">toolkits in agent cache safely.</text>

      <text x="16" y="136" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Clean Build Cache</text>
      <text x="16" y="156" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Eliminates phantom build bugs from</text>
      <text x="16" y="172" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">stale dependencies &amp; old lockfiles.</text>
    </g>
  </g>

  <!-- Flow Connector 2 -> 3 -->
  <path d="M 706 320 L 730 320" stroke="#14b8a6" stroke-width="3" stroke-dasharray="6,4" fill="none"/>
  <polygon points="730,314 742,320 730,326" fill="#14b8a6"/>

  <!-- ── STAGE 3: SMART AUTOMATED BACKUP ENGINE (x: 742) ── -->
  <g transform="translate(742, 150)" filter="url(#diagShadow)">
    <rect width="316" height="850" rx="16" fill="#0e2627" stroke="#1a5350" stroke-width="1.5"/>
    <rect width="316" height="56" rx="16" fill="url(#nodeGradBackup)"/>
    <text x="20" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff">03. SMART BACKUP ENGINE</text>

    <!-- Node 1: Pre-Deploy Snapshot -->
    <g transform="translate(16, 80)">
      <rect width="284" height="150" rx="10" fill="#143638" stroke="#f59e0b" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#fbbf24">Pre-Deploy Backup Engine</text>
      <text x="16" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Archives live site before sync:</text>
      
      <rect x="16" y="58" width="252" height="48" rx="6" fill="#0c2021"/>
      <text x="24" y="78" font-family="'Space Mono', monospace" font-size="10" fill="#fbbf24">F:\WebsiteBackUp\</text>
      <text x="24" y="94" font-family="'Space Mono', monospace" font-size="10" fill="#fde68a">[SITE]\MONTH\ddMMyy_HH-mm</text>
      
      <text x="16" y="130" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Captures .output/server &amp; public</text>
    </g>

    <!-- Node 2: 90-Day Retention Pruning -->
    <g transform="translate(16, 250)">
      <rect width="284" height="130" rx="10" fill="#143638" stroke="#d97706" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#fbbf24">90-Day Retention Pruning</text>
      <text x="16" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Automated disk cleanup script:</text>
      <rect x="16" y="58" width="252" height="38" rx="6" fill="#0c2021"/>
      <text x="24" y="76" font-family="'Space Mono', monospace" font-size="10" fill="#fcd34d">Get-ChildItem -Recurse |</text>
      <text x="24" y="90" font-family="'Space Mono', monospace" font-size="10" fill="#fcd34d">Where {$_.LastWrite &lt; -90d}</text>
      <text x="16" y="118" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Prevents Windows drive filling</text>
    </g>

    <!-- Node 3: Deduplication -->
    <g transform="translate(16, 400)">
      <rect width="284" height="130" rx="10" fill="#143638" stroke="#b45309" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#fbbf24">Daily Deduplication</text>
      <text x="16" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Multiple releases same day:</text>
      <text x="16" y="72" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">• Stores differential zip archive</text>
      <text x="16" y="92" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">• Maintains rollback index tree</text>
      <text x="16" y="112" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">• Saves ~80% physical disk space</text>
    </g>

    <!-- Key Architecture Highlight Box -->
    <g transform="translate(16, 550)">
      <rect width="284" height="270" rx="10" fill="#091c1d" stroke="#1d4e4c" stroke-width="1"/>
      <text x="16" y="26" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#14b8a6">KEY HIGHLIGHT:</text>
      
      <text x="16" y="50" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Enterprise Compliance</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Healthcare platforms demand strict</text>
      <text x="16" y="86" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">auditability. Every build pushed is</text>
      <text x="16" y="102" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">preserved to an isolated F:\ volume.</text>

      <text x="16" y="136" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Zero In-Place Overwrites</text>
      <text x="16" y="156" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">If deploy fails at any step,</text>
      <text x="16" y="172" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">the exact prior version is</text>
      <text x="16" y="188" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">restored in &lt;14s without rebuild.</text>
    </g>
  </g>

  <!-- Flow Connector 3 -> 4 -->
  <path d="M 1058 320 L 1082 320" stroke="#14b8a6" stroke-width="3" stroke-dasharray="6,4" fill="none"/>
  <polygon points="1082,314 1094,320 1082,326" fill="#14b8a6"/>

  <!-- ── STAGE 4: PM2 ZERO-LOCK DEPLOYMENT (x: 1094) ── -->
  <g transform="translate(1094, 150)" filter="url(#diagShadow)">
    <rect width="316" height="850" rx="16" fill="#0e2627" stroke="#1a5350" stroke-width="1.5"/>
    <rect width="316" height="56" rx="16" fill="url(#nodeGradPM2)"/>
    <text x="20" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff">04. PM2 PROCESS &amp; SYNC</text>

    <!-- Node 1: Graceful Stop -->
    <g transform="translate(16, 80)">
      <rect width="284" height="150" rx="10" fill="#143638" stroke="#a855f7" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#c084fc">Graceful PM2 Process Stop</text>
      <text x="16" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Fixes Windows DLL Lock bug:</text>
      
      <rect x="16" y="58" width="252" height="44" rx="6" fill="#0c2021"/>
      <text x="24" y="76" font-family="'Space Mono', monospace" font-size="10" fill="#d8b4fe">pm2 stop [site-app]</text>
      <text x="24" y="92" font-family="'Space Mono', monospace" font-size="10" fill="#e9d5ff">pm2 delete [site-app]</text>
      
      <text x="16" y="124" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Releases file locks on server.mjs</text>
    </g>

    <!-- Node 2: Robocopy Mirroring -->
    <g transform="translate(16, 250)">
      <rect width="284" height="150" rx="10" fill="#143638" stroke="#9333ea" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#c084fc">Robocopy Delta Mirror</text>
      <text x="16" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Ultra-fast multi-threaded copy:</text>
      
      <rect x="16" y="58" width="252" height="44" rx="6" fill="#0c2021"/>
      <text x="24" y="76" font-family="'Space Mono', monospace" font-size="10" fill="#d8b4fe">robocopy /MIR /R:2 /W:3</text>
      <text x="24" y="92" font-family="'Space Mono', monospace" font-size="10" fill="#e9d5ff">/XD .git node_modules</text>
      
      <text x="16" y="124" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Syncs .output/public &amp; server</text>
    </g>

    <!-- Node 3: Ecosystem Reload -->
    <g transform="translate(16, 420)">
      <rect width="284" height="150" rx="10" fill="#143638" stroke="#7e22ce" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#c084fc">PM2 Cluster Start</text>
      <text x="16" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Spawns multi-core cluster:</text>
      
      <rect x="16" y="58" width="252" height="44" rx="6" fill="#0c2021"/>
      <text x="24" y="76" font-family="'Space Mono', monospace" font-size="10" fill="#d8b4fe">pm2 start ecosystem.config.js</text>
      <text x="24" y="92" font-family="'Space Mono', monospace" font-size="10" fill="#e9d5ff">pm2 save --force</text>
      
      <text x="16" y="124" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Auto-restarts on server reboot</text>
    </g>

    <!-- Key Architecture Highlight Box -->
    <g transform="translate(16, 590)">
      <rect width="284" height="230" rx="10" fill="#091c1d" stroke="#1d4e4c" stroke-width="1"/>
      <text x="16" y="26" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#14b8a6">KEY HIGHLIGHT:</text>
      
      <text x="16" y="50" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Zero DLL Contention</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Active Node processes lock shared</text>
      <text x="16" y="86" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">libraries and entry scripts on Windows.</text>
      <text x="16" y="102" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Graceful stop eliminates errors.</text>

      <text x="16" y="136" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Sub-4 Second Reload</text>
      <text x="16" y="156" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Graceful stop + robocopy and cluster</text>
      <text x="16" y="172" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">restart completes in under 4 seconds.</text>
    </g>
  </g>

  <!-- Flow Connector 4 -> 5 -->
  <path d="M 1410 320 L 1434 320" stroke="#14b8a6" stroke-width="3" stroke-dasharray="6,4" fill="none"/>
  <polygon points="1434,314 1446,320 1434,326" fill="#14b8a6"/>

  <!-- ── STAGE 5: HEALTH VERIFICATION & AUTO ROLLBACK (x: 1446) ── -->
  <g transform="translate(1446, 150)" filter="url(#diagShadow)">
    <rect width="316" height="850" rx="16" fill="#0e2627" stroke="#1a5350" stroke-width="1.5"/>
    <rect width="316" height="56" rx="16" fill="url(#nodeGradVerify)"/>
    <text x="20" y="35" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#ffffff">05. VERIFY &amp; ROLLBACK</text>

    <!-- Node 1: HTTP Health Check -->
    <g transform="translate(16, 80)">
      <rect width="284" height="160" rx="10" fill="#143638" stroke="#10b981" stroke-width="1"/>
      <text x="16" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="700" fill="#34d399">HTTP 200 Health Probe</text>
      <text x="16" y="46" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#cbd5e1">Automated endpoint validation:</text>
      
      <rect x="16" y="58" width="252" height="44" rx="6" fill="#0c2021"/>
      <text x="24" y="76" font-family="'Space Mono', monospace" font-size="10" fill="#a7f3d0">Invoke-RestMethod \</text>
      <text x="24" y="92" font-family="'Space Mono', monospace" font-size="10" fill="#a7f3d0">http://localhost:3000/api/health</text>
      
      <text x="16" y="124" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10" fill="#94a3b8">Validates SSR Nitro engine &amp; DB</text>
    </g>

    <!-- Branch A: Success -->
    <g transform="translate(16, 260)">
      <rect width="284" height="150" rx="10" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="10" fill="#10b981"/>
      <text x="28" y="33" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="900" fill="#064e3b" text-anchor="middle">✓</text>
      <text x="48" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff">Branch A: SUCCESS</text>
      <text x="16" y="60" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#a7f3d0">• Health check HTTP 200 OK</text>
      <text x="16" y="80" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#a7f3d0">• PM2 Cluster marked online</text>
      <text x="16" y="100" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#a7f3d0">• Logs deployment timestamp</text>
      <text x="16" y="122" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#34d399">Release Successful 🟢</text>
    </g>

    <!-- Branch B: Auto-Rollback -->
    <g transform="translate(16, 430)">
      <rect width="284" height="170" rx="10" fill="#4c0519" stroke="#f43f5e" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="10" fill="#f43f5e"/>
      <text x="28" y="33" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">✕</text>
      <text x="48" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff">Branch B: AUTO-ROLLBACK</text>
      <text x="16" y="60" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#fecdd3">• Health check timeout / error</text>
      <text x="16" y="80" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#fecdd3">• Immediate recovery trigger</text>
      <text x="16" y="100" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#fecdd3">• Restores F:\WebsiteBackUp</text>
      <text x="16" y="120" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#fecdd3">• PM2 reloads prior working app</text>
      <text x="16" y="146" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#fb7185">Zero Downtime Revert 🛡</text>
    </g>

    <!-- Key Architecture Highlight Box -->
    <g transform="translate(16, 620)">
      <rect width="284" height="200" rx="10" fill="#091c1d" stroke="#1d4e4c" stroke-width="1"/>
      <text x="16" y="26" font-family="'Space Mono', monospace" font-size="11" font-weight="700" fill="#14b8a6">KEY HIGHLIGHT:</text>
      
      <text x="16" y="50" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Fail-Safe Hospital SLA</text>
      <text x="16" y="70" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Patient appointment portals</text>
      <text x="16" y="86" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">cannot suffer downtime.</text>
      <text x="16" y="102" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Auto health-gate ensures safety.</text>

      <text x="16" y="136" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" fill="#cbd5e1" font-weight="600">Instant Release Auditing</text>
      <text x="16" y="156" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">Reversion is instant (&lt;14s)</text>
      <text x="16" y="172" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" fill="#94a3b8">and logged to Azure timeline.</text>
    </g>
  </g>

  <!-- Bottom Architecture Metrics Footer -->
  <g transform="translate(38, 1020)">
    <rect width="1724" height="60" rx="12" fill="#0e2627" stroke="#1a5350" stroke-width="1"/>
    
    <text x="32" y="36" font-family="'Space Mono', monospace" font-size="13" font-weight="700" fill="#14b8a6">SYSTEM METRICS:</text>
    
    <text x="210" y="36" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#cbd5e1">
      Average Deployment: <tspan font-weight="700" fill="#ffffff">~42 seconds</tspan>
    </text>
    
    <text x="580" y="36" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#cbd5e1">
      Rollback Execution: <tspan font-weight="700" fill="#ffffff">&lt; 14 seconds</tspan>
    </text>
    
    <text x="960" y="36" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#cbd5e1">
      Windows DLL Contention: <tspan font-weight="700" fill="#34d399">100% Lock-Free</tspan>
    </text>
    
    <text x="1370" y="36" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#cbd5e1">
      Sites: <tspan font-weight="700" fill="#38bdf8">Movewell · SUT · Uniscans</tspan>
    </text>
  </g>
</svg>
  `;
}

async function run() {
  console.log('Generating high-fidelity visuals for selected work...');

  const tasks = [
    {
      name: 'Queue Operations Dashboard',
      svg: createQueueDashboardSvg(),
      destPublic: 'D:/Nuxt Vue/Portfolio/public/assets/images/queue/queue_dashboard.webp',
      destAssets: 'D:/Nuxt Vue/Portfolio/assets/images/queue/queue_dashboard.webp'
    },
    {
      name: 'Public Token Display Board',
      svg: createTokenDisplaySvg(),
      destPublic: 'D:/Nuxt Vue/Portfolio/public/assets/images/queue/token_display.webp',
      destAssets: 'D:/Nuxt Vue/Portfolio/assets/images/queue/token_display.webp'
    },
    {
      name: 'AI Chatbot Interface Widget',
      svg: createChatbotInterfaceSvg(),
      destPublic: 'D:/Nuxt Vue/Portfolio/public/assets/images/chatbot/chatbot_interface.webp',
      destAssets: 'D:/Nuxt Vue/Portfolio/assets/images/chatbot/chatbot_interface.webp'
    },
    {
      name: 'AI Chatbot Mobile View (Widescreen 1600x1000)',
      svg: createChatbotMobileSvg(),
      destPublic: 'D:/Nuxt Vue/Portfolio/public/assets/images/chatbot/chatbot_mobile.webp',
      destAssets: 'D:/Nuxt Vue/Portfolio/assets/images/chatbot/chatbot_mobile.webp'
    },
    {
      name: 'Azure DevOps CI/CD Architecture Flowchart (Fixed Overflows)',
      svg: createCicdFlowchartSvg(),
      destPublic: 'D:/Nuxt Vue/Portfolio/public/assets/images/cicd/pipeline_flow.webp',
      destAssets: 'D:/Nuxt Vue/Portfolio/assets/images/cicd/pipeline_flow.webp'
    }
  ];

  for (const t of tasks) {
    const buf = Buffer.from(t.svg);
    // Write public
    fs.mkdirSync(path.dirname(t.destPublic), { recursive: true });
    await sharp(buf).webp({ quality: 95, lossless: false }).toFile(t.destPublic);
    // Write assets
    fs.mkdirSync(path.dirname(t.destAssets), { recursive: true });
    await sharp(buf).webp({ quality: 95, lossless: false }).toFile(t.destAssets);
    console.log(`✓ Generated: ${t.name}`);
  }

  console.log('All selected work visuals regenerated successfully!');
}

run().catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});
