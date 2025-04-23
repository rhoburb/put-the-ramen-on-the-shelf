export const ForearmSVG = `
<svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main forearm shape with gradient -->
  <defs>
    <linearGradient id="forearmGradient" x1="0" y1="0" x2="0" y2="40">
      <stop offset="0%" stop-color="#4a5568"/>
      <stop offset="100%" stop-color="#2d3748"/>
    </linearGradient>
  </defs>

  <!-- Base forearm shape -->
  <rect width="200" height="40" fill="url(#forearmGradient)" />

  <!-- Elbow joint -->
  <circle cx="20" cy="20" r="15" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
  <circle cx="20" cy="20" r="8" fill="#1a202c"/>

  <!-- Central mechanism -->
  <rect x="60" y="10" width="80" height="20" rx="4" fill="#2d3748" stroke="#1a202c"/>
  
  <!-- Hydraulic pistons -->
  <path d="M30 15 L170 25" 
        stroke="#2d3748" 
        stroke-width="6"
        stroke-linecap="round"/>
  <path d="M30 25 L170 15" 
        stroke="#2d3748" 
        stroke-width="6"
        stroke-linecap="round"/>

  <!-- Tech panels -->
  <rect x="40" y="5" width="20" height="30" rx="2" fill="#2d3748" stroke="#1a202c"/>
  <rect x="140" y="5" width="20" height="30" rx="2" fill="#2d3748" stroke="#1a202c"/>

  <!-- Indicator lights -->
  <circle cx="50" cy="15" r="3" fill="#48bb78"/>
  <circle cx="50" cy="25" r="3" fill="#f56565"/>
  <circle cx="150" cy="15" r="3" fill="#48bb78"/>
  <circle cx="150" cy="25" r="3" fill="#f56565"/>

  <!-- Decorative details -->
  <line x1="80" y1="15" x2="120" y2="15" stroke="#1a202c" stroke-width="2"/>
  <line x1="80" y1="25" x2="120" y2="25" stroke="#1a202c" stroke-width="2"/>
</svg>`;