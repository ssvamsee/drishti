// Application Constants
export const APP_NAME = "Student ERP";
export const APP_VERSION = "1.0.0";

// User Roles
export const USER_ROLES = {
  SUPERADMIN: "superadmin",
  ORGANIZATION_HEAD: "organization_head",
  CENTRAL_OFFICE_OPERATOR: "central_office_operator",
  DEAN: "dean",
  BRANCH_PRINCIPAL: "branch_principal",
  BRANCH_COMPUTER_OPERATOR: "branch_computer_operator",
  TEACHER: "teacher",
  FINANCE_ADMIN: "finance_admin",
  STUDENT: "student",
  PARENT: "parent",
};

// Role Display Names
export const ROLE_NAMES = {
  [USER_ROLES.SUPERADMIN]: "Super Admin",
  [USER_ROLES.ORGANIZATION_HEAD]: "Organization Head",
  [USER_ROLES.CENTRAL_OFFICE_OPERATOR]: "Central Office Operator",
  [USER_ROLES.DEAN]: "Dean",
  [USER_ROLES.BRANCH_PRINCIPAL]: "Branch Principal",
  [USER_ROLES.BRANCH_COMPUTER_OPERATOR]: "Branch Computer Operator",
  [USER_ROLES.TEACHER]: "Teacher",
  [USER_ROLES.FINANCE_ADMIN]: "Finance Admin",
  [USER_ROLES.STUDENT]: "Student",
  [USER_ROLES.PARENT]: "Parent",
};

// Navigation Items with Role-based Access
export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "Home",
    roles: Object.values(USER_ROLES),
  },
  {
    title: "Organizations",
    href: "/organizations",
    icon: "Building2",
    roles: [USER_ROLES.SUPERADMIN],
  },
  {
    title: "Branches",
    href: "/branches",
    icon: "MapPin",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.DEAN,
    ],
  },
  {
    title: "Users",
    href: "/users",
    icon: "Users",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.BRANCH_PRINCIPAL,
    ],
  },
  {
    title: "Students",
    href: "/students",
    icon: "GraduationCap",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.DEAN,
      USER_ROLES.BRANCH_PRINCIPAL,
      USER_ROLES.BRANCH_COMPUTER_OPERATOR,
      USER_ROLES.TEACHER,
    ],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: "CheckSquare",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.DEAN,
      USER_ROLES.BRANCH_PRINCIPAL,
      USER_ROLES.BRANCH_COMPUTER_OPERATOR,
      USER_ROLES.TEACHER,
      USER_ROLES.STUDENT,
      USER_ROLES.PARENT,
    ],
  },
  {
    title: "Exams",
    href: "/exams",
    icon: "BookOpen",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.DEAN,
      USER_ROLES.BRANCH_PRINCIPAL,
      USER_ROLES.BRANCH_COMPUTER_OPERATOR,
      USER_ROLES.TEACHER,
    ],
  },
  {
    title: "Marks",
    href: "/marks",
    icon: "Award",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.DEAN,
      USER_ROLES.BRANCH_PRINCIPAL,
      USER_ROLES.BRANCH_COMPUTER_OPERATOR,
      USER_ROLES.TEACHER,
      USER_ROLES.STUDENT,
      USER_ROLES.PARENT,
    ],
  },
  {
    title: "Fees",
    href: "/fees",
    icon: "CreditCard",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.DEAN,
      USER_ROLES.BRANCH_PRINCIPAL,
      USER_ROLES.BRANCH_COMPUTER_OPERATOR,
      USER_ROLES.FINANCE_ADMIN,
      USER_ROLES.STUDENT,
      USER_ROLES.PARENT,
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "BarChart3",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.CENTRAL_OFFICE_OPERATOR,
      USER_ROLES.DEAN,
      USER_ROLES.BRANCH_PRINCIPAL,
      USER_ROLES.FINANCE_ADMIN,
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
    roles: [
      USER_ROLES.SUPERADMIN,
      USER_ROLES.ORGANIZATION_HEAD,
      USER_ROLES.BRANCH_PRINCIPAL,
    ],
  },
];

