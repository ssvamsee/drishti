// Feature Management System for Organizations

// Define superadmin-specific features (platform management)
export const SUPERADMIN_FEATURES = {
  ORGANIZATION_MANAGEMENT: {
    id: 'ORGANIZATION_MANAGEMENT',
    name: 'Organization Management',
    description: 'Manage organizations, branches, and subscriptions',
    category: 'Platform',
    icon: 'Building2',
    routes: ['/organizations'],
    components: ['OrganizationManagement'],
  },
  
  USER_MANAGEMENT: {
    id: 'USER_MANAGEMENT',
    name: 'User Management',
    description: 'Manage system users and access controls',
    category: 'Platform',
    icon: 'Users',
    routes: ['/users'],
    components: ['UserManagement'],
  },
  
  BILLING_MANAGEMENT: {
    id: 'BILLING_MANAGEMENT',
    name: 'Billing & Subscriptions',
    description: 'Manage billing, payments, and subscription plans',
    category: 'Platform',
    icon: 'CreditCard',
    routes: ['/billing'],
    components: ['BillingManagement'],
  },
  
  SYSTEM_MONITORING: {
    id: 'SYSTEM_MONITORING',
    name: 'System Monitoring',
    description: 'Monitor system health, performance, and usage',
    category: 'Platform',
    icon: 'Activity',
    routes: ['/monitoring'],
    components: ['SystemMonitoring'],
  },
  
  FEATURE_MANAGEMENT: {
    id: 'FEATURE_MANAGEMENT',
    name: 'Feature Management',
    description: 'Manage features available to organizations',
    category: 'Platform',
    icon: 'Zap',
    routes: ['/features'],
    components: ['FeatureManagement'],
  },
  
  ANALYTICS_REPORTS: {
    id: 'ANALYTICS_REPORTS',
    name: 'Analytics & Reports',
    description: 'Platform-wide analytics and reporting',
    category: 'Platform',
    icon: 'BarChart3',
    routes: ['/analytics'],
    components: ['PlatformAnalytics'],
  },
  
  SUPPORT_MANAGEMENT: {
    id: 'SUPPORT_MANAGEMENT',
    name: 'Support Management',
    description: 'Manage customer support tickets and issues',
    category: 'Platform',
    icon: 'HelpCircle',
    routes: ['/support'],
    components: ['SupportManagement'],
  },
  
  SETTINGS_MANAGEMENT: {
    id: 'SETTINGS_MANAGEMENT',
    name: 'Platform Settings',
    description: 'Configure platform-wide settings and configurations',
    category: 'Platform',
    icon: 'Settings',
    routes: ['/settings'],
    components: ['PlatformSettings'],
  },
};

