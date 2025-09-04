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
const editOrganizationSchema = yup.object({
  name: yup.string().required('Organization name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  website: yup.string().url('Invalid website URL'),
  contactName: yup.string().required('Contact person name is required'),
  contactTitle: yup.string().required('Contact person title is required'),
  contactPhone: yup.string().required('Contact person phone is required'),
  contactEmail: yup.string().email('Invalid email format').required('Contact person email is required'),
  subscription: yup.string().required('Subscription plan is required').oneOf(['Basic', 'Standard', 'Premium'], 'Invalid subscription plan'),
  status: yup.string().required('Status is required').oneOf(['active', 'trial', 'suspended', 'inactive'], 'Invalid status'),
});

const EditOrganizationForm = ({ isOpen, onClose, organization, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(editOrganizationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      contactName: '',
      contactTitle: '',
      contactPhone: '',
      contactEmail: '',
      subscription: 'Basic',
      status: 'active'
    }
  });

  // Populate form when organization data is available
  useEffect(() => {
    if (organization && isOpen) {
      setValue('name', organization.name || '');
      setValue('email', organization.email || '');
      setValue('phone', organization.phone || '');
      setValue('address', organization.address || '');
      setValue('website', organization.website || '');
      setValue('contactName', organization.contact?.name || '');
      setValue('contactTitle', organization.contact?.title || '');
      setValue('contactPhone', organization.contact?.phone || '');
      setValue('contactEmail', organization.contact?.email || '');
      setValue('subscription', organization.subscription || 'Basic');
      setValue('status', organization.status || 'active');
    }
  }, [organization, isOpen, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create updated organization object
      const updatedOrganization = {
        ...organization,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        website: data.website,
        subscription: data.subscription,
        status: data.status,
        contact: {
          name: data.contactName,
          title: data.contactTitle,
          phone: data.contactPhone,
          email: data.contactEmail
        },
        updatedDate: new Date().toISOString()
      };

      // Call parent submit handler
      if (onSubmit) {
        onSubmit(updatedOrganization);
      }

      toast.success('Organization updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating organization:', error);
      toast.error('Failed to update organization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!organization) return null;

  const subscriptionPlans = [
    { value: 'Basic', label: 'Basic Plan - $120/month', features: '7 Features' },
    { value: 'Standard', label: 'Standard Plan - $200/month', features: '12 Features' },
    { value: 'Premium', label: 'Premium Plan - $400/month', features: '18 Features' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', description: 'Organization is fully operational' },
    { value: 'trial', label: 'Trial', description: 'Organization is in trial period' },
    { value: 'suspended', label: 'Suspended', description: 'Organization access is temporarily disabled' },
    { value: 'inactive', label: 'Inactive', description: 'Organization is not active' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={`Edit Organization - ${organization.name}`}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Organization Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Building2 className="h-4 w-4 mr-2" />
            Organization Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Organization Name *
              </label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter organization name"
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
                placeholder="organization@example.com"
                error={errors.email?.message}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                Phone Number *
              </label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+1-555-0123"
                error={errors.phone?.message}
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-foreground mb-1">
                Website (Optional)
              </label>
              <Input
                id="website"
                {...register('website')}
                placeholder="https://www.example.com"
                error={errors.website?.message}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                Address *
              </label>
              <Input
                id="address"
                {...register('address')}
                placeholder="Enter full address"
                error={errors.address?.message}
              />
            </div>
          </div>
        </div>

        {/* Contact Person Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.User className="h-4 w-4 mr-2" />
            Primary Contact Person
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-foreground mb-1">
                Contact Name *
              </label>
              <Input
                id="contactName"
                {...register('contactName')}
                placeholder="John Doe"
                error={errors.contactName?.message}
              />
            </div>

            <div>
              <label htmlFor="contactTitle" className="block text-sm font-medium text-foreground mb-1">
                Contact Title *
              </label>
              <Input
                id="contactTitle"
                {...register('contactTitle')}
                placeholder="Director / Principal"
                error={errors.contactTitle?.message}
              />
            </div>

            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-foreground mb-1">
                Contact Phone *
              </label>
              <Input
                id="contactPhone"
                {...register('contactPhone')}
                placeholder="+1-555-0123"
                error={errors.contactPhone?.message}
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-foreground mb-1">
                Contact Email *
              </label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
                placeholder="john.doe@example.com"
                error={errors.contactEmail?.message}
              />
            </div>
          </div>
        </div>

        {/* Subscription Plan */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.CreditCard className="h-4 w-4 mr-2" />
            Subscription Plan
          </h3>
          <div className="space-y-3">
            {subscriptionPlans.map((plan) => (
              <label key={plan.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <input
                  type="radio"
                  {...register('subscription')}
                  value={plan.value}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{plan.label}</div>
                  <div className="text-sm text-muted-foreground">{plan.features}</div>
                </div>
              </label>
            ))}
          </div>
          {errors.subscription && (
            <p className="text-sm text-red-600 mt-1">{errors.subscription.message}</p>
          )}
        </div>

        {/* Organization Status */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Settings className="h-4 w-4 mr-2" />
            Organization Status
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
                Update Organization
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EditOrganizationForm; 