import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';
import * as Icons from 'lucide-react';

import { cn } from '../utils/cn';
import { APP_NAME } from '../utils/constants';
import { getAccessibleNavigation } from '../utils/permissions';
import { getFilteredNavigation } from '../utils/featureManagement';
import useAuthStore from '../store/authStore';

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuthStore();

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
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-border bg-card">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0 px-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-foreground">{APP_NAME}</h1>
                    <p className="text-xs text-muted-foreground">Education Management</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {visibleNavItems.map((item) => {
                  const IconComponent = Icons[item.icon] || Icons.Home;
                  
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                          isActive
                            ? 'bg-primary/10 text-primary border-r-2 border-primary'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <IconComponent
                            className={cn(
                              'mr-3 flex-shrink-0 h-5 w-5 transition-colors',
                              isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-accent-foreground'
                            )}
                          />
                          {item.title}
                        </>
                      )}
                    </NavLink>
                  );
                })}
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
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed inset-y-0 left-0 flex flex-col w-64 bg-card border-r border-border z-50 lg:hidden"
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

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
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
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <IconComponent
                              className={cn(
                                'mr-3 flex-shrink-0 h-5 w-5 transition-colors',
                                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-accent-foreground'
                              )}
                            />
                            {item.title}
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
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