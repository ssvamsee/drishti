import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import DataTable from '../../components/shared/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getMonitoringData } from '../../utils/superadminMockData';

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMonitoringData();
  }, []);

  const loadMonitoringData = async () => {
    try {
      setLoading(true);
      const response = await getMonitoringData();
      setMonitoringData(response.data);
    } catch (error) {
      console.error('Error loading monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestartServer = (server) => {
    console.log('Restart server:', server);
  };

  const handleViewLogs = (server) => {
    console.log('View logs for server:', server);
  };

  const handleResolveAlert = (alert) => {
    console.log('Resolve alert:', alert);
  };

  const getServerStatusBadge = (status) => {
    const colors = {
      healthy: 'bg-green-50 text-green-600 dark:bg-green-900/20',
      warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      critical: 'bg-red-50 text-red-600 dark:bg-red-900/20',
      maintenance: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.warning}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getAlertSeverityBadge = (severity) => {
    const colors = {
      low: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
      medium: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
      high: 'bg-red-50 text-red-600 dark:bg-red-900/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[severity] || colors.medium}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'error': return Icons.AlertCircle;
      case 'warning': return Icons.AlertTriangle;
      case 'info': return Icons.Info;
      default: return Icons.Bell;
    }
  };

  const getMetricColor = (value, type) => {
    if (type === 'uptime') return value >= 99.5 ? 'text-green-600' : value >= 99 ? 'text-yellow-600' : 'text-red-600';
    if (type === 'usage') return value <= 70 ? 'text-green-600' : value <= 85 ? 'text-yellow-600' : 'text-red-600';
    return 'text-foreground';
  };

  const serverColumns = [
    {
      key: 'name',
      label: 'Server',
      sortable: true,
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.location}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => getServerStatusBadge(value)
    },
    {
      key: 'cpu',
      label: 'CPU Usage',
      sortable: true,
      render: (value) => (
        <div className={`font-medium ${getMetricColor(value, 'usage')}`}>
          {value}%
        </div>
      )
    },
    {
      key: 'memory',
      label: 'Memory Usage',
      sortable: true,
      render: (value) => (
        <div className={`font-medium ${getMetricColor(value, 'usage')}`}>
          {value}%
        </div>
      )
    },
    {
      key: 'disk',
      label: 'Disk Usage',
      sortable: true,
      render: (value) => (
        <div className={`font-medium ${getMetricColor(value, 'usage')}`}>
          {value}%
        </div>
      )
    },
    {
      key: 'uptime',
      label: 'Uptime',
      sortable: true,
      render: (value) => (
        <div className={`font-medium ${getMetricColor(value, 'uptime')}`}>
          {value}%
        </div>
      )
    },
    {
      key: 'lastRestart',
      label: 'Last Restart',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ];

  const serverActions = [
    {
      label: 'View Logs',
      icon: Icons.FileText,
      onClick: handleViewLogs,
      variant: 'outline'
    },
    {
      label: 'Restart',
      icon: Icons.RotateCcw,
      onClick: handleRestartServer,
      variant: 'outline'
    }
  ];

  const alertColumns = [
    {
      key: 'type',
      label: 'Type',
      render: (value, item) => {
        const IconComponent = getAlertTypeIcon(value);
        return (
          <div className="flex items-center space-x-2">
            <IconComponent className="h-4 w-4" />
            <span className="capitalize">{value}</span>
          </div>
        );
      }
    },
    {
      key: 'message',
      label: 'Message',
      render: (value) => (
        <div className="max-w-md truncate">{value}</div>
      )
    },
    {
      key: 'severity',
      label: 'Severity',
      render: (value) => getAlertSeverityBadge(value)
    },
    {
      key: 'timestamp',
      label: 'Time',
      render: (value) => (
        <div className="text-sm">
          {new Date(value).toLocaleString()}
        </div>
      )
    },
    {
      key: 'resolved',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value 
            ? 'bg-green-50 text-green-600 dark:bg-green-900/20' 
            : 'bg-red-50 text-red-600 dark:bg-red-900/20'
        }`}>
          {value ? 'Resolved' : 'Active'}
        </span>
      )
    }
  ];

  const alertActions = [
    {
      label: 'Resolve',
      icon: Icons.Check,
      onClick: handleResolveAlert,
      variant: 'outline',
      disabled: (item) => item.resolved
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading monitoring data...</span>
      </div>
    );
  }

  if (!monitoringData) {
    return (
      <div className="text-center py-12">
        <Icons.AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">Unable to load monitoring data</h3>
      </div>
    );
  }

  const { systemHealth, serverMetrics, recentAlerts } = monitoringData;

  // System health stats
  const healthStats = [
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor system health, servers, and alerts
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={loadMonitoringData}>
            <Icons.RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>



      {/* Performance Metrics */}
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
              <span className="text-sm font-medium">Network Traffic</span>
              <span className="text-sm">{systemHealth.networkTraffic} MB/s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Disk Usage</span>
              <span className="text-sm">{systemHealth.diskUsage}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.AlertTriangle className="h-5 w-5" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.slice(0, 3).map((alert) => {
                const IconComponent = getAlertTypeIcon(alert.type);
                return (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                    <IconComponent className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {getAlertSeverityBadge(alert.severity)}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Metrics Table */}
      <DataTable
        title="Server Status"
        data={serverMetrics}
        columns={serverColumns}
        actions={serverActions}
        searchable={false}
        icon={Icons.Server}
        loading={false}
      />

      {/* Alerts Table */}
      <DataTable
        title="System Alerts"
        data={recentAlerts}
        columns={alertColumns}
        actions={alertActions}
        searchable={true}
        icon={Icons.Bell}
        loading={false}
      />
    </div>
  );
};

export default Monitoring; 