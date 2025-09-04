import { USER_ROLES } from './constants';

// Student-specific mock data
export const STUDENT_MOCK_DATA = {
  profile: {
    studentId: 'STU001',
    admissionNumber: 'ADM2024001',
    rollNumber: '10A-25',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.student@abcschool.edu',
    phone: '+1234567898',
    dateOfBirth: '2008-05-15',
    bloodGroup: 'A+',
    gender: 'female',
    class: {
      id: 'class_001',
      name: 'Grade 10',
      section: 'A',
      classTeacher: 'Mr. Michael Thompson',
    },
    address: {
      street: '123 Student Lane',
      city: 'Education City',
      state: 'Knowledge State',
      zipCode: '12345',
      country: 'Learning Land',
    },
    guardian: {
      father: {
        name: 'Robert Johnson',
        phone: '+1234567899',
        email: 'robert.johnson@email.com',
        occupation: 'Engineer',
      },
      mother: {
        name: 'Mary Johnson',
        phone: '+1234567900',
        email: 'mary.johnson@email.com',
        occupation: 'Doctor',
      },
    },
    academicYear: '2024-25',
    admissionDate: '2024-04-15',
    status: 'active',
  },

  currentAcademics: {
    gpa: 3.8,
    rank: 5,
    totalStudents: 45,
    attendancePercentage: 94.2,
    behaviorGrade: 'A',
    overallGrade: 'A-',
  },

  subjects: [
    {
      id: 'MATH101',
      name: 'Mathematics',
      code: 'MATH',
      teacher: 'Mr. David Smith',
      credits: 4,
      currentGrade: 'A',
      currentMarks: 92,
      maxMarks: 100,
    },
    {
      id: 'SCI101',
      name: 'Science',
      code: 'SCI',
      teacher: 'Ms. Sarah Wilson',
      credits: 4,
      currentGrade: 'A-',
      currentMarks: 88,
      maxMarks: 100,
    },
    {
      id: 'ENG101',
      name: 'English',
      code: 'ENG',
      teacher: 'Mrs. Emily Brown',
      credits: 3,
      currentGrade: 'B+',
      currentMarks: 85,
      maxMarks: 100,
    },
    {
      id: 'HIS101',
      name: 'History',
      code: 'HIS',
      teacher: 'Mr. James Davis',
      credits: 3,
      currentGrade: 'A',
      currentMarks: 90,
      maxMarks: 100,
    },
    {
      id: 'GEO101',
      name: 'Geography',
      code: 'GEO',
      teacher: 'Ms. Lisa Anderson',
      credits: 3,
      currentGrade: 'B+',
      currentMarks: 82,
      maxMarks: 100,
    },
    {
      id: 'PE101',
      name: 'Physical Education',
      code: 'PE',
      teacher: 'Mr. Mark Johnson',
      credits: 2,
      currentGrade: 'A',
      currentMarks: 95,
      maxMarks: 100,
    },
  ],

  attendance: {
    currentMonth: {
      totalDays: 22,
      presentDays: 20,
      absentDays: 2,
      lateDays: 1,
      percentage: 90.9,
    },
    last30Days: [
      { date: '2024-03-01', status: 'present', timeIn: '08:15', timeOut: '15:30' },
      { date: '2024-03-02', status: 'present', timeIn: '08:10', timeOut: '15:30' },
      { date: '2024-03-03', status: 'absent', reason: 'Sick' },
      { date: '2024-03-04', status: 'present', timeIn: '08:20', timeOut: '15:30' },
      { date: '2024-03-05', status: 'late', timeIn: '08:35', timeOut: '15:30' },
      { date: '2024-03-06', status: 'present', timeIn: '08:12', timeOut: '15:30' },
      { date: '2024-03-07', status: 'present', timeIn: '08:18', timeOut: '15:30' },
      { date: '2024-03-08', status: 'present', timeIn: '08:05', timeOut: '15:30' },
      { date: '2024-03-09', status: 'present', timeIn: '08:15', timeOut: '15:30' },
      { date: '2024-03-10', status: 'present', timeIn: '08:08', timeOut: '15:30' },
    ],
    monthlyTrend: [
      { month: 'September', percentage: 96.2 },
      { month: 'October', percentage: 94.8 },
      { month: 'November', percentage: 92.5 },
      { month: 'December', percentage: 88.9 },
      { month: 'January', percentage: 95.1 },
      { month: 'February', percentage: 93.7 },
      { month: 'March', percentage: 90.9 },
    ],
  },

  examResults: [
    {
      id: 'exam_001',
      examName: 'Mid-Term Examination',
      examType: 'midterm',
      date: '2024-02-15',
      status: 'completed',
      totalMarks: 600,
      obtainedMarks: 534,
      percentage: 89.0,
      grade: 'A-',
      rank: 7,
      subjects: [
        { name: 'Mathematics', maxMarks: 100, obtainedMarks: 92, grade: 'A' },
        { name: 'Science', maxMarks: 100, obtainedMarks: 88, grade: 'A-' },
        { name: 'English', maxMarks: 100, obtainedMarks: 85, grade: 'B+' },
        { name: 'History', maxMarks: 100, obtainedMarks: 90, grade: 'A' },
        { name: 'Geography', maxMarks: 100, obtainedMarks: 82, grade: 'B+' },
        { name: 'Physical Education', maxMarks: 100, obtainedMarks: 97, grade: 'A+' },
      ],
    },
    {
      id: 'exam_002',
      examName: 'Unit Test 1',
      examType: 'unit',
      date: '2024-01-20',
      status: 'completed',
      totalMarks: 300,
      obtainedMarks: 275,
      percentage: 91.7,
      grade: 'A',
      rank: 4,
      subjects: [
        { name: 'Mathematics', maxMarks: 50, obtainedMarks: 47, grade: 'A' },
        { name: 'Science', maxMarks: 50, obtainedMarks: 45, grade: 'A' },
        { name: 'English', maxMarks: 50, obtainedMarks: 42, grade: 'B+' },
        { name: 'History', maxMarks: 50, obtainedMarks: 48, grade: 'A' },
        { name: 'Geography', maxMarks: 50, obtainedMarks: 44, grade: 'A-' },
        { name: 'Physical Education', maxMarks: 50, obtainedMarks: 49, grade: 'A+' },
      ],
    },
  ],

  assignments: [
    {
      id: 'assign_001',
      title: 'Algebra Problem Set',
      subject: 'Mathematics',
      teacherName: 'Mr. David Smith',
      assignedDate: '2024-03-01',
      dueDate: '2024-03-08',
      status: 'submitted',
      submittedDate: '2024-03-07',
      maxMarks: 25,
      obtainedMarks: 23,
      grade: 'A',
      feedback: 'Excellent work! Good understanding of concepts.',
      type: 'homework',
    },
    {
      id: 'assign_002',
      title: 'Science Lab Report',
      subject: 'Science',
      teacherName: 'Ms. Sarah Wilson',
      assignedDate: '2024-03-05',
      dueDate: '2024-03-12',
      status: 'pending',
      maxMarks: 30,
      type: 'lab_report',
      description: 'Write a detailed report on the chemical reactions experiment.',
    },
    {
      id: 'assign_003',
      title: 'Essay on Climate Change',
      subject: 'English',
      teacherName: 'Mrs. Emily Brown',
      assignedDate: '2024-02-28',
      dueDate: '2024-03-15',
      status: 'in_progress',
      maxMarks: 20,
      type: 'essay',
      description: 'Write a 500-word essay on the impact of climate change.',
    },
    {
      id: 'assign_004',
      title: 'World War II Timeline',
      subject: 'History',
      teacherName: 'Mr. James Davis',
      assignedDate: '2024-03-10',
      dueDate: '2024-03-20',
      status: 'not_started',
      maxMarks: 15,
      type: 'project',
      description: 'Create a detailed timeline of major events in World War II.',
    },
  ],

  fees: {
    currentAcademicYear: '2024-25',
    totalFees: 12000,
    paidFees: 9000,
    pendingFees: 3000,
    nextDueDate: '2024-04-15',
    installments: [
      {
        id: 'fee_001',
        installmentNumber: 1,
        amount: 3000,
        dueDate: '2024-06-15',
        paidDate: '2024-06-10',
        status: 'paid',
        paymentMethod: 'Bank Transfer',
        receiptNumber: 'RCP001',
      },
      {
        id: 'fee_002',
        installmentNumber: 2,
        amount: 3000,
        dueDate: '2024-09-15',
        paidDate: '2024-09-12',
        status: 'paid',
        paymentMethod: 'Online Payment',
        receiptNumber: 'RCP002',
      },
      {
        id: 'fee_003',
        installmentNumber: 3,
        amount: 3000,
        dueDate: '2024-12-15',
        paidDate: '2024-12-14',
        status: 'paid',
        paymentMethod: 'Cash',
        receiptNumber: 'RCP003',
      },
      {
        id: 'fee_004',
        installmentNumber: 4,
        amount: 3000,
        dueDate: '2024-04-15',
        status: 'pending',
        lateFeePenalty: 150,
      },
    ],
    feeStructure: [
      { component: 'Tuition Fee', amount: 8000 },
      { component: 'Lab Fee', amount: 1500 },
      { component: 'Library Fee', amount: 500 },
      { component: 'Sports Fee', amount: 800 },
      { component: 'Transportation', amount: 1200 },
    ],
  },

  schedule: {
    weeklyTimetable: [
      {
        day: 'Monday',
        periods: [
          { time: '08:00-08:45', subject: 'Mathematics', teacher: 'Mr. David Smith', room: '101' },
          { time: '08:45-09:30', subject: 'Science', teacher: 'Ms. Sarah Wilson', room: 'Lab 1' },
          { time: '09:30-10:00', subject: 'Break', type: 'break' },
          { time: '10:00-10:45', subject: 'English', teacher: 'Mrs. Emily Brown', room: '103' },
          { time: '10:45-11:30', subject: 'History', teacher: 'Mr. James Davis', room: '105' },
          { time: '11:30-12:15', subject: 'Geography', teacher: 'Ms. Lisa Anderson', room: '107' },
          { time: '12:15-13:00', subject: 'Lunch Break', type: 'break' },
          { time: '13:00-13:45', subject: 'Physical Education', teacher: 'Mr. Mark Johnson', room: 'Gym' },
          { time: '13:45-14:30', subject: 'Study Hall', teacher: 'Mr. David Smith', room: '101' },
        ],
      },
      // Similar structure for other days...
    ],
  },

  upcomingEvents: [
    {
      id: 'event_001',
      title: 'Math Quiz',
      date: '2024-03-15',
      time: '10:00 AM',
      subject: 'Mathematics',
      teacher: 'Mr. David Smith',
      type: 'quiz',
      description: 'Chapter 5: Quadratic Equations',
    },
    {
      id: 'event_002',
      title: 'Science Project Submission',
      date: '2024-03-18',
      time: '02:00 PM',
      subject: 'Science',
      teacher: 'Ms. Sarah Wilson',
      type: 'submission',
      description: 'Solar System Model Project',
    },
    {
      id: 'event_003',
      title: 'Parent-Teacher Meeting',
      date: '2024-03-22',
      time: '04:00 PM',
      type: 'meeting',
      description: 'Discuss academic progress and behavior',
    },
    {
      id: 'event_004',
      title: 'Annual Sports Day',
      date: '2024-03-25',
      time: '08:00 AM',
      type: 'event',
      description: 'Inter-class sports competition',
    },
  ],

  notifications: [
    {
      id: 'notif_001',
      title: 'Assignment Due Reminder',
      message: 'Science Lab Report is due tomorrow',
      type: 'assignment',
      date: '2024-03-11',
      isRead: false,
      priority: 'high',
    },
    {
      id: 'notif_002',
      title: 'Fee Payment Reminder',
      message: 'Next installment due on April 15th',
      type: 'fee',
      date: '2024-03-10',
      isRead: true,
      priority: 'medium',
    },
    {
      id: 'notif_003',
      title: 'Exam Results Published',
      message: 'Mid-term exam results are now available',
      type: 'result',
      date: '2024-03-08',
      isRead: true,
      priority: 'high',
    },
    {
      id: 'notif_004',
      title: 'School Holiday Notice',
      message: 'School will be closed on March 20th for Holi',
      type: 'announcement',
      date: '2024-03-05',
      isRead: true,
      priority: 'low',
    },
  ],

  library: {
    booksIssued: [
      {
        id: 'book_001',
        title: 'Advanced Mathematics',
        author: 'Dr. John Smith',
        isbn: '978-0123456789',
        issueDate: '2024-02-15',
        dueDate: '2024-03-15',
        status: 'issued',
        renewCount: 1,
      },
      {
        id: 'book_002',
        title: 'Science Experiments',
        author: 'Prof. Sarah Johnson',
        isbn: '978-0987654321',
        issueDate: '2024-03-01',
        dueDate: '2024-03-31',
        status: 'issued',
        renewCount: 0,
      },
    ],
    finesDue: 25, // Amount in currency
    borrowingHistory: [
      {
        title: 'History of Ancient Civilizations',
        issueDate: '2024-01-10',
        returnDate: '2024-02-10',
        status: 'returned',
      },
    ],
  },

  achievements: [
    {
      id: 'ach_001',
      title: 'Mathematics Olympiad',
      description: 'First place in school mathematics competition',
      date: '2024-02-20',
      type: 'academic',
      level: 'school',
    },
    {
      id: 'ach_002',
      title: 'Perfect Attendance',
      description: 'Perfect attendance for the month of January',
      date: '2024-01-31',
      type: 'attendance',
      level: 'monthly',
    },
    {
      id: 'ach_003',
      title: 'Science Fair Winner',
      description: 'Winner of inter-school science fair',
      date: '2024-01-15',
      type: 'competition',
      level: 'inter_school',
    },
  ],
};

// Mock API responses for student features
export const getStudentProfile = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: STUDENT_MOCK_DATA.profile,
      });
    }, 800);
  });
};

export const getStudentAttendance = (period = 'current_month') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: STUDENT_MOCK_DATA.attendance,
      });
    }, 600);
  });
};

export const getStudentMarks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          currentAcademics: STUDENT_MOCK_DATA.currentAcademics,
          subjects: STUDENT_MOCK_DATA.subjects,
          examResults: STUDENT_MOCK_DATA.examResults,
        },
      });
    }, 700);
  });
};

export const getStudentFees = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: STUDENT_MOCK_DATA.fees,
      });
    }, 500);
  });
};

export const getStudentAssignments = (status = 'all') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredAssignments = STUDENT_MOCK_DATA.assignments;
      if (status !== 'all') {
        filteredAssignments = STUDENT_MOCK_DATA.assignments.filter(
          assignment => assignment.status === status
        );
      }
      resolve({
        success: true,
        data: filteredAssignments,
      });
    }, 400);
  });
};

export const getStudentSchedule = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: STUDENT_MOCK_DATA.schedule,
      });
    }, 300);
  });
};

export const getStudentNotifications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: STUDENT_MOCK_DATA.notifications,
      });
    }, 400);
  });
}; 