import { USER_ROLES } from './constants';

// Mock users for different roles
export const MOCK_USERS = {
  [USER_ROLES.SUPERADMIN]: {
    userId: 'super_001',
    email: 'superadmin@studenterp.com',
    role: USER_ROLES.SUPERADMIN,
    tenantId: null, // Can access all tenants
    branchId: null,
    profile: {
      firstName: 'System',
      lastName: 'Administrator',
      phone: '+1234567890',
    },
  },
  
  [USER_ROLES.ORGANIZATION_HEAD]: {
    userId: 'org_001',
    email: 'head@abcschool.edu',
    role: USER_ROLES.ORGANIZATION_HEAD,
    tenantId: 'tenant_001',
    branchId: null, // Can access all branches in organization
    profile: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1234567891',
    },
  },
  
  [USER_ROLES.CENTRAL_OFFICE_OPERATOR]: {
    userId: 'operator_001',
    email: 'operator@abcschool.edu',
    role: USER_ROLES.CENTRAL_OFFICE_OPERATOR,
    tenantId: 'tenant_001',
    branchId: null, // Can access all branches
    profile: {
      firstName: 'David',
      lastName: 'Wilson',
      phone: '+1234567892',
    },
  },
  
  [USER_ROLES.DEAN]: {
    userId: 'dean_001',
    email: 'dean@abcschool.edu',
    role: USER_ROLES.DEAN,
    tenantId: 'tenant_001',
    branchId: null,
    overseesBranches: ['branch_001', 'branch_002'], // Oversees multiple branches
    profile: {
      firstName: 'Dr. Maria',
      lastName: 'Rodriguez',
      phone: '+1234567893',
    },
  },
  
  [USER_ROLES.BRANCH_PRINCIPAL]: {
    userId: 'principal_001',
    email: 'principal@abcschool.edu',
    role: USER_ROLES.BRANCH_PRINCIPAL,
    tenantId: 'tenant_001',
    branchId: 'branch_001',
    profile: {
      firstName: 'John',
      lastName: 'Principal',
      phone: '+1234567894',
    },
  },
  
  [USER_ROLES.BRANCH_COMPUTER_OPERATOR]: {
    userId: 'comp_op_001',
    email: 'computer.operator@abcschool.edu',
    role: USER_ROLES.BRANCH_COMPUTER_OPERATOR,
    tenantId: 'tenant_001',
    branchId: 'branch_001',
    profile: {
      firstName: 'Lisa',
      lastName: 'Anderson',
      phone: '+1234567895',
    },
  },
  
  [USER_ROLES.TEACHER]: {
    userId: 'teacher_001',
    email: 'teacher@abcschool.edu',
    role: USER_ROLES.TEACHER,
    tenantId: 'tenant_001',
    branchId: 'branch_001',
    assignedClasses: ['class_001', 'class_002'],
    assignedSubjects: ['MATH', 'SCI'],
    profile: {
      firstName: 'Michael',
      lastName: 'Thompson',
      phone: '+1234567896',
    },
  },
  
  [USER_ROLES.FINANCE_ADMIN]: {
    userId: 'finance_001',
    email: 'finance@abcschool.edu',
    role: USER_ROLES.FINANCE_ADMIN,
    tenantId: 'tenant_001',
    branchId: 'branch_001',
    profile: {
      firstName: 'Jennifer',
      lastName: 'Davis',
      phone: '+1234567897',
    },
  },
  
  [USER_ROLES.STUDENT]: {
    userId: 'student_001',
    email: 'alice.student@abcschool.edu',
    role: USER_ROLES.STUDENT,
    tenantId: 'tenant_001',
    branchId: 'branch_001',
    studentId: 'student_001',
    classId: 'class_001',
    profile: {
      firstName: 'Alice',
      lastName: 'Johnson',
      phone: '+1234567898',
    },
  },
  
  [USER_ROLES.PARENT]: {
    userId: 'parent_001',
    email: 'parent@example.com',
    role: USER_ROLES.PARENT,
    tenantId: 'tenant_001',
    branchId: 'branch_001',
    children: ['student_001', 'student_002'], // Can access children's data
    profile: {
      firstName: 'Robert',
      lastName: 'Johnson',
      phone: '+1234567899',
    },
  },
};

