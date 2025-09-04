import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { cn } from '../../utils/cn';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  className = ''
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          style={{ 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            style={{ 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'relative w-full h-[80vh] bg-background rounded-lg shadow-xl border border-border flex flex-col z-[9999]',
              sizeClasses[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-accent transition-colors"
                  >
                    <Icons.X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ModalHeader = ({ children, className = '' }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

const ModalBody = ({ children, className = '' }) => (
  <div className={cn('mb-6', className)}>
    {children}
  </div>
);

const ModalFooter = ({ children, className = '' }) => (
  <div className={cn('flex items-center justify-end space-x-2 pt-4 border-t border-border', className)}>
    {children}
  </div>
);

export { Modal, ModalHeader, ModalBody, ModalFooter }; 