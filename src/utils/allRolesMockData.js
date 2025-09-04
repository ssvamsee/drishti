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
      organizationId: 'org_abc_001',
      accessibleBranches: ['branch_001', 'branch_002', 'branch_003', 'branch_004', 'branch_005', 'branch_006', 'branch_007', 'branch_008'],
    },
    
    organizationStats: {
      totalBranches: 8,
      totalStudents: 11833,
      totalStaff: 630,
      monthlyRevenue: 2500000,
      growthRate: 18.5,
      averageAttendance: 92.1,
      overallPerformance: 90.8,
      totalRevenue: 30000000,
      feeCollectionRate: 88.9,
    },
    
    branches: [
      {
        id: 'branch_001',
        name: 'Main Campus',
        code: 'MC001',
        address: '123 Main Street, Downtown',
        city: 'Downtown',
        state: 'California',
        country: 'United States',
        postalCode: '90210',
        phone: '+1234567894',
        email: 'main@abcschool.edu',
        website: 'https://main.abcschool.edu',
        principal: 'John Principal',
        capacity: 3000,
        totalStudents: 2847,
        status: 'active',
        establishedYear: 2005,
        createdAt: '2005-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        // Legacy fields for compatibility
        location: 'Downtown',
        students: 2847,
        teachers: 186,
        staff: 45,
        principalContact: '+1234567894',
        performance: 94.2,
        revenue: 685000,
        attendanceRate: 95.1,
        feeCollection: 92.5,
        grades: ['Pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Complex', 'Auditorium'],
      },
      {
        id: 'branch_002',
        name: 'North Campus',
        code: 'NC002',
        address: '456 North Avenue, North District',
        city: 'North District',
        state: 'California',
        country: 'United States',
        postalCode: '90211',
        phone: '+1234567895',
        email: 'north@abcschool.edu',
        website: 'https://north.abcschool.edu',
        principal: 'Mary Anderson',
        capacity: 2500,
        totalStudents: 1923,
        status: 'active',
        establishedYear: 2010,
        createdAt: '2010-03-15T00:00:00Z',
        updatedAt: '2024-01-10T14:20:00Z',
        // Legacy fields for compatibility
        location: 'North District',
        students: 1923,
        teachers: 142,
        staff: 32,
        principalContact: '+1234567895',
        performance: 91.8,
        revenue: 442000,
        attendanceRate: 93.2,
        feeCollection: 88.7,
        grades: ['Pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8'],
        facilities: ['Library', 'Computer Lab', 'Science Lab', 'Playground'],
      },
      {
        id: 'branch_003',
        name: 'East Campus',
        code: 'EC003',
        address: '789 East Boulevard, East Side',
        city: 'East Side',
        state: 'California',
        country: 'United States',
        postalCode: '90212',
        phone: '+1234567896',
        email: 'east@abcschool.edu',
        website: null,
        principal: 'Robert Chen',
        capacity: 2200,
        totalStudents: 2156,
        status: 'active',
        establishedYear: 2015,
        createdAt: '2015-06-01T00:00:00Z',
        updatedAt: '2023-12-20T09:45:00Z',
        // Legacy fields for compatibility
        location: 'East Side',
        students: 2156,
        teachers: 98,
        staff: 28,
        principalContact: '+1234567896',
        performance: 89.5,
        revenue: 398000,
        attendanceRate: 90.8,
        feeCollection: 85.2,
        grades: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        facilities: ['Library', 'Computer Lab', 'Art Studio', 'Music Room'],
      },
      {
        id: 'branch_004',
        name: 'West Campus',
        code: 'WC004',
        address: '321 West Street, West End',
        city: 'West End',
        state: 'California',
        country: 'United States',
        postalCode: '90213',
        phone: '+1234567897',
        email: 'west@abcschool.edu',
        website: 'https://west.abcschool.edu',
        principal: 'Lisa Williams',
        capacity: 1800,
        totalStudents: 1621,
        status: 'active',
        establishedYear: 2018,
        createdAt: '2018-08-01T00:00:00Z',
        updatedAt: '2024-01-05T16:15:00Z',
        // Legacy fields for compatibility
        location: 'West End',
        students: 1621,
        teachers: 61,
        staff: 19,
        principalContact: '+1234567897',
        performance: 88.9,
        revenue: 275000,
        attendanceRate: 91.5,
        feeCollection: 91.8,
        grades: ['Pre-K', 'K', '1', '2', '3', '4', '5'],
        facilities: ['Library', 'Playground', 'Art Room'],
      },
      {
        id: 'branch_005',
        name: 'South Campus',
        code: 'SC005',
        address: '555 South Park Avenue, South Valley',
        city: 'South Valley',
        state: 'California',
        country: 'United States',
        postalCode: '90214',
        phone: '+1234567898',
        email: 'south@abcschool.edu',
        website: 'https://south.abcschool.edu',
        principal: 'Jennifer Martinez',
        capacity: 1500,
        totalStudents: 850,
        status: 'active',
        establishedYear: 2024,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T08:30:00Z',
        // Legacy fields for compatibility
        location: 'South Valley',
        students: 850,
        teachers: 45,
        staff: 12,
        principalContact: '+1234567898',
        performance: 87.5,
        revenue: 180000,
        attendanceRate: 89.2,
        feeCollection: 86.5,
        grades: ['Pre-K', 'K', '1', '2', '3', '4', '5', '6'],
        facilities: ['Library', 'Computer Lab', 'Science Lab', 'Playground', 'Music Room'],
      },
      {
        id: 'branch_006',
        name: 'Central Campus',
        code: 'CC006',
        address: '777 Central Plaza, Midtown District',
        city: 'Midtown District',
        state: 'California',
        country: 'United States',
        postalCode: '90215',
        phone: '+1234567899',
        email: 'central@abcschool.edu',
        website: 'https://central.abcschool.edu',
        principal: 'Dr. Michael Rodriguez',
        capacity: 2800,
        totalStudents: 2456,
        status: 'active',
        establishedYear: 2012,
        createdAt: '2012-04-15T00:00:00Z',
        updatedAt: '2024-01-12T11:45:00Z',
        // Legacy fields for compatibility
        location: 'Midtown District',
        students: 2456,
        teachers: 158,
        staff: 38,
        principalContact: '+1234567899',
        performance: 93.8,
        revenue: 580000,
        attendanceRate: 94.7,
        feeCollection: 91.2,
        grades: ['Pre-K', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Complex', 'Auditorium', 'Art Studio', 'Music Room', 'Cafeteria'],
      },
      {
        id: 'branch_007',
        name: 'Riverside Campus',
        code: 'RC007',
        address: '888 Riverside Drive, Riverside Heights',
        city: 'Riverside Heights',
        state: 'California',
        country: 'United States',
        postalCode: '90216',
        phone: '+1234567800',
        email: 'riverside@abcschool.edu',
        website: null,
        principal: 'Sarah Thompson',
        capacity: 1200,
        totalStudents: 980,
        status: 'active',
        establishedYear: 2019,
        createdAt: '2019-02-01T00:00:00Z',
        updatedAt: '2024-01-08T14:20:00Z',
        // Legacy fields for compatibility
        location: 'Riverside Heights',
        students: 980,
        teachers: 72,
        staff: 18,
        principalContact: '+1234567800',
        performance: 88.9,
        revenue: 220000,
        attendanceRate: 90.5,
        feeCollection: 88.8,
        grades: ['K', '1', '2', '3', '4', '5', '6', '7', '8'],
        facilities: ['Library', 'Computer Lab', 'Art Studio', 'Playground', 'Garden'],
      },
      {
        id: 'branch_008',
        name: 'Hillview Campus',
        code: 'HC008',
        address: '999 Hillview Road, Mountain View',
        city: 'Mountain View',
        state: 'California',
        country: 'United States',
        postalCode: '90217',
        phone: '+1234567801',
        email: 'hillview@abcschool.edu',
        website: 'https://hillview.abcschool.edu',
        principal: null,
        capacity: 1800,
        totalStudents: 0,
        status: 'pending',
        establishedYear: 2024,
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z',
        // Legacy fields for compatibility
        location: 'Mountain View',
        students: 0,
        teachers: 0,
        staff: 0,
        principalContact: null,
        performance: 0,
        revenue: 0,
        attendanceRate: 0,
        feeCollection: 0,
        grades: [],
        facilities: ['Library', 'Computer Lab', 'Construction in Progress'],
      },
    ],
    
    // Consolidated data across all branches
    consolidatedStats: {
      totalClasses: 342,
      totalSubjects: 28,
      averageClassSize: 25,
      teacherStudentRatio: '1:17.5',
      graduationRate: 96.8,
      collegeAcceptanceRate: 89.2,
    },
    
    // Branch comparison metrics
    branchComparison: {
      attendance: [
        { branch: 'Main Campus', rate: 95.1 },
        { branch: 'North Campus', rate: 93.2 },
        { branch: 'East Campus', rate: 90.8 },
        { branch: 'West Campus', rate: 91.5 },
      ],
      performance: [
        { branch: 'Main Campus', score: 94.2 },
        { branch: 'North Campus', score: 91.8 },
        { branch: 'East Campus', score: 89.5 },
        { branch: 'West Campus', score: 88.9 },
      ],
      revenue: [
        { branch: 'Main Campus', amount: 685000 },
        { branch: 'North Campus', amount: 442000 },
        { branch: 'East Campus', amount: 398000 },
        { branch: 'West Campus', amount: 275000 },
      ],
      feeCollection: [
        { branch: 'Main Campus', rate: 92.5 },
        { branch: 'North Campus', rate: 88.7 },
        { branch: 'East Campus', rate: 85.2 },
        { branch: 'West Campus', rate: 91.8 },
      ],
    },
    
    // Students data across all branches
    studentsData: {
      totalStudents: 8547,
      byBranch: [
        { branchId: 'branch_001', branchName: 'Main Campus', count: 2847 },
        { branchId: 'branch_002', branchName: 'North Campus', count: 1923 },
        { branchId: 'branch_003', branchName: 'East Campus', count: 2156 },
        { branchId: 'branch_004', branchName: 'West Campus', count: 1621 },
      ],
      byGrade: {
        'Pre-K': 485,
        'K': 523,
        '1': 612,
        '2': 598,
        '3': 587,
        '4': 576,
        '5': 565,
        '6': 554,
        '7': 543,
        '8': 532,
        '9': 521,
        '10': 510,
        '11': 489,
        '12': 492,
      },
      genderDistribution: {
        male: 4385,
        female: 4162,
      },
      newEnrollments: 1247,
      graduations: 489,
    },
    
    // Attendance analytics
    attendanceAnalytics: {
      overall: {
        present: 7934,
        absent: 613,
        rate: 92.8,
      },
      byBranch: [
        { branchId: 'branch_001', branchName: 'Main Campus', present: 2706, absent: 141, rate: 95.1 },
        { branchId: 'branch_002', branchName: 'North Campus', present: 1792, absent: 131, rate: 93.2 },
        { branchId: 'branch_003', branchName: 'East Campus', present: 1958, absent: 198, rate: 90.8 },
        { branchId: 'branch_004', branchName: 'West Campus', present: 1483, absent: 138, rate: 91.5 },
      ],
      trends: [
        { month: 'Jan', rate: 91.2 },
        { month: 'Feb', rate: 92.8 },
        { month: 'Mar', rate: 93.5 },
        { month: 'Apr', rate: 92.1 },
        { month: 'May', rate: 90.8 },
        { month: 'Jun', rate: 89.5 },
      ],
    },
    
    // Academic performance
    academicPerformance: {
      overall: {
        averageGrade: 'B+',
        passRate: 94.8,
        excellenceRate: 67.2,
      },
      byBranch: [
        { branchId: 'branch_001', branchName: 'Main Campus', averageGrade: 'A-', passRate: 96.8, excellenceRate: 78.5 },
        { branchId: 'branch_002', branchName: 'North Campus', averageGrade: 'B+', passRate: 95.2, excellenceRate: 69.8 },
        { branchId: 'branch_003', branchName: 'East Campus', averageGrade: 'B', passRate: 92.1, excellenceRate: 58.9 },
        { branchId: 'branch_004', branchName: 'West Campus', averageGrade: 'B+', passRate: 94.5, excellenceRate: 61.7 },
      ],
      subjectPerformance: [
        { subject: 'Mathematics', average: 87.5, passRate: 92.1 },
        { subject: 'Science', average: 85.8, passRate: 89.7 },
        { subject: 'English', average: 89.2, passRate: 95.8 },
        { subject: 'Social Studies', average: 86.1, passRate: 91.5 },
        { subject: 'Arts', average: 91.7, passRate: 97.2 },
      ],
    },
    
    // Financial overview
    financialOverview: {
      totalRevenue: 1800000,
      totalExpenses: 1420000,
      netProfit: 380000,
      profitMargin: 21.1,
      byBranch: [
        { branchId: 'branch_001', branchName: 'Main Campus', revenue: 685000, expenses: 542000, profit: 143000 },
        { branchId: 'branch_002', branchName: 'North Campus', revenue: 442000, expenses: 368000, profit: 74000 },
        { branchId: 'branch_003', branchName: 'East Campus', revenue: 398000, expenses: 325000, profit: 73000 },
        { branchId: 'branch_004', branchName: 'West Campus', revenue: 275000, expenses: 185000, profit: 90000 },
      ],
      feeCollection: {
        collected: 1607400,
        pending: 192600,
        overdue: 87500,
        collectionRate: 89.3,
      },
    },
    
    performanceMetrics: [
      { metric: 'Student Satisfaction', value: 4.6, target: 4.5, status: 'above' },
      { metric: 'Teacher Retention', value: 94, target: 90, status: 'above' },
      { metric: 'Fee Collection', value: 89.3, target: 85, status: 'above' },
      { metric: 'Academic Performance', value: 91.5, target: 88, status: 'above' },
      { metric: 'Attendance Rate', value: 92.8, target: 90, status: 'above' },
      { metric: 'Parent Satisfaction', value: 4.4, target: 4.2, status: 'above' },
    ],
    
    recentActivities: [
      {
        id: 1,
        type: 'enrollment',
        message: '45 new students enrolled across all branches this week',
        time: '2 hours ago',
        priority: 'medium',
        branchId: 'all',
      },
      {
        id: 2,
        type: 'performance',
        message: 'Main Campus achieved 96.8% pass rate in quarterly exams',
        time: '1 day ago',
        priority: 'high',
        branchId: 'branch_001',
      },
      {
        id: 3,
        type: 'financial',
        message: 'Fee collection rate improved to 89.3% organization-wide',
        time: '2 days ago',
        priority: 'medium',
        branchId: 'all',
      },
      {
        id: 4,
        type: 'facility',
        message: 'New science lab inaugurated at East Campus',
        time: '3 days ago',
        priority: 'low',
        branchId: 'branch_003',
      },
    ],
    
    pendingApprovals: [
      {
        id: 'app_001',
        type: 'budget_approval',
        branch: 'North Campus',
        amount: '$25,000',
        description: 'New computer lab equipment',
        requestDate: '2024-03-10',
        requestedBy: 'Mary Anderson',
      },
      {
        id: 'app_002',
        type: 'staff_hiring',
        branch: 'East Campus',
        position: 'Mathematics Teacher',
        description: 'Replacement for retiring teacher',
        requestDate: '2024-03-08',
        requestedBy: 'Robert Chen',
      },
      {
        id: 'app_003',
        type: 'policy_change',
        branch: 'All Branches',
        description: 'Updated attendance policy implementation',
        requestDate: '2024-03-05',
        requestedBy: 'Academic Committee',
      },
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