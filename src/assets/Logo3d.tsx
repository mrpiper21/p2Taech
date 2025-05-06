export const Logo3d = () => {
    return (
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sphere-gradient" x1="30%" y1="20%" x2="70%" y2="90%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="60%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          
          <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          
          <linearGradient id="connector-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          <filter id="elegant-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.15"/>
          </filter>
          
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
  
        <g filter="url(#elegant-shadow)">
          <circle cx="200" cy="180" r="70" fill="url(#sphere-gradient)" />
          <circle cx="175" cy="155" r="25" fill="white" fillOpacity="0.15" />
          <circle cx="185" cy="145" r="10" fill="white" fillOpacity="0.3" />
        </g>
        
        <g>
          <ellipse cx="180" cy="165" rx="9" ry="7" fill="white" fillOpacity="0.95" />
          <ellipse cx="220" cy="165" rx="9" ry="7" fill="white" fillOpacity="0.95" />
          <ellipse cx="180" cy="165" rx="4" ry="3.5" fill="#1e3a8a" />
          <ellipse cx="220" cy="165" rx="4" ry="3.5" fill="#1e3a8a" />
          <path d="M175,195 Q200,215 225,195" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        
        <g>
          <circle cx="125" cy="120" r="22" fill="url(#connector-gradient)" filter="url(#elegant-shadow)" />
          <circle cx="117" cy="112" r="5" fill="white" fillOpacity="0.3" />
          <circle cx="275" cy="120" r="22" fill="url(#connector-gradient)" filter="url(#elegant-shadow)" />
          <circle cx="267" cy="112" r="5" fill="white" fillOpacity="0.3" />
          <circle cx="125" cy="240" r="22" fill="url(#connector-gradient)" filter="url(#elegant-shadow)" />
          <circle cx="117" cy="232" r="5" fill="white" fillOpacity="0.3" />
          <circle cx="275" cy="240" r="22" fill="url(#connector-gradient)" filter="url(#elegant-shadow)" />
          <circle cx="267" cy="232" r="5" fill="white" fillOpacity="0.3" />
        </g>
        
        <g>
          <circle cx="200" cy="90" r="15" fill="url(#connector-gradient-2)" filter="url(#elegant-shadow)" />
          <circle cx="195" cy="85" r="4" fill="white" fillOpacity="0.3" />
          <circle cx="200" cy="270" r="15" fill="url(#connector-gradient-2)" filter="url(#elegant-shadow)" />
          <circle cx="195" cy="265" r="4" fill="white" fillOpacity="0.3" />
          <circle cx="160" cy="310" r="10" fill="url(#connector-gradient-2)" filter="url(#elegant-shadow)" />
          <circle cx="156" cy="306" r="3" fill="white" fillOpacity="0.3" />
          <circle cx="240" cy="310" r="10" fill="url(#connector-gradient-2)" filter="url(#elegant-shadow)" />
          <circle cx="236" cy="306" r="3" fill="white" fillOpacity="0.3" />
        </g>
        
        <g>
          <line x1="147" y1="120" x2="253" y2="120" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="147" y1="120" x2="253" y2="120" stroke="#fcd34d" strokeWidth="1" strokeLinecap="round" />
          <line x1="147" y1="240" x2="253" y2="240" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="147" y1="240" x2="253" y2="240" stroke="#fcd34d" strokeWidth="1" strokeLinecap="round" />
          <line x1="125" y1="142" x2="125" y2="218" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="125" y1="142" x2="125" y2="218" stroke="#fcd34d" strokeWidth="1" strokeLinecap="round" />
          <line x1="275" y1="142" x2="275" y2="218" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <line x1="275" y1="142" x2="275" y2="218" stroke="#fcd34d" strokeWidth="1" strokeLinecap="round" />
        </g>
        
        <g>
          <path d="M140,135 Q170,155 185,165" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2,3" />
          <path d="M260,135 Q230,155 215,165" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2,3" />
          <path d="M140,225 Q170,205 185,195" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2,3" />
          <path d="M260,225 Q230,205 215,195" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2,3" />
          <path d="M200,105 Q200,130 200,155" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2,3" />
          <path d="M200,255 Q200,230 200,205" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="2,3" />
          <path d="M170,310 Q185,295 200,280" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="1,2" />
          <path d="M230,310 Q215,295 200,280" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="1,2" />
        </g>
      </svg>
    );
  };
  
  export default Logo3d;