import { USER_ROLES } from './constants';

// Comprehensive mock data for all roles
export const ALL_ROLES_MOCK_DATA = {
  // Teacher Mock Data
  [USER_ROLES.TEACHER]: {
    profile: {
      userId: 'teacher_001',
      employeeId: 'EMP001',
      email: 'teacher@abcschool.edu',
      role: USER_ROLES.TEACHER,
      firstName: 'Michael',
      lastName: 'Thompson',
      phone: '+1234567896',
      department: 'Mathematics & Science',
      qualification: 'M.Sc. Mathematics, B.Ed.',
      experience: '8 years',
      joinDate: '2016-07-15',
      subjects: ['Mathematics', 'Science'],
      assignedClasses: ['10A', '10B', '9A'],
      tenantId: 'tenant_001',
      branchId: 'branch_001',
    },
    
    classes: [
      {
        id: 'class_001',
        name: 'Grade 10A',
        section: 'A',
        subject: 'Mathematics',
        totalStudents: 35,
        presentToday: 32,
        schedule: {
          monday: '08:00-09:00',
          tuesday: '09:00-10:00',
          wednesday: '10:00-11:00',
          thursday: '08:00-09:00',
          friday: '09:00-10:00',
        },
      },
      {
        id: 'class_002',
        name: 'Grade 10B',
        section: 'B',
        subject: 'Mathematics',
        totalStudents: 38,
        presentToday: 35,
        schedule: {
          monday: '10:00-11:00',
          tuesday: '11:00-12:00',
          wednesday: '08:00-09:00',
          thursday: '10:00-11:00',
          friday: '11:00-12:00',
        },
      },
    ],
    
    students: [
      {
        id: 'student_001',
        name: 'Alice Johnson',
        rollNumber: '10A-25',
        class: '10A',
        attendance: 94.2,
        currentGrade: 'A',
        parentContact: '+1234567899',
      },
      {
        id: 'student_002',
        name: 'Bob Smith',
        rollNumber: '10A-26',
        class: '10A',
        attendance: 89.1,
        currentGrade: 'B+',
        parentContact: '+1234567900',
      },
      // More students...
    ],
    
    assignments: [
      {
        id: 'assign_t001',
        title: 'Quadratic Equations Practice',
        class: '10A',
        subject: 'Mathematics',
        assignedDate: '2024-03-01',
        dueDate: '2024-03-08',
        totalSubmissions: 32,
        pendingSubmissions: 3,
        status: 'active',
      },
      {
        id: 'assign_t002',
        title: 'Algebra Problem Set',
        class: '10B',
        subject: 'Mathematics',
        assignedDate: '2024-03-05',
        dueDate: '2024-03-12',
        totalSubmissions: 28,
        pendingSubmissions: 10,
        status: 'active',
      },
    ],
    
    exams: [
      {
        id: 'exam_t001',
        name: 'Unit Test 2 - Algebra',
        class: '10A',
        subject: 'Mathematics',
        date: '2024-03-15',
        duration: '2 hours',
        totalMarks: 100,
        studentsAppeared: 32,
        averageScore: 78.5,
        status: 'upcoming',
      },
    ],
    
    todaySchedule: [
      { time: '08:00-09:00', class: '10A', subject: 'Mathematics', room: '101' },
      { time: '10:00-11:00', class: '10B', subject: 'Mathematics', room: '101' },
      { time: '14:00-15:00', class: '9A', subject: 'Science', room: 'Lab1' },
    ],
  },

  // Branch Principal Mock Data
  [USER_ROLES.BRANCH_PRINCIPAL]: {
    profile: {
      userId: 'principal_001',
      employeeId: 'PRIN001',
      email: 'principal@abcschool.edu',
      role: USER_ROLES.BRANCH_PRINCIPAL,
      firstName: 'John',
      lastName: 'Principal',
      phone: '+1234567894',
      qualification: 'M.Ed., Ph.D. Education',
      experience: '15 years',
      joinDate: '2010-04-01',
      tenantId: 'tenant_001',
      branchId: 'branch_001',
    },
    
    branchStats: {
      totalStudents: 847,
      totalTeachers: 42,
      totalClasses: 24,
      attendanceRate: 94.2,
      feeCollectionRate: 87.5,
      examResults: {
        passRate: 96.8,
        averageGrade: 'B+',
      },
    },
    
    teachers: [
      {
        id: 'teacher_001',
        name: 'Michael Thompson',
        department: 'Mathematics',
        classes: 3,
        attendance: 98.5,
        performance: 'Excellent',
      },
      {
        id: 'teacher_002',
        name: 'Sarah Wilson',
        department: 'Science',
        classes: 4,
        attendance: 96.2,
        performance: 'Very Good',
      },
    ],
    
    recentActivities: [
      {
        id: 1,
        type: 'enrollment',
        message: '15 new students enrolled this week',
        time: '2 hours ago',
        priority: 'medium',
      },
      {
        id: 2,
        type: 'exam',
        message: 'Grade 12 final exams completed',
        time: '1 day ago',
        priority: 'high',
      },
    ],
    
    pendingApprovals: [
      {
        id: 'app_001',
        type: 'fee_waiver',
        student: 'Alice Johnson',
        amount: '$500',
        reason: 'Financial hardship',
        requestDate: '2024-03-10',
      },
      {
        id: 'app_002',
        type: 'leave_request',
        teacher: 'Sarah Wilson',
        dates: '2024-03-20 to 2024-03-22',
        reason: 'Medical leave',
        requestDate: '2024-03-08',
      },
    ],
  },

  // Finance Admin Mock Data
  [USER_ROLES.FINANCE_ADMIN]: {
    profile: {
      userId: 'finance_001',
      employeeId: 'FIN001',
      email: 'finance@abcschool.edu',
      role: USER_ROLES.FINANCE_ADMIN,
      firstName: 'Jennifer',
      lastName: 'Davis',
      phone: '+1234567897',
      department: 'Finance & Accounts',
      qualification: 'MBA Finance, CPA',
      experience: '10 years',
      joinDate: '2014-01-15',
      tenantId: 'tenant_001',
      branchId: 'branch_001',
    },
    
    financialStats: {
      monthlyRevenue: 125000,
      collectionRate: 87.5,
      pendingFees: 65000,
      overdueAmount: 12500,
      totalCollected: 487500,
      expenses: 89000,
      profit: 36000,
    },
    
    recentTransactions: [
      {
        id: 'txn_001',
        studentName: 'Alice Johnson',
        amount: 3000,
        type: 'fee_payment',
        method: 'Bank Transfer',
        date: '2024-03-10',
        status: 'completed',
      },
      {
        id: 'txn_002',
        studentName: 'Bob Smith',
        amount: 1500,
        type: 'fee_payment',
        method: 'Cash',
        date: '2024-03-09',
        status: 'completed',
      },
    ],
    
    pendingPayments: [
      {
        id: 'pending_001',
        studentName: 'Charlie Brown',
        amount: 3000,
        dueDate: '2024-03-15',
        overdueDays: 5,
        installment: 4,
      },
      {
        id: 'pending_002',
        studentName: 'Diana Prince',
        amount: 1500,
        dueDate: '2024-03-20',
        overdueDays: 0,
        installment: 2,
      },
    ],
    
    expenseCategories: [
      { category: 'Salaries', amount: 65000, percentage: 73 },
      { category: 'Utilities', amount: 8000, percentage: 9 },
      { category: 'Maintenance', amount: 6000, percentage: 7 },
      { category: 'Supplies', amount: 5000, percentage: 6 },
      { category: 'Others', amount: 5000, percentage: 6 },
    ],
  },

  // Parent Mock Data
  [USER_ROLES.PARENT]: {
    profile: {
      userId: 'parent_001',
      email: 'parent@example.com',
      role: USER_ROLES.PARENT,
      firstName: 'Robert',
      lastName: 'Johnson',
      phone: '+1234567899',
      occupation: 'Software Engineer',
      address: '123 Parent Street, City, State',
      tenantId: 'tenant_001',
      branchId: 'branch_001',
    },
    
    children: [
      {
        id: 'student_001',
        name: 'Alice Johnson',
        class: '10A',
        rollNumber: '10A-25',
        currentGPA: 3.8,
        attendance: 94.2,
        upcomingExams: [
          {
            subject: 'Mathematics',
            date: '2024-03-15',
            type: 'Unit Test',
          },
          {
            subject: 'Science',
            date: '2024-03-18',
            type: 'Lab Test',
          },
        ],
        recentGrades: [
          { subject: 'Mathematics', marks: '92/100', grade: 'A' },
          { subject: 'Science', marks: '88/100', grade: 'A-' },
          { subject: 'English', marks: '85/100', grade: 'B+' },
        ],
        pendingFees: 3000,
        teacherContacts: [
          { name: 'Michael Thompson', subject: 'Mathematics', phone: '+1234567896' },
          { name: 'Sarah Wilson', subject: 'Science', phone: '+1234567901' },
        ],
      },
    ],
    
    communications: [
      {
        id: 'comm_001',
        from: 'Michael Thompson',
        subject: 'Alice\'s Math Performance',
        message: 'Alice is doing exceptionally well in Mathematics. She scored 92% in the recent test.',
        date: '2024-03-08',
        type: 'teacher_message',
        isRead: false,
      },
      {
        id: 'comm_002',
        from: 'School Administration',
        subject: 'Parent-Teacher Meeting',
        message: 'Parent-Teacher meeting scheduled for March 22nd at 4:00 PM.',
        date: '2024-03-05',
        type: 'announcement',
        isRead: true,
      },
    ],
  },

  // Organization Head Mock Data
  [USER_ROLES.ORGANIZATION_HEAD]: {
    profile: {
      userId: 'org_001',
      email: 'head@abcschool.edu',
      role: USER_ROLES.ORGANIZATION_HEAD,
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1234567891',
      qualification: 'Ph.D. Educational Administration',
      experience: '20 years',
      joinDate: '2005-01-01',
      tenantId: 'tenant_001',
    },
    
    organizationStats: {
      totalBranches: 8,
      totalStudents: 12547,
      totalStaff: 847,
      monthlyRevenue: 2400000,
      growthRate: 15.2,
    },
    
    branches: [
      {
        id: 'branch_001',
        name: 'Main Campus',
        location: 'Downtown',
        students: 2847,
        teachers: 186,
        principal: 'John Principal',
        performance: 94.2,
        revenue: 485000,
      },
      {
        id: 'branch_002',
        name: 'North Campus',
        location: 'North District',
        students: 1923,
        teachers: 142,
        principal: 'Mary Anderson',
        performance: 91.8,
        revenue: 342000,
      },
    ],
    
    performanceMetrics: [
      { metric: 'Student Satisfaction', value: 4.6, target: 4.5, status: 'above' },
      { metric: 'Teacher Retention', value: 94, target: 90, status: 'above' },
      { metric: 'Fee Collection', value: 87.5, target: 85, status: 'above' },
      { metric: 'Academic Performance', value: 89.2, target: 88, status: 'above' },
    ],
  },

  // Superadmin Mock Data
  [USER_ROLES.SUPERADMIN]: {
    profile: {
      userId: 'super_001',
      email: 'superadmin@studenterp.com',
      role: USER_ROLES.SUPERADMIN,
      firstName: 'System',
      lastName: 'Administrator',
      phone: '+1234567890',
    },
    
    systemStats: {
      totalOrganizations: 24,
      totalUsers: 15000,
      systemUptime: 99.9,
      totalRevenue: 5800000,
      activeSubscriptions: 23,
      supportTickets: 12,
    },
    
    organizations: [
      {
        id: 'org_001',
        name: 'ABC School Group',
        branches: 8,
        students: 12547,
        subscription: 'Premium',
        status: 'active',
        revenue: 2400000,
        expiryDate: '2025-06-30',
      },
      {
        id: 'org_002',
        name: 'XYZ Education',
        branches: 5,
        students: 8932,
        subscription: 'Standard',
        status: 'active',
        revenue: 1200000,
        expiryDate: '2025-03-31',
      },
    ],
    
    recentActivities: [
      {
        type: 'new_organization',
        message: 'New organization "Learning Hub" registered',
        time: '2 hours ago',
      },
      {
        type: 'system_update',
        message: 'System updated to version 2.1.5',
        time: '1 day ago',
      },
      {
        type: 'subscription_renewal',
        message: 'ABC School Group renewed Premium subscription',
        time: '2 days ago',
      },
    ],
  },
};

