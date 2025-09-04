import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import { ROLE_NAMES } from '../utils/constants';
import { getStudentFees } from '../utils/studentMockData';
import { hasPermission, PERMISSIONS } from '../utils/permissions';
import FeesOrgHead from './orghead/FeesOrgHead';

const Fees = () => {
  const { user } = useAuthStore();
  const [feesData, setFeesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    if (user?.role === 'student' || user?.role === 'parent') {
      loadStudentFees();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Role-based component rendering
  if (user?.role === 'organization_head') {
    return <FeesOrgHead />;
  }

  const loadStudentFees = async () => {
    try {
      setLoading(true);
      const response = await getStudentFees();
      setFeesData(response.data);
    } catch (error) {
      console.error('Error loading fees:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'overdue':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'partial':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPaymentIcon = (status) => {
    switch (status) {
      case 'paid':
        return Icons.CheckCircle;
      case 'pending':
        return Icons.Clock;
      case 'overdue':
        return Icons.AlertTriangle;
      case 'partial':
        return Icons.MinusCircle;
      default:
        return Icons.HelpCircle;
    }
  };

  // Student/Parent View
  const StudentFeesView = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading fees data...</span>
        </div>
      );
    }

    if (!feesData) return null;

    return (
      <div className="space-y-6">
        {/* Fee Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Fees</p>
                  <p className="text-2xl font-bold">${feesData.totalFees.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Academic Year {feesData.currentAcademicYear}</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Icons.CreditCard className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                  <p className="text-2xl font-bold text-green-600">${feesData.paidFees.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{((feesData.paidFees / feesData.totalFees) * 100).toFixed(0)}% Complete</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                  <Icons.CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
                  <p className="text-2xl font-bold text-orange-600">${feesData.pendingFees.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Remaining Balance</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full">
                  <Icons.Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Due Date</p>
                  <p className="text-2xl font-bold text-purple-600">{new Date(feesData.nextDueDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">Upcoming Payment</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                  <Icons.Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.TrendingUp className="h-5 w-5" />
              <span>Payment Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Fee Payment Progress</span>
                <span className="text-sm text-muted-foreground">
                  ${feesData.paidFees.toLocaleString()} / ${feesData.totalFees.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(feesData.paidFees / feesData.totalFees) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span className="font-medium text-primary">
                  {((feesData.paidFees / feesData.totalFees) * 100).toFixed(1)}% Complete
                </span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={selectedTab === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('overview')}
            className="rounded-md"
          >
            Installments
          </Button>
          <Button
            variant={selectedTab === 'structure' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('structure')}
            className="rounded-md"
          >
            Fee Structure
          </Button>
        </div>

        {/* Installments */}
        {selectedTab === 'overview' && (
          <div className="space-y-4">
            {feesData.installments.map((installment, index) => {
              const StatusIcon = getPaymentIcon(installment.status);
              
              return (
                <motion.div
                  key={installment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${getPaymentStatusColor(installment.status)}`}>
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">
                              Installment #{installment.installmentNumber}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(installment.dueDate).toLocaleDateString()}
                            </p>
                            {installment.paidDate && (
                              <p className="text-sm text-green-600">
                                Paid: {new Date(installment.paidDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold">${installment.amount.toLocaleString()}</p>
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(installment.status)}`}>
                            {installment.status.charAt(0).toUpperCase() + installment.status.slice(1)}
                          </div>
                          
                          {installment.status === 'paid' && (
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-muted-foreground">
                                Method: {installment.paymentMethod}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Receipt: {installment.receiptNumber}
                              </p>
                            </div>
                          )}
                          
                          {installment.status === 'pending' && (
                            <div className="mt-2">
                              <Button size="sm">
                                <Icons.CreditCard className="h-4 w-4 mr-2" />
                                Pay Now
                              </Button>
                              {installment.lateFeePenalty && (
                                <p className="text-xs text-red-600 mt-1">
                                  Late Fee: ${installment.lateFeePenalty}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Fee Structure */}
        {selectedTab === 'structure' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icons.FileText className="h-5 w-5" />
                <span>Fee Structure - Academic Year {feesData.currentAcademicYear}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feesData.feeStructure.map((component, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icons.DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{component.component}</h4>
                        <p className="text-sm text-muted-foreground">
                          {((component.amount / feesData.totalFees) * 100).toFixed(1)}% of total fees
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${component.amount.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
                
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Annual Fees</span>
                    <span>${feesData.totalFees.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Finance Admin/Admin View
  const AdminFeesView = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.CreditCard className="h-5 w-5" />
              <span>Fee Management System</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Icons.DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Fee Collection & Management
              </h3>
              <p className="text-muted-foreground mb-4">
                Manage fee structures, track payments, and generate financial reports.
              </p>
              <div className="flex justify-center space-x-4">
                <Button>
                  <Icons.Plus className="h-4 w-4 mr-2" />
                  Create Fee Structure
                </Button>
                <Button variant="outline">
                  <Icons.FileText className="h-4 w-4 mr-2" />
                  Payment Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fees & Payments</h1>
          <p className="text-muted-foreground">
            {user?.role === 'student' || user?.role === 'parent'
              ? 'View fee details, payment history, and make payments'
              : 'Manage fee structures, track payments, and generate reports'
            }
          </p>
        </div>
        
        {(user?.role === 'student' || user?.role === 'parent') && feesData && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icons.Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button size="sm">
              <Icons.CreditCard className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </div>
        )}
      </div>

      {/* Role-based Content */}
      {user?.role === 'student' || user?.role === 'parent' ? (
        <StudentFeesView />
      ) : (
        <AdminFeesView />
      )}
    </motion.div>
  );
};

export default Fees; 