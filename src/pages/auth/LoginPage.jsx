import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { loginSchema } from '../../utils/validation';
import useAuthStore from '../../store/authStore';
import { TOAST_MESSAGES, ROLE_NAMES } from '../../utils/constants';
import { MOCK_USERS } from '../../utils/mockData';
import { toast } from 'sonner';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, setLoading, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      tenantId: '',
    },
  });

  const handleQuickLogin = async (role) => {
    try {
      setLoading(true);
      
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = MOCK_USERS[role];
      if (!mockUser) {
        throw new Error('User not found');
      }

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      login(mockUser, mockTokens);
      toast.success(`Welcome ${mockUser.profile.firstName}! Logged in as ${ROLE_NAMES[mockUser.role]}`);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR.LOGIN);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find user by email
      const mockUser = Object.values(MOCK_USERS).find(user => user.email === data.email);
      
      if (!mockUser) {
        throw new Error('Invalid email or password');
      }

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      login(mockUser, mockTokens);
      toast.success(`Welcome ${mockUser.profile.firstName}! Logged in as ${ROLE_NAMES[mockUser.role]}`);
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR.LOGIN);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Tenant ID Field (Optional) */}
        <div className="space-y-2">
          <label htmlFor="tenantId" className="text-sm font-medium text-foreground">
            Organization ID <span className="text-muted-foreground">(Optional)</span>
          </label>
          <Input
            id="tenantId"
            type="text"
            placeholder="Enter your organization ID"
            {...register('tenantId')}
          />
          {errors.tenantId && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.tenantId.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </div>
          )}
        </Button>
      </form>

                {/* Quick Login Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed"
          >
            <p className="text-xs font-medium text-muted-foreground mb-3">Quick Login (Demo):</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(MOCK_USERS).map(([role, user]) => (
                <Button
                  key={role}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-2 text-xs justify-start hover:bg-primary/10 transition-colors"
                  onClick={() => handleQuickLogin(role)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="text-left">
                      <div className="font-medium">{ROLE_NAMES[role]}</div>
                      <div className="text-muted-foreground">{user.profile.firstName}</div>
                    </div>
                  )}
                </Button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-dashed border-muted-foreground/20">
              <p className="text-xs text-muted-foreground">
                Click any role above for instant login, or use the form with any email/password
              </p>
            </div>
          </motion.div>
    </div>
  );
};

export default LoginPage; 