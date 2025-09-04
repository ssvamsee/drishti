import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Eye, 
  Trash2,
  Phone,
  Mail,
  User,
  Building2,
  Users,
  Calendar
} from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import DataTable from '../../components/shared/DataTable';
import ExportDropdown from '../../components/shared/ExportDropdown';
import AddBranchForm from '../../components/forms/AddBranchForm';
import EditBranchForm from '../../components/forms/EditBranchForm';
import ViewBranchModal from '../../components/forms/ViewBranchModal';
import { cn } from '../../utils/cn';
import { ALL_ROLES_MOCK_DATA } from '../../utils/allRolesMockData';
import { USER_ROLES } from '../../utils/constants';
import { toast } from 'sonner';

const BranchesOrgHead = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [viewingBranch, setViewingBranch] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch branches for organization head
    const fetchBranches = () => {
      setLoading(true);
      setTimeout(() => {
        // Get branches from mock data for organization head
        const orgHeadData = ALL_ROLES_MOCK_DATA[USER_ROLES.ORGANIZATION_HEAD];
        const orgHeadBranches = orgHeadData?.branches || [];
        setBranches(orgHeadBranches);
        setLoading(false);
      }, 500);
    };

    fetchBranches();
  }, []);

  const handleAddBranch = (branchData) => {
    const newBranch = {
      id: `branch_${Date.now()}`,
      ...branchData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setBranches(prev => [...prev, newBranch]);
    setShowAddForm(false);
    toast.success('Branch added successfully!');
  };

  const handleEditBranch = (branchData) => {
    setBranches(prev => 
      prev.map(branch => 
        branch.id === editingBranch.id 
          ? { ...branch, ...branchData, updatedAt: new Date().toISOString() }
          : branch
      )
    );
    setEditingBranch(null);
    toast.success('Branch updated successfully!');
  };

  const handleDeleteBranch = (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(prev => prev.filter(branch => branch.id !== branchId));
      toast.success('Branch deleted successfully!');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const branchColumns = [
    {
      key: 'name',
      label: 'Branch Name',
      sortable: true,
      render: (value, branch) => {
        if (!branch) return <span>-</span>;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div>
              <div className="font-medium text-foreground">{branch.name || 'Unnamed Branch'}</div>
              <div className="text-sm text-muted-foreground">{branch.code || 'N/A'}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      render: (value, branch) => {
        if (!branch) return <span>-</span>;
        return (
          <div>
            <div className="font-medium text-foreground">{branch.city || 'Unknown'}</div>
            <div className="text-sm text-muted-foreground">{branch.state || 'N/A'}, {branch.country || 'N/A'}</div>
          </div>
        );
      },
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (value, branch) => {
        if (!branch) return <span>-</span>;
        return (
          <div>
            <div className="flex items-center space-x-1 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span>{branch.phone || 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{branch.email || 'N/A'}</span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'principal',
      label: 'Principal',
      render: (value, branch) => {
        if (!branch) return <span>-</span>;
        return (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{branch.principal || 'Not Assigned'}</span>
          </div>
        );
      },
    },
    {
      key: 'students',
      label: 'Students',
      sortable: true,
      className: 'text-center',
      render: (value, branch) => {
        if (!branch) return <span>-</span>;
        return (
          <div className="flex items-center justify-center space-x-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{branch.totalStudents || 0}</span>
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      className: 'text-center',
      render: (value, branch) => {
        if (!branch) return <span>-</span>;
        return getStatusBadge(branch.status);
      },
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (value, branch) => {
        if (!branch || !branch.createdAt) return <span>-</span>;
        return (
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(branch.createdAt).toLocaleDateString()}</span>
          </div>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      className: 'text-center',
      render: (value, branch) => {
        if (!branch) return <span className="text-muted-foreground">-</span>;
        return (
          <div className="flex items-center justify-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewingBranch(branch)}
              className="h-8 w-8 p-0 hover:bg-blue-50"
              title="View branch details"
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingBranch(branch)}
              className="h-8 w-8 p-0 hover:bg-green-50"
              title="Edit branch"
            >
              <Edit className="h-4 w-4 text-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteBranch(branch.id)}
              className="h-8 w-8 p-0 hover:bg-red-50"
              title="Delete branch"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show empty state if no branches
  if (!loading && (!branches || branches.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No branches found</p>
          <Button onClick={() => setShowAddForm(true)} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add First Branch
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col min-h-0"
    >
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              Branch Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage branches under your organization
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <ExportDropdown
              data={branches}
              filename="branches-report"
              title="Export Branches"
              variant="outline"
              size="sm"
            />
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Branch</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hidden pb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Branches</p>
                <p className="text-2xl font-bold text-foreground">{branches.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Branches</p>
                <p className="text-2xl font-bold text-foreground">
                  {branches.filter(b => b.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">
                  {branches.reduce((sum, b) => sum + (b.totalStudents || 0), 0)}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Principals Assigned</p>
                <p className="text-2xl font-bold text-foreground">
                  {branches.filter(b => b.principal).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Branches Table */}
        <div className="space-y-4">
          <DataTable
            columns={branchColumns}
            data={branches}
            searchable={true}
            searchPlaceholder="Search branches..."
            paginated={true}
            defaultItemsPerPage={5}
            showPaginationInfo={true}
            showItemsPerPageSelector={true}
            maxHeight="400px"
            stickyHeader={true}
          />
        </div>
      </div>

      {/* Modals */}
      {showAddForm && (
        <AddBranchForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddBranch}
        />
      )}

      {editingBranch && (
        <EditBranchForm
          isOpen={!!editingBranch}
          onClose={() => setEditingBranch(null)}
          onSubmit={handleEditBranch}
          branch={editingBranch}
        />
      )}

      {viewingBranch && (
        <ViewBranchModal
          isOpen={!!viewingBranch}
          onClose={() => setViewingBranch(null)}
          branch={viewingBranch}
        />
      )}
    </motion.div>
  );
};

export default BranchesOrgHead;
