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
const invoiceSchema = yup.object({
  organizationId: yup.string().required('Organization is required'),
  billingPeriod: yup.string().required('Billing period is required'),
  subscription: yup.string().required('Subscription plan is required').oneOf(['Basic', 'Standard', 'Premium'], 'Invalid subscription plan'),
  users: yup.number().required('Number of users is required').min(1, 'Must have at least 1 user'),
  storage: yup.number().required('Storage is required').min(0, 'Storage cannot be negative'),
  dueDate: yup.date().required('Due date is required').min(new Date(), 'Due date must be in the future'),
  paymentMethod: yup.string().required('Payment method is required'),
  notes: yup.string(),
});

const AddInvoiceForm = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: {
      organizationId: '',
      billingPeriod: '',
      subscription: 'Basic',
      users: 1,
      storage: 0,
      dueDate: '',
      paymentMethod: 'Bank Transfer',
      notes: ''
    }
  });

  const selectedSubscription = watch('subscription');
  const userCount = watch('users');

  // Calculate amount based on subscription and users
  const calculateAmount = (subscription, users) => {
    const basePrices = {
      Basic: 120,
      Standard: 200,
      Premium: 400
    };
    return basePrices[subscription] * 1; // Flat rate per organization, not per user
  };

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const amount = calculateAmount(data.subscription, data.users);
      
      // Generate mock invoice data
      const newInvoice = {
        id: `bill_${Date.now()}`,
        organizationId: data.organizationId,
        organizationName: organizations.find(org => org.value === data.organizationId)?.label || 'Unknown Organization',
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        amount: amount,
        status: 'pending',
        dueDate: data.dueDate,
        paidDate: null,
        billingPeriod: data.billingPeriod,
        subscription: data.subscription,
        features: data.subscription === 'Basic' ? 7 : data.subscription === 'Standard' ? 12 : 18,
        users: data.users,
        storage: data.storage,
        paymentMethod: data.paymentMethod
      };

      // Call parent submit handler
      if (onSubmit) {
        onSubmit(newInvoice);
      }

      toast.success('Invoice created successfully!');
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const organizations = [
    { value: 'org_001', label: 'ABC School Group' },
    { value: 'org_002', label: 'XYZ Education Network' },
    { value: 'org_003', label: 'Learning Hub International' },
    { value: 'org_004', label: 'Future Academy' }
  ];

  const subscriptionPlans = [
    { value: 'Basic', label: 'Basic Plan', price: 120, features: '7 Features' },
    { value: 'Standard', label: 'Standard Plan', price: 200, features: '12 Features' },
    { value: 'Premium', label: 'Premium Plan', price: 400, features: '18 Features' }
  ];

  const paymentMethods = [
    'Bank Transfer',
    'Credit Card',
    'PayPal',
    'Check',
    'Wire Transfer'
  ];

  // Get current month for default billing period
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Create New Invoice"
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Invoice Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.FileText className="h-4 w-4 mr-2" />
            Invoice Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="organizationId" className="block text-sm font-medium text-foreground mb-1">
                Organization *
              </label>
              <select
                id="organizationId"
                {...register('organizationId')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select organization</option>
                {organizations.map((org) => (
                  <option key={org.value} value={org.value}>{org.label}</option>
                ))}
              </select>
              {errors.organizationId && (
                <p className="text-sm text-red-600 mt-1">{errors.organizationId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="billingPeriod" className="block text-sm font-medium text-foreground mb-1">
                Billing Period *
              </label>
              <Input
                id="billingPeriod"
                {...register('billingPeriod')}
                placeholder={currentMonth}
                error={errors.billingPeriod?.message}
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-foreground mb-1">
                Due Date *
              </label>
              <Input
                id="dueDate"
                type="date"
                {...register('dueDate')}
                error={errors.dueDate?.message}
              />
            </div>

            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-foreground mb-1">
                Payment Method *
              </label>
              <select
                id="paymentMethod"
                {...register('paymentMethod')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              {errors.paymentMethod && (
                <p className="text-sm text-red-600 mt-1">{errors.paymentMethod.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Subscription and Usage */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Package className="h-4 w-4 mr-2" />
            Subscription and Usage
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Subscription Plan *
              </label>
              <div className="space-y-3">
                {subscriptionPlans.map((plan) => (
                  <label key={plan.value} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        {...register('subscription')}
                        value={plan.value}
                        className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                      />
                      <div>
                        <div className="font-medium text-foreground">{plan.label}</div>
                        <div className="text-sm text-muted-foreground">{plan.features}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">${plan.price}/month</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.subscription && (
                <p className="text-sm text-red-600 mt-1">{errors.subscription.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="users" className="block text-sm font-medium text-foreground mb-1">
                  Number of Users *
                </label>
                <Input
                  id="users"
                  type="number"
                  min="1"
                  {...register('users')}
                  error={errors.users?.message}
                />
              </div>

              <div>
                <label htmlFor="storage" className="block text-sm font-medium text-foreground mb-1">
                  Storage Used (GB) *
                </label>
                <Input
                  id="storage"
                  type="number"
                  min="0"
                  step="0.1"
                  {...register('storage')}
                  error={errors.storage?.message}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Amount Summary */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Invoice Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subscription ({selectedSubscription}):</span>
              <span>${calculateAmount(selectedSubscription, userCount)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t border-border pt-2">
              <span>Total Amount:</span>
              <span className="text-primary">${calculateAmount(selectedSubscription, userCount)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={3}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Additional notes or comments..."
          />
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
                Create Invoice
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddInvoiceForm; 