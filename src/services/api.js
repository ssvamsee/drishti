import { QueryClient } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { TOAST_MESSAGES } from "../utils/constants";
import { toast } from "sonner";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

// Create QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.error("Mutation error:", error);
        toast.error(error?.message || TOAST_MESSAGES.ERROR.GENERIC);
      },
    },
  },
});

// Base fetch function with error handling
const fetchApi = async (endpoint, options = {}) => {
  const { getToken, logout } = useAuthStore.getState();
  
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);
    
    // Handle authentication errors
    if (response.status === 401) {
      logout();
      window.location.href = "/login";
      throw new Error(TOAST_MESSAGES.ERROR.UNAUTHORIZED);
    }

    // Handle other HTTP errors
    if (!response.ok) {
      let errorMessage = TOAST_MESSAGES.ERROR.GENERIC;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors
    if (!error.status) {
      error.message = TOAST_MESSAGES.ERROR.NETWORK;
    }
    throw error;
  }
};

// API Methods
export const api = {
  // GET request
  get: (endpoint, params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });
    
    const queryString = searchParams.toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return fetchApi(url);
  },

  // POST request
  post: (endpoint, data = {}) => {
    return fetchApi(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // PUT request
  put: (endpoint, data = {}) => {
    return fetchApi(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // PATCH request
  patch: (endpoint, data = {}) => {
    return fetchApi(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // DELETE request
  delete: (endpoint) => {
    return fetchApi(endpoint, {
      method: "DELETE",
    });
  },

  // File upload
  upload: (endpoint, formData) => {
    return fetchApi(endpoint, {
      method: "POST",
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  },

  // Download file
  download: async (endpoint, filename) => {
    const { getToken } = useAuthStore.getState();
    const token = getToken();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error("Download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

// Query Keys
export const queryKeys = {
  // Authentication
  auth: ["auth"],
  user: (userId) => ["user", userId],
  
  // Organizations and Branches
  organizations: ["organizations"],
  organization: (id) => ["organization", id],
  branches: (tenantId) => ["branches", tenantId],
  branch: (id) => ["branch", id],
  
  // Users
  users: (filters) => ["users", filters],
  userProfile: (id) => ["user-profile", id],
  
  // Students
  students: (filters) => ["students", filters],
  student: (id) => ["student", id],
  studentProfile: (id) => ["student-profile", id],
  
  // Classes and Subjects
  classes: (filters) => ["classes", filters],
  class: (id) => ["class", id],
  subjects: (classId) => ["subjects", classId],
  
  // Attendance
  attendance: (filters) => ["attendance", filters],
  attendanceRecord: (id) => ["attendance-record", id],
  attendanceStats: (filters) => ["attendance-stats", filters],
  
  // Exams and Marks
  exams: (filters) => ["exams", filters],
  exam: (id) => ["exam", id],
  marks: (filters) => ["marks", filters],
  studentMarks: (studentId, filters) => ["student-marks", studentId, filters],
  classMarks: (classId, examId) => ["class-marks", classId, examId],
  
  // Fees and Payments
  feeStructures: (filters) => ["fee-structures", filters],
  feeStructure: (id) => ["fee-structure", id],
  studentFees: (studentId, filters) => ["student-fees", studentId, filters],
  payments: (filters) => ["payments", filters],
  
  // Reports
  reports: (type, filters) => ["reports", type, filters],
  
  // Dashboard
  dashboardStats: (role, filters) => ["dashboard-stats", role, filters],
  
  // Settings
  settings: (tenantId) => ["settings", tenantId],
  branchSettings: (branchId) => ["branch-settings", branchId],
};

// Error Handlers
export const handleQueryError = (error, customMessage) => {
  console.error("Query error:", error);
  const message = customMessage || error?.message || TOAST_MESSAGES.ERROR.GENERIC;
  toast.error(message);
};

export const handleMutationSuccess = (data, successMessage) => {
  console.log("Mutation success:", data);
  if (successMessage) {
    toast.success(successMessage);
  }
};

// Utility function to invalidate related queries
export const invalidateQueries = (queryKey) => {
  return queryClient.invalidateQueries({ queryKey });
};

// Utility function to update query data
export const updateQueryData = (queryKey, updater) => {
  return queryClient.setQueryData(queryKey, updater);
};

// Optimistic update helper
export const optimisticUpdate = async (queryKey, updater, mutation) => {
  // Cancel outgoing refetches
  await queryClient.cancelQueries({ queryKey });
  
  // Snapshot previous value
  const previousData = queryClient.getQueryData(queryKey);
  
  // Optimistically update
  queryClient.setQueryData(queryKey, updater);
  
  try {
    // Perform mutation
    const result = await mutation();
    return result;
  } catch (error) {
    // Rollback on error
    queryClient.setQueryData(queryKey, previousData);
    throw error;
  }
};

export default api; 