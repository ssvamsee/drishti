import { USER_ROLES } from './constants';

// Define all possible permissions
export const PERMISSIONS = {
  // Organization Management
  MANAGE_ORGANIZATIONS: 'manage_organizations',
  VIEW_ORGANIZATIONS: 'view_organizations',
  
  // Branch Management
  MANAGE_BRANCHES: 'manage_branches',
  VIEW_BRANCHES: 'view_branches',
  
  // User Management
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  INVITE_USERS: 'invite_users',
  
  // Student Management
  MANAGE_STUDENTS: 'manage_students',
  VIEW_STUDENTS: 'view_students',
  IMPORT_STUDENTS: 'import_students',
  EXPORT_STUDENTS: 'export_students',
  
  // Attendance Management
  MANAGE_ATTENDANCE: 'manage_attendance',
  VIEW_ATTENDANCE: 'view_attendance',
  IMPORT_ATTENDANCE: 'import_attendance',
  MARK_ATTENDANCE: 'mark_attendance',
  
  // Exam & Marks Management
  MANAGE_EXAMS: 'manage_exams',
  VIEW_EXAMS: 'view_exams',
  MANAGE_MARKS: 'manage_marks',
  VIEW_MARKS: 'view_marks',
  IMPORT_MARKS: 'import_marks',
  GENERATE_REPORTS: 'generate_reports',
  
  // Fee Management
  MANAGE_FEES: 'manage_fees',
  VIEW_FEES: 'view_fees',
  PROCESS_PAYMENTS: 'process_payments',
  VIEW_PAYMENTS: 'view_payments',
  
  // Reports & Analytics
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  VIEW_ANALYTICS: 'view_analytics',
  
  // Settings
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_SETTINGS: 'view_settings',
  
  // Academic Management
  MANAGE_CLASSES: 'manage_classes',
  VIEW_CLASSES: 'view_classes',
  MANAGE_SUBJECTS: 'manage_subjects',
  
  // Communication
  SEND_NOTIFICATIONS: 'send_notifications',
  VIEW_NOTIFICATIONS: 'view_notifications',
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPERADMIN]: [
    // Platform management only - no operational/academic permissions
    PERMISSIONS.MANAGE_ORGANIZATIONS,
    PERMISSIONS.VIEW_ORGANIZATIONS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.SEND_NOTIFICATIONS,
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.ORGANIZATION_HEAD]: [
    PERMISSIONS.VIEW_ORGANIZATIONS,
    PERMISSIONS.MANAGE_BRANCHES,
    PERMISSIONS.VIEW_BRANCHES,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.INVITE_USERS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.EXPORT_STUDENTS,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.VIEW_PAYMENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.SEND_NOTIFICATIONS,
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.CENTRAL_OFFICE_OPERATOR]: [
    PERMISSIONS.VIEW_BRANCHES,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.INVITE_USERS,
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.IMPORT_STUDENTS,
    PERMISSIONS.EXPORT_STUDENTS,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.IMPORT_ATTENDANCE,
    PERMISSIONS.MANAGE_EXAMS,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.MANAGE_MARKS,
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.IMPORT_MARKS,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.MANAGE_SUBJECTS,
    PERMISSIONS.SEND_NOTIFICATIONS,
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.DEAN]: [
    PERMISSIONS.VIEW_BRANCHES,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.EXPORT_STUDENTS,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.VIEW_PAYMENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.BRANCH_PRINCIPAL]: [
    PERMISSIONS.MANAGE_USERS, // Within branch only
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.INVITE_USERS,
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.IMPORT_STUDENTS,
    PERMISSIONS.EXPORT_STUDENTS,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.IMPORT_ATTENDANCE,
    PERMISSIONS.MANAGE_EXAMS,
    PERMISSIONS.VIEW_EXAMS,
    PERMISSIONS.MANAGE_MARKS,
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.IMPORT_MARKS,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.MANAGE_FEES,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.PROCESS_PAYMENTS,
    PERMISSIONS.VIEW_PAYMENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_SETTINGS, // Branch settings only
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.MANAGE_SUBJECTS,
    PERMISSIONS.SEND_NOTIFICATIONS,
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.BRANCH_COMPUTER_OPERATOR]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.IMPORT_STUDENTS,
    PERMISSIONS.EXPORT_STUDENTS,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.IMPORT_ATTENDANCE,
    PERMISSIONS.MARK_ATTENDANCE,
    PERMISSIONS.MANAGE_MARKS,
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.IMPORT_MARKS,
    PERMISSIONS.MANAGE_FEES,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.PROCESS_PAYMENTS,
    PERMISSIONS.VIEW_PAYMENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.TEACHER]: [
    PERMISSIONS.VIEW_STUDENTS, // Assigned classes only
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.MARK_ATTENDANCE, // Assigned classes only
    PERMISSIONS.VIEW_EXAMS, // Assigned subjects only
    PERMISSIONS.MANAGE_MARKS, // Assigned subjects only
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.VIEW_CLASSES, // Assigned classes only
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.FINANCE_ADMIN]: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.MANAGE_FEES,
    PERMISSIONS.VIEW_FEES,
    PERMISSIONS.PROCESS_PAYMENTS,
    PERMISSIONS.VIEW_PAYMENTS,
    PERMISSIONS.VIEW_REPORTS, // Financial reports only
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_NOTIFICATIONS,
  ],
  
  [USER_ROLES.STUDENT]: [
    PERMISSIONS.VIEW_ATTENDANCE, // Own only
    PERMISSIONS.VIEW_EXAMS, // Own only
    PERMISSIONS.VIEW_MARKS, // Own only
    PERMISSIONS.VIEW_FEES, // Own only
    PERMISSIONS.VIEW_PAYMENTS, // Own only
    PERMISSIONS.VIEW_NOTIFICATIONS, // Own only
  ],
  
  [USER_ROLES.PARENT]: [
    PERMISSIONS.VIEW_ATTENDANCE, // Children only
    PERMISSIONS.VIEW_EXAMS, // Children only
    PERMISSIONS.VIEW_MARKS, // Children only
    PERMISSIONS.VIEW_FEES, // Children only
    PERMISSIONS.VIEW_PAYMENTS, // Children only
    PERMISSIONS.VIEW_NOTIFICATIONS, // Children only
  ],
};

