import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import DataTable from '../../components/shared/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import AddOrganizationForm from '../../components/forms/AddOrganizationForm';
import ViewOrganizationModal from '../../components/forms/ViewOrganizationModal';
import EditOrganizationForm from '../../components/forms/EditOrganizationForm';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { getOrganizations } from '../../utils/superadminMockData';
import { toast } from 'sonner';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [suspendLoading, setSuspendLoading] = useState(false);

  useEffect(() => {
    loadOrganizations();
  }, [filters]);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const response = await getOrganizations(filters);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrganization = () => {
    setShowAddModal(true);
  };

  const handleOrganizationSubmit = (newOrganization) => {
    // Add the new organization to the list
    setOrganizations(prev => [newOrganization, ...prev]);
    
    // Optionally refresh the data from the server
    // loadOrganizations();
  };

  const handleViewOrganization = (org) => {
    setSelectedOrganization(org);
    setShowViewModal(true);
  };

  const handleEditOrganization = (org) => {
    setSelectedOrganization(org);
    setShowEditModal(true);
  };

  const handleSuspendOrganization = (org) => {
    setSelectedOrganization(org);
    setShowSuspendModal(true);
  };

  const handleEditSubmit = (updatedOrganization) => {
    // Update the organization in the list
    setOrganizations(prev => 
      prev.map(org => org.id === updatedOrganization.id ? updatedOrganization : org)
    );
    setShowEditModal(false);
    setSelectedOrganization(null);
  };

  const handleSuspendConfirm = async () => {
    if (!selectedOrganization) return;
    
    try {
      setSuspendLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update organization status
      const newStatus = selectedOrganization.status === 'suspended' ? 'active' : 'suspended';
      const updatedOrganization = {
        ...selectedOrganization,
        status: newStatus,
        updatedDate: new Date().toISOString()
      };
      
      // Update the organization in the list
      setOrganizations(prev => 
        prev.map(org => org.id === selectedOrganization.id ? updatedOrganization : org)
      );
      
      toast.success(
        newStatus === 'suspended' 
          ? 'Organization suspended successfully!' 
          : 'Organization reactivated successfully!'
      );
      
      setShowSuspendModal(false);
      setSelectedOrganization(null);
    } catch (error) {
      console.error('Error updating organization status:', error);
      toast.error('Failed to update organization status. Please try again.');
    } finally {
      setSuspendLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      trial: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      suspended: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      inactive: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.inactive}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getBillingStatusBadge = (status) => {
    const colors = {
      paid: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      pending: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      overdue: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      trial: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const columns = [
    {
      key: 'name',
      label: 'Organization',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.email}</div>
        </div>
      )
    },
    {
      key: 'subscription',
      label: 'Subscription',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.features} features</div>
        </div>
      )
    },
    {
      key: 'students',
      label: 'Users',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium">{value.toLocaleString()} students</div>
          <div className="text-sm text-muted-foreground">{item.teachers} teachers</div>
        </div>
      )
    },
    {
      key: 'revenue',
      label: 'Revenue',
      sortable: true,
      render: (value) => (
        <div className="font-medium">${value.toLocaleString()}/month</div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    {
      key: 'billingStatus',
      label: 'Billing',
      sortable: true,
      render: (value) => getBillingStatusBadge(value)
    },
    {
      key: 'lastLogin',
      label: 'Last Activity',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ];

  const actions = [
    {
      label: 'View',
      icon: Icons.Eye,
      onClick: handleViewOrganization,
      variant: 'outline'
    },
    {
      label: 'Edit',
      icon: Icons.Edit,
      onClick: handleEditOrganization,
      variant: 'outline'
    },
    {
      label: (item) => item.status === 'suspended' ? 'Reactivate' : 'Suspend',
      icon: (item) => item.status === 'suspended' ? Icons.Play : Icons.Ban,
      onClick: handleSuspendOrganization,
      variant: (item) => item.status === 'suspended' ? 'default' : 'destructive'
    }
  ];



  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Organizations</h1>
          <p className="text-muted-foreground">
            Manage organizations, subscriptions, and billing
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleAddOrganization}>
            <Icons.Plus className="h-4 w-4 mr-2" />
            Add Organization
          </Button>
        </div>
      </motion.div>



      {/* Filter Buttons and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({})}
          >
            All Organizations
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {organizations.length}
            </span>
          </Button>
          <Button
            variant={filters.status === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ status: 'active' })}
          >
            Active
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {organizations.filter(org => org.status === 'active').length}
            </span>
          </Button>
          <Button
            variant={filters.status === 'trial' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ status: 'trial' })}
          >
            Trial
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {organizations.filter(org => org.status === 'trial').length}
            </span>
          </Button>
          <Button
            variant={filters.status === 'suspended' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ status: 'suspended' })}
          >
            Suspended
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {organizations.filter(org => org.status === 'suspended').length}
            </span>
          </Button>
        </div>
        
        {/* Search Box */}
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      {/* Organizations Table */}
      <DataTable
        data={organizations}
        columns={columns}
        actions={actions}
        loading={loading}
        paginated={true}
        defaultItemsPerPage={5}
        showPaginationInfo={true}
        showItemsPerPageSelector={true}
        searchTerm={searchTerm}
      />

      {/* Add Organization Modal */}
      <AddOrganizationForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleOrganizationSubmit}
      />

      {/* View Organization Modal */}
      <ViewOrganizationModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedOrganization(null);
        }}
        organization={selectedOrganization}
      />

      {/* Edit Organization Modal */}
      <EditOrganizationForm
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedOrganization(null);
        }}
        organization={selectedOrganization}
        onSubmit={handleEditSubmit}
      />

      {/* Suspend/Reactivate Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSuspendModal}
        onClose={() => {
          setShowSuspendModal(false);
          setSelectedOrganization(null);
        }}
        onConfirm={handleSuspendConfirm}
        title={selectedOrganization?.status === 'suspended' ? 'Reactivate Organization' : 'Suspend Organization'}
        message={
          selectedOrganization?.status === 'suspended'
            ? `Are you sure you want to reactivate "${selectedOrganization?.name}"? This will restore full access to the organization and all its users.`
            : `Are you sure you want to suspend "${selectedOrganization?.name}"? This will disable access for the organization and all its users.`
        }
        confirmText={selectedOrganization?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
        variant={selectedOrganization?.status === 'suspended' ? 'default' : 'destructive'}
        isLoading={suspendLoading}
      />
    </div>
  );
};

export default Organizations; 