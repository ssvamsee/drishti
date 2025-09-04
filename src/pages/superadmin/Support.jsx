import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import DataTable from '../../components/shared/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AddTicketForm from '../../components/forms/AddTicketForm';
import ViewTicketModal from '../../components/forms/ViewTicketModal';
import AssignTicketForm from '../../components/forms/AssignTicketForm';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { getSupportTickets } from '../../utils/superadminMockData';
import { toast } from 'sonner';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [closeLoading, setCloseLoading] = useState(false);

  useEffect(() => {
    loadTickets();
  }, [filters]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const response = await getSupportTickets(filters);
      setTickets(response.data);
    } catch (error) {
      console.error('Error loading support tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = () => {
    setShowAddModal(true);
  };

  const handleTicketSubmit = (newTicket) => {
    // Add the new ticket to the list
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
  };

  const handleAssignTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowAssignModal(true);
  };

  const handleCloseTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowCloseModal(true);
  };

  const handleAssignSubmit = (updatedTicket) => {
    // Update the ticket in the list
    setTickets(prev => 
      prev.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket)
    );
    setShowAssignModal(false);
    setSelectedTicket(null);
  };

  const handleCloseConfirm = async () => {
    if (!selectedTicket) return;
    
    try {
      setCloseLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update ticket status
      const newStatus = selectedTicket.status === 'closed' ? 'open' : 
                       selectedTicket.status === 'resolved' ? 'closed' : 'resolved';
      const updatedTicket = {
        ...selectedTicket,
        status: newStatus,
        updatedDate: new Date().toISOString()
      };
      
      // Update the ticket in the list
      setTickets(prev => 
        prev.map(ticket => ticket.id === selectedTicket.id ? updatedTicket : ticket)
      );
      
      const actionText = newStatus === 'closed' ? 'closed' : 
                        newStatus === 'resolved' ? 'marked as resolved' : 'reopened';
      toast.success(`Ticket #${selectedTicket.id} ${actionText} successfully!`);
      
      setShowCloseModal(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Failed to update ticket. Please try again.');
    } finally {
      setCloseLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      open: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      in_progress: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      resolved: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      closed: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.open}`}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      medium: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      high: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      critical: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority] || colors.medium}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical': return Icons.Code;
      case 'billing': return Icons.CreditCard;
      case 'feature_request': return Icons.Lightbulb;
      case 'general': return Icons.MessageCircle;
      default: return Icons.HelpCircle;
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Ticket',
      sortable: true,
      render: (value, item) => {
        const IconComponent = getCategoryIcon(item.category);
        return (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/10">
              <IconComponent className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">{value}</div>
              <div className="text-sm text-muted-foreground">#{item.id}</div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'organizationName',
      label: 'Organization',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.submittedByName}</div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {value.replace('_', ' ').charAt(0).toUpperCase() + value.replace('_', ' ').slice(1)}
        </span>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (value) => getPriorityBadge(value)
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      sortable: true,
      render: (value) => value || 'Unassigned'
    },
    {
      key: 'responses',
      label: 'Responses',
      sortable: true,
      render: (value) => (
        <div className="text-center">
          <span className="text-sm font-medium">{value}</span>
        </div>
      )
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
      onClick: handleViewTicket,
      variant: 'outline'
    },
    {
      label: (item) => item.assignedTo ? 'Reassign' : 'Assign',
      icon: Icons.UserPlus,
      onClick: handleAssignTicket,
      variant: 'outline',
      disabled: (item) => item.status === 'closed'
    },
    {
      label: (item) => item.status === 'closed' ? 'Reopen' : 
                     item.status === 'resolved' ? 'Close' : 'Resolve',
      icon: (item) => item.status === 'closed' ? Icons.RotateCcw : Icons.CheckCircle,
      onClick: handleCloseTicket,
      variant: (item) => item.status === 'closed' ? 'default' : 'outline'
    }
  ];

  // Summary stats
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in_progress').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;
  const highPriorityTickets = tickets.filter(ticket => ticket.priority === 'high' || ticket.priority === 'critical').length;

  const stats = [
    {
      title: 'Total Tickets',
      value: tickets.length,
      icon: Icons.Ticket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Open Tickets',
      value: openTickets,
      icon: Icons.AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      title: 'In Progress',
      value: inProgressTickets,
      icon: Icons.Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'High Priority',
      value: highPriorityTickets,
      icon: Icons.AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
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
          <h1 className="text-2xl font-bold text-foreground">Support Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer support tickets and issues
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleCreateTicket}>
            <Icons.Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </motion.div>



      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!filters.status && !filters.priority ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({})}
        >
          All Tickets
        </Button>
        <Button
          variant={filters.status === 'open' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({ status: 'open' })}
        >
          Open
        </Button>
        <Button
          variant={filters.status === 'in_progress' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({ status: 'in_progress' })}
        >
          In Progress
        </Button>
        <Button
          variant={filters.priority === 'high' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({ priority: 'high' })}
        >
          High Priority
        </Button>
        <Button
          variant={filters.status === 'resolved' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({ status: 'resolved' })}
        >
          Resolved
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.TrendingUp className="h-5 w-5" />
              <span>Support Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Response Time</span>
              <span className="text-sm">2.4 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Resolution Rate</span>
              <span className="text-sm">87.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <span className="text-sm">4.6/5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Agents</span>
              <span className="text-sm">8 online</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.BarChart3 className="h-5 w-5" />
              <span>Ticket Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { category: 'Technical Issues', count: 45, percentage: 60 },
                { category: 'Billing Inquiries', count: 18, percentage: 24 },
                { category: 'Feature Requests', count: 9, percentage: 12 },
                { category: 'General Support', count: 3, percentage: 4 }
              ].map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets Table */}
      <DataTable
        title="Support Tickets"
        data={tickets}
        columns={columns}
        actions={actions}
        searchable={true}
        icon={Icons.HelpCircle}
        loading={loading}
        paginated={true}
        defaultItemsPerPage={5}
        showPaginationInfo={true}
        showItemsPerPageSelector={true}
      />

      {/* Add Ticket Modal */}
      <AddTicketForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleTicketSubmit}
      />

      {/* View Ticket Modal */}
      <ViewTicketModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
      />

      {/* Assign Ticket Modal */}
      <AssignTicketForm
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
        onSubmit={handleAssignSubmit}
      />

      {/* Close/Resolve Ticket Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCloseModal}
        onClose={() => {
          setShowCloseModal(false);
          setSelectedTicket(null);
        }}
        onConfirm={handleCloseConfirm}
        title={
          selectedTicket?.status === 'closed' ? 'Reopen Ticket' : 
          selectedTicket?.status === 'resolved' ? 'Close Ticket' : 'Resolve Ticket'
        }
        message={
          selectedTicket?.status === 'closed' 
            ? `Are you sure you want to reopen ticket "#${selectedTicket?.id} - ${selectedTicket?.title}"? This will set the status back to open.`
            : selectedTicket?.status === 'resolved'
            ? `Are you sure you want to close ticket "#${selectedTicket?.id} - ${selectedTicket?.title}"? This will permanently close the ticket.`
            : `Are you sure you want to mark ticket "#${selectedTicket?.id} - ${selectedTicket?.title}" as resolved? This indicates the issue has been fixed.`
        }
        confirmText={
          selectedTicket?.status === 'closed' ? 'Reopen' : 
          selectedTicket?.status === 'resolved' ? 'Close' : 'Resolve'
        }
        variant={selectedTicket?.status === 'closed' ? 'default' : 'outline'}
        isLoading={closeLoading}
      />
    </div>
  );
};

export default Support; 