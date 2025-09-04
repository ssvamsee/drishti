import React from 'react';
import * as Icons from 'lucide-react';
import { Modal, ModalFooter } from '../ui/Modal';
import { Button } from '../ui/Button';

const ViewInvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!invoice) return null;

  const getStatusBadge = (status) => {
    const colors = {
      paid: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      pending: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      overdue: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      cancelled: 'bg-gray-50 text-gray-600 dark:bg-gray-900/20'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invoice Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{invoice.invoiceNumber}</h2>
            <p className="text-sm text-muted-foreground mt-1">{invoice.organizationName}</p>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(invoice.status)}
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{formatCurrency(invoice.amount)}</p>
              <p className="text-xs text-muted-foreground">Total Amount</p>
            </div>
          </div>
        </div>

        {/* Invoice Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.FileText className="h-4 w-4 mr-2" />
            Invoice Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Invoice Number</label>
              <p className="text-sm font-mono text-foreground">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Invoice ID</label>
              <p className="text-sm font-mono text-foreground">{invoice.id}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Organization</label>
              <p className="text-sm text-foreground">{invoice.organizationName}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Billing Period</label>
              <p className="text-sm text-foreground">{invoice.billingPeriod}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Due Date</label>
              <p className="text-sm text-foreground">{formatDate(invoice.dueDate)}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Payment Method</label>
              <p className="text-sm text-foreground">{invoice.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.Package className="h-4 w-4 mr-2" />
            Subscription Details
          </h3>
          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Plan</label>
                <p className="text-sm font-medium text-foreground">{invoice.subscription}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Features</label>
                <p className="text-sm text-foreground">{invoice.features} Features</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Users</label>
                <p className="text-sm text-foreground">{invoice.users} Users</p>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subscription Cost:</span>
                <span className="text-lg font-semibold text-foreground">{formatCurrency(invoice.amount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        {invoice.status === 'paid' && invoice.paidDate && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
              <Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Payment Information
            </h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Paid Date</label>
                  <p className="text-sm text-foreground">{formatDate(invoice.paidDate)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Payment Method</label>
                  <p className="text-sm text-foreground">{invoice.paymentMethod}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Amount Paid</label>
                  <p className="text-sm font-semibold text-green-600">{formatCurrency(invoice.amount)}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Status</label>
                  <p className="text-sm text-green-600 font-medium">Payment Completed</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overdue Warning */}
        {invoice.status === 'overdue' && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icons.AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Payment Overdue</h4>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  This invoice was due on {formatDate(invoice.dueDate)}. Please process payment as soon as possible.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Usage Statistics */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icons.BarChart3 className="h-4 w-4 mr-2" />
            Usage Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Active Users</p>
              <p className="text-lg font-semibold text-blue-600">{invoice.users}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Features</p>
              <p className="text-lg font-semibold text-green-600">{invoice.features}</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Storage (GB)</p>
              <p className="text-lg font-semibold text-orange-600">{invoice.storage || 'N/A'}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Plan</p>
              <p className="text-sm font-semibold text-purple-600">{invoice.subscription}</p>
            </div>
          </div>
        </div>
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {
            // Trigger download
            console.log('Download invoice:', invoice.id);
          }}>
            <Icons.Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          {invoice.status !== 'paid' && (
            <Button onClick={() => {
              console.log('Mark as paid:', invoice.id);
            }}>
              <Icons.CheckCircle className="h-4 w-4 mr-2" />
              Mark as Paid
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ViewInvoiceModal; 