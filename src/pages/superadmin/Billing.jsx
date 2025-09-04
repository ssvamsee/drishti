import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import DataTable from '../../components/shared/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import AddInvoiceForm from '../../components/forms/AddInvoiceForm';
import ViewInvoiceModal from '../../components/forms/ViewInvoiceModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { getBillingData } from '../../utils/superadminMockData';
import { toast } from 'sonner';

const Billing = () => {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMarkPaidModal, setShowMarkPaidModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [markPaidLoading, setMarkPaidLoading] = useState(false);

  useEffect(() => {
    loadBillingData();
  }, [filters]);

  const loadBillingData = async () => {
    try {
      setLoading(true);
      const response = await getBillingData(filters);
      setBillingData(response.data);
    } catch (error) {
      console.error('Error loading billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = () => {
    setShowAddModal(true);
  };

  const handleInvoiceSubmit = (newInvoice) => {
    // Add the new invoice to the list
    setBillingData(prev => [newInvoice, ...prev]);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleDownloadInvoice = (invoice) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#'; // In real app, this would be the PDF URL
    link.download = `invoice-${invoice.invoiceNumber}.pdf`;
    
    // Simulate download
    toast.success(`Downloading invoice ${invoice.invoiceNumber}...`);
    console.log('Download invoice:', invoice);
  };

  const handleMarkPaid = (invoice) => {
    setSelectedInvoice(invoice);
    setShowMarkPaidModal(true);
  };

  const handleMarkPaidConfirm = async () => {
    if (!selectedInvoice) return;
    
    try {
      setMarkPaidLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update invoice status
      const updatedInvoice = {
        ...selectedInvoice,
        status: 'paid',
        paidDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
      };
      
      // Update the invoice in the list
      setBillingData(prev => 
        prev.map(invoice => invoice.id === selectedInvoice.id ? updatedInvoice : invoice)
      );
      
      toast.success(`Invoice ${selectedInvoice.invoiceNumber} marked as paid successfully!`);
      
      setShowMarkPaidModal(false);
      setSelectedInvoice(null);
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      toast.error('Failed to mark invoice as paid. Please try again.');
    } finally {
      setMarkPaidLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      paid: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      pending: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      overdue: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      cancelled: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getSubscriptionBadge = (subscription) => {
    const colors = {
      Basic: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      Standard: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20',
      Premium: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[subscription] || 'bg-gray-50 text-gray-600'}`}>
        {subscription}
      </span>
    );
  };

  const columns = [
    {
      key: 'invoiceNumber',
      label: 'Invoice',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.billingPeriod}</div>
        </div>
      )
    },
    {
      key: 'organizationName',
      label: 'Organization',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{getSubscriptionBadge(item.subscription)}</div>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => (
        <div className="font-medium">${value.toLocaleString()}</div>
      )
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      render: (value, item) => {
        const isOverdue = new Date(value) < new Date() && item.status !== 'paid';
        return (
          <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
            {new Date(value).toLocaleDateString()}
          </div>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    {
      key: 'paidDate',
      label: 'Paid Date',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {value ? new Date(value).toLocaleDateString() : '-'}
        </div>
      )
    },
    {
      key: 'paymentMethod',
      label: 'Payment Method',
      sortable: true,
      render: (value) => (
        <div className="text-sm">{value}</div>
      )
    }
  ];

  const actions = [
    {
      label: 'View',
      icon: Icons.Eye,
      onClick: handleViewInvoice,
      variant: 'outline'
    },
    {
      label: 'Download',
      icon: Icons.Download,
      onClick: handleDownloadInvoice,
      variant: 'outline'
    },
    {
      label: 'Mark Paid',
      icon: Icons.CheckCircle,
      onClick: handleMarkPaid,
      variant: 'default',
      disabled: (item) => item.status === 'paid'
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
          <h1 className="text-2xl font-bold text-foreground">Billing & Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage invoices, payments, and subscription billing
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleCreateInvoice}>
            <Icons.Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </motion.div>



      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!filters.status ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({})}
        >
          All Invoices
        </Button>
        <Button
          variant={filters.status === 'paid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({ status: 'paid' })}
        >
          Paid
        </Button>
        <Button
          variant={filters.status === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({ status: 'pending' })}
        >
          Pending
        </Button>
        <Button
          variant={filters.status === 'overdue' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilters({ status: 'overdue' })}
        >
          Overdue
        </Button>
      </div>

      {/* Revenue Chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.TrendingUp className="h-5 w-5" />
            <span>Revenue Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="text-center">
              <Icons.BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Revenue chart would be displayed here</p>
              <p className="text-sm text-muted-foreground">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Billing Table */}
      <DataTable
        title="Invoices & Billing"
        data={billingData}
        columns={columns}
        actions={actions}
        searchable={true}
        icon={Icons.CreditCard}
        loading={loading}
        paginated={true}
        defaultItemsPerPage={5}
        showPaginationInfo={true}
        showItemsPerPageSelector={true}
      />

      {/* Add Invoice Modal */}
      <AddInvoiceForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleInvoiceSubmit}
      />

      {/* View Invoice Modal */}
      <ViewInvoiceModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />

      {/* Mark Paid Confirmation Modal */}
      <ConfirmationModal
        isOpen={showMarkPaidModal}
        onClose={() => {
          setShowMarkPaidModal(false);
          setSelectedInvoice(null);
        }}
        onConfirm={handleMarkPaidConfirm}
        title="Mark Invoice as Paid"
        message={
          selectedInvoice
            ? `Are you sure you want to mark invoice "${selectedInvoice.invoiceNumber}" for ${selectedInvoice.organizationName} as paid? This action will update the payment status and record the payment date.`
            : ''
        }
        confirmText="Mark as Paid"
        variant="default"
        isLoading={markPaidLoading}
      />
    </div>
  );
};

export default Billing; 