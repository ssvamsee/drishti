import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: (userData, tokens) => {
        set({
          user: userData,
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      updateToken: (newToken) => {
        set({ token: newToken });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Getters
      getUser: () => get().user,
      getToken: () => get().token,
      getUserRole: () => get().user?.role,
      getTenantId: () => get().user?.tenantId,
      getBranchId: () => get().user?.branchId,
      
      // Permission checks
      hasRole: (role) => {
        const currentRole = get().user?.role;
        return currentRole === role;
      },

      hasAnyRole: (roles) => {
        const currentRole = get().user?.role;
        return roles.includes(currentRole);
      },

      canAccessBranch: (branchId) => {
        const user = get().user;
        if (!user) return false;
        
        // Organization level users can access all branches
        const orgLevelRoles = ["superadmin", "organization_head", "central_office_operator", "dean"];
        if (orgLevelRoles.includes(user.role)) return true;
        
        // Branch level users can only access their own branch
        return user.branchId === branchId;
      },

      canAccessTenant: (tenantId) => {
        const user = get().user;
        if (!user) return false;
        
        // Superadmin can access all tenants
        if (user.role === "superadmin") return true;
        
        // Other users can only access their own tenant
        return user.tenantId === tenantId;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore; 