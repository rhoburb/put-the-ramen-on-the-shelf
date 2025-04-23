export const UpperArmSVG = `
<svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main upper arm shape with gradient -->
  <defs>
    <linearGradient id="armGradient" x1="0" y1="0" x2="0" y2="40">
      <stop offset="0%" stop-color="#4a5568"/>
      <stop offset="100%" stop-color="#2d3748"/>
    </linearGradient>
  </defs>

  <!-- Base arm shape -->
  <rect width="200" height="40" fill="url(#armGradient)" />

  <!-- Shoulder joint mechanism -->
  <circle cx="20" cy="20" r="15" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
  <circle cx="20" cy="20" r="8" fill="#1a202c"/>

  <!-- Hydraulic system -->
  <path d="M40 10 L180 30" 
        stroke="#2d3748" 
        stroke-width="12"
        stroke-linecap="round"/>

  <!-- Panel sections -->
  <rect x="50" y="5" width="30" height="30" rx="2" fill="#2d3748" stroke="#1a202c"/>
  <rect x="100" y="5" width="30" height="30" rx="2" fill="#2d3748" stroke="#1a202c"/>
  <rect x="150" y="5" width="30" height="30" rx="2" fill="#2d3748" stroke="#1a202c"/>

  <!-- Indicator lights -->
  <circle cx="65" cy="20" r="4" fill="#48bb78"/>
  <circle cx="115" cy="20" r="4" fill="#ecc94b"/>
  <circle cx="165" cy="20" r="4" fill="#f56565"/>

  <!-- Decorative lines -->
  <line x1="85" y1="10" x2="95" y2="10" stroke="#1a202c" stroke-width="2"/>
  <line x1="135" y1="10" x2="145" y2="10" stroke="#1a202c" stroke-width="2"/>
  <line x1="85" y1="30" x2="95" y2="30" stroke="#1a202c" stroke-width="2"/>
  <line x1="135" y1="30" x2="145" y2="30" stroke="#1a202c" stroke-width="2"/>
</svg>`;