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
import DashboardLayout from './layouts/DashboardLayout';

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

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/students"
              element={
                <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher']}>
                  <DashboardLayout>
                    <Students />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/attendance"
              element={
                <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher', 'student', 'parent']}>
                  <DashboardLayout>
                    <Attendance />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/marks"
              element={
                <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher', 'student', 'parent']}>
                  <DashboardLayout>
                    <Marks />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/marks/import"
              element={
                <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'teacher']}>
                  <DashboardLayout>
                    <MarksImport />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/fees"
              element={
                <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'branch_computer_operator', 'finance_admin', 'student', 'parent']}>
                  <DashboardLayout>
                    <Fees />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reports"
              element={
                <ProtectedRoute roles={['organization_head', 'central_office_operator', 'dean', 'branch_principal', 'finance_admin']}>
                  <DashboardLayout>
                    <Reports />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
                            <Route
                  path="/settings"
                  element={
                    <ProtectedRoute roles={['superadmin', 'organization_head', 'branch_principal']}>
                      <DashboardLayout>
                        <Settings />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute roles={['student', 'parent']}>
                      <DashboardLayout>
                        <StudentProfile />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/assignments"
                  element={
                    <ProtectedRoute roles={['student', 'teacher']}>
                      <DashboardLayout>
                        <Assignments />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

            {/* Superadmin Routes */}
            <Route
              path="/organizations"
              element={
                <ProtectedRoute roles={['superadmin']}>
                  <DashboardLayout>
                    <Organizations />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={['superadmin']}>
                  <DashboardLayout>
                    <Users />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/billing"
              element={
                <ProtectedRoute roles={['superadmin']}>
                  <DashboardLayout>
                    <Billing />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/monitoring"
              element={
                <ProtectedRoute roles={['superadmin']}>
                  <DashboardLayout>
                    <Monitoring />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/analytics"
              element={
                <ProtectedRoute roles={['superadmin']}>
                  <DashboardLayout>
                    <Analytics />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/support"
              element={
                <ProtectedRoute roles={['superadmin']}>
                  <DashboardLayout>
                    <Support />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Default Redirect */}
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              }
            />

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