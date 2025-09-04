import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import ThemeToggle from '../components/ThemeToggle';
import { APP_NAME } from '../utils/constants';
import { GraduationCap } from 'lucide-react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{APP_NAME}</h1>
              <p className="text-muted-foreground text-sm">
                Comprehensive Education Management System
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {children}
            </motion.div>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-muted-foreground">
            © 2024 {APP_NAME}. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout; 