// Define organizational features (for schools/institutions)
export const AVAILABLE_FEATURES = {
  // Core Academic Features
  STUDENT_MANAGEMENT: {
    id: 'STUDENT_MANAGEMENT',
    name: 'Student Management',
    description: 'Manage student enrollment, profiles, and academic records',
    category: 'Academic',
    icon: 'Users',
    permissions: ['VIEW_STUDENTS', 'MANAGE_STUDENTS'],
    routes: ['/students', '/profile'],
    components: ['StudentDashboard', 'StudentProfile'],
  },
  
  BRANCH_MANAGEMENT: {
    id: 'BRANCH_MANAGEMENT',
    name: 'Branch Management',
    description: 'Manage organization branches, locations, and branch administration',
    category: 'Administrative',
    icon: 'MapPin',
    permissions: ['VIEW_BRANCHES', 'MANAGE_BRANCHES'],
    routes: ['/branches'],
    components: ['BranchManagement', 'BranchDashboard'],
  },
  
  ATTENDANCE_MANAGEMENT: {
    id: 'ATTENDANCE_MANAGEMENT',
    name: 'Attendance Management',
    description: 'Track and manage student attendance records',
    category: 'Academic',
    icon: 'CheckSquare',
    permissions: ['VIEW_ATTENDANCE', 'MANAGE_ATTENDANCE'],
    routes: ['/attendance'],
    components: ['AttendanceManagement'],
  },
  
  MARKS_GRADES_MANAGEMENT: {
    id: 'MARKS_GRADES_MANAGEMENT',
    name: 'Marks & Grades Management',
    description: 'Manage student marks, grades, and report cards',
    category: 'Academic',
    icon: 'Award',
    permissions: ['VIEW_MARKS', 'MANAGE_MARKS'],
    routes: ['/marks', '/marks/import'],
    components: ['MarksManagement', 'MarksImport'],
  },
  
  ASSIGNMENT_MANAGEMENT: {
    id: 'ASSIGNMENT_MANAGEMENT',
    name: 'Assignment Management',
    description: 'Create and manage assignments and homework',
    category: 'Academic',
    icon: 'BookOpen',
    permissions: ['VIEW_ASSIGNMENTS', 'MANAGE_ASSIGNMENTS'],
    routes: ['/assignments'],
    components: ['AssignmentManagement'],
  },
  
  EXAM_MANAGEMENT: {
    id: 'EXAM_MANAGEMENT',
    name: 'Exam Management',
    description: 'Schedule and manage examinations',
    category: 'Academic',
    icon: 'FileText',
    permissions: ['VIEW_EXAMS', 'MANAGE_EXAMS'],
    routes: ['/exams'],
    components: ['ExamManagement'],
  },
  
  // Financial Features
  FEES_MANAGEMENT: {
    id: 'FEES_MANAGEMENT',
    name: 'Fees Management',
    description: 'Manage fee structures and payment processing',
    category: 'Financial',
    icon: 'CreditCard',
    permissions: ['VIEW_FEES', 'MANAGE_FEES'],
    routes: ['/fees'],
    components: ['FeesManagement'],
  },
  
  FINANCIAL_REPORTS: {
    id: 'FINANCIAL_REPORTS',
    name: 'Financial Reports',
    description: 'Generate financial reports and analytics',
    category: 'Financial',
    icon: 'BarChart3',
    permissions: ['VIEW_FINANCIAL_REPORTS'],
    routes: ['/reports/financial'],
    components: ['FinancialReports'],
  },
  
  PAYMENT_PROCESSING: {
    id: 'PAYMENT_PROCESSING',
    name: 'Payment Processing',
    description: 'Process online payments and transactions',
    category: 'Financial',
    icon: 'DollarSign',
    permissions: ['PROCESS_PAYMENTS'],
    routes: ['/payments'],
    components: ['PaymentProcessing'],
  },
  
  // Communication Features
  PARENT_COMMUNICATION: {
    id: 'PARENT_COMMUNICATION',
    name: 'Parent Communication',
    description: 'Communication tools for parents and teachers',
    category: 'Communication',
    icon: 'MessageCircle',
    permissions: ['VIEW_COMMUNICATIONS', 'SEND_COMMUNICATIONS'],
    routes: ['/communications'],
    components: ['ParentCommunication'],
  },
  
  NOTIFICATIONS: {
    id: 'NOTIFICATIONS',
    name: 'Notifications',
    description: 'Send notifications and announcements',
    category: 'Communication',
    icon: 'Bell',
    permissions: ['VIEW_NOTIFICATIONS', 'SEND_NOTIFICATIONS'],
    routes: ['/notifications'],
    components: ['NotificationSystem'],
  },
  
  SMS_INTEGRATION: {
    id: 'SMS_INTEGRATION',
    name: 'SMS Integration',
    description: 'Send SMS notifications to parents and students',
    category: 'Communication',
    icon: 'Phone',
    permissions: ['SEND_SMS'],
    routes: ['/sms'],
    components: ['SMSIntegration'],
  },
  
  // Administrative Features
  TEACHER_MANAGEMENT: {
    id: 'TEACHER_MANAGEMENT',
    name: 'Teacher Management',
    description: 'Manage teacher profiles and assignments',
    category: 'Administrative',
    icon: 'UserCheck',
    permissions: ['VIEW_TEACHERS', 'MANAGE_TEACHERS'],
    routes: ['/teachers'],
    components: ['TeacherManagement'],
  },
  
  CLASS_MANAGEMENT: {
    id: 'CLASS_MANAGEMENT',
    name: 'Class Management',
    description: 'Manage classes, sections, and timetables',
    category: 'Administrative',
    icon: 'Calendar',
    permissions: ['VIEW_CLASSES', 'MANAGE_CLASSES'],
    routes: ['/classes'],
    components: ['ClassManagement'],
  },
  
  TIMETABLE_MANAGEMENT: {
    id: 'TIMETABLE_MANAGEMENT',
    name: 'Timetable Management',
    description: 'Create and manage class timetables',
    category: 'Administrative',
    icon: 'Clock',
    permissions: ['VIEW_TIMETABLE', 'MANAGE_TIMETABLE'],
    routes: ['/timetable'],
    components: ['TimetableManagement'],
  },
  
  // Library Features
  LIBRARY_MANAGEMENT: {
    id: 'LIBRARY_MANAGEMENT',
    name: 'Library Management',
    description: 'Manage library books and student borrowing',
    category: 'Library',
    icon: 'Book',
    permissions: ['VIEW_LIBRARY', 'MANAGE_LIBRARY'],
    routes: ['/library'],
    components: ['LibraryManagement'],
  },
  
  // Transport Features
  TRANSPORT_MANAGEMENT: {
    id: 'TRANSPORT_MANAGEMENT',
    name: 'Transport Management',
    description: 'Manage school transport and routes',
    category: 'Transport',
    icon: 'Bus',
    permissions: ['VIEW_TRANSPORT', 'MANAGE_TRANSPORT'],
    routes: ['/transport'],
    components: ['TransportManagement'],
  },
  
  // Health Features
  HEALTH_RECORDS: {
    id: 'HEALTH_RECORDS',
    name: 'Health Records',
    description: 'Maintain student health and medical records',
    category: 'Health',
    icon: 'Heart',
    permissions: ['VIEW_HEALTH_RECORDS', 'MANAGE_HEALTH_RECORDS'],
    routes: ['/health'],
    components: ['HealthRecords'],
  },
  
  // Inventory Features
  INVENTORY_MANAGEMENT: {
    id: 'INVENTORY_MANAGEMENT',
    name: 'Inventory Management',
    description: 'Manage school inventory and supplies',
    category: 'Inventory',
    icon: 'Package',
    permissions: ['VIEW_INVENTORY', 'MANAGE_INVENTORY'],
    routes: ['/inventory'],
    components: ['InventoryManagement'],
  },
  
  // Reporting Features
  ACADEMIC_REPORTS: {
    id: 'ACADEMIC_REPORTS',
    name: 'Academic Reports',
    description: 'Generate academic performance reports',
    category: 'Reports',
    icon: 'FileBarChart',
    permissions: ['VIEW_ACADEMIC_REPORTS'],
    routes: ['/reports/academic'],
    components: ['AcademicReports'],
  },
  
  ATTENDANCE_REPORTS: {
    id: 'ATTENDANCE_REPORTS',
    name: 'Attendance Reports',
    description: 'Generate attendance reports and analytics',
    category: 'Reports',
    icon: 'BarChart2',
    permissions: ['VIEW_ATTENDANCE_REPORTS'],
    routes: ['/reports/attendance'],
    components: ['AttendanceReports'],
  },
  
  CUSTOM_REPORTS: {
    id: 'CUSTOM_REPORTS',
    name: 'Custom Reports',
    description: 'Create custom reports with flexible parameters',
    category: 'Reports',
    icon: 'PieChart',
    permissions: ['VIEW_CUSTOM_REPORTS', 'CREATE_CUSTOM_REPORTS'],
    routes: ['/reports/custom'],
    components: ['CustomReports'],
  },
};

