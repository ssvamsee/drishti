import React from 'react';
import * as Icons from 'lucide-react';
import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';

const ViewTicketModal = ({ isOpen, onClose, ticket }) => {
  if (!ticket) return null;

  const getStatusBadge = (status) => {
    const colors = {
      open: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      in_progress: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      resolved: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      closed: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.open}`}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      medium: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      high: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20',
      critical: 'bg-red-50 text-red-600 dark:bg-red-900/20'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority] || colors.medium}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical':
        return <Icons.Code className="h-4 w-4" />;
      case 'billing':
        return <Icons.CreditCard className="h-4 w-4" />;
      case 'feature_request':
        return <Icons.Lightbulb className="h-4 w-4" />;
      default:
        return <Icons.MessageCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Support Ticket Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Ticket Header */}
        <div className="border-b border-border pb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{ticket.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">Ticket #{ticket.id}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(ticket.status)}
              {getPriorityBadge(ticket.priority)}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              {getCategoryIcon(ticket.category)}
              <span className="capitalize">{ticket.category.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icons.Clock className="h-4 w-4" />
              <span>{formatDate(ticket.createdDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icons.MessageSquare className="h-4 w-4" />
              <span>{ticket.responses || 0} responses</span>
            </div>
          </div>
        </div>

        {/* Organization & Submitter */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Building2 className="h-4 w-4 mr-2" />
            Organization & Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Organization</label>
              <p className="text-sm text-foreground">{ticket.organizationName}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Submitted By</label>
              <p className="text-sm text-foreground">{ticket.submittedByName}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Contact Email</label>
              <p className="text-sm text-foreground">{ticket.submittedBy}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Assigned To</label>
              <p className="text-sm text-foreground">{ticket.assignedTo || 'Unassigned'}</p>
            </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.FileText className="h-4 w-4 mr-2" />
            Ticket Information
          </h3>
          <div className="bg-muted/20 p-4 rounded-lg space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">Description</label>
              <div className="bg-background p-3 rounded border border-border">
                <p className="text-sm text-foreground whitespace-pre-wrap">{ticket.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Priority</label>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(ticket.priority)}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
                <div className="flex items-center space-x-1 text-sm text-foreground">
                  {getCategoryIcon(ticket.category)}
                  <span className="capitalize">{ticket.category.replace('_', ' ')}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Status</label>
                {getStatusBadge(ticket.status)}
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Responses</label>
                <p className="text-sm text-foreground">{ticket.responses || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Clock className="h-4 w-4 mr-2" />
            Timeline
          </h3>
          <div className="bg-muted/20 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="text-sm text-foreground">{formatDate(ticket.createdDate)}</span>
            </div>
            {ticket.updatedDate && ticket.updatedDate !== ticket.createdDate && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm text-foreground">{formatDate(ticket.updatedDate)}</span>
              </div>
            )}
            {ticket.assignedTo && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Assigned To</span>
                <span className="text-sm text-foreground">{ticket.assignedTo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Alert */}
        {ticket.status === 'open' && ticket.priority === 'critical' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icons.AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Critical Priority</h4>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  This ticket has critical priority and requires immediate attention. Please assign and resolve as soon as possible.
                </p>
              </div>
            </div>
          </div>
        )}

        {ticket.status === 'resolved' && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icons.CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200">Ticket Resolved</h4>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  This ticket has been marked as resolved. You can close it if no further action is needed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex space-x-2">
          {ticket.status !== 'closed' && (
            <>
              <Button variant="outline" onClick={() => {
                console.log('Assign ticket:', ticket.id);
              }}>
                <Icons.UserPlus className="h-4 w-4 mr-2" />
                {ticket.assignedTo ? 'Reassign' : 'Assign'}
              </Button>
              <Button onClick={() => {
                console.log('Close ticket:', ticket.id);
              }}>
                <Icons.CheckCircle className="h-4 w-4 mr-2" />
                {ticket.status === 'resolved' ? 'Close Ticket' : 'Mark Resolved'}
              </Button>
            </>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ViewTicketModal; 