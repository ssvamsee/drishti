import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THEMES } from "../utils/constants";

const useThemeStore = create(
  persist(
    (set, get) => ({
      // State
      theme: THEMES.SYSTEM,
      actualTheme: THEMES.LIGHT, // The actual applied theme (resolved from system)

      // Actions
      setTheme: (theme) => {
        set({ theme });
        
        // Apply theme to document
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        
        let actualTheme = theme;
        
        if (theme === THEMES.SYSTEM) {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? THEMES.DARK
            : THEMES.LIGHT;
          actualTheme = systemTheme;
        }
        
        root.classList.add(actualTheme);
        set({ actualTheme });
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        let newTheme;
        
        if (currentTheme === THEMES.LIGHT) {
          newTheme = THEMES.DARK;
        } else if (currentTheme === THEMES.DARK) {
          newTheme = THEMES.SYSTEM;
        } else {
          newTheme = THEMES.LIGHT;
        }
        
        get().setTheme(newTheme);
      },

      // Initialize theme based on system preference
      initializeTheme: () => {
        const { theme, setTheme } = get();
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        const handleSystemThemeChange = () => {
          if (theme === THEMES.SYSTEM) {
            setTheme(THEMES.SYSTEM); // This will re-apply the system theme
          }
        };
        
        mediaQuery.addEventListener("change", handleSystemThemeChange);
        
        // Apply initial theme
        setTheme(theme);
        
        // Return cleanup function
        return () => {
          mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
      },

      // Getters
      isDark: () => get().actualTheme === THEMES.DARK,
      isLight: () => get().actualTheme === THEMES.LIGHT,
      isSystem: () => get().theme === THEMES.SYSTEM,
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export default useThemeStore; 