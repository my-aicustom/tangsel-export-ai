import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export interface ProductImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt = 'Foto Produk IKM',
  className = 'w-full h-full object-cover'
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 ${className}`}>
        <ImageOff size={30} className="text-slate-400 mb-2" />
        <span className="text-[11px] text-slate-500 font-medium text-center line-clamp-1">
          Foto resmi belum dapat dimuat
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-100">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
};
