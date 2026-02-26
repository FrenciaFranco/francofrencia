'use client';

import { cn } from '@/lib/utils';
import { Pointer } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  height?: number;
}

export function FlipCard({ front, back, className, height = 300 }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPinnedDesktop, setIsPinnedDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsTouchDevice(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  const handleDesktopClick = () => {
    setIsFlipped((prev) => {
      const next = !prev;
      setIsPinnedDesktop(next);
      return next;
    });
  };

  return (
    <div
      className={cn('relative w-full', className)}
      style={{ perspective: '1400px', height: `${height}px` }}
      onMouseEnter={() => {
        if (!isTouchDevice && !isPinnedDesktop) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice && !isPinnedDesktop) setIsFlipped(false);
      }}
      onClick={() => {
        if (isTouchDevice) {
          toggleFlip();
          return;
        }
        handleDesktopClick();
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="relative h-full w-full">
            {front}
            <button
              type="button"
              aria-label={isFlipped ? 'Volver al frente' : 'Voltear tarjeta'}
              className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-background/70 text-base leading-none backdrop-blur-sm transition-colors hover:text-foreground sm:hidden"
              onClick={(e) => {
                e.stopPropagation();
                toggleFlip();
              }}
            >
              <Pointer className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="relative h-full w-full">
            {back}
            <button
              type="button"
              aria-label={isFlipped ? 'Volver al frente' : 'Voltear tarjeta'}
              className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-background/70 text-base leading-none backdrop-blur-sm transition-colors hover:text-foreground sm:hidden"
              onClick={(e) => {
                e.stopPropagation();
                toggleFlip();
              }}
            >
              <Pointer className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
