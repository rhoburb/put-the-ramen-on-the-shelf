export const RobotBodySVG = `
<svg width="240" height="400" viewBox="0 0 240 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Head -->
  <path d="M80 40
           h80
           q20 0 20 20
           v60
           q0 20 -20 20
           h-80
           q-20 0 -20 -20
           v-60
           q0 -20 20 -20"
        fill="#4a5568"
        stroke="#2d3748"
        stroke-width="4"/>

  <!-- Antenna -->
  <line x1="120" y1="10" x2="120" y2="40" 
        stroke="#2d3748" 
        stroke-width="4"/>
  <circle cx="120" cy="10" r="6" fill="#d12626"/>

  <!-- Left Eye -->
  <circle cx="100" cy="80" r="16" fill="#4299e1"/>
  <circle cx="100" cy="80" r="8" fill="#2b6cb0"/>
  <circle cx="104" cy="76" r="4" fill="#ffffff"/>

  <!-- Right Eye -->
  <circle cx="140" cy="80" r="16" fill="#4299e1"/>
  <circle cx="140" cy="80" r="8" fill="#2b6cb0"/>
  <circle cx="144" cy="76" r="4" fill="#ffffff"/>

  <!-- Cute Mouth -->
  <path d="M110 100
           q10 10 20 0"
        fill="none"
        stroke="#2b6cb0"
        stroke-width="3"
        stroke-linecap="round"/>

  <!-- Blush spots -->
  <circle cx="85" cy="90" r="6" fill="#fc8181" opacity="0.5"/>
  <circle cx="155" cy="90" r="6" fill="#fc8181" opacity="0.5"/>

  <!-- Neck -->
  <path d="M100 140
           h40
           v30
           h-40
           z"
        fill="#4a5568"
        stroke="#2d3748"
        stroke-width="4"/>

  <!-- Body -->
  <path d="M60 170
           h120
           q20 0 20 20
           v160
           q0 20 -20 20
           h-120
           q-20 0 -20 -20
           v-160
           q0 -20 20 -20"
        fill="#4a5568"
        stroke="#2d3748"
        stroke-width="4"/>

  <!-- Chest Panel -->
  <rect x="90" y="190" width="60" height="80" 
        rx="10" 
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Indicator Lights -->
  <circle cx="120" cy="210" r="6" fill="#48bb78"/>
  <circle cx="120" cy="230" r="6" fill="#ecc94b"/>
  <circle cx="120" cy="250" r="6" fill="#f56565"/>

  <!-- Decorative Lines -->
  <line x1="70" y1="280" x2="170" y2="280" stroke="#2d3748" stroke-width="4"/>
  <line x1="70" y1="300" x2="170" y2="300" stroke="#2d3748" stroke-width="4"/>
  <line x1="70" y1="320" x2="170" y2="320" stroke="#2d3748" stroke-width="4"/>

  <!-- Hip Joints -->
  <circle cx="80" cy="370" r="15" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>
  <circle cx="160" cy="370" r="15" fill="#2d3748" stroke="#1a202c" stroke-width="2"/>

  <!-- Left Leg -->
  <path d="M80 370 
           v-20
           h-30
           v80
           h60
           v-60
           h-30"
        fill="#4a5568"
        stroke="#2d3748"
        stroke-width="4"/>
  
  <!-- Left Leg Panel -->
  <rect x="35" y="380" width="30" height="40" 
        rx="4"
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>
  
  <!-- Left Foot -->
  <path d="M20 430
           h60
           l10 10
           h-80
           l10 -10"
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Right Leg -->
  <path d="M160 370
           v-20
           h30
           v80
           h-60
           v-60
           h30"
        fill="#4a5568"
        stroke="#2d3748"
        stroke-width="4"/>

  <!-- Right Leg Panel -->
  <rect x="175" y="380" width="30" height="40"
        rx="4"
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Right Foot -->
  <path d="M160 430
           h60
           l10 10
           h-80
           l10 -10"
        fill="#2d3748"
        stroke="#1a202c"
        stroke-width="2"/>

  <!-- Leg Details -->
  <line x1="50" y1="390" x2="70" y2="390" stroke="#1a202c" stroke-width="2"/>
  <line x1="50" y1="400" x2="70" y2="400" stroke="#1a202c" stroke-width="2"/>
  <line x1="50" y1="410" x2="70" y2="410" stroke="#1a202c" stroke-width="2"/>
  
  <line x1="170" y1="390" x2="190" y2="390" stroke="#1a202c" stroke-width="2"/>
  <line x1="170" y1="400" x2="190" y2="400" stroke="#1a202c" stroke-width="2"/>
  <line x1="170" y1="410" x2="190" y2="410" stroke="#1a202c" stroke-width="2"/>

  <!-- Hydraulic Pistons -->
  <path d="M65 385 L95 415" stroke="#2d3748" stroke-width="6" stroke-linecap="round"/>
  <path d="M145 385 L175 415" stroke="#2d3748" stroke-width="6" stroke-linecap="round"/>

  <!-- Indicator Lights on Legs -->
  <circle cx="50" cy="425" r="3" fill="#48bb78"/>
  <circle cx="190" cy="425" r="3" fill="#48bb78"/>
</svg>`;