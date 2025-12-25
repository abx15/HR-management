export type UserRole = 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half Day';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  position: string;
  status: EmployeeStatus;
  joiningDate: string;
  phone: string;
  profileImage?: string;
  salaryStructure?: SalaryStructure;
}

export interface SalaryStructure {
  basic: number;
  allowances: {
    housing: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    other: number;
  };
}

export interface Department {
  id: string;
  name: string;
  description: string;
  employeeCount: number;
}

export interface Position {
  id: string;
  title: string;
  department: string;
  permissions: string[];
}

export interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Personal' | 'Other';
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason: string;
}

export interface Policy {
  id: string;
  title: string;
  content: string;
  category: string;
  assignedTo: string[];
  createdAt: string;
  acknowledgedBy: string[];
}

export interface CommunicationLog {
  id: string;
  type: 'email' | 'whatsapp';
  recipients: string[];
  message: string;
  status: 'sent' | 'failed' | 'pending';
  timestamp: string;
  subject?: string;
}

export interface Salary {
  id: string;
  employeeId: string;
  employeeName: string;
  month: number;
  year: number;
  earnings: {
    basic: number;
    allowances: number;
    bonus: number;
  };
  deductions: {
    tax: number;
    insurance: number;
    other: number;
  };
  netPay: number;
  status: 'Paid' | 'Pending' | 'Processing';
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  newHires: number;
  pendingLeaves: number;
  totalPayroll: number;
  attendanceRate: number;
}
