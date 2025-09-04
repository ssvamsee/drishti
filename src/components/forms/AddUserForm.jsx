import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';

import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

// Validation schema
const userSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  role: yup.string().required('Role is required').oneOf(['superadmin', 'organization_head', 'support_agent'], 'Invalid role'),
  organization: yup.string().when('role', {
    is: 'organization_head',
    then: (schema) => schema.required('Organization is required for organization heads'),
    otherwise: (schema) => schema.notRequired()
  }),
  phone: yup.string(),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const AddUserForm = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'support_agent',
      organization: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  });

  const selectedRole = watch('role');

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock user data
      const newUser = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role,
        status: 'active',
        lastLogin: new Date().toISOString(),
        createdDate: new Date().toISOString().split('T')[0],
        permissions: data.role === 'superadmin' ? ['all'] : 
                    data.role === 'organization_head' ? ['org_management'] : 
                    ['support_management'],
        organizationAccess: data.role === 'superadmin' ? 'all' : 
                           data.role === 'organization_head' ? [data.organization] : 
                           'all',
        loginCount: 0,
        organization: data.role === 'organization_head' ? data.organization : undefined,
        avatar: null
      };

      // Call parent submit handler
      if (onSubmit) {
        onSubmit(newUser);
      }

      toast.success('User created successfully!');
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const roles = [
    { 
      value: 'superadmin', 
      label: 'Super Administrator', 
      description: 'Full platform access and management' 
    },
    { 
      value: 'organization_head', 
      label: 'Organization Head', 
      description: 'Manage specific organization and branches' 
    },
    { 
      value: 'support_agent', 
      label: 'Support Agent', 
      description: 'Handle customer support tickets' 
    }
  ];

  const organizations = [
    'ABC School Group',
    'XYZ Education Network', 
    'Learning Hub International',
    'Future Academy'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Add New User"
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.User className="h-4 w-4 mr-2" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Full Name *
              </label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter full name"
                error={errors.name?.message}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="user@example.com"
                error={errors.email?.message}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+1-555-0123"
                error={errors.phone?.message}
              />
            </div>
          </div>
        </div>

        {/* Role and Access */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Shield className="h-4 w-4 mr-2" />
            Role and Access
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                User Role *
              </label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <label key={role.value} className="flex items-start space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      {...register('role')}
                      value={role.value}
                      className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{role.label}</div>
                      <div className="text-sm text-muted-foreground">{role.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Organization Selection (only for organization heads) */}
            {selectedRole === 'organization_head' && (
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-1">
                  Organization *
                </label>
                <select
                  id="organization"
                  {...register('organization')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select organization</option>
                  {organizations.map((org) => (
                    <option key={org} value={org}>{org}</option>
                  ))}
                </select>
                {errors.organization && (
                  <p className="text-sm text-red-600 mt-1">{errors.organization.message}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Security */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Lock className="h-4 w-4 mr-2" />
            Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password *
              </label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter password"
                error={errors.password?.message}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                Confirm Password *
              </label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm password"
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Password must be at least 8 characters long
          </p>
        </div>

        {/* Form Actions */}
        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Icons.UserPlus className="h-4 w-4 mr-2" />
                Create User
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddUserForm; 