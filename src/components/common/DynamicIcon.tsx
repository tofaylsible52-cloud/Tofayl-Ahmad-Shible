/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  if (!name) {
    return <Icons.Sparkles className={className} size={size} />;
  }

  const cleanName = name.trim().toLowerCase();

  // Special brand SVGs for platforms not in lucide-react or needing crisp brand representation
  if (cleanName === 'behance' || cleanName === 'be') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size || 20}
        height={size || 20}
        fill="currentColor"
        className={className}
      >
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.049 0-5.808-3.003-5.808-5.918 0-3.328 2.062-6.082 5.753-6.082 4.108 0 5.424 3.09 5.156 6.082h-7.986c.092 1.83 1.344 3.125 3.141 3.125 1.579 0 2.453-.787 2.845-1.564l2.05.357zm-5.07-5.086c-.035-1.258-.755-2.227-2.086-2.227-1.391 0-2.145 1.012-2.234 2.227h4.32zm-12.656 7.086h-6v-14h6.059c3.084 0 4.941 1.637 4.941 4.162 0 1.688-.847 3.018-2.259 3.65 1.862.628 2.659 2.148 2.659 3.993 0 2.871-2.188 4.195-5.4 4.195zm-3.235-8.24h2.765c1.472 0 2.378-.654 2.378-1.879 0-1.229-.906-1.881-2.378-1.881h-2.765v3.76zm0 5.48h2.955c1.641 0 2.645-.732 2.645-2.074 0-1.346-1.004-2.076-2.645-2.076h-2.955v4.15z" />
      </svg>
    );
  }

  if (cleanName === 'facebook' || cleanName === 'fb') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size || 20}
        height={size || 20}
        fill="currentColor"
        className={className}
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (cleanName === 'youtube' || cleanName === 'yt') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size || 20}
        height={size || 20}
        fill="currentColor"
        className={className}
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  if (cleanName === 'whatsapp' || cleanName === 'wa') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size || 20}
        height={size || 20}
        fill="currentColor"
        className={className}
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.4 1.29-1.93 1.34-.51.05-1.17.07-3.79-.98-2.23-.9-3.67-3.17-3.78-3.32-.11-.15-.9-1.2-1.02-1.36-.12-.16-.27-.4-.27-.67 0-.27.14-.52.27-.65.13-.13.3-.17.47-.17.17 0 .34 0 .49.01.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.27.02.43-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.25.25-.11.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-1.06.76-1.42.16-.36.32-.3.54-.22.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z" />
      </svg>
    );
  }

  const iconMap = Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>;
  
  // Try direct match, or uppercase first letter match
  const rawKey = name.trim();
  const normalizedKey = rawKey.charAt(0).toUpperCase() + rawKey.slice(1);
  const IconComponent = iconMap[rawKey] || iconMap[normalizedKey] || iconMap[`${normalizedKey}Icon`];

  if (!IconComponent || typeof IconComponent !== 'function' && typeof IconComponent !== 'object') {
    return <Icons.Sparkles className={className} size={size} />;
  }

  try {
    return <IconComponent className={className} size={size} />;
  } catch {
    return <Icons.Sparkles className={className} size={size} />;
  }
};
