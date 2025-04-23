export const ShelfSVG = `
<svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main shelf surface with gradient -->
  <rect width="140" height="30" fill="url(#shelfGradient)" />
  
  <!-- Gradient definition -->
  <defs>
    <linearGradient id="shelfGradient" x1="0" y1="0" x2="0" y2="30">
      <stop offset="0%" stop-color="#34495e"/>
      <stop offset="100%" stop-color="#2c3e50"/>
    </linearGradient>
  </defs>

  <!-- Wood grain texture -->
  <g opacity="0.1">
    <path d="M0 5 L140 5" stroke="#ffffff" stroke-width="1"/>
    <path d="M0 12 L140 12" stroke="#ffffff" stroke-width="1"/>
    <path d="M0 19 L140 19" stroke="#ffffff" stroke-width="1"/>
    <path d="M0 26 L140 26" stroke="#ffffff" stroke-width="1"/>
  </g>

  <!-- Left bracket -->
  <path d="M0 0 L20 0 L20 30 L0 30" 
        fill="#2c3e50" 
        stroke="#34495e" 
        stroke-width="1"/>

  <!-- Right bracket -->
  <path d="M120 0 L140 0 L140 30 L120 30" 
        fill="#2c3e50" 
        stroke="#34495e" 
        stroke-width="1"/>

  <!-- Mounting holes with metallic effect -->
  <circle cx="10" cy="8" r="3" fill="url(#metalGradient)"/>
  <circle cx="10" cy="22" r="3" fill="url(#metalGradient)"/>
  <circle cx="130" cy="8" r="3" fill="url(#metalGradient)"/>
  <circle cx="130" cy="22" r="3" fill="url(#metalGradient)"/>

  <!-- Metallic gradient for screws -->
  <defs>
    <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#95a5a6"/>
      <stop offset="50%" stop-color="#7f8c8d"/>
      <stop offset="100%" stop-color="#95a5a6"/>
    </linearGradient>
  </defs>

  <!-- Top edge highlight -->
  <line x1="0" y1="1" x2="140" y2="1" stroke="#ffffff" stroke-width="1" opacity="0.2"/>
</svg>`;