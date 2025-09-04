import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getAnalyticsData } from '../../utils/superadminMockData';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await getAnalyticsData();
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Icons.Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading analytics data...</span>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <Icons.AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">Unable to load analytics data</h3>
      </div>
    );
  }

  const { overview, usageMetrics, featureUsage, subscriptionBreakdown } = analyticsData;

  // Overview stats
  const overviewStats = [
    {
      title: 'Total Revenue',
      value: `$${overview.totalRevenue.toLocaleString()}`,
      icon: Icons.DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: `+${overview.monthlyGrowth}%`,
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: overview.activeUsers.toLocaleString(),
      icon: Icons.Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+12.3%',
      changeType: 'positive'
    },
    {
      title: 'New Organizations',
      value: overview.newOrganizations,
      icon: Icons.Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+8.1%',
      changeType: 'positive'
    },
    {
      title: 'System Usage',
      value: `${overview.systemUsage}%`,
      icon: Icons.Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: '+2.4%',
      changeType: 'positive'
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
          <h1 className="text-2xl font-bold text-foreground">Platform Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Platform-wide analytics and business insights
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
          >
            <option value="weekly">Last 7 days</option>
            <option value="monthly">Last 30 days</option>
            <option value="quarterly">Last 3 months</option>
            <option value="yearly">Last 12 months</option>
          </select>
          <Button variant="outline" size="sm" onClick={loadAnalyticsData}>
            <Icons.RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Icons.Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>



      {/* Usage Trends */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icons.TrendingUp className="h-5 w-5" />
            <span>Growth Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="text-center">
              <Icons.BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Usage Trends Chart</h3>
              <p className="text-muted-foreground">
                Organizations: {usageMetrics[usageMetrics.length - 1].organizations} | 
                Users: {usageMetrics[usageMetrics.length - 1].users.toLocaleString()} | 
                Revenue: ${usageMetrics[usageMetrics.length - 1].revenue.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Chart visualization would be implemented with a charting library
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Feature Usage & Subscription Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Zap className="h-5 w-5" />
              <span>Feature Adoption</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureUsage.map((feature, index) => (
                <motion.div
                  key={feature.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{feature.feature}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium">{feature.usage}%</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({feature.organizations} orgs)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div 
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${feature.usage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.PieChart className="h-5 w-5" />
              <span>Subscription Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionBreakdown.map((subscription, index) => (
                <motion.div
                  key={subscription.package}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      subscription.package === 'Basic' ? 'bg-blue-500' :
                      subscription.package === 'Standard' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div>
                      <div className="font-medium">{subscription.package}</div>
                      <div className="text-sm text-muted-foreground">
                        {subscription.count} organizations
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${subscription.revenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {subscription.percentage}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Target className="h-5 w-5" />
              <span>Key Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Customer Retention</span>
              <span className="text-sm font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Revenue per Org</span>
              <span className="text-sm font-medium">$242K</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Churn Rate</span>
              <span className="text-sm font-medium text-red-600">5.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Support Satisfaction</span>
              <span className="text-sm font-medium text-green-600">{overview.supportSatisfaction}/5.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Globe className="h-5 w-5" />
              <span>Geographic Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { region: 'North America', percentage: 45, count: 11 },
              { region: 'Europe', percentage: 30, count: 7 },
              { region: 'Asia Pacific', percentage: 20, count: 5 },
              { region: 'Other', percentage: 5, count: 1 }
            ].map((region) => (
              <div key={region.region} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{region.region}</span>
                  <span className="text-sm text-muted-foreground">
                    {region.count} orgs ({region.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icons.Calendar className="h-5 w-5" />
              <span>Recent Milestones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { milestone: 'Reached 25K active users', date: '2024-03-10', type: 'users' },
              { milestone: '$5M ARR milestone', date: '2024-03-01', type: 'revenue' },
              { milestone: '99.9% uptime achieved', date: '2024-02-28', type: 'performance' },
              { milestone: 'New premium features launched', date: '2024-02-15', type: 'product' }
            ].map((milestone, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  milestone.type === 'users' ? 'bg-blue-500' :
                  milestone.type === 'revenue' ? 'bg-green-500' :
                  milestone.type === 'performance' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{milestone.milestone}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(milestone.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics; 