import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import DataTable from '../../components/shared/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import AddUserForm from '../../components/forms/AddUserForm';
import ViewUserModal from '../../components/forms/ViewUserModal';
import EditUserForm from '../../components/forms/EditUserForm';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { getSystemUsers } from '../../utils/superadminMockData';
import { toast } from 'sonner';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deactivateLoading, setDeactivateLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getSystemUsers(filters);
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleUserSubmit = (newUser) => {
    // Add the new user to the list
    setUsers(prev => [newUser, ...prev]);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeactivateUser = (user) => {
    setSelectedUser(user);
    setShowDeactivateModal(true);
  };

  const handleEditSubmit = (updatedUser) => {
    // Update the user in the list
    setUsers(prev => 
      prev.map(user => user.id === updatedUser.id ? updatedUser : user)
    );
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeactivateConfirm = async () => {
    if (!selectedUser) return;
    
    try {
      setDeactivateLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user status
      const newStatus = selectedUser.status === 'inactive' ? 'active' : 'inactive';
      const updatedUser = {
        ...selectedUser,
        status: newStatus,
        updatedDate: new Date().toISOString()
      };
      
      // Update the user in the list
      setUsers(prev => 
        prev.map(user => user.id === selectedUser.id ? updatedUser : user)
      );
      
      toast.success(
        newStatus === 'inactive' 
          ? 'User deactivated successfully!' 
          : 'User activated successfully!'
      );
      
      setShowDeactivateModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status. Please try again.');
    } finally {
      setDeactivateLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      inactive: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      suspended: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.inactive}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      superadmin: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20',
      organization_head: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      support_agent: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20'
    };
    
    const labels = {
      superadmin: 'Super Admin',
      organization_head: 'Org Head',
      support_agent: 'Support'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role] || 'bg-gray-50 text-gray-600'}`}>
        {labels[role] || role}
      </span>
    );
  };

  const columns = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icons.User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => getRoleBadge(value)
    },
    {
      key: 'organization',
      label: 'Organization',
      sortable: true,
      render: (value) => value || 'Platform User'
    },
    {
      key: 'loginCount',
      label: 'Login Count',
      sortable: true,
      render: (value) => value?.toLocaleString() || '0'
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    {
      key: 'createdDate',
      label: 'Created',
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
      onClick: handleViewUser,
      variant: 'outline'
    },
    {
      label: 'Edit',
      icon: Icons.Edit,
      onClick: handleEditUser,
      variant: 'outline'
    },
    {
      label: (item) => item.status === 'inactive' ? 'Activate' : 'Deactivate',
      icon: (item) => item.status === 'inactive' ? Icons.UserCheck : Icons.UserX,
      onClick: handleDeactivateUser,
      variant: (item) => item.status === 'inactive' ? 'default' : 'destructive',
      disabled: (item) => item.role === 'superadmin'
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
          <h1 className="text-2xl font-bold text-foreground">System Users</h1>
          <p className="text-muted-foreground">
            Manage platform users and access controls
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleAddUser}>
            <Icons.UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </motion.div>



      {/* Filter Buttons and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.role && !filters.status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({})}
          >
            All Users
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {users.length}
            </span>
          </Button>
          <Button
            variant={filters.role === 'superadmin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ role: 'superadmin' })}
          >
            Super Admins
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {users.filter(user => user.role === 'superadmin').length}
            </span>
          </Button>
          <Button
            variant={filters.role === 'organization_head' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ role: 'organization_head' })}
          >
            Org Heads
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {users.filter(user => user.role === 'organization_head').length}
            </span>
          </Button>
          <Button
            variant={filters.status === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilters({ status: 'active' })}
          >
            Active Only
            <span className="ml-2 bg-background/50 text-foreground px-1.5 py-0.5 rounded text-xs">
              {users.filter(user => user.status === 'active').length}
            </span>
          </Button>
        </div>
        
        {/* Search Box */}
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        title="System Users"
        data={users}
        columns={columns}
        actions={actions}
        searchable={true}
        icon={Icons.Users}
        loading={loading}
        paginated={true}
        defaultItemsPerPage={5}
        showPaginationInfo={true}
        showItemsPerPageSelector={true}
      />

      {/* Add User Modal */}
      <AddUserForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleUserSubmit}
      />

      {/* View User Modal */}
      <ViewUserModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      {/* Edit User Modal */}
      <EditUserForm
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={handleEditSubmit}
      />

      {/* Deactivate/Activate Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeactivateModal}
        onClose={() => {
          setShowDeactivateModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeactivateConfirm}
        title={selectedUser?.status === 'inactive' ? 'Activate User' : 'Deactivate User'}
        message={
          selectedUser?.status === 'inactive'
            ? `Are you sure you want to activate "${selectedUser?.name}"? This will restore their access to the system.`
            : `Are you sure you want to deactivate "${selectedUser?.name}"? This will disable their access to the system.`
        }
        confirmText={selectedUser?.status === 'inactive' ? 'Activate' : 'Deactivate'}
        variant={selectedUser?.status === 'inactive' ? 'default' : 'destructive'}
        isLoading={deactivateLoading}
      />
    </div>
  );
};

export default Users; 