import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Store
import useAuthStore from './store/authStore';
import useThemeStore from './store/themeStore';

// Services
import { queryClient } from './services/api';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Marks from './pages/Marks';
import MarksImport from './pages/MarksImport';
import Fees from './pages/Fees';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import StudentProfile from './pages/StudentProfile';
import Assignments from './pages/Assignments';

// Superadmin Pages
import Organizations from './pages/superadmin/Organizations';
import Users from './pages/superadmin/Users';
import Billing from './pages/superadmin/Billing';
import Monitoring from './pages/superadmin/Monitoring';
import Support from './pages/superadmin/Support';
import Analytics from './pages/superadmin/Analytics';

// Components
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme
    const cleanup = initializeTheme();
    return cleanup;
  }, [initializeTheme]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
                )
              }
            />

            {/* Protected Dashboard Routes - Nested under ProtectedDashboardRoute */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route 
                path="students" 
                element={
                  <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher']}>
                    <Students />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="attendance" 
                element={
                  <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher', 'student', 'parent']}>
                    <Attendance />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="marks" 
                element={
                  <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher', 'student', 'parent']}>
                    <Marks />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="marks/import" 
                element={
                  <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher']}>
                    <MarksImport />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="fees" 
                element={
                  <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'finance_admin', 'student', 'parent']}>
                    <Fees />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="reports" 
                element={
                  <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'finance_admin']}>
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="settings" 
                element={
                  <ProtectedRoute roles={['superadmin', 'organization_head', 'branch_principal']}>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="profile" 
                element={
                  <ProtectedRoute roles={['student', 'parent']}>
                    <StudentProfile />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="assignments" 
                element={
                  <ProtectedRoute roles={['student', 'teacher']}>
                    <Assignments />
                  </ProtectedRoute>
                } 
              />

              {/* Superadmin Routes */}
              <Route 
                path="organizations" 
                element={
                  <ProtectedRoute roles={['superadmin']}>
                    <Organizations />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="users" 
                element={
                  <ProtectedRoute roles={['superadmin']}>
                    <Users />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="billing" 
                element={
                  <ProtectedRoute roles={['superadmin']}>
                    <Billing />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="monitoring" 
                element={
                  <ProtectedRoute roles={['superadmin']}>
                    <Monitoring />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="analytics" 
                element={
                  <ProtectedRoute roles={['superadmin']}>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="support" 
                element={
                  <ProtectedRoute roles={['superadmin']}>
                    <Support />
                  </ProtectedRoute>
                } 
              />
            </Route>

            {/* Catch all - redirect to dashboard or login */}
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              }
            />
          </Routes>
        </div>
      </Router>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
      />

      {/* React Query DevTools - Removed due to version conflict */}
      {/* Can be added back when React Query is upgraded to v5 */}
    </QueryClientProvider>
  );
}

export default App; 