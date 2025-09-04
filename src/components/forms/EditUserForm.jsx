import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';

import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

// Validation schema
const editUserSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  role: yup.string().required('Role is required').oneOf(['superadmin', 'organization_head', 'support_agent'], 'Invalid role'),
  organization: yup.string().when('role', {
    is: 'organization_head',
    then: (schema) => schema.required('Organization is required for organization heads'),
    otherwise: (schema) => schema.notRequired()
  }),
  phone: yup.string(),
  status: yup.string().required('Status is required').oneOf(['active', 'inactive', 'pending'], 'Invalid status'),
});

const EditUserForm = ({ isOpen, onClose, user, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'support_agent',
      organization: '',
      phone: '',
      status: 'active'
    }
  });

  const selectedRole = watch('role');

  // Populate form when user data is available
  useEffect(() => {
    if (user && isOpen) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('role', user.role || 'support_agent');
      setValue('organization', user.organization || '');
      setValue('phone', user.phone || '');
      setValue('status', user.status || 'active');
    }
  }, [user, isOpen, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create updated user object
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        status: data.status,
        organization: data.role === 'organization_head' ? data.organization : undefined,
        permissions: data.role === 'superadmin' ? ['all'] : 
                    data.role === 'organization_head' ? ['org_management'] : 
                    ['support_management'],
        organizationAccess: data.role === 'superadmin' ? 'all' : 
                           data.role === 'organization_head' ? [data.organization] : 
                           'all',
        updatedDate: new Date().toISOString()
      };

      // Call parent submit handler
      if (onSubmit) {
        onSubmit(updatedUser);
      }

      toast.success('User updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!user) return null;

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

  const statusOptions = [
    { value: 'active', label: 'Active', description: 'User can access the system' },
    { value: 'inactive', label: 'Inactive', description: 'User cannot access the system' },
    { value: 'pending', label: 'Pending', description: 'User registration is pending approval' }
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
      title={`Edit User - ${user.name}`}
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

        {/* Account Status */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Settings className="h-4 w-4 mr-2" />
            Account Status
          </h3>
          <div className="space-y-3">
            {statusOptions.map((status) => (
              <label key={status.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <input
                  type="radio"
                  {...register('status')}
                  value={status.value}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{status.label}</div>
                  <div className="text-sm text-muted-foreground">{status.description}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.status && (
            <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
          )}
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
                Updating...
              </>
            ) : (
              <>
                <Icons.Save className="h-4 w-4 mr-2" />
                Update User
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EditUserForm; 