import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  BookOpen,
  Target,
  Users,
  Star,
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

const MarksOrgHead = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'comparison', 'subjects'
  const [selectedExam, setSelectedExam] = useState('quarterly'); // 'quarterly', 'midterm', 'annual'
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

  const getFilteredMarksData = () => {
    const branches = selectedBranches.length > 0 
      ? data.branches.filter(b => selectedBranches.includes(b.id))
      : data.branches;

    const performanceByBranch = data.academicPerformance.byBranch.filter(p => 
      branches.some(b => b.id === p.branchId)
    );

    const totalStudents = branches.reduce((sum, b) => sum + b.students, 0);
    const avgPassRate = performanceByBranch.reduce((sum, p) => sum + p.passRate, 0) / performanceByBranch.length;
    const avgExcellenceRate = performanceByBranch.reduce((sum, p) => sum + p.excellenceRate, 0) / performanceByBranch.length;

    return {
      branches,
      performanceByBranch,
      totalStudents,
      avgPassRate: avgPassRate || 0,
      avgExcellenceRate: avgExcellenceRate || 0,
      subjectPerformance: data.academicPerformance.subjectPerformance,
      overallPerformance: data.academicPerformance.overall,
    };
  };

  const filteredData = getFilteredMarksData();

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

  const PerformanceChart = ({ data, title, metric = 'passRate' }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {data.map((item, index) => {
          const value = metric === 'passRate' ? item.passRate 
                      : metric === 'excellenceRate' ? item.excellenceRate
                      : metric === 'average' ? item.average
                      : item.passRate;
          
          const maxValue = Math.max(...data.map(d => 
            metric === 'passRate' ? d.passRate 
            : metric === 'excellenceRate' ? d.excellenceRate
            : metric === 'average' ? d.average
            : d.passRate
          ));
          
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-28 text-sm font-medium truncate">
                {item.branchName || item.subject}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={cn(
                    "rounded-full h-3 transition-all duration-500",
                    value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-16 text-sm text-right font-medium">
                {metric === 'average' ? `${value}%` : `${value.toFixed(1)}%`}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  const BranchPerformanceCard = ({ branch }) => {
    const performanceData = filteredData.performanceByBranch.find(p => p.branchId === branch.id);
    if (!performanceData) return null;

    const getGradeColor = (grade) => {
      switch (grade) {
        case 'A+': case 'A': case 'A-': return 'text-green-600';
        case 'B+': case 'B': case 'B-': return 'text-blue-600';
        case 'C+': case 'C': return 'text-yellow-600';
        default: return 'text-red-600';
      }
    };

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{branch.name}</h3>
            <p className="text-sm text-muted-foreground">{branch.location}</p>
          </div>
          <div className="text-center">
            <div className={cn("text-2xl font-bold", getGradeColor(performanceData.averageGrade))}>
              {performanceData.averageGrade}
            </div>
            <p className="text-xs text-muted-foreground">Avg Grade</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-green-600">{performanceData.passRate.toFixed(1)}%</p>
            <p className="text-xs text-green-600/80">Pass Rate</p>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Star className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-blue-600">{performanceData.excellenceRate.toFixed(1)}%</p>
            <p className="text-xs text-blue-600/80">Excellence</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Students:</span>
            <span className="font-medium">{branch.students.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Teachers:</span>
            <span className="font-medium">{branch.teachers}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Principal:</span>
            <span className="font-medium">{branch.principal}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Performance Trend</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+2.3%</span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const GradeDistributionCard = ({ data, title }) => {
    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];
    const gradeDistribution = grades.map(grade => ({
      grade,
      count: Math.floor(Math.random() * 100) + 10, // Mock data
      percentage: Math.floor(Math.random() * 25) + 5
    }));

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Award className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {gradeDistribution.slice(0, 8).map((item) => (
            <div key={item.grade} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50">
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  item.grade.startsWith('A') ? 'bg-green-500' :
                  item.grade.startsWith('B') ? 'bg-blue-500' :
                  item.grade.startsWith('C') ? 'bg-yellow-500' : 'bg-red-500'
                )}></div>
                <span className="text-sm font-medium">{item.grade}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{item.count}</div>
                <div className="text-xs text-muted-foreground">{item.percentage}%</div>
              </div>
            </div>
          ))}
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
          <h1 className="text-2xl font-bold text-foreground">Academic Performance</h1>
          <p className="text-muted-foreground">
            {selectedBranches.length === 0 
              ? `Track academic performance across all ${data.branches.length} branches`
              : selectedBranches.length === 1
                ? `Performance analysis for ${data.branches.find(b => b.id === selectedBranches[0])?.name}`
                : `Performance comparison for ${selectedBranches.length} selected branches`
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
            <Button
              variant={viewMode === 'subjects' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('subjects')}
              className="rounded-l-none"
            >
              Subjects
            </Button>
          </div>
        </div>
      </div>

      {/* Exam Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Exam Period:</span>
          </div>
          <div className="flex rounded-lg border border-border">
            {[
              { key: 'quarterly', label: 'Quarterly' },
              { key: 'midterm', label: 'Mid-term' },
              { key: 'annual', label: 'Annual' },
            ].map((exam) => (
              <Button
                key={exam.key}
                variant={selectedExam === exam.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedExam(exam.key)}
                className={cn(
                  exam.key === 'quarterly' && "rounded-r-none",
                  exam.key === 'midterm' && "rounded-none border-x-0",
                  exam.key === 'annual' && "rounded-l-none"
                )}
              >
                {exam.label}
              </Button>
            ))}
          </div>
          <ExportDropdown
            data={filteredData.performanceByBranch}
            filename="academic-performance"
            title="Export Report"
          />
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Average Pass Rate"
          value={`${filteredData.avgPassRate.toFixed(1)}%`}
          icon={Target}
          trend="up"
          trendValue="+3.2% from last exam"
          color="green"
        />
        <StatCard
          title="Excellence Rate"
          value={`${filteredData.avgExcellenceRate.toFixed(1)}%`}
          icon={Star}
          trend="up"
          trendValue="+5.1% from last exam"
          color="blue"
        />
        <StatCard
          title="Total Students"
          value={filteredData.totalStudents.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="+1.8% from last exam"
          color="orange"
        />
        <StatCard
          title="Overall Grade"
          value={filteredData.overallPerformance.averageGrade}
          icon={Award}
          trend="up"
          trendValue="Improved from B"
          color="purple"
        />
      </div>

      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart 
            data={filteredData.performanceByBranch}
            title="Pass Rate by Branch"
            metric="passRate"
          />
          
          <PerformanceChart 
            data={filteredData.performanceByBranch}
            title="Excellence Rate by Branch"
            metric="excellenceRate"
          />
          
          <GradeDistributionCard 
            data={filteredData.performanceByBranch}
            title="Grade Distribution"
          />
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Performance Summary</h3>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Excellent (≥90%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.performanceByBranch.filter(b => b.passRate >= 90).length} branches
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Good (75-89%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.performanceByBranch.filter(b => b.passRate >= 75 && b.passRate < 90).length} branches
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Needs Improvement (&lt;75%)</span>
                </div>
                <span className="font-bold">
                  {filteredData.performanceByBranch.filter(b => b.passRate < 75).length} branches
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {viewMode === 'comparison' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.branches.map((branch) => (
            <BranchPerformanceCard key={branch.id} branch={branch} />
          ))}
        </div>
      )}

      {viewMode === 'subjects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart 
            data={filteredData.subjectPerformance}
            title="Subject-wise Performance"
            metric="average"
          />
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Subject Analysis</h3>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {filteredData.subjectPerformance.map((subject, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{subject.subject}</h4>
                    <Badge variant={subject.average >= 85 ? 'success' : subject.average >= 70 ? 'warning' : 'destructive'}>
                      {subject.average}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Pass Rate: {subject.passRate}%</span>
                    <span>Avg Score: {subject.average}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={cn(
                        "rounded-full h-2 transition-all duration-500",
                        subject.average >= 85 ? 'bg-green-500' : subject.average >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      )}
                      style={{ width: `${subject.average}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Action Items */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Performance Alerts</h3>
          <Badge variant="outline">
            {filteredData.performanceByBranch.filter(b => b.passRate < 80).length} requiring attention
          </Badge>
        </div>
        
        <div className="space-y-3">
          {filteredData.performanceByBranch
            .filter(branch => branch.passRate < 85)
            .sort((a, b) => a.passRate - b.passRate)
            .map((branch) => (
              <div key={branch.branchId} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    branch.passRate < 70 ? 'bg-red-500' : branch.passRate < 80 ? 'bg-yellow-500' : 'bg-orange-500'
                  )}></div>
                  <div>
                    <h4 className="font-medium">{branch.branchName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Pass Rate: {branch.passRate.toFixed(1)}% | Excellence: {branch.excellenceRate.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={branch.passRate < 70 ? 'destructive' : 'warning'}>
                    {branch.passRate < 70 ? 'Critical' : 'Monitor'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          
          {filteredData.performanceByBranch.filter(b => b.passRate < 85).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p>All branches are performing excellently!</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default MarksOrgHead;