// Feature Categories
export const FEATURE_CATEGORIES = {
  Platform: { name: 'Platform Management', color: 'slate', icon: 'Server' },
  Academic: { name: 'Academic Management', color: 'blue', icon: 'GraduationCap' },
  Financial: { name: 'Financial Management', color: 'green', icon: 'DollarSign' },
  Communication: { name: 'Communication', color: 'purple', icon: 'MessageCircle' },
  Administrative: { name: 'Administrative', color: 'orange', icon: 'Settings' },
  Library: { name: 'Library Management', color: 'indigo', icon: 'Book' },
  Transport: { name: 'Transport Management', color: 'yellow', icon: 'Bus' },
  Health: { name: 'Health Management', color: 'red', icon: 'Heart' },
  Inventory: { name: 'Inventory Management', color: 'gray', icon: 'Package' },
  Reports: { name: 'Reports & Analytics', color: 'cyan', icon: 'BarChart3' },
};

// Default feature packages for different subscription tiers
export const FEATURE_PACKAGES = {
  BASIC: {
    name: 'Basic Package',
    description: 'Essential features for small schools',
    features: [
      'STUDENT_MANAGEMENT',
      'ATTENDANCE_MANAGEMENT',
      'MARKS_GRADES_MANAGEMENT',
      'FEES_MANAGEMENT',
      'PARENT_COMMUNICATION',
      'NOTIFICATIONS',
      'ACADEMIC_REPORTS',
    ],
  },
  
  STANDARD: {
    name: 'Standard Package',
    description: 'Comprehensive features for medium schools',
    features: [
      'STUDENT_MANAGEMENT',
      'ATTENDANCE_MANAGEMENT',
      'MARKS_GRADES_MANAGEMENT',
      'ASSIGNMENT_MANAGEMENT',
      'EXAM_MANAGEMENT',
      'FEES_MANAGEMENT',
      'FINANCIAL_REPORTS',
      'PARENT_COMMUNICATION',
      'NOTIFICATIONS',
      'SMS_INTEGRATION',
      'TEACHER_MANAGEMENT',
      'CLASS_MANAGEMENT',
      'TIMETABLE_MANAGEMENT',
      'LIBRARY_MANAGEMENT',
      'ACADEMIC_REPORTS',
      'ATTENDANCE_REPORTS',
    ],
  },
  
  PREMIUM: {
    name: 'Premium Package',
    description: 'All features for large educational institutions',
    features: Object.keys(AVAILABLE_FEATURES),
  },
};