// Role-specific API mock functions
export const getTeacherDashboard = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.TEACHER],
      });
    }, 800);
  });
};

export const getPrincipalDashboard = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.BRANCH_PRINCIPAL],
      });
    }, 700);
  });
};

export const getFinanceDashboard = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.FINANCE_ADMIN],
      });
    }, 600);
  });
};

export const getParentDashboard = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.PARENT],
      });
    }, 500);
  });
};

export const getOrganizationDashboard = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.ORGANIZATION_HEAD],
      });
    }, 900);
  });
};

export const getSuperadminDashboard = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.SUPERADMIN],
      });
    }, 400);
  });
};

// Class management for teachers
export const getTeacherClasses = (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.TEACHER].classes,
      });
    }, 500);
  });
};

// Student management for teachers
export const getTeacherStudents = (teacherId, classId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let students = ALL_ROLES_MOCK_DATA[USER_ROLES.TEACHER].students;
      if (classId) {
        students = students.filter(student => student.class === classId);
      }
      resolve({
        success: true,
        data: students,
      });
    }, 600);
  });
};

// Assignment management for teachers
export const getTeacherAssignments = (teacherId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.TEACHER].assignments,
      });
    }, 400);
  });
};

// Financial reports for finance admin
export const getFinancialReports = (period = 'monthly') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const financeData = ALL_ROLES_MOCK_DATA[USER_ROLES.FINANCE_ADMIN];
      resolve({
        success: true,
        data: {
          stats: financeData.financialStats,
          transactions: financeData.recentTransactions,
          pending: financeData.pendingPayments,
          expenses: financeData.expenseCategories,
        },
      });
    }, 700);
  });
};

// Organization management for org head
export const getOrganizationData = (orgId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.ORGANIZATION_HEAD],
      });
    }, 800);
  });
};

// System management for superadmin
export const getSystemData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ALL_ROLES_MOCK_DATA[USER_ROLES.SUPERADMIN],
      });
    }, 300);
  });
}; 