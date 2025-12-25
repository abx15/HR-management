/**
 * Mock Data Service Layer
 * Simulates API responses using mock data from mockData.ts
 * This layer can be easily replaced with real API calls when backend is ready
 */

import { mockUsers, mockDepartments, mockAttendance, mockLeaveRequests, mockPolicies, mockSalaries, mockCommunicationLogs, mockDashboardStats, mockPositions } from '@/data/mockData';
import { User, Department, Attendance, LeaveRequest, Policy, Salary, CommunicationLog } from '@/types';

// In-memory storage for CRUD operations (persists during session)
let users: User[] = [...mockUsers];
let departments: Department[] = [...mockDepartments];
let attendance: Attendance[] = [...mockAttendance];
let leaveRequests: LeaveRequest[] = [...mockLeaveRequests];
let policies: Policy[] = [...mockPolicies];
let salaries: Salary[] = [...mockSalaries];
let communicationLogs: CommunicationLog[] = [...mockCommunicationLogs];

// Helper function to simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ==================== Employee Service ====================
export const employeeService = {
  async getAll() {
    await delay();
    return users;
  },

  async getById(id: string) {
    await delay();
    const user = users.find(u => u.id === id);
    if (!user) throw new Error(`Employee with ID ${id} not found`);
    return user;
  },

  async create(data: Omit<User, 'id'>) {
    await delay();
    const newUser: User = {
      ...data,
      id: generateId(),
    };
    users.push(newUser);
    return newUser;
  },

  async update(id: string, data: Partial<User>) {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error(`Employee with ID ${id} not found`);
    users[index] = { ...users[index], ...data, id };
    return users[index];
  },

  async delete(id: string) {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error(`Employee with ID ${id} not found`);
    const deleted = users.splice(index, 1);
    return deleted[0];
  },

  async search(query: string) {
    await delay();
    const lowerQuery = query.toLowerCase();
    return users.filter(u =>
      u.name.toLowerCase().includes(lowerQuery) ||
      u.email.toLowerCase().includes(lowerQuery) ||
      u.department.toLowerCase().includes(lowerQuery)
    );
  },
};

// ==================== Department Service ====================
export const departmentService = {
  async getAll() {
    await delay();
    return departments;
  },

  async getById(id: string) {
    await delay();
    const dept = departments.find(d => d.id === id);
    if (!dept) throw new Error(`Department with ID ${id} not found`);
    return dept;
  },

  async create(data: Omit<Department, 'id'>) {
    await delay();
    const newDept: Department = {
      ...data,
      id: generateId(),
    };
    departments.push(newDept);
    return newDept;
  },

  async update(id: string, data: Partial<Department>) {
    await delay();
    const index = departments.findIndex(d => d.id === id);
    if (index === -1) throw new Error(`Department with ID ${id} not found`);
    departments[index] = { ...departments[index], ...data, id };
    return departments[index];
  },

  async delete(id: string) {
    await delay();
    const index = departments.findIndex(d => d.id === id);
    if (index === -1) throw new Error(`Department with ID ${id} not found`);
    const deleted = departments.splice(index, 1);
    return deleted[0];
  },
};

// ==================== Attendance Service ====================
export const attendanceService = {
  async getAll() {
    await delay();
    return attendance;
  },

  async getByEmployee(employeeId: string) {
    await delay();
    return attendance.filter(a => a.employeeId === employeeId);
  },

  async markAttendance(data: Omit<Attendance, 'id'>) {
    await delay();
    const newRecord: Attendance = {
      ...data,
      id: generateId(),
    };
    attendance.push(newRecord);
    return newRecord;
  },

  async update(id: string, data: Partial<Attendance>) {
    await delay();
    const index = attendance.findIndex(a => a.id === id);
    if (index === -1) throw new Error(`Attendance record with ID ${id} not found`);
    attendance[index] = { ...attendance[index], ...data, id };
    return attendance[index];
  },
};

// ==================== Leave Service ====================
export const leaveService = {
  async getAll() {
    await delay();
    return leaveRequests;
  },

  async create(data: Omit<LeaveRequest, 'id'>) {
    await delay();
    const newRequest: LeaveRequest = {
      ...data,
      id: generateId(),
      status: 'Pending',
    };
    leaveRequests.push(newRequest);
    return newRequest;
  },

  async update(id: string, data: Partial<LeaveRequest>) {
    await delay();
    const index = leaveRequests.findIndex(l => l.id === id);
    if (index === -1) throw new Error(`Leave request with ID ${id} not found`);
    leaveRequests[index] = { ...leaveRequests[index], ...data, id };
    return leaveRequests[index];
  },

  async approve(id: string) {
    await delay();
    return this.update(id, { status: 'Approved' });
  },

  async reject(id: string) {
    await delay();
    return this.update(id, { status: 'Rejected' });
  },
};

// ==================== Payroll Service ====================
export const payrollService = {
  async getAll() {
    await delay();
    return salaries;
  },

  async getByEmployee(employeeId: string) {
    await delay();
    return salaries.filter(s => s.employeeId === employeeId);
  },

  async process(data: any) {
    await delay();
    // Simulate processing payroll
    return {
      success: true,
      processed: data.employeeIds?.length || salaries.length,
      message: `Payroll processed successfully for ${data.employeeIds?.length || salaries.length} employees`,
    };
  },

  async update(id: string, data: Partial<Salary>) {
    await delay();
    const index = salaries.findIndex(s => s.id === id);
    if (index === -1) throw new Error(`Salary record with ID ${id} not found`);
    salaries[index] = { ...salaries[index], ...data, id };
    return salaries[index];
  },

  async export(filters?: any) {
    await delay();
    // Simulate CSV export
    const csv = 'id,employeeId,employeeName,month,year,netPay,status\n' +
      salaries.map(s => `${s.id},${s.employeeId},${s.employeeName},${s.month},${s.year},${s.netPay},${s.status}`).join('\n');
    return new Blob([csv], { type: 'text/csv' });
  },
};

