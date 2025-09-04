import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BookOpen, 
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  UserCheck,
  GraduationCap,
  Activity
} from 'lucide-react';

import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import BranchSelector from '../shared/BranchSelector';
import { cn } from '../../utils/cn';
import { ALL_ROLES_MOCK_DATA } from '../../utils/allRolesMockData';
import { USER_ROLES } from '../../utils/constants';

const OrganizationHeadDashboard = () => {
  const [selectedBranches, setSelectedBranches] = useState(['branch_001']);
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'comparison', 'individual'
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setData(ALL_ROLES_MOCK_DATA[USER_ROLES.ORGANIZATION_HEAD]);
    };
    
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getFilteredData = () => {
    if (selectedBranches.length === 0 || selectedBranches.length === data.branches.length) {
      return {
        type: 'all',
        branches: data.branches,
        stats: data.organizationStats,
        students: data.studentsData,
        attendance: data.attendanceAnalytics,
        performance: data.academicPerformance,
        financial: data.financialOverview,
      };
    }

    const filteredBranches = data.branches.filter(b => selectedBranches.includes(b.id));
    
    // Calculate aggregated stats for selected branches
    const aggregatedStats = {
      totalStudents: filteredBranches.reduce((sum, b) => sum + b.students, 0),
      totalStaff: filteredBranches.reduce((sum, b) => sum + (b.teachers + b.staff), 0),
      averagePerformance: filteredBranches.reduce((sum, b) => sum + b.performance, 0) / filteredBranches.length,
      totalRevenue: filteredBranches.reduce((sum, b) => sum + b.revenue, 0),
      averageAttendance: filteredBranches.reduce((sum, b) => sum + b.attendanceRate, 0) / filteredBranches.length,
      averageFeeCollection: filteredBranches.reduce((sum, b) => sum + b.feeCollection, 0) / filteredBranches.length,
    };

    return {
      type: selectedBranches.length === 1 ? 'individual' : 'multiple',
      branches: filteredBranches,
      stats: aggregatedStats,
      students: data.studentsData,
      attendance: data.attendanceAnalytics,
      performance: data.academicPerformance,
      financial: data.financialOverview,
    };
  };

  const filteredData = getFilteredData();

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs flex items-center mt-1",
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            )}>
              <TrendingUp className={cn("h-3 w-3 mr-1", trend === 'down' && "rotate-180")} />
              {trendValue}
            </p>
          )}
        </div>
        <div className={cn(
          "h-12 w-12 rounded-lg flex items-center justify-center",
          color === "blue" && "bg-blue-100 dark:bg-blue-900/20",
          color === "green" && "bg-green-100 dark:bg-green-900/20",
          color === "orange" && "bg-orange-100 dark:bg-orange-900/20",
          color === "purple" && "bg-purple-100 dark:bg-purple-900/20"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            color === "blue" && "text-blue-600 dark:text-blue-400",
            color === "green" && "text-green-600 dark:text-green-400",
            color === "orange" && "text-orange-600 dark:text-orange-400",
            color === "purple" && "text-purple-600 dark:text-purple-400"
          )} />
        </div>
      </div>
    </Card>
  );

  const BranchComparisonChart = ({ branches, metric }) => (
    <div className="space-y-3">
      {branches.map((branch, index) => {
        const value = metric === 'performance' ? branch.performance 
                    : metric === 'attendance' ? branch.attendanceRate
                    : metric === 'revenue' ? branch.revenue / 1000
                    : branch.feeCollection;
        
        const maxValue = Math.max(...branches.map(b => 
          metric === 'performance' ? b.performance 
          : metric === 'attendance' ? b.attendanceRate
          : metric === 'revenue' ? b.revenue / 1000
          : b.feeCollection
        ));
        
        const percentage = (value / maxValue) * 100;
        
        return (
          <div key={branch.id} className="flex items-center space-x-3">
            <div className="w-24 text-sm font-medium truncate">{branch.name}</div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="w-16 text-sm text-right">
              {metric === 'revenue' ? `$${value.toFixed(0)}K` : `${value.toFixed(1)}%`}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6 min-h-full pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Organization Dashboard</h1>
          <p className="text-muted-foreground">
            {filteredData.type === 'all' 
              ? `Overview of all ${data.branches.length} branches`
              : filteredData.type === 'individual'
                ? `${filteredData.branches[0]?.name} Campus Overview`
                : `Comparison of ${selectedBranches.length} selected branches`
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <BranchSelector
            branches={data.branches}
            selectedBranches={selectedBranches}
            onSelectionChange={setSelectedBranches}
            mode="multiple"
            className="w-64"
          />
          
          <div className="flex rounded-lg border border-border">
            <Button
              variant={viewMode === 'overview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('overview')}
              className="rounded-r-none"
            >
              Overview
            </Button>
            <Button
              variant={viewMode === 'comparison' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('comparison')}
              className="rounded-none border-x-0"
            >
              Comparison
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Students"
          value={filteredData.stats.totalStudents?.toLocaleString() || data.organizationStats.totalStudents.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="+5.2% from last month"
          color="blue"
        />
        <StatCard
          title="Active Students"
          value={(Math.floor((filteredData.stats.totalStudents || data.organizationStats.totalStudents) * 0.95)).toLocaleString()}
          icon={UserCheck}
          trend="up"
          trendValue="+2.1% from last month"
          color="green"
        />
        <StatCard
          title="Avg Attendance"
          value={`${(filteredData.stats.averageAttendance || data.organizationStats.averageAttendance || 92.8).toFixed(1)}%`}
          icon={Calendar}
          trend="up"
          trendValue="+1.5% from last month"
          color="purple"
        />
        <StatCard
          title="New Enrollments"
          value={(Math.floor((filteredData.stats.totalStudents || data.organizationStats.totalStudents) * 0.08)).toLocaleString()}
          icon={GraduationCap}
          trend="up"
          trendValue="+8.3% from last month"
          color="orange"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${((filteredData.stats.totalRevenue || data.organizationStats.monthlyRevenue) / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend="up"
          trendValue="+7.1% from last month"
          color="blue"
        />
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Performance Metrics</h3>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {data.performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{metric.metric}</span>
                        <span className="text-sm text-muted-foreground">
                          Target: {metric.target}{metric.metric.includes('Satisfaction') ? '/5' : '%'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={cn(
                            "rounded-full h-2 transition-all duration-500",
                            metric.status === 'above' ? 'bg-green-500' : 'bg-orange-500'
                          )}
                          style={{ width: `${(metric.value / (metric.target * 1.2)) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-bold">
                        {metric.value}{metric.metric.includes('Satisfaction') ? '/5' : '%'}
                      </div>
                      <Badge variant={metric.status === 'above' ? 'success' : 'warning'} className="text-xs">
                        {metric.status === 'above' ? 'Above Target' : 'Below Target'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Activities</h3>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {data.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      activity.priority === 'high' ? 'bg-red-100 dark:bg-red-900/20' :
                      activity.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                      'bg-blue-100 dark:bg-blue-900/20'
                    )}>
                      <AlertCircle className={cn(
                        "h-4 w-4",
                        activity.priority === 'high' ? 'text-red-600' :
                        activity.priority === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Branch Overview */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Branch Overview</h3>
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredData.branches.map((branch) => (
                <Card key={branch.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm">{branch.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {branch.location}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="font-medium">{branch.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Performance:</span>
                      <span className="font-medium">{branch.performance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attendance:</span>
                      <span className="font-medium">{branch.attendanceRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-medium">${(branch.revenue / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {branch.principal.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{branch.principal}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Pending Approvals */}
          {data.pendingApprovals.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Pending Approvals</h3>
                <Badge variant="outline" className="text-xs">
                  {data.pendingApprovals.length} pending
                </Badge>
              </div>
              <div className="space-y-3">
                {data.pendingApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium">{approval.description}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {approval.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {approval.branch} • Requested by {approval.requestedBy} • {approval.requestDate}
                      </p>
                      {approval.amount && (
                        <p className="text-xs font-medium text-green-600 mt-1">{approval.amount}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="h-8">
                        Review
                      </Button>
                      <Button size="sm" className="h-8">
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {viewMode === 'comparison' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
            <BranchComparisonChart branches={filteredData.branches} metric="performance" />
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance Comparison</h3>
            <BranchComparisonChart branches={filteredData.branches} metric="attendance" />
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Comparison</h3>
            <BranchComparisonChart branches={filteredData.branches} metric="revenue" />
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Fee Collection Comparison</h3>
            <BranchComparisonChart branches={filteredData.branches} metric="feeCollection" />
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrganizationHeadDashboard;
