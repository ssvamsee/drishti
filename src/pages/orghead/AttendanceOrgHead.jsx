import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Clock,
  UserCheck,
  UserX,
  Filter,
  Download
} from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import BranchSelector from '../../components/shared/BranchSelector';
import ExportDropdown from '../../components/shared/ExportDropdown';
import { cn } from '../../utils/cn';
import { ALL_ROLES_MOCK_DATA } from '../../utils/allRolesMockData';
import { USER_ROLES } from '../../utils/constants';

const AttendanceOrgHead = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'trends', 'detailed'
  const [timeRange, setTimeRange] = useState('today'); // 'today', 'week', 'month', 'quarter'
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      const orgData = ALL_ROLES_MOCK_DATA[USER_ROLES.ORGANIZATION_HEAD];
      setData(orgData);
      
      // Auto-select branch if organization has only one branch
      if (orgData && orgData.branches.length === 1) {
        setSelectedBranches([orgData.branches[0].id]);
      }
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

  const getFilteredAttendanceData = () => {
    const branches = selectedBranches.length > 0 
      ? data.branches.filter(b => selectedBranches.includes(b.id))
      : data.branches;

    const attendanceByBranch = data.attendanceAnalytics.byBranch.filter(a => 
      branches.some(b => b.id === a.branchId)
    );

    const totalPresent = attendanceByBranch.reduce((sum, a) => sum + a.present, 0);
    const totalAbsent = attendanceByBranch.reduce((sum, a) => sum + a.absent, 0);
    const totalStudents = totalPresent + totalAbsent;
    const overallRate = totalStudents > 0 ? (totalPresent / totalStudents) * 100 : 0;

    return {
      branches,
      attendanceByBranch,
      totalPresent,
      totalAbsent,
      totalStudents,
      overallRate,
      trends: data.attendanceAnalytics.trends,
    };
  };

  const filteredData = getFilteredAttendanceData();

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
              {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {trendValue}
            </p>
          )}
        </div>
        <div className={cn(
          "h-12 w-12 rounded-lg flex items-center justify-center",
          color === "blue" && "bg-blue-100 dark:bg-blue-900/20",
          color === "green" && "bg-green-100 dark:bg-green-900/20",
          color === "red" && "bg-red-100 dark:bg-red-900/20",
          color === "orange" && "bg-orange-100 dark:bg-orange-900/20"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            color === "blue" && "text-blue-600 dark:text-blue-400",
            color === "green" && "text-green-600 dark:text-green-400",
            color === "red" && "text-red-600 dark:text-red-400",
            color === "orange" && "text-orange-600 dark:text-orange-400"
          )} />
        </div>
      </div>
    </Card>
  );

  const AttendanceChart = ({ data, title }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {data.map((item, index) => {
          const rate = item.rate || ((item.present / (item.present + item.absent)) * 100);
          const maxRate = Math.max(...data.map(d => d.rate || ((d.present / (d.present + d.absent)) * 100)));
          const percentage = (rate / maxRate) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-24 text-sm font-medium truncate">
                {item.branchName || item.month}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={cn(
                    "rounded-full h-3 transition-all duration-500",
                    rate >= 90 ? 'bg-green-500' : rate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-16 text-sm text-right font-medium">
                {rate.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  const BranchDetailCard = ({ branch }) => {
    const attendanceData = filteredData.attendanceByBranch.find(a => a.branchId === branch.id);
    if (!attendanceData) return null;

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{branch.name}</h3>
            <p className="text-sm text-muted-foreground">{branch.location}</p>
          </div>
          <Badge 
            variant={attendanceData.rate >= 90 ? 'success' : attendanceData.rate >= 75 ? 'warning' : 'destructive'}
            className="text-lg px-3 py-1"
          >
            {attendanceData.rate.toFixed(1)}%
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <UserCheck className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-green-600">{attendanceData.present.toLocaleString()}</p>
            <p className="text-xs text-green-600/80">Present</p>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <UserX className="h-6 w-6 text-red-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-red-600">{attendanceData.absent.toLocaleString()}</p>
            <p className="text-xs text-red-600/80">Absent</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Students:</span>
            <span className="font-medium">{(attendanceData.present + attendanceData.absent).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Principal:</span>
            <span className="font-medium">{branch.principal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Teachers:</span>
            <span className="font-medium">{branch.teachers}</span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 min-h-full pb-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Analytics</h1>
          <p className="text-muted-foreground">
            {data.branches.length === 1 
              ? `Attendance tracking for ${data.branches[0].name}`
              : selectedBranches.length === 0 
                ? `Track attendance across all ${data.branches.length} branches`
                : selectedBranches.length === 1
                  ? `Attendance tracking for ${data.branches.find(b => b.id === selectedBranches[0])?.name}`
                  : `Attendance comparison for ${selectedBranches.length} selected branches`
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Show branch selector only if there are multiple branches */}
          {data.branches.length > 1 && (
            <BranchSelector
              branches={data.branches}
              selectedBranches={selectedBranches}
              onSelectionChange={setSelectedBranches}
              mode="multiple"
              className="w-64"
            />
          )}
          
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
              variant={viewMode === 'trends' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('trends')}
              className="rounded-none border-x-0"
            >
              Trends
            </Button>
            <Button
              variant={viewMode === 'detailed' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('detailed')}
              className="rounded-l-none"
            >
              Detailed
            </Button>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Time Period:</span>
          </div>
          <div className="flex rounded-lg border border-border">
            {[
              { key: 'today', label: 'Today' },
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
              { key: 'quarter', label: 'This Quarter' },
            ].map((period) => (
              <Button
                key={period.key}
                variant={timeRange === period.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(period.key)}
                className={cn(
                  period.key === 'today' && "rounded-r-none",
                  period.key === 'week' && "rounded-none border-x-0",
                  period.key === 'month' && "rounded-none border-x-0",
                  period.key === 'quarter' && "rounded-l-none"
                )}
              >
                {period.label}
              </Button>
            ))}
          </div>
          <ExportDropdown
            data={filteredData.attendanceByBranch}
            filename="attendance-report"
            title="Export Report"
          />
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Attendance"
          value={`${filteredData.overallRate.toFixed(1)}%`}
          icon={Users}
          trend="up"
          trendValue="+2.1% from last period"
          color="blue"
        />
        <StatCard
          title="Students Present"
          value={filteredData.totalPresent.toLocaleString()}
          icon={UserCheck}
          trend="up"
          trendValue="+5.2% from last period"
          color="green"
        />
        <StatCard
          title="Students Absent"
          value={filteredData.totalAbsent.toLocaleString()}
          icon={UserX}
          trend="down"
          trendValue="-3.1% from last period"
          color="red"
        />
        <StatCard
          title="Total Students"
          value={filteredData.totalStudents.toLocaleString()}
          icon={Clock}
          trend="up"
          trendValue="+1.8% from last period"
          color="orange"
        />
      </div>

      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart 
            data={filteredData.attendanceByBranch}
            title="Attendance by Branch"
          />
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Attendance Distribution</h3>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Excellent (≥95%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.attendanceByBranch.filter(b => b.rate >= 95).length} branches
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Good (85-94%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.attendanceByBranch.filter(b => b.rate >= 85 && b.rate < 95).length} branches
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Needs Attention (&lt;85%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.attendanceByBranch.filter(b => b.rate < 85).length} branches
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {viewMode === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart 
            data={filteredData.trends}
            title="Attendance Trends Over Time"
          />
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Monthly Comparison</h3>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-3">
              {filteredData.trends.map((trend, index) => {
                const prevTrend = index > 0 ? filteredData.trends[index - 1] : null;
                const change = prevTrend ? trend.rate - prevTrend.rate : 0;
                
                return (
                  <div key={trend.month} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-sm">{trend.month}</span>
                      {change !== 0 && (
                        <Badge variant={change > 0 ? 'success' : 'destructive'} className="text-xs">
                          {change > 0 ? '+' : ''}{change.toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                    <span className="font-bold">{trend.rate}%</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {viewMode === 'detailed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.branches.map((branch) => (
            <BranchDetailCard key={branch.id} branch={branch} />
          ))}
        </div>
      )}

      {/* Action Items */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Action Items</h3>
          <Badge variant="outline">{filteredData.attendanceByBranch.filter(b => b.rate < 85).length} requiring attention</Badge>
        </div>
        
        <div className="space-y-3">
          {filteredData.attendanceByBranch
            .filter(branch => branch.rate < 90)
            .sort((a, b) => a.rate - b.rate)
            .map((branch) => (
              <div key={branch.branchId} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    branch.rate < 75 ? 'bg-red-500' : branch.rate < 85 ? 'bg-yellow-500' : 'bg-orange-500'
                  )}></div>
                  <div>
                    <h4 className="font-medium">{branch.branchName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Attendance: {branch.rate.toFixed(1)}% ({branch.absent} absent today)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={branch.rate < 75 ? 'destructive' : 'warning'}>
                    {branch.rate < 75 ? 'Critical' : 'Monitor'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Contact Principal
                  </Button>
                </div>
              </div>
            ))}
          
          {filteredData.attendanceByBranch.filter(b => b.rate < 90).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <UserCheck className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p>All branches are maintaining excellent attendance rates!</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default AttendanceOrgHead;
