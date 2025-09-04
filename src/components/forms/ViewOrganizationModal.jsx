import React from 'react';
import * as Icons from 'lucide-react';
import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';

const ViewOrganizationModal = ({ isOpen, onClose, organization }) => {
  if (!organization) return null;

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      trial: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      suspended: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      inactive: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.inactive}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Organization Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Organization Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{organization.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">ID: {organization.id}</p>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(organization.status)}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Building2 className="h-4 w-4 mr-2" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Organization Name</label>
              <p className="text-sm text-foreground">{organization.name}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Email</label>
              <p className="text-sm text-foreground">{organization.email}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Phone</label>
              <p className="text-sm text-foreground">{organization.phone}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Website</label>
              <p className="text-sm text-foreground">{organization.website || 'N/A'}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Address</label>
              <p className="text-sm text-foreground">{organization.address}</p>
            </div>
          </div>
        </div>

        {/* Subscription Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.CreditCard className="h-4 w-4 mr-2" />
            Subscription Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/20 p-4 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Plan</label>
              <p className="text-sm font-medium text-foreground">{organization.subscription}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Features</label>
              <p className="text-sm text-foreground">{organization.features} Features</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Monthly Revenue</label>
              <p className="text-sm font-medium text-green-600">${organization.revenue}</p>
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.User className="h-4 w-4 mr-2" />
            Primary Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Contact Name</label>
              <p className="text-sm text-foreground">{organization.contact?.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Contact Email</label>
              <p className="text-sm text-foreground">{organization.contact?.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Contact Phone</label>
              <p className="text-sm text-foreground">{organization.contact?.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Title</label>
              <p className="text-sm text-foreground">{organization.contact?.title || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.BarChart3 className="h-4 w-4 mr-2" />
            Usage Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Users</p>
              <p className="text-lg font-semibold text-blue-600">{organization.users || 0}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Branches</p>
              <p className="text-lg font-semibold text-green-600">{organization.branches || 0}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Students</p>
              <p className="text-lg font-semibold text-orange-600">{organization.students || 0}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Storage (GB)</p>
              <p className="text-lg font-semibold text-purple-600">{organization.storage || 0}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Clock className="h-4 w-4 mr-2" />
            Timeline
          </h3>
          <div className="bg-muted/20 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Created</span>
              <span className="text-foreground">{new Date(organization.createdDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Activity</span>
              <span className="text-foreground">{new Date(organization.lastActivity).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Next Billing</span>
              <span className="text-foreground">{organization.nextBilling || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => {
          // Could trigger edit mode or other actions
          console.log('Edit organization from view modal');
        }}>
          <Icons.Edit className="h-4 w-4 mr-2" />
          Edit Organization
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewOrganizationModal; 