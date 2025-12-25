import axios, { AxiosInstance, AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== Employee API ====================
export const employeeAPI = {
  // Get all employees
  getAll: async () => {
    try {
      const response = await apiClient.get('/employees');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  },

  // Get employee by ID
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch employee ${id}:`, error);
      throw error;
    }
  },

  // Create new employee
  create: async (data: any) => {
    try {
      const response = await apiClient.post('/employees', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create employee:', error);
      throw error;
    }
  },

  // Update employee
  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/employees/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update employee ${id}:`, error);
      throw error;
    }
  },

  // Delete employee
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete employee ${id}:`, error);
      throw error;
    }
  },

  // Search employees
  search: async (query: string) => {
    try {
      const response = await apiClient.get('/employees/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Failed to search employees:', error);
      throw error;
    }
  },
};

// ==================== Department API ====================
export const departmentAPI = {
  // Get all departments
  getAll: async () => {
    try {
      const response = await apiClient.get('/departments');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      throw error;
    }
  },

  // Get department by ID
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch department ${id}:`, error);
      throw error;
    }
  },

  // Create new department
  create: async (data: any) => {
    try {
      const response = await apiClient.post('/departments', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create department:', error);
      throw error;
    }
  },

  // Update department
  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/departments/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update department ${id}:`, error);
      throw error;
    }
  },

  // Delete department
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete department ${id}:`, error);
      throw error;
    }
  },
};

// ==================== Attendance API ====================
export const attendanceAPI = {
  // Get all attendance records
  getAll: async () => {
    try {
      const response = await apiClient.get('/attendance');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch attendance records:', error);
      throw error;
    }
  },

  // Get attendance by employee
  getByEmployee: async (employeeId: string) => {
    try {
      const response = await apiClient.get(`/attendance/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch attendance for employee ${employeeId}:`, error);
      throw error;
    }
  },

  // Mark attendance
  markAttendance: async (data: any) => {
    try {
      const response = await apiClient.post('/attendance', data);
      return response.data;
    } catch (error) {
      console.error('Failed to mark attendance:', error);
      throw error;
    }
  },

  // Update attendance
  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/attendance/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update attendance ${id}:`, error);
      throw error;
    }
  },
};

// ==================== Leave Request API ====================
export const leaveAPI = {
  // Get all leave requests
  getAll: async () => {
    try {
      const response = await apiClient.get('/leaves');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
      throw error;
    }
  },

  // Create leave request
  create: async (data: any) => {
    try {
      const response = await apiClient.post('/leaves', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create leave request:', error);
      throw error;
    }
  },

  // Update leave request
  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/leaves/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update leave request ${id}:`, error);
      throw error;
    }
  },

  // Approve leave
  approve: async (id: string) => {
    try {
      const response = await apiClient.put(`/leaves/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error(`Failed to approve leave ${id}:`, error);
      throw error;
    }
  },

  // Reject leave
  reject: async (id: string) => {
    try {
      const response = await apiClient.put(`/leaves/${id}/reject`);
      return response.data;
    } catch (error) {
      console.error(`Failed to reject leave ${id}:`, error);
      throw error;
    }
  },
};

// ==================== Payroll API ====================
export const payrollAPI = {
  // Get all payroll records
  getAll: async () => {
    try {
      const response = await apiClient.get('/payroll');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch payroll records:', error);
      throw error;
    }
  },

  // Get payroll by employee
  getByEmployee: async (employeeId: string) => {
    try {
      const response = await apiClient.get(`/payroll/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch payroll for employee ${employeeId}:`, error);
      throw error;
    }
  },

  // Process payroll
  process: async (data: any) => {
    try {
      const response = await apiClient.post('/payroll/process', data);
      return response.data;
    } catch (error) {
      console.error('Failed to process payroll:', error);
      throw error;
    }
  },

  // Update payroll
  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/payroll/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update payroll ${id}:`, error);
      throw error;
    }
  },

  // Export payroll
  export: async (filters?: any) => {
    try {
      const response = await apiClient.get('/payroll/export', { params: filters, responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error('Failed to export payroll:', error);
      throw error;
    }
  },
};

// ==================== Policy API ====================
export const policyAPI = {
  // Get all policies
  getAll: async () => {
    try {
      const response = await apiClient.get('/policies');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch policies:', error);
      throw error;
    }
  },

  // Get policy by ID
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/policies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch policy ${id}:`, error);
      throw error;
    }
  },

  // Create policy
  create: async (data: any) => {
    try {
      const response = await apiClient.post('/policies', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create policy:', error);
      throw error;
    }
  },

  // Update policy
  update: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/policies/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update policy ${id}:`, error);
      throw error;
    }
  },

  // Delete policy
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/policies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete policy ${id}:`, error);
      throw error;
    }
  },

  // Acknowledge policy
  acknowledge: async (id: string) => {
    try {
      const response = await apiClient.put(`/policies/${id}/acknowledge`);
      return response.data;
    } catch (error) {
      console.error(`Failed to acknowledge policy ${id}:`, error);
      throw error;
    }
  },
};

// ==================== Communication API ====================
export const communicationAPI = {
  // Send email
  sendEmail: async (data: any) => {
    try {
      const response = await apiClient.post('/communication/email', data);
      return response.data;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  },

  // Send WhatsApp
  sendWhatsApp: async (data: any) => {
    try {
      const response = await apiClient.post('/communication/whatsapp', data);
      return response.data;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  },

  // Get communication logs
  getLogs: async (type?: string) => {
    try {
      const response = await apiClient.get('/communication/logs', { params: { type } });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch communication logs:', error);
      throw error;
    }
  },
};

// ==================== Dashboard API ====================
export const dashboardAPI = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      throw error;
    }
  },

  // Get dashboard analytics
  getAnalytics: async () => {
    try {
      const response = await apiClient.get('/dashboard/analytics');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dashboard analytics:', error);
      throw error;
    }
  },

  // Get recent activity
  getRecentActivity: async () => {
    try {
      const response = await apiClient.get('/dashboard/activity');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch recent activity:', error);
      throw error;
    }
  },
};

// ==================== Reports API ====================
export const reportsAPI = {
  // Get payroll report
  getPayrollReport: async (filters?: any) => {
    try {
      const response = await apiClient.get('/reports/payroll', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch payroll report:', error);
      throw error;
    }
  },

  // Get attendance report
  getAttendanceReport: async (filters?: any) => {
    try {
      const response = await apiClient.get('/reports/attendance', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch attendance report:', error);
      throw error;
    }
  },

  // Get department report
  getDepartmentReport: async (filters?: any) => {
    try {
      const response = await apiClient.get('/reports/departments', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch department report:', error);
      throw error;
    }
  },

  // Export report
  export: async (reportType: string, format: string = 'csv') => {
    try {
      const response = await apiClient.get(`/reports/export`, {
        params: { type: reportType, format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Failed to export report:', error);
      throw error;
    }
  },
};

// ==================== Auth API ====================
export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      localStorage.removeItem('authToken');
      return { success: true };
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh');
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  },
};

export default apiClient;
