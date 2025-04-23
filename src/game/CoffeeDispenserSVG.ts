export const CoffeeDispenserSVG = `
<svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main body with gradient -->
  <defs>
    <linearGradient id="dispenserGradient" x1="0" y1="0" x2="0" y2="120">
      <stop offset="0%" stop-color="#4a5568"/>
      <stop offset="100%" stop-color="#2d3748"/>
    </linearGradient>
  </defs>

  <!-- Base housing -->
  <path d="M10 20
           h60
           q10 0 10 10
           v80
           q0 10 -10 10
           h-60
           q-10 0 -10 -10
           v-80
           q0 -10 10 -10"
        fill="url(#dispenserGradient)"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Top reservoir -->
  <path d="M20 0
           h40
           q10 0 10 10
           v20
           h-60
           v-20
           q0 -10 10 -10"
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Coffee level window -->
  <rect x="25" y="5" width="30" height="15" 
        fill="#4a5568" 
        stroke="#1a202c" 
        stroke-width="1"/>
  
  <!-- Control panel -->
  <rect x="20" y="40" width="40" height="60" 
        rx="4"
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Display screen -->
  <rect x="25" y="45" width="30" height="15" 
        rx="2"
        fill="#1a202c"/>
  <line x1="30" y1="50" x2="50" y2="50" stroke="#4299e1" stroke-width="1"/>
  <line x1="30" y1="55" x2="45" y2="55" stroke="#4299e1" stroke-width="1"/>

  <!-- Control buttons -->
  <circle cx="30" cy="70" r="4" fill="#48bb78"/>
  <circle cx="40" cy="70" r="4" fill="#ecc94b"/>
  <circle cx="50" cy="70" r="4" fill="#f56565"/>

  <!-- Status lights -->
  <circle cx="30" cy="85" r="3" fill="#48bb78"/>
  <circle cx="40" cy="85" r="3" fill="#ecc94b"/>
  <circle cx="50" cy="85" r="3" fill="#f56565"/>

  <!-- Dispenser nozzle -->
  <path d="M35 100
           h10
           l5 10
           h-20
           l5 -10"
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Drip tray -->
  <rect x="20" y="115" width="40" height="5" 
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="1"/>

  <!-- Decorative lines -->
  <line x1="25" y1="75" x2="55" y2="75" stroke="#1a202c" stroke-width="1"/>
  <line x1="25" y1="90" x2="55" y2="90" stroke="#1a202c" stroke-width="1"/>

  <!-- Tech details -->
  <circle cx="70" cy="45" r="2" fill="#4299e1"/>
  <circle cx="70" cy="55" r="2" fill="#48bb78"/>
  <circle cx="70" cy="65" r="2" fill="#f56565"/>
</svg>`;