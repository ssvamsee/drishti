import React from 'react';
import * as Icons from 'lucide-react';
import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';

const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      inactive: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      pending: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.inactive}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'superadmin':
        return <Icons.Crown className="h-4 w-4 text-purple-500" />;
      case 'organization_head':
        return <Icons.Building2 className="h-4 w-4 text-blue-500" />;
      case 'support_agent':
        return <Icons.Headphones className="h-4 w-4 text-green-500" />;
      default:
        return <Icons.User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleLabel = (role) => {
    const labels = {
      superadmin: 'Super Administrator',
      organization_head: 'Organization Head',
      support_agent: 'Support Agent'
    };
    return labels[role] || role;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* User Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icons.User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(user.status)}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.User className="h-4 w-4 mr-2" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Full Name</label>
              <p className="text-sm text-foreground">{user.name}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Email Address</label>
              <p className="text-sm text-foreground">{user.email}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">User ID</label>
              <p className="text-sm text-foreground font-mono">{user.id}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Phone</label>
              <p className="text-sm text-foreground">{user.phone || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Role & Permissions */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Shield className="h-4 w-4 mr-2" />
            Role & Permissions
          </h3>
          <div className="bg-muted/20 p-4 rounded-lg space-y-4">
            <div className="flex items-center space-x-3">
              {getRoleIcon(user.role)}
              <div>
                <p className="text-sm font-medium text-foreground">{getRoleLabel(user.role)}</p>
                <p className="text-xs text-muted-foreground">Primary system role</p>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2">Permissions</label>
              <div className="flex flex-wrap gap-2">
                {user.permissions && user.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            {user.organizationAccess && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">Organization Access</label>
                <p className="text-sm text-foreground">
                  {user.organizationAccess === 'all' ? 'All Organizations' : 
                   Array.isArray(user.organizationAccess) ? user.organizationAccess.join(', ') : 
                   user.organizationAccess}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Organization Details (for org heads) */}
        {user.role === 'organization_head' && user.organization && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
              <Icons.Building2 className="h-4 w-4 mr-2" />
              Organization Details
            </h3>
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-sm font-medium text-foreground">{user.organization}</p>
              <p className="text-xs text-muted-foreground">Assigned organization</p>
            </div>
          </div>
        )}

        {/* Activity Statistics */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Activity className="h-4 w-4 mr-2" />
            Activity Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Login Count</p>
              <p className="text-lg font-semibold text-blue-600">{user.loginCount || 0}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-lg font-semibold text-green-600 capitalize">{user.status}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-semibold text-orange-600">
                {new Date(user.createdDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Last Login</p>
              <p className="text-sm font-semibold text-purple-600">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
              </p>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Info className="h-4 w-4 mr-2" />
            System Information
          </h3>
          <div className="bg-muted/20 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Account Created</span>
              <span className="text-foreground">{new Date(user.createdDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Login</span>
              <span className="text-foreground">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never logged in'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Account Status</span>
              <span className="text-foreground capitalize">{user.status}</span>
            </div>
          </div>
        </div>
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => {
          console.log('Edit user from view modal');
        }}>
          <Icons.Edit className="h-4 w-4 mr-2" />
          Edit User
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewUserModal; 