// Status Options
export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  ABSENT: "absent",
  LATE: "late",
  EXCUSED: "excused",
};

export const STUDENT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  GRADUATED: "graduated",
  TRANSFERRED: "transferred",
};

export const FEE_STATUS = {
  PENDING: "pending",
  PARTIAL: "partial",
  PAID: "paid",
  OVERDUE: "overdue",
  WAIVED: "waived",
};

export const EXAM_TYPES = {
  UNIT: "unit",
  MIDTERM: "midterm",
  FINAL: "final",
  ASSIGNMENT: "assignment",
  PROJECT: "project",
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  TENANTS: "/tenants",
  BRANCHES: "/branches",
  USERS: "/users",
  STUDENTS: "/students",
  ATTENDANCE: "/attendance",
  EXAMS: "/exams",
  MARKS: "/marks",
  FEES: "/fees",
  REPORTS: "/reports",
};

// File Upload Constants
export const UPLOAD_TYPES = {
  MARKS: "marks",
  ATTENDANCE: "attendance",
  STUDENTS: "students",
  DOCUMENTS: "documents",
};

export const ALLOWED_FILE_TYPES = {
  EXCEL: [".xlsx", ".xls"],
  CSV: [".csv"],
  PDF: [".pdf"],
  IMAGES: [".jpg", ".jpeg", ".png", ".gif"],
  DOCUMENTS: [".pdf", ".doc", ".docx"],
};

export const MAX_FILE_SIZE = {
  EXCEL: 10 * 1024 * 1024, // 10MB
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 20 * 1024 * 1024, // 20MB
};

// Theme Constants
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

// Chart Colors
export const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#00ff00",
  "#0088fe",
  "#ffbb28",
];

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  INPUT: "yyyy-MM-dd",
  FULL: "EEEE, MMMM do, yyyy",
  SHORT: "MM/dd/yyyy",
  TIME: "HH:mm",
  DATETIME: "MMM dd, yyyy HH:mm",
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_VISIBLE_PAGES: 5,
  SIZES: ['sm', 'default', 'lg']
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: "Please enter a valid email address",
  PHONE: "Please enter a valid phone number",
  PASSWORD_MIN: "Password must be at least 8 characters",
  PASSWORD_MATCH: "Passwords do not match",
  FILE_SIZE: "File size exceeds the limit",
  FILE_TYPE: "Invalid file type",
  DATE_FUTURE: "Date cannot be in the future",
  DATE_PAST: "Date cannot be in the past",
  NUMBER_MIN: "Value must be greater than 0",
  NUMBER_MAX: "Value exceeds the maximum limit",
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: "Welcome back!",
    LOGOUT: "Logged out successfully",
    SAVE: "Changes saved successfully",
    DELETE: "Item deleted successfully",
    UPLOAD: "File uploaded successfully",
    EXPORT: "Data exported successfully",
  },
  ERROR: {
    GENERIC: "Something went wrong. Please try again.",
    NETWORK: "Network error. Please check your connection.",
    LOGIN: "Invalid credentials. Please try again.",
    UNAUTHORIZED: "You don't have permission to perform this action.",
    FILE_UPLOAD: "Failed to upload file. Please try again.",
    VALIDATION: "Please fix the validation errors and try again.",
  },
  WARNING: {
    UNSAVED_CHANGES: "You have unsaved changes. Are you sure you want to leave?",
    DELETE_CONFIRM: "Are you sure you want to delete this item?",
    BULK_ACTION: "This action will affect multiple items. Continue?",
  },
  INFO: {
    LOADING: "Loading...",
    SAVING: "Saving changes...",
    PROCESSING: "Processing your request...",
    NO_DATA: "No data available",
  },
}; 