// Permission checker functions
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

// Get all permissions for a role
export const getRolePermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || [];
};

// Check if user can access a specific resource based on context
export const canAccessResource = (user, permission, context = {}) => {
  if (!user || !hasPermission(user.role, permission)) {
    return false;
  }
  
  // Additional context-based checks
  switch (user.role) {
    case USER_ROLES.TEACHER:
      // Teachers can only access their assigned classes/subjects
      if (context.classId && user.assignedClasses) {
        return user.assignedClasses.includes(context.classId);
      }
      if (context.subjectId && user.assignedSubjects) {
        return user.assignedSubjects.includes(context.subjectId);
      }
      break;
      
    case USER_ROLES.STUDENT:
      // Students can only access their own data
      if (context.studentId) {
        return context.studentId === user.studentId;
      }
      break;
      
    case USER_ROLES.PARENT:
      // Parents can only access their children's data
      if (context.studentId && user.children) {
        return user.children.includes(context.studentId);
      }
      break;
      
    case USER_ROLES.BRANCH_PRINCIPAL:
    case USER_ROLES.BRANCH_COMPUTER_OPERATOR:
    case USER_ROLES.FINANCE_ADMIN:
      // Branch-level users can only access their branch data
      if (context.branchId) {
        return context.branchId === user.branchId;
      }
      break;
      
    case USER_ROLES.DEAN:
      // Dean can access multiple branches they oversee
      if (context.branchId && user.overseesBranches) {
        return user.overseesBranches.includes(context.branchId);
      }
      break;
      
    default:
      break;
  }
  
  return true;
};

