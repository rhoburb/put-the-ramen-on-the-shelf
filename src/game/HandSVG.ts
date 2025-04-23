export const HandSVG = `
<svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main hand shape with gradient -->
  <defs>
    <linearGradient id="handGradient" x1="0" y1="0" x2="0" y2="40">
      <stop offset="0%" stop-color="#4a5568"/>
      <stop offset="100%" stop-color="#2d3748"/>
    </linearGradient>
  </defs>

  <!-- Base hand shape -->
  <path d="M0 0 h70 l10 20 l-10 20 h-70 v-40" fill="url(#handGradient)"/>

  <!-- Wrist joint -->
  <circle cx="15" cy="20" r="12" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
  <circle cx="15" cy="20" r="6" fill="#1a202c"/>

  <!-- Finger mechanism -->
  <path d="M70 10 l20 0" stroke="#2d3748" stroke-width="6" stroke-linecap="round"/>
  <path d="M70 30 l20 0" stroke="#2d3748" stroke-width="6" stroke-linecap="round"/>
  
  <!-- Tech panel -->
  <rect x="30" y="10" width="30" height="20" rx="2" fill="#2d3748" stroke="#1a202c"/>

  <!-- Indicator light -->
  <circle cx="45" cy="20" r="4" fill="#4299e1"/>

  <!-- Decorative lines -->
  <line x1="35" y1="15" x2="55" y2="15" stroke="#1a202c" stroke-width="1"/>
  <line x1="35" y1="25" x2="55" y2="25" stroke="#1a202c" stroke-width="1"/>
</svg>`;