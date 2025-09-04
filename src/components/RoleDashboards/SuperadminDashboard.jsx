import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  AVAILABLE_FEATURES, 
  FEATURE_CATEGORIES, 
  FEATURE_PACKAGES,
  getAllOrganizationsFeatures,
  updateOrganizationFeatures,
  getOrganizationFeatures 
} from '../../utils/featureManagement';
import { 
  getOrganizations, 
  getSystemUsers, 
  getBillingData, 
  getSupportTickets 
} from '../../utils/superadminMockData';

const SuperadminDashboard = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [orgsData, usersData, billingDataResponse, ticketsData] = await Promise.all([
        getOrganizations(),
        getSystemUsers(),
        getBillingData(),
        getSupportTickets()
      ]);
      
      setOrganizations(Array.isArray(orgsData) ? orgsData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setBillingData(Array.isArray(billingDataResponse) ? billingDataResponse : []);
      setTickets(Array.isArray(ticketsData) ? ticketsData : []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set fallback empty arrays on error
      setOrganizations([]);
      setUsers([]);
      setBillingData([]);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // Mock system health data
  const systemHealth = {
    uptime: 99.8,
    cpuUsage: 45,
    memoryUsage: 62,
    activeConnections: 1247,
    responseTime: 120,
    errorRate: 0.1
  };

  // Mock analytics data
  const analytics = {
    totalRevenue: 2847500,
    activeUsers: 8429,
    newOrganizations: 23,
    systemUsage: 87,
    monthlyGrowth: 15.3
  };

  const getMetricColor = (value, type) => {
    if (type === 'uptime') return value >= 99.5 ? 'text-green-600' : 'text-yellow-600';
    if (type === 'usage') return value <= 70 ? 'text-green-600' : value <= 85 ? 'text-yellow-600' : 'text-red-600';
    return 'text-blue-600';
  };

  // Organizations Stats
  const organizationStats = [
    {
      title: 'Total Organizations',
      value: organizations?.length || 0,
      icon: Icons.Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Organizations',
      value: organizations?.filter(org => org.status === 'active')?.length || 0,
      icon: Icons.CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  // Users Stats
  const userStats = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      icon: Icons.Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Active Users',
      value: users?.filter(user => user.status === 'active')?.length || 0,
      icon: Icons.UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Super Admins',
      value: users?.filter(user => user.role === 'superadmin')?.length || 0,
      icon: Icons.Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  // Billing Stats
  const totalRevenue = billingData?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const paidAmount = billingData?.filter(item => item.status === 'paid')?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const pendingAmount = billingData?.filter(item => item.status === 'pending')?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const overdueAmount = billingData?.filter(item => item.status === 'overdue')?.reduce((sum, item) => sum + item.amount, 0) || 0;

  const billingStats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: Icons.DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Paid Amount',
      value: `$${paidAmount.toLocaleString()}`,
      icon: Icons.CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Pending Amount',
      value: `$${pendingAmount.toLocaleString()}`,
      icon: Icons.Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'Overdue Amount',
      value: `$${overdueAmount.toLocaleString()}`,
      icon: Icons.AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

  // Support Stats
  const openTickets = tickets?.filter(ticket => ticket.status === 'open')?.length || 0;
  const inProgressTickets = tickets?.filter(ticket => ticket.status === 'in_progress')?.length || 0;
  const resolvedTickets = tickets?.filter(ticket => ticket.status === 'resolved')?.length || 0;
  const highPriorityTickets = tickets?.filter(ticket => ticket.priority === 'high' || ticket.priority === 'critical')?.length || 0;

  const supportStats = [
    {
      title: 'Total Tickets',
      value: tickets?.length || 0,
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

  // System Health Stats
  const systemStats = [
    {
      title: 'System Uptime',
      value: `${systemHealth.uptime}%`,
      icon: Icons.Zap,
      color: getMetricColor(systemHealth.uptime, 'uptime'),
      bgColor: systemHealth.uptime >= 99.5 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'CPU Usage',
      value: `${systemHealth.cpuUsage}%`,
      icon: Icons.Cpu,
      color: getMetricColor(systemHealth.cpuUsage, 'usage'),
      bgColor: systemHealth.cpuUsage <= 70 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'Memory Usage',
      value: `${systemHealth.memoryUsage}%`,
      icon: Icons.HardDrive,
      color: getMetricColor(systemHealth.memoryUsage, 'usage'),
      bgColor: systemHealth.memoryUsage <= 70 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      title: 'Active Connections',
      value: systemHealth.activeConnections.toLocaleString(),
      icon: Icons.Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ];

  // Analytics Overview Stats
  const analyticsStats = [
    {
      title: 'Platform Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: Icons.DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: `+${analytics.monthlyGrowth}%`,
      changeType: 'positive'
    },
    {
      title: 'Monthly Growth',
      value: `${analytics.monthlyGrowth}%`,
      icon: Icons.TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+2.1%',
      changeType: 'positive'
    },
    {
      title: 'System Usage',
      value: `${analytics.systemUsage}%`,
      icon: Icons.Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: '+2.4%',
      changeType: 'positive'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Icons.BarChart3 },
    { id: 'organizations', label: 'Organizations', icon: Icons.Building2 },
    { id: 'users', label: 'Users', icon: Icons.Users },
    { id: 'billing', label: 'Billing', icon: Icons.DollarSign },
    { id: 'support', label: 'Support', icon: Icons.HelpCircle },
    { id: 'system', label: 'System Health', icon: Icons.Activity },
    { id: 'analytics', label: 'Analytics', icon: Icons.TrendingUp }
  ];

  const renderStatsGrid = (stats, title) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    {stat.change && (
                      <p className={`text-xs ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading dashboard data...</span>
        </div>
      );
    }

    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {renderStatsGrid([...analyticsStats, ...organizationStats], 'Platform Overview')}
            {renderStatsGrid([...userStats, ...supportStats.slice(0, 1)], 'User & Support Overview')}
            {renderStatsGrid(systemStats, 'System Health Overview')}
          </div>
        );
      case 'organizations':
        return renderStatsGrid(organizationStats, 'Organization Metrics');
      case 'users':
        return renderStatsGrid(userStats, 'User Metrics');
      case 'billing':
        return renderStatsGrid(billingStats, 'Billing & Revenue Metrics');
      case 'support':
        return renderStatsGrid(supportStats, 'Support Metrics');
      case 'system':
        return (
          <div className="space-y-8">
            {renderStatsGrid(systemStats, 'System Health Metrics')}
            
            {/* Additional System Details */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icons.Activity className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm">{systemHealth.responseTime}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm">{systemHealth.errorRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Disk Usage</span>
                    <span className="text-sm">68%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icons.Shield className="h-5 w-5" />
                    <span>Security Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SSL Certificate</span>
                    <span className="text-sm text-green-600">Valid</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Firewall Status</span>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Backup</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            {renderStatsGrid(analyticsStats, 'Analytics Overview')}
            
            {/* Growth Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icons.TrendingUp className="h-5 w-5" />
                  <span>Growth Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">New User Signups</span>
                    <span className="text-sm text-green-600">+23.5% this month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Organization Growth</span>
                    <span className="text-sm text-green-600">+18.2% this month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Feature Adoption</span>
                    <span className="text-sm text-blue-600">87% average adoption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive overview of all platform metrics and statistics
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadDashboardData}>
            <Icons.RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default SuperadminDashboard; 