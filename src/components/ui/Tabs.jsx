import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils/cn';

// Tabs Context
const TabsContext = createContext();

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Main Tabs Component
const Tabs = ({ defaultValue, value, onValueChange, orientation = 'horizontal', className, children, ...props }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        orientation,
      }}
    >
      <div
        className={cn(
          'w-full',
          orientation === 'vertical' && 'flex',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList Component
const TabsList = ({ className, children, ...props }) => {
  const { orientation } = useTabs();

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        orientation === 'vertical' && 'flex-col h-auto w-fit',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// TabsTrigger Component
const TabsTrigger = ({ value, disabled, className, children, ...props }) => {
  const { value: selectedValue, onValueChange } = useTabs();
  const isSelected = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`content-${value}`}
      data-state={isSelected ? 'active' : 'inactive'}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        isSelected && 'bg-background text-foreground shadow-sm',
        !isSelected && 'hover:bg-background/50 hover:text-foreground',
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
};

// TabsContent Component
const TabsContent = ({ value, forceMount, className, children, ...props }) => {
  const { value: selectedValue } = useTabs();
  const isSelected = selectedValue === value;

  if (!forceMount && !isSelected) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`content-${value}`}
      aria-labelledby={`tab-${value}`}
      data-state={isSelected ? 'active' : 'inactive'}
      className={cn(
        'mt-2 ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        !isSelected && 'hidden',
        className
      )}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent }; 