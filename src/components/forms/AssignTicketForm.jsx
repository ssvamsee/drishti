import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import * as Icons from 'lucide-react';

import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';

// Validation schema
const assignTicketSchema = yup.object({
  assignedTo: yup.string().required('Support agent is required'),
  priority: yup.string().required('Priority is required').oneOf(['low', 'medium', 'high', 'critical'], 'Invalid priority'),
  notes: yup.string()
});

const AssignTicketForm = ({ isOpen, onClose, ticket, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(assignTicketSchema),
    defaultValues: {
      assignedTo: ticket?.assignedTo || '',
      priority: ticket?.priority || 'medium',
      notes: ''
    }
  });

  // Update form when ticket changes
  React.useEffect(() => {
    if (ticket && isOpen) {
      setValue('assignedTo', ticket.assignedTo || '');
      setValue('priority', ticket.priority || 'medium');
      setValue('notes', '');
    }
  }, [ticket, isOpen, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create updated ticket object
      const updatedTicket = {
        ...ticket,
        assignedTo: data.assignedTo,
        priority: data.priority,
        status: ticket.status === 'open' ? 'in_progress' : ticket.status,
        updatedDate: new Date().toISOString()
      };

      // Call parent submit handler
      if (onSubmit) {
        onSubmit(updatedTicket);
      }

      toast.success(`Ticket assigned to ${data.assignedTo} successfully!`);
      reset();
      onClose();
    } catch (error) {
      console.error('Error assigning ticket:', error);
      toast.error('Failed to assign ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!ticket) return null;

  const supportAgents = [
    { value: 'Sarah Johnson', label: 'Sarah Johnson', speciality: 'Technical Issues', workload: 8 },
    { value: 'Mike Chen', label: 'Mike Chen', speciality: 'Billing Support', workload: 5 },
    { value: 'Lisa Rodriguez', label: 'Lisa Rodriguez', speciality: 'General Support', workload: 12 },
    { value: 'David Kim', label: 'David Kim', speciality: 'Feature Requests', workload: 3 },
    { value: 'Emma Wilson', label: 'Emma Wilson', speciality: 'Technical Issues', workload: 7 }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', description: 'Minor issues, can wait', color: 'text-blue-600' },
    { value: 'medium', label: 'Medium Priority', description: 'Standard support request', color: 'text-yellow-600' },
    { value: 'high', label: 'High Priority', description: 'Important issue affecting operations', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical Priority', description: 'System down, immediate attention needed', color: 'text-red-600' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={`${ticket.assignedTo ? 'Reassign' : 'Assign'} Ticket`}
      size="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Ticket Summary */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-foreground mb-2">Ticket Summary</h3>
          <div className="space-y-2">
            <p className="text-sm text-foreground font-medium">{ticket.title}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>#{ticket.id}</span>
              <span>{ticket.organizationName}</span>
              <span className="capitalize">{ticket.category.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Assignment */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.UserPlus className="h-4 w-4 mr-2" />
            Assign Support Agent
          </h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Select Agent *
            </label>
            <div className="space-y-3">
              {supportAgents.map((agent) => (
                <label key={agent.value} className="flex items-start space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="radio"
                    {...register('assignedTo')}
                    value={agent.value}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-foreground">{agent.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {agent.workload} active tickets
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Speciality: {agent.speciality}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.assignedTo && (
              <p className="text-sm text-red-600 mt-1">{errors.assignedTo.message}</p>
            )}
          </div>
        </div>

        {/* Priority Update */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.AlertTriangle className="h-4 w-4 mr-2" />
            Update Priority (Optional)
          </h3>
          <div className="space-y-3">
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

        {/* Assignment Notes */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.MessageSquare className="h-4 w-4 mr-2" />
            Assignment Notes (Optional)
          </h3>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1">
              Additional Instructions
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Any special instructions or notes for the assigned agent..."
            />
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
                Assigning...
              </>
            ) : (
              <>
                <Icons.UserPlus className="h-4 w-4 mr-2" />
                {ticket.assignedTo ? 'Reassign Ticket' : 'Assign Ticket'}
              </>
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AssignTicketForm; 