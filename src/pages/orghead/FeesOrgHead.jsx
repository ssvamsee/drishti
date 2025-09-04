import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  PieChart,
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

const FeesOrgHead = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'collection', 'analysis'
  const [timeRange, setTimeRange] = useState('month'); // 'month', 'quarter', 'year'
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

  const getFilteredFeesData = () => {
    const branches = selectedBranches.length > 0 
      ? data.branches.filter(b => selectedBranches.includes(b.id))
      : data.branches;

    const financialByBranch = data.financialOverview.byBranch.filter(f => 
      branches.some(b => b.id === f.branchId)
    );

    const totalRevenue = financialByBranch.reduce((sum, f) => sum + f.revenue, 0);
    const totalExpenses = financialByBranch.reduce((sum, f) => sum + f.expenses, 0);
    const totalProfit = financialByBranch.reduce((sum, f) => sum + f.profit, 0);
    const avgCollectionRate = branches.reduce((sum, b) => sum + b.feeCollection, 0) / branches.length;

    return {
      branches,
      financialByBranch,
      totalRevenue,
      totalExpenses,
      totalProfit,
      avgCollectionRate: avgCollectionRate || 0,
      feeCollection: data.financialOverview.feeCollection,
      profitMargin: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0,
    };
  };

  const filteredData = getFilteredFeesData();

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
          color === "orange" && "bg-orange-100 dark:bg-orange-900/20",
          color === "red" && "bg-red-100 dark:bg-red-900/20"
        )}>
          <Icon className={cn(
            "h-6 w-6",
            color === "blue" && "text-blue-600 dark:text-blue-400",
            color === "green" && "text-green-600 dark:text-green-400",
            color === "orange" && "text-orange-600 dark:text-orange-400",
            color === "red" && "text-red-600 dark:text-red-400"
          )} />
        </div>
      </div>
    </Card>
  );

  const RevenueChart = ({ data, title }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {data.map((item, index) => {
          const maxRevenue = Math.max(...data.map(d => d.revenue));
          const percentage = (item.revenue / maxRevenue) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-24 text-sm font-medium truncate">{item.branchName}</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-500 rounded-full h-3 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-20 text-sm text-right font-medium">
                ${(item.revenue / 1000).toFixed(0)}K
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  const CollectionChart = ({ branches, title }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <CreditCard className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {branches.map((branch, index) => {
          const maxRate = Math.max(...branches.map(b => b.feeCollection));
          const percentage = (branch.feeCollection / maxRate) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-24 text-sm font-medium truncate">{branch.name}</div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={cn(
                    "rounded-full h-3 transition-all duration-500",
                    branch.feeCollection >= 90 ? 'bg-green-500' : 
                    branch.feeCollection >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-16 text-sm text-right font-medium">
                {branch.feeCollection.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  const BranchFinancialCard = ({ branch }) => {
    const financialData = filteredData.financialByBranch.find(f => f.branchId === branch.id);
    if (!financialData) return null;

    const profitMargin = (financialData.profit / financialData.revenue) * 100;

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{branch.name}</h3>
            <p className="text-sm text-muted-foreground">{branch.location}</p>
          </div>
          <Badge 
            variant={profitMargin >= 20 ? 'success' : profitMargin >= 10 ? 'warning' : 'destructive'}
            className="text-lg px-3 py-1"
          >
            {profitMargin.toFixed(1)}%
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <span className="text-lg font-bold text-green-600">
              ${(financialData.revenue / 1000).toFixed(0)}K
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Expenses</span>
            </div>
            <span className="text-lg font-bold text-red-600">
              ${(financialData.expenses / 1000).toFixed(0)}K
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Profit</span>
            </div>
            <span className="text-lg font-bold text-blue-600">
              ${(financialData.profit / 1000).toFixed(0)}K
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Students:</span>
            <span className="font-medium">{branch.students.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Fee Collection Rate:</span>
            <span className="font-medium">{branch.feeCollection}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Avg Fee per Student:</span>
            <span className="font-medium">${(financialData.revenue / branch.students).toFixed(0)}</span>
          </div>
        </div>
      </Card>
    );
  };

  const FeeStatusCard = ({ title, icon: Icon, data, color }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon className={cn("h-5 w-5", `text-${color}-600`)} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <Badge variant="outline">${(data.amount / 1000).toFixed(0)}K</Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Amount:</span>
          <span className="font-medium">${data.amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Percentage:</span>
          <span className="font-medium">
            {((data.amount / filteredData.feeCollection.collected) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={cn(
              "rounded-full h-2 transition-all duration-500",
              `bg-${color}-500`
            )}
            style={{ 
              width: `${((data.amount / filteredData.feeCollection.collected) * 100)}%` 
            }}
          />
        </div>
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 min-h-full pb-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financial Management</h1>
          <p className="text-muted-foreground">
            {selectedBranches.length === 0 
              ? `Track finances across all ${data.branches.length} branches`
              : selectedBranches.length === 1
                ? `Financial overview for ${data.branches.find(b => b.id === selectedBranches[0])?.name}`
                : `Financial comparison for ${selectedBranches.length} selected branches`
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
              variant={viewMode === 'collection' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('collection')}
              className="rounded-none border-x-0"
            >
              Collection
            </Button>
            <Button
              variant={viewMode === 'analysis' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('analysis')}
              className="rounded-l-none"
            >
              Analysis
            </Button>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Time Period:</span>
          </div>
          <div className="flex rounded-lg border border-border">
            {[
              { key: 'month', label: 'This Month' },
              { key: 'quarter', label: 'This Quarter' },
              { key: 'year', label: 'This Year' },
            ].map((period) => (
              <Button
                key={period.key}
                variant={timeRange === period.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(period.key)}
                className={cn(
                  period.key === 'month' && "rounded-r-none",
                  period.key === 'quarter' && "rounded-none border-x-0",
                  period.key === 'year' && "rounded-l-none"
                )}
              >
                {period.label}
              </Button>
            ))}
          </div>
          <ExportDropdown
            data={filteredData.financialByBranch}
            filename="financial-report"
            title="Export Report"
          />
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${(filteredData.totalRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend="up"
          trendValue="+8.3% from last period"
          color="green"
        />
        <StatCard
          title="Total Expenses"
          value={`$${(filteredData.totalExpenses / 1000).toFixed(0)}K`}
          icon={CreditCard}
          trend="up"
          trendValue="+3.2% from last period"
          color="red"
        />
        <StatCard
          title="Net Profit"
          value={`$${(filteredData.totalProfit / 1000).toFixed(0)}K`}
          icon={TrendingUp}
          trend="up"
          trendValue="+15.7% from last period"
          color="blue"
        />
        <StatCard
          title="Collection Rate"
          value={`${filteredData.avgCollectionRate.toFixed(1)}%`}
          icon={CheckCircle}
          trend="up"
          trendValue="+2.1% from last period"
          color="orange"
        />
      </div>

      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart 
            data={filteredData.financialByBranch}
            title="Revenue by Branch"
          />
          
          <CollectionChart 
            branches={filteredData.branches}
            title="Fee Collection Rate by Branch"
          />
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Profit Margin Analysis</h3>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">High Margin (≥20%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.financialByBranch.filter(b => (b.profit / b.revenue) * 100 >= 20).length} branches
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Medium Margin (10-19%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.financialByBranch.filter(b => {
                    const margin = (b.profit / b.revenue) * 100;
                    return margin >= 10 && margin < 20;
                  }).length} branches
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Low Margin (&lt;10%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.financialByBranch.filter(b => (b.profit / b.revenue) * 100 < 10).length} branches
                </span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Overall Financial Health</h3>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Revenue Growth</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-bold text-green-600">+8.3%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Profit Margin</span>
                <span className="text-sm font-bold">{filteredData.profitMargin.toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Collection Efficiency</span>
                <Badge variant="success">{filteredData.feeCollection.collectionRate}%</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Outstanding Amount</span>
                <span className="text-sm font-medium text-red-600">
                  ${filteredData.feeCollection.pending.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {viewMode === 'collection' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeeStatusCard
            title="Collected Fees"
            icon={CheckCircle}
            data={{ amount: filteredData.feeCollection.collected }}
            color="green"
          />
          
          <FeeStatusCard
            title="Pending Fees"
            icon={Clock}
            data={{ amount: filteredData.feeCollection.pending }}
            color="yellow"
          />
          
          <FeeStatusCard
            title="Overdue Fees"
            icon={AlertCircle}
            data={{ amount: filteredData.feeCollection.overdue }}
            color="red"
          />
        </div>
      )}

      {viewMode === 'analysis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.branches.map((branch) => (
            <BranchFinancialCard key={branch.id} branch={branch} />
          ))}
        </div>
      )}

      {/* Action Items */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Financial Alerts</h3>
          <Badge variant="outline">
            {filteredData.branches.filter(b => b.feeCollection < 80).length} requiring attention
          </Badge>
        </div>
        
        <div className="space-y-3">
          {filteredData.branches
            .filter(branch => branch.feeCollection < 85)
            .sort((a, b) => a.feeCollection - b.feeCollection)
            .map((branch) => {
              const financialData = filteredData.financialByBranch.find(f => f.branchId === branch.id);
              const expectedRevenue = branch.students * 2000; // Assuming avg fee of $2000
              const shortfall = expectedRevenue - (financialData?.revenue || 0);
              
              return (
                <div key={branch.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "h-3 w-3 rounded-full",
                      branch.feeCollection < 70 ? 'bg-red-500' : branch.feeCollection < 80 ? 'bg-yellow-500' : 'bg-orange-500'
                    )}></div>
                    <div>
                      <h4 className="font-medium">{branch.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Collection Rate: {branch.feeCollection}% | Revenue Shortfall: ${(shortfall / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={branch.feeCollection < 70 ? 'destructive' : 'warning'}>
                      {branch.feeCollection < 70 ? 'Critical' : 'Monitor'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Follow Up
                    </Button>
                  </div>
                </div>
              );
            })}
          
          {filteredData.branches.filter(b => b.feeCollection < 85).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p>All branches are maintaining excellent collection rates!</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default FeesOrgHead;
