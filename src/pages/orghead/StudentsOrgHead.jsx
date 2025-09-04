import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  TrendingUp,
  UserPlus,
  Eye,
  MoreVertical,
  Calendar
} from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import BranchSelector from '../../components/shared/BranchSelector';
import DataTable from '../../components/shared/DataTable';
import ExportDropdown from '../../components/shared/ExportDropdown';
import { DropdownMenu, DropdownMenuItem } from '../../components/ui/DropdownMenu';
import { cn } from '../../utils/cn';
import { ALL_ROLES_MOCK_DATA } from '../../utils/allRolesMockData';
import { USER_ROLES } from '../../utils/constants';

const StudentsOrgHead = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('summary'); // 'summary' or 'detailed'
  const [data, setData] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setData(ALL_ROLES_MOCK_DATA[USER_ROLES.ORGANIZATION_HEAD]);
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    // Generate mock student data based on selected branches
    const generateStudentData = () => {
      const students = [];
      const branches = selectedBranches.length > 0 
        ? data.branches.filter(b => selectedBranches.includes(b.id))
        : data.branches;

      branches.forEach((branch, branchIndex) => {
        const studentsInBranch = Math.floor(branch.students * 0.1); // Show 10% of students as sample
        
        for (let i = 0; i < studentsInBranch; i++) {
          const studentId = `student_${branch.id}_${i + 1}`;
          const grades = branch.grades;
          const randomGrade = grades[Math.floor(Math.random() * grades.length)];
          
          students.push({
            id: studentId,
            rollNumber: `${randomGrade}-${String(i + 1).padStart(3, '0')}`,
            firstName: `Student${i + 1}`,
            lastName: `Branch${branchIndex + 1}`,
            fullName: `Student${i + 1} Branch${branchIndex + 1}`,
            email: `student${i + 1}@${branch.name.toLowerCase().replace(' ', '')}.edu`,
            phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            grade: randomGrade,
            section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
            branchId: branch.id,
            branchName: branch.name,
            admissionDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
            status: ['active', 'active', 'active', 'inactive'][Math.floor(Math.random() * 4)],
            attendance: Math.floor(Math.random() * 20) + 80, // 80-100%
            performance: Math.floor(Math.random() * 30) + 70, // 70-100%
            parentName: `Parent${i + 1} Branch${branchIndex + 1}`,
            parentPhone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            address: `${100 + i} ${branch.location} Street`,
            feeStatus: ['paid', 'paid', 'pending', 'overdue'][Math.floor(Math.random() * 4)],
            lastExamGrade: ['A', 'A-', 'B+', 'B', 'B-', 'C+'][Math.floor(Math.random() * 6)],
          });
        }
      });

      return students.filter(student => 
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.branchName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    setFilteredStudents(generateStudentData());
  }, [data, selectedBranches, searchTerm]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getStudentStats = () => {
    const branches = selectedBranches.length > 0 
      ? data.branches.filter(b => selectedBranches.includes(b.id))
      : data.branches;

    const totalStudents = branches.reduce((sum, b) => sum + b.students, 0);
    const averageAttendance = branches.reduce((sum, b) => sum + b.attendanceRate, 0) / branches.length;
    const averagePerformance = branches.reduce((sum, b) => sum + b.performance, 0) / branches.length;
    
    return {
      totalStudents,
      averageAttendance,
      averagePerformance,
      activeStudents: Math.floor(totalStudents * 0.95),
      newEnrollments: Math.floor(totalStudents * 0.08),
    };
  };

  const stats = getStudentStats();

  const columns = [
    {
      key: 'rollNumber',
      label: 'Roll Number',
      sortable: true,
    },
    {
      key: 'fullName',
      label: 'Student Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {row.firstName[0]}{row.lastName[0]}
            </span>
          </div>
          <div>
            <div className="font-medium text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'grade',
      label: 'Grade',
      sortable: true,
      render: (value, row) => (
        <Badge variant="outline">{value}-{row.section}</Badge>
      ),
    },
    {
      key: 'branchName',
      label: 'Branch',
      sortable: true,
      render: (value) => (
        <span className="text-sm font-medium">{value}</span>
      ),
    },
    {
      key: 'attendance',
      label: 'Attendance',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="w-12 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={cn(
                "rounded-full h-2 transition-all duration-300",
                value >= 90 ? 'bg-green-500' : value >= 75 ? 'bg-yellow-500' : 'bg-red-500'
              )}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-xs font-medium">{value}%</span>
        </div>
      ),
    },
    {
      key: 'performance',
      label: 'Performance',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="w-12 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={cn(
                "rounded-full h-2 transition-all duration-300",
                value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              )}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-xs font-medium">{value}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <DropdownMenu
          trigger={
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          }
        >
          <DropdownMenuItem 
            icon={Eye}
            onClick={() => console.log('View profile', row.id)}
          >
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem 
            icon={BarChart3}
            onClick={() => console.log('View performance', row.id)}
          >
            View Performance
          </DropdownMenuItem>
        </DropdownMenu>
      ),
    },
  ];


  return (
    <>
      <style jsx>{`
        @keyframes drawPie {
          0% {
            stroke-dasharray: 0 ${2 * Math.PI * 40.9155};
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes slideInBar {
          0% {
            width: 0%;
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes countUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 h-full flex flex-col"
      >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Students Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {selectedBranches.length === 0 
                ? `View analytics and manage students across all ${data.branches.length} branches`
                : selectedBranches.length === 1
                  ? `Analytics and student data for ${data.branches.find(b => b.id === selectedBranches[0])?.name}`
                  : `Analytics and student data for ${selectedBranches.length} selected branches`
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Show controls only in detailed view */}
            {viewMode === 'detailed' && (
              <>
                <BranchSelector
                  branches={data.branches}
                  selectedBranches={selectedBranches}
                  onSelectionChange={setSelectedBranches}
                  mode="multiple"
                  className="w-full sm:w-64"
                />
                
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <ExportDropdown
                  data={filteredStudents}
                  filename="students"
                  title="Export Students"
                />
              </>
            )}
            
            <div className="flex rounded-lg border border-border w-full sm:w-auto">
              <Button
                variant={viewMode === 'summary' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('summary')}
                className="rounded-r-none flex-1 sm:flex-initial"
              >
                Summary
              </Button>
              <Button
                variant={viewMode === 'detailed' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('detailed')}
                className="rounded-l-none flex-1 sm:flex-initial"
              >
                Detailed
              </Button>
            </div>
          </div>
        </div>
      </div>


      {/* Analytics Section - New Layout (Summary View) */}
      {viewMode === 'summary' && (
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 flex-1 lg:h-[630px]">
        {/* Student Distribution by Branch - Responsive width and height */}
        <Card className="p-4 sm:p-6 w-full xl:w-1/2 h-auto xl:h-full flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Students by Branch</h3>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col items-center h-full justify-center space-y-6">
            {/* Pie Chart */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-90 xl:w-96 xl:h-96 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {(() => {
                  const branches = selectedBranches.length > 0 
                    ? data.branches.filter(b => selectedBranches.includes(b.id))
                    : data.branches;
                  
                  const total = branches.reduce((sum, branch) => sum + branch.students, 0);
                  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
                  const radius = 40.9155;
                  const circumference = 2 * Math.PI * radius;
                  let cumulativeLength = 0;
                  
                  return branches.map((branch, index) => {
                    const percentage = branch.students / total;
                    const segmentLength = percentage * circumference;
                    const gapLength = circumference - segmentLength;
                    const strokeDasharray = `${segmentLength} ${gapLength}`;
                    const strokeDashoffset = -cumulativeLength;
                    cumulativeLength += segmentLength;
                    
                    return (
                      <circle
                        key={branch.id}
                        cx="50"
                        cy="50"
                        r="40.9155"
                        fill="transparent"
                        stroke={colors[index]}
                        strokeWidth="15"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1500 ease-in-out"
                        style={{
                          animation: `drawPie 2s ease-in-out ${index * 0.2}s both`,
                          transformOrigin: '50% 50%'
                        }}
                      />
                    );
                  });
                })()}
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span 
                  className="text-lg font-bold text-foreground"
                  style={{ animation: 'countUp 1s ease-out 1s both' }}
                >
                  {(selectedBranches.length > 0 
                    ? data.branches.filter(b => selectedBranches.includes(b.id))
                    : data.branches
                  ).reduce((sum, branch) => sum + branch.students, 0).toLocaleString()}
                </span>
                <span 
                  className="text-xs text-muted-foreground"
                  style={{ animation: 'countUp 1s ease-out 1.2s both' }}
                >
                  Total Students
                </span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
              {(selectedBranches.length > 0 
                ? data.branches.filter(b => selectedBranches.includes(b.id))
                : data.branches
              ).map((branch, index) => {
                const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
                const total = (selectedBranches.length > 0 
                  ? data.branches.filter(b => selectedBranches.includes(b.id))
                  : data.branches
                ).reduce((sum, b) => sum + b.students, 0);
                const percentage = ((branch.students / total) * 100).toFixed(1);
                
                return (
                  <div 
                    key={branch.id} 
                    className="flex items-center space-x-2"
                    style={{ animation: `countUp 0.6s ease-out ${1.5 + index * 0.1}s both` }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">
                        {branch.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {branch.students.toLocaleString()} ({percentage}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Right side - Performance and Attendance stacked vertically */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 h-full">
          {/* Performance Analytics */}
          <Card className="p-4 lg:p-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Performance by Branch</h3>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center overflow-hidden">
            {data.academicPerformance.byBranch
              .filter(branch => selectedBranches.length === 0 || selectedBranches.some(id => 
                data.branches.find(b => b.id === id)?.name === branch.branchName
              ))
              .map((branch, index) => {
                const maxRate = Math.max(...data.academicPerformance.byBranch.map(b => b.passRate));
                const barWidth = (branch.passRate / maxRate) * 100;
                const colors = ['#10B981', '#059669', '#047857', '#065F46'];
                const bgColor = colors[index % colors.length];
                
                return (
                  <div 
                    key={branch.branchId} 
                    className="group hover:bg-accent/5 p-2 rounded-lg transition-all duration-300"
                    style={{ animation: `countUp 0.6s ease-out ${0.5 + index * 0.1}s both` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: bgColor }}></div>
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {branch.branchName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground font-medium">Pass Rate</span>
                        <span className="text-sm font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                          {branch.passRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg h-3 overflow-hidden shadow-inner">
                        <div 
                          className="h-full relative overflow-hidden rounded-lg"
                          style={{ 
                            width: `${barWidth}%`,
                            background: `linear-gradient(90deg, ${bgColor}, ${bgColor}cc)`,
                            animation: `slideInBar 1.5s ease-out ${index * 0.2}s both`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 animate-pulse"></div>
                          {/* <div className="absolute inset-0 flex items-center justify-center"> */}
                            {/* <span className="text-xs font-bold text-white drop-shadow-md">
                              {barWidth > 25 ? `${branch.passRate.toFixed(1)}%` : ''}
                            </span> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          </Card>

          {/* Attendance Analytics */}
          <Card className="p-4 lg:p-6 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Attendance by Branch</h3>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center overflow-hidden">
            {data.attendanceAnalytics.byBranch
              .filter(branch => selectedBranches.length === 0 || selectedBranches.some(id => 
                data.branches.find(b => b.id === id)?.name === branch.branchName
              ))
              .map((branch, index) => {
                const maxRate = Math.max(...data.attendanceAnalytics.byBranch.map(b => b.rate));
                const barWidth = (branch.rate / maxRate) * 100;
                
                const getAttendanceInfo = (rate) => {
                  if (rate >= 95) return { color: '#059669', bg: 'from-emerald-500 to-emerald-600', label: 'Excellent', icon: '🟢' };
                  if (rate >= 90) return { color: '#10B981', bg: 'from-green-500 to-green-600', label: 'Great', icon: '🟢' };
                  if (rate >= 85) return { color: '#F59E0B', bg: 'from-amber-500 to-amber-600', label: 'Good', icon: '🟡' };
                  if (rate >= 75) return { color: '#EF4444', bg: 'from-orange-500 to-orange-600', label: 'Fair', icon: '🟠' };
                  return { color: '#DC2626', bg: 'from-red-500 to-red-600', label: 'Poor', icon: '🔴' };
                };
                
                const attendanceInfo = getAttendanceInfo(branch.rate);
                
                return (
                  <div 
                    key={branch.branchId} 
                    className="group hover:bg-accent/5 p-2 rounded-lg transition-all duration-300"
                    style={{ animation: `countUp 0.6s ease-out ${0.5 + index * 0.1}s both` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: attendanceInfo.color }}></div>
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {branch.branchName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                          {attendanceInfo.label}
                        </span>
                        <span className={`text-sm font-bold bg-gradient-to-r ${attendanceInfo.bg} bg-clip-text text-transparent`}>
                          {branch.rate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg h-3 overflow-hidden shadow-inner">
                        <div 
                          className="h-full relative overflow-hidden rounded-lg"
                          style={{ 
                            width: `${barWidth}%`,
                            background: `linear-gradient(90deg, ${attendanceInfo.color}, ${attendanceInfo.color}cc)`,
                            animation: `slideInBar 1.5s ease-out ${index * 0.2}s both`
                          }}
                        >
                          {branch.rate < 85 ? (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/50 to-white/30 animate-ping"></div>
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 animate-pulse"></div>
                          )}
                          {/* <div className="absolute inset-0 flex items-center justify-center"> */}
                            {/* <span className="text-xs font-bold text-white drop-shadow-md">
                              {barWidth > 25 ? `${branch.rate.toFixed(1)}%` : ''}
                            </span> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          </Card>
        </div>
        </div>
      )}

      {/* Students Data Table (Detailed View) */}
      {viewMode === 'detailed' && (
        <div className="flex-1 min-h-0">
          <DataTable
            columns={columns}
            data={filteredStudents}
            searchable={false}
            paginated={true}
            defaultItemsPerPage={10}
            showPaginationInfo={true}
            showItemsPerPageSelector={true}
            maxHeight="calc(100vh - 200px)"
            stickyHeader={true}
          />
        </div>
      )}
      </motion.div>
    </>
  );
};

export default StudentsOrgHead;
