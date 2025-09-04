import * as yup from "yup";
import { VALIDATION_MESSAGES } from "./constants";

// Common validation patterns
const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Authentication Schemas
export const loginSchema = yup.object({
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED),
  password: yup
    .string()
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
    .required(VALIDATION_MESSAGES.REQUIRED),
  tenantId: yup.string(),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
    .matches(passwordRegex, "Password must contain uppercase, lowercase, and number")
    .required(VALIDATION_MESSAGES.REQUIRED),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], VALIDATION_MESSAGES.PASSWORD_MATCH)
    .required(VALIDATION_MESSAGES.REQUIRED),
});

// User Management Schemas
export const userSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED),
  phone: yup
    .string()
    .matches(phoneRegex, VALIDATION_MESSAGES.PHONE)
    .required(VALIDATION_MESSAGES.REQUIRED),
  role: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  branchId: yup.string().when("role", {
    is: (role) => ["branch_principal", "branch_computer_operator", "teacher"].includes(role),
    then: (schema) => schema.required("Branch is required for this role"),
    otherwise: (schema) => schema.nullable(),
  }),
  dateOfBirth: yup
    .date()
    .max(new Date(), VALIDATION_MESSAGES.DATE_FUTURE)
    .required(VALIDATION_MESSAGES.REQUIRED),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required(VALIDATION_MESSAGES.REQUIRED),
  address: yup.object({
    street: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    city: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    state: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    zipCode: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    country: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  }),
});

// Student Management Schemas
export const studentSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  admissionNumber: yup
    .string()
    .min(3, "Admission number must be at least 3 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  dateOfBirth: yup
    .date()
    .max(new Date(), VALIDATION_MESSAGES.DATE_FUTURE)
    .required(VALIDATION_MESSAGES.REQUIRED),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required(VALIDATION_MESSAGES.REQUIRED),
  bloodGroup: yup
    .string()
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Please select a valid blood group"),
  classId: yup.string().required("Class is required"),
  section: yup.string().required("Section is required"),
  rollNumber: yup.string().required("Roll number is required"),
  parentContacts: yup.array().of(
    yup.object({
      type: yup
        .string()
        .oneOf(["father", "mother", "guardian"], "Please select a valid contact type")
        .required(VALIDATION_MESSAGES.REQUIRED),
      name: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
      phone: yup
        .string()
        .matches(phoneRegex, VALIDATION_MESSAGES.PHONE)
        .required(VALIDATION_MESSAGES.REQUIRED),
      email: yup.string().email(VALIDATION_MESSAGES.EMAIL),
      occupation: yup.string(),
    })
  ).min(1, "At least one parent contact is required"),
  address: yup.object({
    street: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    city: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    state: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    zipCode: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    country: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  }),
});

// Attendance Schemas
export const attendanceSchema = yup.object({
  classId: yup.string().required("Class is required"),
  date: yup.date().required("Date is required"),
  records: yup.array().of(
    yup.object({
      studentId: yup.string().required("Student ID is required"),
      status: yup
        .string()
        .oneOf(["present", "absent", "late", "excused"], "Please select a valid status")
        .required(VALIDATION_MESSAGES.REQUIRED),
      remarks: yup.string().max(200, "Remarks cannot exceed 200 characters"),
    })
  ).min(1, "At least one attendance record is required"),
});