// Navigation items with required permissions
export const getAccessibleNavigation = (userRole) => {
  const allNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "Home",
      permissions: [], // Everyone with access can see dashboard
    },
    {
      title: "Branches",
      href: "/branches",
      icon: "MapPin",
      permissions: [PERMISSIONS.MANAGE_BRANCHES, PERMISSIONS.VIEW_BRANCHES],
    },
    {
      title: "Students",
      href: "/students",
      icon: "GraduationCap",
      permissions: [PERMISSIONS.MANAGE_STUDENTS, PERMISSIONS.VIEW_STUDENTS],
    },
    {
      title: "Classes",
      href: "/classes",
      icon: "BookOpen",
      permissions: [PERMISSIONS.MANAGE_CLASSES, PERMISSIONS.VIEW_CLASSES],
    },
    {
      title: "Attendance",
      href: "/attendance",
      icon: "CheckSquare",
      permissions: [PERMISSIONS.MANAGE_ATTENDANCE, PERMISSIONS.VIEW_ATTENDANCE, PERMISSIONS.MARK_ATTENDANCE],
    },
    {
      title: "Exams",
      href: "/exams",
      icon: "Award",
      permissions: [PERMISSIONS.MANAGE_EXAMS, PERMISSIONS.VIEW_EXAMS],
    },
    {
      title: "Marks",
      href: "/marks",
      icon: "TrendingUp",
      permissions: [PERMISSIONS.MANAGE_MARKS, PERMISSIONS.VIEW_MARKS],
    },
    {
      title: "Fees",
      href: "/fees",
      icon: "CreditCard",
      permissions: [PERMISSIONS.MANAGE_FEES, PERMISSIONS.VIEW_FEES, PERMISSIONS.PROCESS_PAYMENTS],
    },
    {
      title: "Reports",
      href: "/reports",
      icon: "BarChart3",
      permissions: [PERMISSIONS.VIEW_REPORTS, PERMISSIONS.VIEW_ANALYTICS],
    },
    {
      title: "Assignments",
      href: "/assignments",
      icon: "BookOpen",
      permissions: [PERMISSIONS.VIEW_MARKS, PERMISSIONS.MANAGE_MARKS], // Students and teachers can view assignments
    },
    {
      title: "Profile",
      href: "/profile",
      icon: "User",
      permissions: [PERMISSIONS.VIEW_ATTENDANCE], // Students and parents can view profile
        },
    {
      title: "Organizations",
      href: "/organizations",
      icon: "Building2",
      permissions: [PERMISSIONS.MANAGE_ORGANIZATIONS], // Superadmin only
    },
    {
      title: "Users",
      href: "/users",
      icon: "Users",
      permissions: [PERMISSIONS.MANAGE_ORGANIZATIONS], // Superadmin only
    },
    {
      title: "Billing",
      href: "/billing",
      icon: "CreditCard",
      permissions: [PERMISSIONS.MANAGE_ORGANIZATIONS], // Superadmin only
    },
    {
      title: "Monitoring",
      href: "/monitoring",
      icon: "Activity",
      permissions: [PERMISSIONS.MANAGE_ORGANIZATIONS], // Superadmin only
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: "BarChart3",
      permissions: [PERMISSIONS.MANAGE_ORGANIZATIONS], // Superadmin only
    },
    {
      title: "Support",
      href: "/support",
      icon: "HelpCircle",
      permissions: [PERMISSIONS.MANAGE_ORGANIZATIONS], // Superadmin only
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "Settings",
      permissions: [PERMISSIONS.MANAGE_SETTINGS, PERMISSIONS.VIEW_SETTINGS],
    },
  ];
  
  return allNavItems.filter(item => {
    if (item.permissions.length === 0) return true; // Dashboard accessible to all
    return hasAnyPermission(userRole, item.permissions);
  });
}; 