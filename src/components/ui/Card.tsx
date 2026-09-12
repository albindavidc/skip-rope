import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
}

export function Card({ className, glowOnHover, children, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-dark-800 rounded-2xl border border-dark-700 overflow-hidden",
        "transition-all duration-300",
        glowOnHover && "hover:border-accent/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
