'use client';

import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  aspectClass = '',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-300 p-6 ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-8 h-8 text-blue-400 mb-3 opacity-80" />
        <span className="text-xs font-medium tracking-tight text-center max-w-xs text-slate-300">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${aspectClass} ${className}`}
    />
  );
}
