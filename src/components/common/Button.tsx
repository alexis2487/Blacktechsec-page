import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-sm shadow-brand-600/30 active:scale-[0.99]',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 light:bg-zinc-100 light:hover:bg-zinc-200 light:text-zinc-900 light:border-zinc-300 active:scale-[0.99]',
    outline: 'bg-transparent hover:bg-zinc-800/60 text-zinc-300 border border-zinc-700 light:text-zinc-700 light:border-zinc-300 light:hover:bg-zinc-100',
    ghost: 'bg-transparent hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-100 light:text-zinc-600 light:hover:text-zinc-900 light:hover:bg-zinc-100',
    danger: 'bg-red-600 hover:bg-red-500 text-white active:scale-[0.99]',
  }[variant];

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {icon}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target={props.target} rel={props.rel}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon}
      {children}
    </button>
  );
};
