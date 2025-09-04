// Mock data for settings functionality
import { USER_ROLES } from './constants';

// Organization settings data
export const ORGANIZATION_SETTINGS = {
  general: {
    name: 'ABC School Group',
    email: 'admin@abcschool.edu',
    phone: '+1-555-0123',
    address: '123 Education Street, Learning City, LC 12345',
    website: 'https://abcschool.edu',
    establishedYear: 1995,
    logo: null,
    description: 'A premier educational institution focused on academic excellence and holistic development.',
  },
  
  academic: {
    academicYear: '2024-2025',
    gradeScale: 'A-F',
    passingGrade: 'D',
    maxStudentsPerClass: 35,
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    schoolHours: {
      start: '08:00',
      end: '15:30',
    },
    examTypes: ['Midterm', 'Final', 'Quiz', 'Assignment'],
  },
  
  notification: {
    enableEmailNotifications: true,
    enableSMSNotifications: true,
    parentNotifications: {
      attendance: true,
      grades: true,
      fees: true,
      events: true,
    },
    staffNotifications: {
      meetings: true,
      deadlines: true,
      systemUpdates: false,
    },
  },
  
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
      expirationDays: 90,
    },
    sessionSettings: {
      timeoutMinutes: 30,
      maxConcurrentSessions: 3,
      enableTwoFactor: false,
    },
    dataRetention: {
      studentRecords: 7, // years
      attendanceRecords: 5,
      gradeRecords: 10,
      auditLogs: 2,
    },
  },
};

// Branch-specific settings
export const BRANCH_SETTINGS = {
  general: {
    name: 'Main Campus',
    code: 'MAIN001',
    address: '123 Education Street, Learning City, LC 12345',
    phone: '+1-555-0124',
    email: 'main@abcschool.edu',
    principal: 'Dr. John Principal',
    establishedYear: 1995,
  },
  
  capacity: {
    maxStudents: 1200,
    currentStudents: 987,
    maxClasses: 45,
    currentClasses: 38,
    maxTeachers: 85,
    currentTeachers: 72,
  },
  
  facilities: {
    library: true,
    laboratory: true,
    sportsComplex: true,
    cafeteria: true,
    transportFacility: true,
    hostel: false,
    medicalRoom: true,
  },
  
  academic: {
    grades: ['KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Physical Education'],
    languages: ['English', 'Spanish', 'French'],
  },
};

// User preference templates by role
export const USER_PREFERENCES_TEMPLATES = {
  [USER_ROLES.SUPERADMIN]: {
    dashboard: {
      defaultView: 'overview',
      showStatistics: true,
      refreshInterval: 300, // seconds
    },
    notifications: {
      systemAlerts: true,
      billingReminders: true,
      supportTickets: true,
      organizationUpdates: true,
    },
    display: {
      itemsPerPage: 20,
      theme: 'system',
      language: 'en',
      timezone: 'UTC',
    },
  },
  
  [USER_ROLES.ORGANIZATION_HEAD]: {
    dashboard: {
      defaultView: 'analytics',
      showStatistics: true,
      refreshInterval: 600,
    },
    notifications: {
      branchReports: true,
      financialUpdates: true,
      systemAlerts: true,
      staffUpdates: true,
    },
    display: {
      itemsPerPage: 15,
      theme: 'system',
      language: 'en',
      timezone: 'EST',
    },
  },
  
  [USER_ROLES.BRANCH_PRINCIPAL]: {
    dashboard: {
      defaultView: 'branch_overview',
      showStatistics: true,
      refreshInterval: 300,
    },
    notifications: {
      attendanceAlerts: true,
      gradeSubmissions: true,
      parentCommunications: true,
      staffUpdates: true,
    },
    display: {
      itemsPerPage: 15,
      theme: 'light',
      language: 'en',
      timezone: 'EST',
    },
  },
  
  [USER_ROLES.TEACHER]: {
    dashboard: {
      defaultView: 'my_classes',
      showStatistics: false,
      refreshInterval: 900,
    },
    notifications: {
      assignmentSubmissions: true,
      parentMessages: true,
      meetingReminders: true,
      gradeDeadlines: true,
    },
    display: {
      itemsPerPage: 10,
      theme: 'light',
      language: 'en',
      timezone: 'EST',
    },
  },
  
  [USER_ROLES.STUDENT]: {
    dashboard: {
      defaultView: 'my_progress',
      showStatistics: false,
      refreshInterval: 1800,
    },
    notifications: {
      assignmentDue: true,
      gradeUpdates: true,
      examSchedules: true,
      announcements: true,
    },
    display: {
      itemsPerPage: 10,
      theme: 'system',
      language: 'en',
      timezone: 'EST',
    },
  },
  
  [USER_ROLES.PARENT]: {
    dashboard: {
      defaultView: 'children_overview',
      showStatistics: false,
      refreshInterval: 3600,
    },
    notifications: {
      childAttendance: true,
      gradeUpdates: true,
      feeReminders: true,
      schoolEvents: true,
    },
    display: {
      itemsPerPage: 10,
      theme: 'light',
      language: 'en',
      timezone: 'EST',
    },
  },
};

// System-wide configuration options
export const SYSTEM_CONFIGURATION = {
  platform: {
    maintenanceMode: false,
    allowRegistration: true,
    emailVerificationRequired: true,
    maxOrganizations: 100,
    defaultTrialDays: 30,
  },
  
  email: {
    provider: 'sendgrid',
    fromAddress: 'noreply@studenterp.com',
    fromName: 'Student ERP',
    templates: {
      welcome: 'welcome_template',
      passwordReset: 'password_reset_template',
      billing: 'billing_template',
    },
  },
  
  storage: {
    provider: 'aws_s3',
    maxFileSize: 10, // MB
    allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
    compressionEnabled: true,
  },
  
  backup: {
    enabled: true,
    frequency: 'daily',
    retentionDays: 30,
    cloudProvider: 'aws_s3',
  },
  
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 30, // minutes
    passwordResetExpiry: 24, // hours
    sessionCookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    },
  },
};

// Mock API functions
export const getOrganizationSettings = async (orgId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return ORGANIZATION_SETTINGS;
};

export const updateOrganizationSettings = async (orgId, settings) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return { success: true, message: 'Organization settings updated successfully' };
};

export const getBranchSettings = async (branchId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return BRANCH_SETTINGS;
};

export const updateBranchSettings = async (branchId, settings) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return { success: true, message: 'Branch settings updated successfully' };
};

export const getUserPreferences = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Return preferences based on user role
  const userRole = USER_ROLES.ORGANIZATION_HEAD; // This would come from user context
  return USER_PREFERENCES_TEMPLATES[userRole] || USER_PREFERENCES_TEMPLATES[USER_ROLES.STUDENT];
};

export const updateUserPreferences = async (userId, preferences) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: 'User preferences updated successfully' };
};

export const getSystemConfiguration = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return SYSTEM_CONFIGURATION;
};

export const updateSystemConfiguration = async (config) => {
  await new Promise(resolve => setTimeout(resolve, 900));
  return { success: true, message: 'System configuration updated successfully' };
};

// Export default settings for quick access
export default {
  ORGANIZATION_SETTINGS,
  BRANCH_SETTINGS,
  USER_PREFERENCES_TEMPLATES,
  SYSTEM_CONFIGURATION,
}; 