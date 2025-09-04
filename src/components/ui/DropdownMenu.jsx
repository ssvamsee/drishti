import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { cn } from '../../utils/cn';

const DropdownMenu = ({ 
  trigger, 
  children, 
  align = 'right',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            className={cn(
              'absolute z-50 mt-1 min-w-[160px] rounded-md border border-border bg-popover p-1 shadow-lg',
              alignmentClasses[align],
              className
            )}
          >
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onClick: (e) => {
                  child.props.onClick?.(e);
                  setIsOpen(false);
                }
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownMenuItem = ({ 
  children, 
  onClick, 
  disabled = false,
  icon: IconComponent,
  variant = 'default',
  className = ''
}) => {
  const variantClasses = {
    default: 'text-foreground hover:bg-accent',
    destructive: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-sm transition-colors text-left',
        disabled 
          ? 'text-muted-foreground cursor-not-allowed opacity-50' 
          : variantClasses[variant],
        className
      )}
    >
      {IconComponent && (
        <IconComponent className="h-4 w-4 flex-shrink-0" />
      )}
      <span>{children}</span>
    </button>
  );
};

const ActionDropdown = ({ actions, item }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <DropdownMenu
      trigger={
        <button className="p-1 rounded-md hover:bg-accent transition-colors">
          <Icons.MoreHorizontal className="h-4 w-4" />
        </button>
      }
      align="right"
    >
      {actions.map((action, index) => {
        const label = typeof action.label === 'function' ? action.label(item) : action.label;
        const icon = typeof action.icon === 'function' ? action.icon(item) : action.icon;
        const variant = typeof action.variant === 'function' ? action.variant(item) : action.variant;
        const disabled = action.disabled && (typeof action.disabled === 'function' ? action.disabled(item) : action.disabled);
        
        return (
          <DropdownMenuItem
            key={index}
            onClick={() => action.onClick(item)}
            disabled={disabled}
            icon={icon}
            variant={variant === 'destructive' ? 'destructive' : 'default'}
          >
            {label}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenu>
  );
};

export { DropdownMenu, DropdownMenuItem, ActionDropdown }; 