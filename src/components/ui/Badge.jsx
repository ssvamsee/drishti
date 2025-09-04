import React from 'react';
import { cn } from '../../utils/cn';

const badgeVariants = {
  default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground border-border bg-transparent hover:bg-muted/50',
  success: 'border-transparent bg-green-500 text-white hover:bg-green-500/80',
  warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
  info: 'border-transparent bg-blue-500 text-white hover:bg-blue-500/80',
};

const Badge = ({ 
  variant = 'default', 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Badge, badgeVariants }; 