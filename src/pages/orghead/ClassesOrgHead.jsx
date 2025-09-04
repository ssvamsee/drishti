import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  GraduationCap,
  UserCheck,
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  Filter,
  Download,
  Eye,
  MoreVertical
} from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import BranchSelector from '../../components/shared/BranchSelector';
import DataTable from '../../components/shared/DataTable';
import ExportDropdown from '../../components/shared/ExportDropdown';
import { DropdownMenu } from '../../components/ui/DropdownMenu';
import { cn } from '../../utils/cn';
import { ALL_ROLES_MOCK_DATA } from '../../utils/allRolesMockData';
import { USER_ROLES } from '../../utils/constants';

const ClassesOrgHead = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'detailed', 'performance'
  const [selectedGrade, setSelectedGrade] = useState('all'); // 'all', specific grade
  const [data, setData] = useState(null);
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setData(ALL_ROLES_MOCK_DATA[USER_ROLES.ORGANIZATION_HEAD]);
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    // Generate mock classes data based on selected branches
    const generateClassesData = () => {
      const classes = [];
      const branches = selectedBranches.length > 0 
        ? data.branches.filter(b => selectedBranches.includes(b.id))
        : data.branches;

      branches.forEach((branch, branchIndex) => {
        branch.grades.forEach((grade) => {
          // Generate 1-3 sections per grade
          const sections = ['A', 'B', 'C'].slice(0, Math.floor(Math.random() * 3) + 1);
          
          sections.forEach((section) => {
            const classId = `class_${branch.id}_${grade}_${section}`;
            const students = Math.floor(Math.random() * 15) + 20; // 20-35 students
            const subjects = grade === 'Pre-K' || grade === 'K' 
              ? ['General Studies', 'Art', 'Physical Education']
              : ['Mathematics', 'Science', 'English', 'Social Studies', 'Art', 'Physical Education'];
            
            classes.push({
              id: classId,
              className: `Grade ${grade}-${section}`,
              grade: grade,
              section: section,
              branchId: branch.id,
              branchName: branch.name,
              students: students,
              capacity: 35,
              classTeacher: `Teacher ${Math.floor(Math.random() * 50) + 1}`,
              subjects: subjects,
              subjectCount: subjects.length,
              averageAttendance: Math.floor(Math.random() * 15) + 85, // 85-100%
              averagePerformance: Math.floor(Math.random() * 20) + 75, // 75-95%
              room: `Room ${Math.floor(Math.random() * 200) + 100}`,
              schedule: {
                startTime: '08:00',
                endTime: '15:00',
                periodsPerDay: grade === 'Pre-K' || grade === 'K' ? 4 : 6,
              },
              establishedYear: 2020 + Math.floor(Math.random() * 4),
              status: Math.random() > 0.1 ? 'active' : 'inactive',
            });
          });
        });
      });

      return classes.filter(cls => 
        selectedGrade === 'all' || cls.grade === selectedGrade
      );
    };

    setClassesData(generateClassesData());
  }, [data, selectedBranches, selectedGrade]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getClassesStats = () => {
    const totalClasses = classesData.length;
    const totalStudents = classesData.reduce((sum, cls) => sum + cls.students, 0);
    const totalCapacity = classesData.reduce((sum, cls) => sum + cls.capacity, 0);
    const averageAttendance = classesData.length > 0 
      ? classesData.reduce((sum, cls) => sum + cls.averageAttendance, 0) / classesData.length 
      : 0;
    const averagePerformance = classesData.length > 0
      ? classesData.reduce((sum, cls) => sum + cls.averagePerformance, 0) / classesData.length
      : 0;
    const utilizationRate = totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0;

    return {
      totalClasses,
      totalStudents,
      totalCapacity,
      averageAttendance,
      averagePerformance,
      utilizationRate,
      activeClasses: classesData.filter(cls => cls.status === 'active').length,
    };
  };

  const stats = getClassesStats();

  const columns = [
    {
      key: 'className',
      header: 'Class',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{row.room}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'branchName',
      header: 'Branch',
      sortable: true,
    },
    {
      key: 'students',
      header: 'Students',
      sortable: true,
      render: (value, row) => (
        <div className="text-center">
          <div className="font-medium">{value}/{row.capacity}</div>
          <div className="text-xs text-muted-foreground">
            {((value / row.capacity) * 100).toFixed(0)}% filled
          </div>
        </div>
      ),
    },
    {
      key: 'classTeacher',
      header: 'Class Teacher',
      sortable: true,
    },
    {
      key: 'subjectCount',
      header: 'Subjects',
      sortable: true,
      render: (value) => (
        <Badge variant="outline">{value} subjects</Badge>
      ),
    },
    {
      key: 'averageAttendance',
      header: 'Attendance',
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
      key: 'averagePerformance',
      header: 'Performance',
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
      header: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <DropdownMenu
          trigger={
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          }
          items={[
            {
              label: 'View Details',
              icon: Eye,
              onClick: () => console.log('View details', row.id),
            },
            {
              label: 'View Performance',
              icon: BarChart3,
              onClick: () => console.log('View performance', row.id),
            },
          ]}
        />
      ),
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

  const GradeDistributionChart = () => {
    const gradeData = {};
    classesData.forEach(cls => {
      if (!gradeData[cls.grade]) {
        gradeData[cls.grade] = { classes: 0, students: 0 };
      }
      gradeData[cls.grade].classes++;
      gradeData[cls.grade].students += cls.students;
    });

    const sortedGrades = Object.keys(gradeData).sort((a, b) => {
      const order = ['Pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      return order.indexOf(a) - order.indexOf(b);
    });

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Distribution by Grade</h3>
          <GraduationCap className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {sortedGrades.map((grade) => {
            const data = gradeData[grade];
            const maxStudents = Math.max(...Object.values(gradeData).map(d => d.students));
            const percentage = (data.students / maxStudents) * 100;
            
            return (
              <div key={grade} className="flex items-center space-x-3">
                <div className="w-16 text-sm font-medium">Grade {grade}</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-primary rounded-full h-3 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-20 text-sm text-right">
                  <div className="font-medium">{data.students} students</div>
                  <div className="text-xs text-muted-foreground">{data.classes} classes</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  const BranchClassesCard = ({ branch }) => {
    const branchClasses = classesData.filter(cls => cls.branchId === branch.id);
    const totalStudents = branchClasses.reduce((sum, cls) => sum + cls.students, 0);
    const totalCapacity = branchClasses.reduce((sum, cls) => sum + cls.capacity, 0);
    const avgAttendance = branchClasses.length > 0 
      ? branchClasses.reduce((sum, cls) => sum + cls.averageAttendance, 0) / branchClasses.length 
      : 0;
    const avgPerformance = branchClasses.length > 0
      ? branchClasses.reduce((sum, cls) => sum + cls.averagePerformance, 0) / branchClasses.length
      : 0;

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{branch.name}</h3>
            <p className="text-sm text-muted-foreground">{branch.location}</p>
          </div>
          <Badge variant="outline">{branchClasses.length} classes</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-blue-600">{totalStudents}</p>
            <p className="text-xs text-blue-600/80">Students</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <UserCheck className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-green-600">{avgAttendance.toFixed(1)}%</p>
            <p className="text-xs text-green-600/80">Attendance</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Capacity Utilization:</span>
            <span className="font-medium">
              {totalCapacity > 0 ? ((totalStudents / totalCapacity) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Avg Performance:</span>
            <span className="font-medium">{avgPerformance.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Capacity:</span>
            <span className="font-medium">{totalCapacity}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span>Grades Available:</span>
            <span className="font-medium">{branch.grades.length} grades</span>
          </div>
        </div>
      </Card>
    );
  };

  const allGrades = [...new Set(data.branches.flatMap(b => b.grades))].sort((a, b) => {
    const order = ['Pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    return order.indexOf(a) - order.indexOf(b);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 min-h-full pb-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Classes Management</h1>
          <p className="text-muted-foreground">
            {selectedBranches.length === 0 
              ? `Manage classes across all ${data.branches.length} branches`
              : selectedBranches.length === 1
                ? `Classes in ${data.branches.find(b => b.id === selectedBranches[0])?.name}`
                : `Classes in ${selectedBranches.length} selected branches`
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
              variant={viewMode === 'detailed' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('detailed')}
              className="rounded-none border-x-0"
            >
              Detailed
            </Button>
            <Button
              variant={viewMode === 'performance' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('performance')}
              className="rounded-l-none"
            >
              Performance
            </Button>
          </div>
        </div>
      </div>

      {/* Grade Filter */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Grade Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGrade === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGrade('all')}
            >
              All Grades
            </Button>
            {allGrades.slice(0, 8).map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGrade(grade)}
              >
                Grade {grade}
              </Button>
            ))}
          </div>
          <ExportDropdown
            data={classesData}
            filename="classes-report"
            title="Export Classes"
          />
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Classes"
          value={stats.totalClasses.toLocaleString()}
          icon={BookOpen}
          trend="up"
          trendValue="+3 new classes"
          color="blue"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="+2.1% from last month"
          color="green"
        />
        <StatCard
          title="Capacity Utilization"
          value={`${stats.utilizationRate.toFixed(1)}%`}
          icon={BarChart3}
          trend="up"
          trendValue="+1.5% from last month"
          color="orange"
        />
        <StatCard
          title="Avg Performance"
          value={`${stats.averagePerformance.toFixed(1)}%`}
          icon={TrendingUp}
          trend="up"
          trendValue="+3.2% from last quarter"
          color="purple"
        />
      </div>

      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GradeDistributionChart />
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Class Size Analysis</h3>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Optimal Size (20-30)</span>
                </div>
                <span className="font-bold">
                  {classesData.filter(cls => cls.students >= 20 && cls.students <= 30).length} classes
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Large Size (31-35)</span>
                </div>
                <span className="font-bold">
                  {classesData.filter(cls => cls.students > 30).length} classes
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">Small Size (&lt;20)</span>
                </div>
                <span className="font-bold">
                  {classesData.filter(cls => cls.students < 20).length} classes
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {viewMode === 'detailed' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">All Classes</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={classesData}
            searchable={true}
            pagination={{
              pageSize: 10,
              showSizeSelector: true,
            }}
          />
        </Card>
      )}

      {viewMode === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedBranches.length > 0 
            ? data.branches.filter(b => selectedBranches.includes(b.id))
            : data.branches
          ).map((branch) => (
            <BranchClassesCard key={branch.id} branch={branch} />
          ))}
        </div>
      )}

      {/* Performance Alerts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Performance Alerts</h3>
          <Badge variant="outline">
            {classesData.filter(cls => cls.averagePerformance < 80 || cls.averageAttendance < 85).length} requiring attention
          </Badge>
        </div>
        
        <div className="space-y-3">
          {classesData
            .filter(cls => cls.averagePerformance < 80 || cls.averageAttendance < 85)
            .sort((a, b) => (a.averagePerformance + a.averageAttendance) - (b.averagePerformance + b.averageAttendance))
            .map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    (cls.averagePerformance < 70 || cls.averageAttendance < 75) ? 'bg-red-500' : 'bg-yellow-500'
                  )}></div>
                  <div>
                    <h4 className="font-medium">{cls.className} - {cls.branchName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Performance: {cls.averagePerformance}% | Attendance: {cls.averageAttendance}% | {cls.students} students
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={(cls.averagePerformance < 70 || cls.averageAttendance < 75) ? 'destructive' : 'warning'}>
                    {(cls.averagePerformance < 70 || cls.averageAttendance < 75) ? 'Critical' : 'Monitor'}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          
          {classesData.filter(cls => cls.averagePerformance < 80 || cls.averageAttendance < 85).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p>All classes are performing well!</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ClassesOrgHead;