// ==================== Policy Service ====================
export const policyService = {
  async getAll() {
    await delay();
    return policies;
  },

  async getById(id: string) {
    await delay();
    const policy = policies.find(p => p.id === id);
    if (!policy) throw new Error(`Policy with ID ${id} not found`);
    return policy;
  },

  async create(data: Omit<Policy, 'id'>) {
    await delay();
    const newPolicy: Policy = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
      acknowledgedBy: [],
    };
    policies.push(newPolicy);
    return newPolicy;
  },

  async update(id: string, data: Partial<Policy>) {
    await delay();
    const index = policies.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Policy with ID ${id} not found`);
    policies[index] = { ...policies[index], ...data, id };
    return policies[index];
  },

  async delete(id: string) {
    await delay();
    const index = policies.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Policy with ID ${id} not found`);
    const deleted = policies.splice(index, 1);
    return deleted[0];
  },

  async acknowledge(id: string, userId: string) {
    await delay();
    const policy = await this.getById(id);
    if (!policy.acknowledgedBy.includes(userId)) {
      policy.acknowledgedBy.push(userId);
    }
    return this.update(id, { acknowledgedBy: policy.acknowledgedBy });
  },
};

// ==================== Communication Service ====================
export const communicationService = {
  async sendEmail(data: any) {
    await delay();
    const newLog: CommunicationLog = {
      id: generateId(),
      type: 'email',
      recipients: data.recipients || [],
      message: data.message || '',
      subject: data.subject || '',
      status: 'sent',
      timestamp: new Date().toISOString(),
    };
    communicationLogs.push(newLog);
    return newLog;
  },

  async sendWhatsApp(data: any) {
    await delay();
    const newLog: CommunicationLog = {
      id: generateId(),
      type: 'whatsapp',
      recipients: data.recipients || [],
      message: data.message || '',
      status: 'sent',
      timestamp: new Date().toISOString(),
    };
    communicationLogs.push(newLog);
    return newLog;
  },

  async getLogs(type?: string) {
    await delay();
    if (type) {
      return communicationLogs.filter(log => log.type === type);
    }
    return communicationLogs;
  },
};

// ==================== Dashboard Service ====================
export const dashboardService = {
  async getStats() {
    await delay();
    return mockDashboardStats;
  },

  async getAnalytics() {
    await delay();
    return {
      monthlyPayroll: [
        { month: 'Jan', amount: 380000 },
        { month: 'Feb', amount: 392000 },
        { month: 'Mar', amount: 398000 },
        { month: 'Apr', amount: 405000 },
        { month: 'May', amount: 410000 },
        { month: 'Jun', amount: 418000 },
      ],
      departmentDistribution: [
        { name: 'Engineering', value: 25, fill: 'hsl(217, 91%, 40%)' },
        { name: 'Sales', value: 18, fill: 'hsl(142, 76%, 36%)' },
        { name: 'Marketing', value: 12, fill: 'hsl(38, 92%, 50%)' },
      ],
      attendanceTrend: [
        { day: 'Mon', present: 76, absent: 6, late: 2 },
        { day: 'Tue', present: 78, absent: 4, late: 2 },
        { day: 'Wed', present: 75, absent: 7, late: 2 },
      ],
    };
  },

  async getRecentActivity() {
    await delay();
    return [
      { id: '1', type: 'leave_approved', description: 'Leave approved for David Kim', timestamp: '2024-01-15T10:30:00Z' },
      { id: '2', type: 'employee_added', description: 'New employee onboarded: Jane Smith', timestamp: '2024-01-14T14:20:00Z' },
      { id: '3', type: 'payroll_processed', description: 'Monthly payroll processed', timestamp: '2024-01-13T09:00:00Z' },
    ];
  },
};

// ==================== Auth Service ====================
export const authService = {
  async login(email: string, password: string) {
    await delay();
    const user = users.find(u => u.email === email);
    if (!user || password !== 'demo123') {
      throw new Error('Invalid credentials');
    }
    // Mock token generation
    const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
    localStorage.setItem('authToken', token);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async logout() {
    await delay();
    localStorage.removeItem('authToken');
    return { success: true };
  },

  async getCurrentUser() {
    await delay();
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');
    try {
      const decoded = JSON.parse(atob(token));
      const user = users.find(u => u.id === decoded.userId);
      if (!user) throw new Error('User not found');
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch {
      throw new Error('Invalid token');
    }
  },
};

// ==================== Reset Mock Data ====================
export const resetMockData = () => {
  users = [...mockUsers];
  departments = [...mockDepartments];
  attendance = [...mockAttendance];
  leaveRequests = [...mockLeaveRequests];
  policies = [...mockPolicies];
  salaries = [...mockSalaries];
  communicationLogs = [...mockCommunicationLogs];
};

export default {
  employeeService,
  departmentService,
  attendanceService,
  leaveService,
  payrollService,
  policyService,
  communicationService,
  dashboardService,
  authService,
  resetMockData,
};