// Mock organization feature configurations
export const ORGANIZATION_FEATURES = {
  'tenant_001': {
    organizationName: 'ABC School Group',
    package: 'PREMIUM',
    enabledFeatures: [
      'STUDENT_MANAGEMENT',
      'BRANCH_MANAGEMENT',
      'ATTENDANCE_MANAGEMENT',
      'MARKS_GRADES_MANAGEMENT',
      'ASSIGNMENT_MANAGEMENT',
      'FEES_MANAGEMENT',
      'FINANCIAL_REPORTS',
      'PARENT_COMMUNICATION',
      'NOTIFICATIONS',
      'TEACHER_MANAGEMENT',
      'CLASS_MANAGEMENT',
      'ACADEMIC_REPORTS',
      'ATTENDANCE_REPORTS',
    ],
    customizations: {
      branding: {
        logo: '/assets/abc-school-logo.png',
        primaryColor: '#3B82F6',
        secondaryColor: '#1E40AF',
      },
      modules: {
        maxStudents: 15000,
        maxTeachers: 1000,
        maxBranches: 10,
      },
    },
  },
  
  'tenant_002': {
    organizationName: 'XYZ Education',
    package: 'STANDARD',
    enabledFeatures: [
      'STUDENT_MANAGEMENT',
      'ATTENDANCE_MANAGEMENT',
      'MARKS_GRADES_MANAGEMENT',
      'FEES_MANAGEMENT',
      'PARENT_COMMUNICATION',
      'NOTIFICATIONS',
      'TEACHER_MANAGEMENT',
      'CLASS_MANAGEMENT',
      'ACADEMIC_REPORTS',
    ],
    customizations: {
      branding: {
        logo: '/assets/xyz-education-logo.png',
        primaryColor: '#10B981',
        secondaryColor: '#059669',
      },
      modules: {
        maxStudents: 5000,
        maxTeachers: 300,
        maxBranches: 3,
      },
    },
  },
};

// Utility functions for feature management
export const isFeatureEnabled = (tenantId, featureId) => {
  const orgFeatures = ORGANIZATION_FEATURES[tenantId];
  if (!orgFeatures) return false;
  return orgFeatures.enabledFeatures.includes(featureId);
};

export const getEnabledFeatures = (tenantId) => {
  const orgFeatures = ORGANIZATION_FEATURES[tenantId];
  if (!orgFeatures) return [];
  
  return orgFeatures.enabledFeatures.map(featureId => ({
    ...AVAILABLE_FEATURES[featureId],
    enabled: true,
  }));
};

export const getFeaturesByCategory = (tenantId) => {
  const enabledFeatures = getEnabledFeatures(tenantId);
  const categorized = {};
  
  enabledFeatures.forEach(feature => {
    if (!categorized[feature.category]) {
      categorized[feature.category] = [];
    }
    categorized[feature.category].push(feature);
  });
  
  return categorized;
};

export const hasFeatureAccess = (tenantId, route) => {
  const enabledFeatures = getEnabledFeatures(tenantId);
  return enabledFeatures.some(feature => 
    feature.routes.some(featureRoute => route.startsWith(featureRoute))
  );
};

export const getFilteredNavigation = (tenantId, navigationItems) => {
  return navigationItems.filter(item => {
    // Always allow dashboard
    if (item.href === '/dashboard') return true;
    
    // Check if the route is enabled for this organization
    return hasFeatureAccess(tenantId, item.href);
  });
};

// Mock API functions for feature management
export const updateOrganizationFeatures = (tenantId, enabledFeatures) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (ORGANIZATION_FEATURES[tenantId]) {
        ORGANIZATION_FEATURES[tenantId].enabledFeatures = enabledFeatures;
      }
      resolve({
        success: true,
        message: 'Organization features updated successfully',
        data: ORGANIZATION_FEATURES[tenantId],
      });
    }, 1000);
  });
};

export const getOrganizationFeatures = (tenantId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ORGANIZATION_FEATURES[tenantId] || null,
      });
    }, 500);
  });
};

export const getAllOrganizationsFeatures = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: ORGANIZATION_FEATURES,
      });
    }, 800);
  });
}; 