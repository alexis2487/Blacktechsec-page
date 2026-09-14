import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center font-mono font-medium rounded-full transition-colors';
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  }[size];

  const variantClasses = {
    default: 'bg-zinc-800 text-zinc-300 border border-zinc-700/50 light:bg-zinc-100 light:text-zinc-700 light:border-zinc-300',
    accent: 'bg-brand-500/10 text-brand-400 border border-brand-500/30 light:bg-brand-50 light:text-brand-700 light:border-brand-200',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/30 light:bg-amber-50 light:text-amber-700 light:border-amber-200',
    outline: 'bg-transparent text-zinc-400 border border-zinc-700/60 light:text-zinc-600 light:border-zinc-300',
    ghost: 'bg-zinc-900/50 text-zinc-400 light:bg-zinc-100 light:text-zinc-600',
  }[variant];

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
