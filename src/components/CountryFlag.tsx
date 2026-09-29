import React from 'react';

export interface CountryFlagProps {
  code?: string;
  title?: string;
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ code = '', title, className = 'h-4 w-6' }) => {
  const normalized = (code || '').trim().toUpperCase();

  const renderFlagContent = () => {
    switch (normalized) {
      case 'ID':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'Indonesia'}>
            <rect width="640" height="240" fill="#E70011" />
            <rect y="240" width="640" height="240" fill="#FFFFFF" />
          </svg>
        );

      case 'SG':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'Singapore'}>
            <rect width="640" height="240" fill="#ED2939" />
            <rect y="240" width="640" height="240" fill="#FFFFFF" />
            <circle cx="140" cy="120" r="70" fill="#FFFFFF" />
            <circle cx="165" cy="120" r="70" fill="#ED2939" />
            <g fill="#FFFFFF" transform="translate(195, 120) scale(0.9)">
              <polygon points="0,-18 5,-5 19,-5 8,4 12,18 0,9 -12,18 -8,4 -19,-5 -5,-5" transform="translate(0, -32)" />
              <polygon points="0,-18 5,-5 19,-5 8,4 12,18 0,9 -12,18 -8,4 -19,-5 -5,-5" transform="translate(-24, -10)" />
              <polygon points="0,-18 5,-5 19,-5 8,4 12,18 0,9 -12,18 -8,4 -19,-5 -5,-5" transform="translate(24, -10)" />
              <polygon points="0,-18 5,-5 19,-5 8,4 12,18 0,9 -12,18 -8,4 -19,-5 -5,-5" transform="translate(-15, 24)" />
              <polygon points="0,-18 5,-5 19,-5 8,4 12,18 0,9 -12,18 -8,4 -19,-5 -5,-5" transform="translate(15, 24)" />
            </g>
          </svg>
        );

      case 'CN':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'China'}>
            <rect width="640" height="480" fill="#DE2910" />
            <polygon points="100,50 115,100 168,100 125,130 141,180 100,150 59,180 75,130 32,100 85,100" fill="#FFDE00" />
            <polygon points="0,-15 4,-4 15,-4 7,3 10,15 0,8 -10,15 -7,3 -15,-4 -4,-4" fill="#FFDE00" transform="translate(200, 48) rotate(-23)" />
            <polygon points="0,-15 4,-4 15,-4 7,3 10,15 0,8 -10,15 -7,3 -15,-4 -4,-4" fill="#FFDE00" transform="translate(240, 96) rotate(45)" />
            <polygon points="0,-15 4,-4 15,-4 7,3 10,15 0,8 -10,15 -7,3 -15,-4 -4,-4" fill="#FFDE00" transform="translate(240, 160) rotate(-10)" />
            <polygon points="0,-15 4,-4 15,-4 7,3 10,15 0,8 -10,15 -7,3 -15,-4 -4,-4" fill="#FFDE00" transform="translate(200, 208) rotate(-45)" />
          </svg>
        );

      case 'JP':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs border border-slate-200" aria-label={title || 'Japan'}>
            <rect width="640" height="480" fill="#FFFFFF" />
            <circle cx="320" cy="240" r="144" fill="#BC002D" />
          </svg>
        );

      case 'US':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'United States'}>
            <rect width="640" height="480" fill="#FFFFFF" />
            <path d="M0,0H640V37H0ZM0,74H640V111H0ZM0,148H640V185H0ZM0,222H640V259H0ZM0,296H640V333H0ZM0,370H640V407H0ZM0,444H640V480H0Z" fill="#B22234" />
            <rect width="256" height="259" fill="#3C3B6E" />
            <g fill="#FFFFFF">
              <circle cx="40" cy="35" r="8" />
              <circle cx="85" cy="35" r="8" />
              <circle cx="130" cy="35" r="8" />
              <circle cx="175" cy="35" r="8" />
              <circle cx="220" cy="35" r="8" />
              <circle cx="62" cy="70" r="8" />
              <circle cx="107" cy="70" r="8" />
              <circle cx="152" cy="70" r="8" />
              <circle cx="197" cy="70" r="8" />
              <circle cx="40" cy="105" r="8" />
              <circle cx="85" cy="105" r="8" />
              <circle cx="130" cy="105" r="8" />
              <circle cx="175" cy="105" r="8" />
              <circle cx="220" cy="105" r="8" />
              <circle cx="62" cy="140" r="8" />
              <circle cx="107" cy="140" r="8" />
              <circle cx="152" cy="140" r="8" />
              <circle cx="197" cy="140" r="8" />
              <circle cx="40" cy="175" r="8" />
              <circle cx="85" cy="175" r="8" />
              <circle cx="130" cy="175" r="8" />
              <circle cx="175" cy="175" r="8" />
              <circle cx="220" cy="175" r="8" />
            </g>
          </svg>
        );

      case 'NL':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'Netherlands'}>
            <rect width="640" height="160" fill="#AE1C28" />
            <rect y="160" width="640" height="160" fill="#FFFFFF" />
            <rect y="320" width="640" height="160" fill="#21468B" />
          </svg>
        );

      case 'DE':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'Germany'}>
            <rect width="640" height="160" fill="#000000" />
            <rect y="160" width="640" height="160" fill="#DD0000" />
            <rect y="320" width="640" height="160" fill="#FFCE00" />
          </svg>
        );

      case 'AE':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'United Arab Emirates'}>
            <rect width="640" height="160" fill="#00732F" />
            <rect y="160" width="640" height="160" fill="#FFFFFF" />
            <rect y="320" width="640" height="160" fill="#000000" />
            <rect width="160" height="480" fill="#FF0000" />
          </svg>
        );

      case 'AU':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'Australia'}>
            <rect width="640" height="480" fill="#00008B" />
            {/* Canton */}
            <g transform="scale(0.5)">
              <rect width="640" height="480" fill="#00247D" />
              <path d="M0,0 L640,480 M640,0 L0,480" stroke="#FFF" strokeWidth="60" />
              <path d="M0,0 L640,480 M640,0 L0,480" stroke="#CF142B" strokeWidth="30" />
              <path d="M320,0 V480 M0,240 H640" stroke="#FFF" strokeWidth="100" />
              <path d="M320,0 V480 M0,240 H640" stroke="#CF142B" strokeWidth="60" />
            </g>
            {/* Commonwealth Star */}
            <polygon points="160,320 166,350 195,340 175,360 195,380 166,370 160,400 154,370 125,380 145,360 125,340 154,350" fill="#FFFFFF" />
            {/* Southern Cross stars */}
            <circle cx="480" cy="100" r="14" fill="#FFFFFF" />
            <circle cx="530" cy="180" r="14" fill="#FFFFFF" />
            <circle cx="480" cy="380" r="14" fill="#FFFFFF" />
            <circle cx="420" cy="220" r="14" fill="#FFFFFF" />
            <circle cx="455" cy="270" r="9" fill="#FFFFFF" />
          </svg>
        );

      case 'CM':
        return (
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover rounded-xs" aria-label={title || 'Cameroon'}>
            <rect width="213.3" height="480" fill="#007A5E" />
            <rect x="213.3" width="213.4" height="480" fill="#CE1126" />
            <rect x="426.7" width="213.3" height="480" fill="#FCD116" />
            {/* Central yellow star */}
            <polygon points="320,200 332,238 372,238 340,261 352,299 320,275 288,299 300,261 268,238 308,238" fill="#FCD116" />
          </svg>
        );

      default:
        return (
          <div className="flex h-full w-full items-center justify-center rounded-xs bg-slate-200 text-[10px] font-bold text-slate-600 uppercase">
            {normalized.slice(0, 2) || '??'}
          </div>
        );
    }
  };

  return (
    <span
      className={`inline-block overflow-hidden shadow-xs ring-1 ring-slate-900/10 ${className}`}
      title={title || normalized}
    >
      {renderFlagContent()}
    </span>
  );
};
