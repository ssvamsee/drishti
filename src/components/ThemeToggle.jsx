import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from './ui/Button';
import useThemeStore from '../store/themeStore';
import { THEMES } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { key: THEMES.LIGHT, icon: Sun, label: 'Light' },
    { key: THEMES.DARK, icon: Moon, label: 'Dark' },
    { key: THEMES.SYSTEM, icon: Monitor, label: 'System' },
  ];

  const currentThemeIndex = themes.findIndex(t => t.key === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];

  const handleToggle = () => {
    setTheme(nextTheme.key);
  };

  const CurrentIcon = themes.find(t => t.key === theme)?.icon || Sun;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative"
      aria-label={`Switch to ${nextTheme.label} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <CurrentIcon className="h-4 w-4" />
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default ThemeToggle; 