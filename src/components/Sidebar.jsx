import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

import { cn } from '../utils/cn';
import { APP_NAME } from '../utils/constants';
import { getAccessibleNavigation } from '../utils/permissions';
import { getFilteredNavigation } from '../utils/featureManagement';
import useAuthStore from '../store/authStore';

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Get accessible navigation items based on user role and organization features
  const roleBasedNavigation = user?.role ? getAccessibleNavigation(user.role) : [];
  const visibleNavItems = user?.role === 'superadmin' 
    ? roleBasedNavigation // Superadmin sees all navigation
    : getFilteredNavigation(user?.tenantId, roleBasedNavigation);

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <motion.div 
          className={cn(
            "flex flex-col border-r border-border bg-card transition-all duration-300",
            isCollapsed ? "w-30" : "w-30"
          )}
          animate={{ width: isCollapsed ? 100 : 100 }}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center flex-shrink-0 h-16 border-b border-border">
              <div className="p-2 bg-primary/10 rounded-xl">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-2 px-1 space-y-1 overflow-y-auto">
              {visibleNavItems.map((item) => {
                const IconComponent = Icons[item.icon] || Icons.Home;
                
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'group flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 relative',
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-300'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <IconComponent
                          className={cn(
                            'h-5 w-5 mb-1.5 transition-colors',
                            isActive 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          )}
                        />
                        <span className={cn(
                          'text-[10px] font-normal text-center leading-tight transition-colors',
                          isActive 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        )}>
                          {item.title}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* User info */}
            <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700 p-3">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-normal text-slate-600 dark:text-slate-400 truncate max-w-[60px]">
                    {user?.role === 'superadmin' ? 'System Admin' : user?.profile?.firstName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed inset-y-0 left-0 flex flex-col w-80 bg-card border-r border-border z-50 lg:hidden"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-foreground">{APP_NAME}</h1>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation - Grid layout for mobile */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  {visibleNavItems.map((item, index) => {
                    const IconComponent = Icons[item.icon] || Icons.Home;
                    
                    return (
                      <motion.div
                        key={item.href}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        transition={{ delay: index * 0.1 }}
                      >
                        <NavLink
                          to={item.href}
                          onClick={onClose}
                          className={({ isActive }) =>
                            cn(
                              'group flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 aspect-square',
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-300'
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <IconComponent
                                className={cn(
                                  'h-6 w-6 mb-2 transition-colors',
                                  isActive 
                                    ? 'text-blue-600 dark:text-blue-400' 
                                    : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                                )}
                              />
                              <span className={cn(
                                'text-xs font-normal text-center leading-tight transition-colors',
                                isActive 
                                  ? 'text-blue-600 dark:text-blue-400' 
                                  : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                              )}>
                                {item.title}
                              </span>
                            </>
                          )}
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* User info */}
            <div className="flex-shrink-0 flex border-t border-border p-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {user?.profile?.firstName?.[0]}{user?.profile?.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar; 