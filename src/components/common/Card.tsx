import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm p-6 
        transition-all duration-200
        light:bg-white light:border-zinc-200 light:shadow-sm
        ${hover ? 'hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-black/20 light:hover:border-zinc-300 light:hover:shadow-md' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