// Role-specific dashboard data
export const getDashboardData = (userRole, userId) => {
  const baseStats = {
    totalStudents: 2847,
    activeTeachers: 186,
    runningCourses: 42,
    attendanceRate: 94.2,
    revenue: 125430,
  };

  switch (userRole) {
    case USER_ROLES.SUPERADMIN:
      return {
        stats: [
          {
            title: 'Total Organizations',
            value: '24',
            change: '+3',
            changeType: 'positive',
            icon: 'Building2',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            title: 'Total Students',
            value: '45,847',
            change: '+1,204',
            changeType: 'positive',
            icon: 'Users',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            title: 'System Uptime',
            value: '99.9%',
            change: '+0.1%',
            changeType: 'positive',
            icon: 'Activity',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            title: 'Total Revenue',
            value: '$2.4M',
            change: '+15.2%',
            changeType: 'positive',
            icon: 'CreditCard',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ],
        recentActivities: [
          { message: 'New organization "XYZ School" registered', time: '1 hour ago', type: 'organization' },
          { message: 'System backup completed successfully', time: '2 hours ago', type: 'system' },
          { message: 'Monthly report generated for all organizations', time: '4 hours ago', type: 'report' },
        ],
      };

    case USER_ROLES.ORGANIZATION_HEAD:
      return {
        stats: [
          {
            title: 'Total Branches',
            value: '8',
            change: '+1',
            changeType: 'positive',
            icon: 'MapPin',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            title: 'Total Students',
            value: '12,547',
            change: '+345',
            changeType: 'positive',
            icon: 'Users',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            title: 'Active Staff',
            value: '847',
            change: '+23',
            changeType: 'positive',
            icon: 'UserCheck',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            title: 'Monthly Revenue',
            value: '$485K',
            change: '+8.7%',
            changeType: 'positive',
            icon: 'CreditCard',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ],
        recentActivities: [
          { message: 'New branch "North Campus" added', time: '3 hours ago', type: 'branch' },
          { message: 'Monthly financial report completed', time: '1 day ago', type: 'finance' },
          { message: '50 new students enrolled across branches', time: '2 days ago', type: 'enrollment' },
        ],
      };

    case USER_ROLES.BRANCH_PRINCIPAL:
      return {
        stats: [
          {
            title: 'Total Students',
            value: baseStats.totalStudents.toLocaleString(),
            change: '+47',
            changeType: 'positive',
            icon: 'Users',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            title: 'Active Teachers',
            value: baseStats.activeTeachers.toString(),
            change: '+5',
            changeType: 'positive',
            icon: 'GraduationCap',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            title: 'Attendance Rate',
            value: `${baseStats.attendanceRate}%`,
            change: '+2.1%',
            changeType: 'positive',
            icon: 'CheckSquare',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            title: 'Branch Revenue',
            value: `$${(baseStats.revenue / 1000).toFixed(0)}K`,
            change: '+12.3%',
            changeType: 'positive',
            icon: 'CreditCard',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ],
        recentActivities: [
          { message: 'Grade 10A exam results published', time: '2 hours ago', type: 'academic' },
          { message: 'New teacher Mr. Anderson joined Math department', time: '1 day ago', type: 'staff' },
          { message: 'Parent-teacher meeting scheduled for next week', time: '2 days ago', type: 'meeting' },
        ],
      };

    case USER_ROLES.TEACHER:
      return {
        stats: [
          {
            title: 'My Classes',
            value: '6',
            change: '+1',
            changeType: 'positive',
            icon: 'BookOpen',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            title: 'Total Students',
            value: '180',
            change: '+5',
            changeType: 'positive',
            icon: 'Users',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            title: 'Attendance Rate',
            value: '96.8%',
            change: '+1.2%',
            changeType: 'positive',
            icon: 'CheckSquare',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            title: 'Pending Grades',
            value: '24',
            change: '-6',
            changeType: 'negative',
            icon: 'PenTool',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ],
        recentActivities: [
          { message: 'Graded Math test for Class 10A', time: '1 hour ago', type: 'grading' },
          { message: 'Marked attendance for all classes', time: '3 hours ago', type: 'attendance' },
          { message: 'Upcoming Science quiz on Friday', time: '1 day ago', type: 'exam' },
        ],
      };

    case USER_ROLES.STUDENT:
      return {
        stats: [
          {
            title: 'Current GPA',
            value: '3.8',
            change: '+0.2',
            changeType: 'positive',
            icon: 'Award',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            title: 'Attendance',
            value: '94%',
            change: '+2%',
            changeType: 'positive',
            icon: 'CheckSquare',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            title: 'Assignments Due',
            value: '3',
            change: '-2',
            changeType: 'positive',
            icon: 'BookOpen',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            title: 'Fee Balance',
            value: '$250',
            change: '-$150',
            changeType: 'positive',
            icon: 'CreditCard',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ],
        recentActivities: [
          { message: 'Math test result: 92% (A)', time: '1 day ago', type: 'result' },
          { message: 'Science assignment submitted', time: '2 days ago', type: 'assignment' },
          { message: 'Fee payment of $150 received', time: '3 days ago', type: 'payment' },
        ],
      };

    case USER_ROLES.PARENT:
      return {
        stats: [
          {
            title: 'Children',
            value: '2',
            change: '0',
            changeType: 'neutral',
            icon: 'Users',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            title: 'Avg Attendance',
            value: '95%',
            change: '+1%',
            changeType: 'positive',
            icon: 'CheckSquare',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            title: 'Avg Performance',
            value: 'B+',
            change: '+0.3',
            changeType: 'positive',
            icon: 'Award',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            title: 'Total Fees Due',
            value: '$450',
            change: '-$200',
            changeType: 'positive',
            icon: 'CreditCard',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ],
        recentActivities: [
          { message: 'Alice scored 95% in Science test', time: '1 day ago', type: 'result' },
          { message: 'Bob submitted History project', time: '2 days ago', type: 'assignment' },
          { message: 'Parent-teacher meeting scheduled', time: '3 days ago', type: 'meeting' },
        ],
      };

    case USER_ROLES.FINANCE_ADMIN:
      return {
        stats: [
          {
            title: 'Monthly Revenue',
            value: '$125K',
            change: '+8.2%',
            changeType: 'positive',
            icon: 'CreditCard',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            title: 'Pending Payments',
            value: '142',
            change: '-23',
            changeType: 'positive',
            icon: 'Clock',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            title: 'Collection Rate',
            value: '94.2%',
            change: '+1.8%',
            changeType: 'positive',
            icon: 'TrendingUp',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          },
          {
            title: 'Overdue Amount',
            value: '$12.5K',
            change: '-$2.1K',
            changeType: 'positive',
            icon: 'AlertTriangle',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          },
        ],
        recentActivities: [
          { message: '$15,250 collected in tuition fees', time: '2 hours ago', type: 'payment' },
          { message: 'Monthly financial report generated', time: '1 day ago', type: 'report' },
          { message: 'Fee reminder sent to 45 students', time: '2 days ago', type: 'reminder' },
        ],
      };

    default:
      return {
        stats: [],
        recentActivities: [],
      };
  }
};

// Get upcoming events based on role
export const getUpcomingEvents = (userRole) => {
  const commonEvents = [
    {
      id: 1,
      title: 'Board Meeting',
      date: 'Tomorrow',
      time: '2:00 PM',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Science Fair 2024',
      date: 'March 20',
      time: '10:00 AM',
      type: 'event',
    },
  ];

  switch (userRole) {
    case USER_ROLES.TEACHER:
      return [
        {
          id: 1,
          title: 'Math Quiz - Grade 10A',
          date: 'Tomorrow',
          time: '9:00 AM',
          type: 'exam',
        },
        {
          id: 2,
          title: 'Parent-Teacher Meeting',
          date: 'March 15',
          time: '3:00 PM',
          type: 'meeting',
        },
        ...commonEvents,
      ];

    case USER_ROLES.STUDENT:
      return [
        {
          id: 1,
          title: 'Physics Test',
          date: 'Tomorrow',
          time: '10:00 AM',
          type: 'exam',
        },
        {
          id: 2,
          title: 'Chemistry Assignment Due',
          date: 'March 16',
          time: '11:59 PM',
          type: 'assignment',
        },
        ...commonEvents,
      ];

    case USER_ROLES.PARENT:
      return [
        {
          id: 1,
          title: 'Parent-Teacher Conference',
          date: 'March 14',
          time: '4:00 PM',
          type: 'meeting',
        },
        {
          id: 2,
          title: 'Annual Sports Day',
          date: 'March 25',
          time: '8:00 AM',
          type: 'event',
        },
      ];

    default:
      return commonEvents;
  }
}; 