// Exam Schemas
export const examSchema = yup.object({
  name: yup
    .string()
    .min(3, "Exam name must be at least 3 characters")
    .max(100, "Exam name cannot exceed 100 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  type: yup
    .string()
    .oneOf(["unit", "midterm", "final", "assignment", "project"], "Please select a valid exam type")
    .required(VALIDATION_MESSAGES.REQUIRED),
  academicYear: yup.string().required("Academic year is required"),
  classes: yup.array().of(yup.string()).min(1, "At least one class must be selected"),
  subjects: yup.array().of(
    yup.object({
      subjectCode: yup.string().required("Subject code is required"),
      subjectName: yup.string().required("Subject name is required"),
      maxMarks: yup
        .number()
        .positive("Max marks must be positive")
        .integer("Max marks must be an integer")
        .required(VALIDATION_MESSAGES.REQUIRED),
      passingMarks: yup
        .number()
        .positive("Passing marks must be positive")
        .integer("Passing marks must be an integer")
        .max(yup.ref("maxMarks"), "Passing marks cannot exceed max marks")
        .required(VALIDATION_MESSAGES.REQUIRED),
      examDate: yup.date().required("Exam date is required"),
      duration: yup
        .number()
        .positive("Duration must be positive")
        .integer("Duration must be an integer")
        .required(VALIDATION_MESSAGES.REQUIRED),
    })
  ).min(1, "At least one subject must be added"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  weightage: yup
    .number()
    .positive("Weightage must be positive")
    .max(100, "Weightage cannot exceed 100%")
    .required(VALIDATION_MESSAGES.REQUIRED),
});

// Marks Schemas
export const marksSchema = yup.object({
  studentId: yup.string().required("Student ID is required"),
  examId: yup.string().required("Exam ID is required"),
  subjectCode: yup.string().required("Subject code is required"),
  marksObtained: yup
    .number()
    .min(0, "Marks cannot be negative")
    .required(VALIDATION_MESSAGES.REQUIRED),
  maxMarks: yup
    .number()
    .positive("Max marks must be positive")
    .required(VALIDATION_MESSAGES.REQUIRED),
  isAbsent: yup.boolean().default(false),
  remarks: yup.string().max(200, "Remarks cannot exceed 200 characters"),
});

// Fee Management Schemas
export const feeStructureSchema = yup.object({
  name: yup
    .string()
    .min(3, "Fee structure name must be at least 3 characters")
    .max(100, "Fee structure name cannot exceed 100 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  academicYear: yup.string().required("Academic year is required"),
  applicableClasses: yup.array().of(yup.string()).min(1, "At least one class must be selected"),
  components: yup.array().of(
    yup.object({
      type: yup
        .string()
        .oneOf(["tuition", "transport", "lab", "library", "sports", "other"], "Please select a valid fee type")
        .required(VALIDATION_MESSAGES.REQUIRED),
      amount: yup
        .number()
        .positive("Amount must be positive")
        .required(VALIDATION_MESSAGES.REQUIRED),
      isOptional: yup.boolean().default(false),
      frequency: yup
        .string()
        .oneOf(["monthly", "quarterly", "annually"], "Please select a valid frequency")
        .required(VALIDATION_MESSAGES.REQUIRED),
    })
  ).min(1, "At least one fee component must be added"),
  dueDate: yup.date().required("Due date is required"),
  lateFeePenalty: yup.object({
    type: yup
      .string()
      .oneOf(["fixed", "percentage"], "Please select a valid penalty type")
      .required(VALIDATION_MESSAGES.REQUIRED),
    amount: yup
      .number()
      .positive("Penalty amount must be positive")
      .required(VALIDATION_MESSAGES.REQUIRED),
    gracePeriod: yup
      .number()
      .min(0, "Grace period cannot be negative")
      .integer("Grace period must be an integer")
      .required(VALIDATION_MESSAGES.REQUIRED),
  }),
});

// Organization and Branch Schemas
export const organizationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Organization name must be at least 3 characters")
    .max(100, "Organization name cannot exceed 100 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  domain: yup
    .string()
    .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid domain")
    .required(VALIDATION_MESSAGES.REQUIRED),
  contactEmail: yup
    .string()
    .email(VALIDATION_MESSAGES.EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED),
  contactPhone: yup
    .string()
    .matches(phoneRegex, VALIDATION_MESSAGES.PHONE)
    .required(VALIDATION_MESSAGES.REQUIRED),
  address: yup.object({
    street: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    city: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    state: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    zipCode: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    country: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  }),
  license: yup.object({
    maxStudents: yup
      .number()
      .positive("Max students must be positive")
      .integer("Max students must be an integer")
      .required(VALIDATION_MESSAGES.REQUIRED),
    maxBranches: yup
      .number()
      .positive("Max branches must be positive")
      .integer("Max branches must be an integer")
      .required(VALIDATION_MESSAGES.REQUIRED),
    maxUsers: yup
      .number()
      .positive("Max users must be positive")
      .integer("Max users must be an integer")
      .required(VALIDATION_MESSAGES.REQUIRED),
    expiryDate: yup
      .date()
      .min(new Date(), "Expiry date must be in the future")
      .required(VALIDATION_MESSAGES.REQUIRED),
  }),
});

export const branchSchema = yup.object({
  name: yup
    .string()
    .min(3, "Branch name must be at least 3 characters")
    .max(100, "Branch name cannot exceed 100 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  code: yup
    .string()
    .min(2, "Branch code must be at least 2 characters")
    .max(10, "Branch code cannot exceed 10 characters")
    .matches(/^[A-Z0-9]+$/, "Branch code must contain only uppercase letters and numbers")
    .required(VALIDATION_MESSAGES.REQUIRED),
  principalId: yup.string().required("Principal is required"),
  contactEmail: yup
    .string()
    .email(VALIDATION_MESSAGES.EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED),
  contactPhone: yup
    .string()
    .matches(phoneRegex, VALIDATION_MESSAGES.PHONE)
    .required(VALIDATION_MESSAGES.REQUIRED),
  address: yup.object({
    street: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    city: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    state: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    zipCode: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
    country: yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  }),
});

// File Upload Validation
export const fileUploadSchema = yup.object({
  file: yup
    .mixed()
    .required("File is required")
    .test("fileSize", VALIDATION_MESSAGES.FILE_SIZE, (value) => {
      if (!value) return true;
      return value.size <= 10 * 1024 * 1024; // 10MB
    })
    .test("fileType", VALIDATION_MESSAGES.FILE_TYPE, (value) => {
      if (!value) return true;
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
      ];
      return allowedTypes.includes(value.type);
    }),
  mapping: yup.object().required("Column mapping is required"),
});

// Class and Section Schemas
export const classSchema = yup.object({
  name: yup
    .string()
    .min(2, "Class name must be at least 2 characters")
    .max(50, "Class name cannot exceed 50 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  section: yup
    .string()
    .min(1, "Section must be at least 1 character")
    .max(10, "Section cannot exceed 10 characters")
    .required(VALIDATION_MESSAGES.REQUIRED),
  academicYear: yup.string().required("Academic year is required"),
  classTeacherId: yup.string().required("Class teacher is required"),
  subjects: yup.array().of(
    yup.object({
      subjectCode: yup.string().required("Subject code is required"),
      subjectName: yup.string().required("Subject name is required"),
      teacherId: yup.string().required("Teacher is required"),
      credits: yup
        .number()
        .positive("Credits must be positive")
        .integer("Credits must be an integer")
        .required(VALIDATION_MESSAGES.REQUIRED),
    })
  ).min(1, "At least one subject must be added"),
  maxStrength: yup
    .number()
    .positive("Max strength must be positive")
    .integer("Max strength must be an integer")
    .required(VALIDATION_MESSAGES.REQUIRED),
});

// Settings Schema
export const settingsSchema = yup.object({
  academicYear: yup.string().required("Academic year is required"),
  currency: yup.string().required("Currency is required"),
  dateFormat: yup.string().required("Date format is required"),
  timeZone: yup.string().required("Time zone is required"),
  workingDays: yup.array().of(yup.string()).min(1, "At least one working day must be selected"),
  schoolHours: yup.object({
    start: yup.string().required("School start time is required"),
    end: yup.string().required("School end time is required"),
  }),
});

// Report Filters Schema
export const reportFiltersSchema = yup.object({
  reportType: yup.string().required("Report type is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  branchId: yup.string(),
  classId: yup.string(),
  studentId: yup.string(),
  format: yup
    .string()
    .oneOf(["pdf", "excel", "csv"], "Please select a valid format")
    .required("Export format is required"),
}); 