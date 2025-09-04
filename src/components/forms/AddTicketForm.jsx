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
const ticketSchema = yup.object({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  organizationId: yup.string().required('Organization is required'),
  submittedByName: yup.string().required('Submitter name is required'),
  submittedBy: yup.string().email('Invalid email format').required('Submitter email is required'),
  priority: yup.string().required('Priority is required').oneOf(['low', 'medium', 'high', 'critical'], 'Invalid priority'),
  category: yup.string().required('Category is required').oneOf(['technical', 'billing', 'feature_request', 'general'], 'Invalid category'),
  assignedTo: yup.string(),
});

const AddTicketForm = ({ isOpen, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(ticketSchema),
    defaultValues: {
      title: '',
      description: '',
      organizationId: '',
      submittedByName: '',
      submittedBy: '',
      priority: 'medium',
      category: 'general',
      assignedTo: ''
    }
  });

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock ticket data
      const newTicket = {
        id: `ticket_${Date.now()}`,
        title: data.title,
        description: data.description,
        organizationId: data.organizationId,
        organizationName: organizations.find(org => org.value === data.organizationId)?.label || 'Unknown Organization',
        submittedBy: data.submittedBy,
        submittedByName: data.submittedByName,
        status: 'open',
        priority: data.priority,
        category: data.category,
        assignedTo: data.assignedTo || null,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        responses: 0
      };

      // Call parent submit handler
      if (onSubmit) {
        onSubmit(newTicket);
      }

      toast.success('Support ticket created successfully!');
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Failed to create ticket. Please try again.');
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

  const priorities = [
    { value: 'low', label: 'Low', description: 'Minor issues, no urgency', color: 'text-blue-600' },
    { value: 'medium', label: 'Medium', description: 'Standard support request', color: 'text-yellow-600' },
    { value: 'high', label: 'High', description: 'Important issue affecting operations', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical', description: 'System down, immediate attention needed', color: 'text-red-600' }
  ];

  const categories = [
    { value: 'technical', label: 'Technical Issue', icon: Icons.Code, description: 'System bugs, errors, functionality issues' },
    { value: 'billing', label: 'Billing Inquiry', icon: Icons.CreditCard, description: 'Payment, invoicing, subscription questions' },
    { value: 'feature_request', label: 'Feature Request', icon: Icons.Lightbulb, description: 'New feature suggestions and enhancements' },
    { value: 'general', label: 'General Support', icon: Icons.MessageCircle, description: 'General questions and assistance' }
  ];

  const supportAgents = [
    'Support Agent Alpha',
    'Support Agent Beta',
    'Support Agent Gamma'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Create New Support Ticket"
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Ticket Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Ticket className="h-4 w-4 mr-2" />
            Ticket Information
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
                Title *
              </label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Brief description of the issue"
                error={errors.title?.message}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
                Description *
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Detailed description of the issue, steps to reproduce, expected behavior..."
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Organization and Submitter */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Building2 className="h-4 w-4 mr-2" />
            Organization and Submitter
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
              <label htmlFor="submittedByName" className="block text-sm font-medium text-foreground mb-1">
                Submitter Name *
              </label>
              <Input
                id="submittedByName"
                {...register('submittedByName')}
                placeholder="John Doe"
                error={errors.submittedByName?.message}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="submittedBy" className="block text-sm font-medium text-foreground mb-1">
                Submitter Email *
              </label>
              <Input
                id="submittedBy"
                type="email"
                {...register('submittedBy')}
                placeholder="john.doe@organization.com"
                error={errors.submittedBy?.message}
              />
            </div>
          </div>
        </div>

        {/* Priority and Category */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Tag className="h-4 w-4 mr-2" />
            Classification
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Priority *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {priorities.map((priority) => (
                  <label key={priority.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      {...register('priority')}
                      value={priority.value}
                      className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${priority.color}`}>{priority.label}</div>
                      <div className="text-sm text-muted-foreground">{priority.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.priority && (
                <p className="text-sm text-red-600 mt-1">{errors.priority.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Category *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <label key={category.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      {...register('category')}
                      value={category.value}
                      className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                    />
                    <category.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{category.label}</div>
                      <div className="text-sm text-muted-foreground">{category.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Assignment */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.UserPlus className="h-4 w-4 mr-2" />
            Assignment (Optional)
          </h3>
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-foreground mb-1">
              Assign to Support Agent
            </label>
            <select
              id="assignedTo"
              {...register('assignedTo')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Unassigned (will be auto-assigned)</option>
              {supportAgents.map((agent) => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Leave unassigned for automatic assignment based on workload
            </p>
          </div>
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
                Create Ticket
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddTicketForm; 