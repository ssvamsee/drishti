import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';

import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AVAILABLE_FEATURES, FEATURE_CATEGORIES, FEATURE_PACKAGES } from '../../utils/featureManagement';

// Validation schema
const organizationSchema = yup.object({
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
});

const AddOrganizationForm = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(organizationSchema),
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
      subscription: 'Basic'
    }
  });

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock organization data
      const newOrganization = {
        id: `org_${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        website: data.website,
        status: 'active',
        subscription: data.subscription,
        branches: 0,
        students: 0,
        teachers: 0,
        revenue: 0,
        joinDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        features: data.subscription === 'Basic' ? 7 : data.subscription === 'Standard' ? 12 : 18,
        storage: 0,
        lastLogin: new Date().toISOString(),
        supportTickets: 0,
        billingStatus: 'active',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        contact: {
          name: data.contactName,
          title: data.contactTitle,
          phone: data.contactPhone,
          email: data.contactEmail
        }
      };

      // Call parent submit handler
      if (onSubmit) {
        onSubmit(newOrganization);
      }

      toast.success('Organization created successfully!');
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating organization:', error);
      toast.error('Failed to create organization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const subscriptionPlans = [
    { value: 'Basic', label: 'Basic Plan - $120/month', features: '7 Features', featureCount: 7 },
    { value: 'Standard', label: 'Standard Plan - $200/month', features: '12 Features', featureCount: 12 },
    { value: 'Premium', label: 'Premium Plan - $400/month', features: '18 Features', featureCount: 18 }
  ];

  // Features Modal Component
  const FeaturesModal = () => {
    const [showCompleteFeatures, setShowCompleteFeatures] = useState(false);
    
    const featuresByCategory = Object.entries(FEATURE_CATEGORIES).map(([categoryId, category]) => {
      const categoryFeatures = Object.values(AVAILABLE_FEATURES).filter(
        feature => feature.category === categoryId
      );
      return {
        id: categoryId,
        ...category,
        features: categoryFeatures
      };
    });

    const getFeaturesByPackage = (packageName) => {
      const packageFeatures = FEATURE_PACKAGES[packageName.toUpperCase()]?.features || [];
      return packageFeatures;
    };

    return (
      <Modal
        isOpen={showFeaturesModal}
        onClose={() => setShowFeaturesModal(false)}
        title="Available Features & Subscription Plans"
        size="xl"
      >
        <div className="space-y-6">
          {/* Feature Packages Overview */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Subscription Plans Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subscriptionPlans.map((plan) => (
                <div key={plan.value} className="border border-border rounded-lg p-4">
                  <div className="text-center mb-3">
                    <h4 className="font-semibold text-foreground">{plan.value} Plan</h4>
                    <p className="text-sm text-muted-foreground">${plan.value === 'Basic' ? '120' : plan.value === 'Standard' ? '200' : '400'}/month</p>
                    <p className="text-sm font-medium text-primary">{plan.featureCount} Features</p>
                  </div>
                  <div className="space-y-1">
                    {getFeaturesByPackage(plan.value).map((featureId) => {
                      const feature = AVAILABLE_FEATURES[featureId];
                      return feature ? (
                        <div key={featureId} className="flex items-center text-xs text-muted-foreground">
                          <Icons.Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          <span className="truncate">{feature.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Features by Category */}
          <div>
            <button
              type="button"
              onClick={() => setShowCompleteFeatures(!showCompleteFeatures)}
              className="flex items-center justify-between w-full text-lg font-semibold text-foreground mb-4 hover:text-primary transition-colors"
            >
              <span>Complete Feature List</span>
              <Icons.ChevronDown 
                className={`h-5 w-5 transition-transform duration-200 ${
                  showCompleteFeatures ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {showCompleteFeatures && (
              <div className="space-y-6">
              {featuresByCategory.filter(cat => cat.id !== 'Platform').map((category) => (
                <div key={category.id}>
                  <div className="flex items-center mb-3">
                    <div className={`w-2 h-2 rounded-full bg-${category.color}-500 mr-3`}></div>
                    <h4 className="font-medium text-foreground">{category.name}</h4>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({category.features.length} features)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-5">
                    {category.features.map((feature) => (
                      <div key={feature.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <Icons.Package className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-foreground">{feature.name}</div>
                          <div className="text-xs text-muted-foreground">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
        
        <ModalFooter>
          <Button 
            variant="outline" 
            onClick={() => setShowFeaturesModal(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCancel}
        title="Add New Organization"
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
                Website
              </label>
              <Input
                id="website"
                {...register('website')}
                placeholder="https://example.com"
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
                placeholder="Full address"
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
                placeholder="+1-555-0124"
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
            <button
              type="button"
              onClick={() => setShowFeaturesModal(true)}
              className="ml-2 p-1 rounded-full hover:bg-accent transition-colors"
              title="View all features and plan details"
            >
              <Icons.Info className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </button>
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
                <Icons.Plus className="h-4 w-4 mr-2" />
                Create Organization
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>

    {/* Features Modal */}
    <FeaturesModal />
    </>
  );
};

export default AddOrganizationForm; 