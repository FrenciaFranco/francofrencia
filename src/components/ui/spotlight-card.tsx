import React, { ReactNode } from 'react';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { hue: 210, ring: 'rgba(56, 189, 248, 0.38)', soft: 'rgba(56, 189, 248, 0.16)' },
  purple: { hue: 275, ring: 'rgba(168, 85, 247, 0.4)', soft: 'rgba(168, 85, 247, 0.16)' },
  green: { hue: 145, ring: 'rgba(34, 197, 94, 0.4)', soft: 'rgba(34, 197, 94, 0.16)' },
  red: { hue: 355, ring: 'rgba(244, 63, 94, 0.38)', soft: 'rgba(244, 63, 94, 0.16)' },
  orange: { hue: 32, ring: 'rgba(249, 115, 22, 0.4)', soft: 'rgba(249, 115, 22, 0.16)' },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const palette = glowColorMap[glowColor];

  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    borderColor: palette.soft,
    backgroundImage: `radial-gradient(120% 140% at 100% 100%, ${palette.soft} 0%, transparent 60%)`,
    boxShadow: `0 0 0 1px ${palette.soft} inset, 0 24px 48px -30px ${palette.ring}`,
  };

  return (
    <div
      style={inlineStyles}
      className={`
        ${customSize ? '' : sizeMap[size]}
        ${!customSize ? 'aspect-[3/4]' : ''}
        rounded-2xl
        relative
        border
        grid
        grid-rows-[1fr_auto]
        p-4
        gap-4
        backdrop-blur-[5px]
        overflow-hidden
        ${className}
      `}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit]"
        style={{
          background: `radial-gradient(70% 55% at 100% 100%, ${palette.ring} 0%, transparent 70%)`,
          opacity: 0.6,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit]"
        style={{
          border: `1px solid hsla(${palette.hue}, 90%, 65%, 0.28)`,
          maskImage: 'linear-gradient(transparent, transparent), linear-gradient(white, white)',
          WebkitMaskImage: 'linear-gradient(transparent, transparent), linear-gradient(white, white)',
        }}
      />
      {children}
    </div>
  );
};

export { GlowCard };
