import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Loader2 className={`${sizeClasses[size]} text-primary`} />
        </motion.div>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground"
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner; 