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
import { Input } from '../../components/ui/Input';
import BranchSelector from '../../components/shared/BranchSelector';
import DataTable from '../../components/shared/DataTable';
import ExportDropdown from '../../components/shared/ExportDropdown';
import { cn } from '../../utils/cn';
import { ALL_ROLES_MOCK_DATA } from '../../utils/allRolesMockData';
import { USER_ROLES } from '../../utils/constants';

const AttendanceOrgHead = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [timeRange, setTimeRange] = useState('today'); // 'today', 'week', 'month', 'quarter', 'custom'
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });
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

    // Apply time range multipliers to simulate different time periods
    const getTimeMultiplier = () => {
      switch (timeRange) {
        case 'today': return { present: 1.0, absent: 1.0, label: 'today' };
        case 'week': return { present: 0.95, absent: 1.1, label: 'this week' };
        case 'month': return { present: 0.88, absent: 1.25, label: 'this month' };
        case 'quarter': return { present: 0.85, absent: 1.4, label: 'this quarter' };
        case 'custom': {
          // For custom range, calculate based on date range length
          if (customDateRange.startDate && customDateRange.endDate) {
            const start = new Date(customDateRange.startDate);
            const end = new Date(customDateRange.endDate);
            const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            if (daysDiff <= 7) return { present: 0.92, absent: 1.15, label: `${daysDiff} days` };
            if (daysDiff <= 30) return { present: 0.87, absent: 1.3, label: `${daysDiff} days` };
            return { present: 0.82, absent: 1.45, label: `${daysDiff} days` };
          }
          return { present: 1.0, absent: 1.0, label: 'custom range' };
        }
        default: return { present: 1.0, absent: 1.0, label: 'today' };
      }
    };

    const multiplier = getTimeMultiplier();

    const attendanceByBranch = data.attendanceAnalytics.byBranch
      .filter(a => branches.some(b => b.id === a.branchId))
      .map(branch => {
        const adjustedPresent = Math.floor(branch.present * multiplier.present);
        const adjustedAbsent = Math.floor(branch.absent * multiplier.absent);
        const total = adjustedPresent + adjustedAbsent;
        const rate = total > 0 ? (adjustedPresent / total) * 100 : 0;
        
        return {
          ...branch,
          present: adjustedPresent,
          absent: adjustedAbsent,
          rate: rate
        };
      });

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
      timeLabel: multiplier.label
    };
  };


  const filteredData = getFilteredAttendanceData();

  // Define columns for the attendance table
  const attendanceColumns = [
    {
      key: 'branchName',
      label: 'Branch Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {value.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">
              {filteredData.branches.find(b => b.name === value)?.location || 'N/A'}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'present',
      label: 'Present',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="font-bold text-green-700 dark:text-green-300">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'absent',
      label: 'Absent',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <UserX className="h-4 w-4 text-red-600 dark:text-red-400" />
          <span className="font-bold text-red-700 dark:text-red-300">{value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'total',
      label: 'Total Students',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-blue-700 dark:text-blue-300">{(row.present + row.absent).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'rate',
      label: 'Attendance Rate',
      sortable: true,
      render: (value) => {
        const getColorScheme = (rate) => {
          if (rate >= 95) return { 
            badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
          };
          if (rate >= 85) return { 
            badgeClass: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
          };
          if (rate >= 75) return { 
            badgeClass: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
          };
          return { 
            badgeClass: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
          };
        };
        
        const colorScheme = getColorScheme(value);
        
        return (
          <Badge 
            className={cn("text-sm font-bold px-3 py-1", colorScheme.badgeClass)}
          >
            {value.toFixed(1)}%
          </Badge>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value, row) => {
        const getStatus = (rate) => {
          if (rate >= 95) return { 
            label: 'Excellent', 
            className: 'bg-emerald-500 text-white border-emerald-600 shadow-md',
            icon: '🏆',
            // dotClass: 'bg-emerald-500'
          };
          if (rate >= 85) return { 
            label: 'Good', 
            className: 'bg-green-500 text-white border-green-600 shadow-md',
            icon: '✅',
            // dotClass: 'bg-green-500'
          };
          if (rate >= 75) return { 
            label: 'Fair', 
            className: 'bg-amber-500 text-white border-amber-600 shadow-md',
            icon: '⚠️',
            // dotClass: 'bg-amber-500'
          };
          return { 
            label: 'Poor', 
            className: 'bg-red-500 text-white border-red-600 shadow-md',
            icon: '🚨',
            // dotClass: 'bg-red-500'
          };
        };
        
        const status = getStatus(row.rate);
        return (
          <div className="flex items-center justify-start space-x-3">
            {/* <div className={cn("w-3 h-3 rounded-full", status.dotClass)}></div> */}
            <span className="text-lg">{status.icon}</span>
            <Badge className={cn("font-bold px-3 py-1", status.className)}>
              {status.label}
            </Badge>
          </div>
        );
      },
    },
  ];

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



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col min-h-0"
    >
      {/* Header */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
          {/* Time Period Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex rounded-lg border border-border overflow-x-auto">
                {[
                  { key: 'today', label: 'Today' },
                  { key: 'week', label: 'Week' },
                  { key: 'month', label: 'Month' },
                  { key: 'quarter', label: 'Quarter' },
                  { key: 'custom', label: 'Custom' },
                ].map((period) => (
                  <Button
                    key={period.key}
                    variant={timeRange === period.key ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTimeRange(period.key)}
                    className={cn(
                      "text-xs px-2 py-1 whitespace-nowrap",
                      period.key === 'today' && "rounded-r-none",
                      period.key === 'week' && "rounded-none border-x-0",
                      period.key === 'month' && "rounded-none border-x-0",
                      period.key === 'quarter' && "rounded-none border-x-0",
                      period.key === 'custom' && "rounded-l-none"
                    )}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Custom Date Range Inputs */}
            {timeRange === 'custom' && (
              <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
                <Input
                  type="date"
                  value={customDateRange.startDate}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-32 sm:w-36 text-xs"
                  placeholder="Start Date"
                />
                <span className="text-muted-foreground text-xs">to</span>
                <Input
                  type="date"
                  value={customDateRange.endDate}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-32 sm:w-36 text-xs"
                  placeholder="End Date"
                />
              </div>
            )}
          </div>
          
          {/* Right side controls */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Show branch selector only if there are multiple branches */}
            {data.branches.length > 1 && (
              <BranchSelector
                branches={data.branches}
                selectedBranches={selectedBranches}
                onSelectionChange={setSelectedBranches}
                mode="multiple"
                className="w-full sm:w-64"
              />
            )}
            
            {/* Export Button */}
            <ExportDropdown
              data={filteredData.attendanceByBranch}
              filename="attendance-report"
              title="Export Report"
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hidden pb-6">
        {/* Attendance Data Table */}
        <DataTable
          columns={attendanceColumns}
          data={filteredData.attendanceByBranch}
          searchable={true}
          searchPlaceholder="Search branches..."
          paginated={true}
          defaultItemsPerPage={10}
          showPaginationInfo={true}
          showItemsPerPageSelector={true}
          maxHeight="100%"
          stickyHeader={true}
        />
      </div>
    </motion.div>
  );
};

export default AttendanceOrgHead;
