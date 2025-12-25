import { User, Department, Position, Attendance, LeaveRequest, Policy, Salary, DashboardStats, CommunicationLog } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Anderson',
    email: 'john.anderson@company.com',
    role: 'ADMIN',
    department: 'Executive',
    position: 'Chief Executive Officer',
    status: 'Active',
    joiningDate: '2020-01-15',
    phone: '+1 (555) 123-4567',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    salaryStructure: {
      basic: 15000,
      allowances: { housing: 3000, transport: 1000, medical: 500, other: 500 },
      deductions: { tax: 3000, insurance: 500, other: 200 }
    }
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@company.com',
    role: 'HR',
    department: 'Human Resources',
    position: 'HR Director',
    status: 'Active',
    joiningDate: '2021-03-20',
    phone: '+1 (555) 234-5678',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    salaryStructure: {
      basic: 10000,
      allowances: { housing: 2000, transport: 800, medical: 400, other: 300 },
      deductions: { tax: 2000, insurance: 400, other: 150 }
    }
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'MANAGER',
    department: 'Engineering',
    position: 'Engineering Manager',
    status: 'Active',
    joiningDate: '2021-06-10',
    phone: '+1 (555) 345-6789',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    salaryStructure: {
      basic: 12000,
      allowances: { housing: 2500, transport: 900, medical: 450, other: 350 },
      deductions: { tax: 2500, insurance: 450, other: 180 }
    }
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'Active',
    joiningDate: '2022-01-05',
    phone: '+1 (555) 456-7890',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    salaryStructure: {
      basic: 8000,
      allowances: { housing: 1500, transport: 600, medical: 300, other: 200 },
      deductions: { tax: 1500, insurance: 300, other: 100 }
    }
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@company.com',
    role: 'EMPLOYEE',
    department: 'Marketing',
    position: 'Marketing Specialist',
    status: 'On Leave',
    joiningDate: '2022-04-15',
    phone: '+1 (555) 567-8901',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    salaryStructure: {
      basic: 6000,
      allowances: { housing: 1200, transport: 500, medical: 250, other: 150 },
      deductions: { tax: 1000, insurance: 250, other: 80 }
    }
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    role: 'EMPLOYEE',
    department: 'Finance',
    position: 'Financial Analyst',
    status: 'Active',
    joiningDate: '2022-07-20',
    phone: '+1 (555) 678-9012',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    salaryStructure: {
      basic: 7000,
      allowances: { housing: 1400, transport: 550, medical: 280, other: 170 },
      deductions: { tax: 1200, insurance: 280, other: 90 }
    }
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    role: 'MANAGER',
    department: 'Sales',
    position: 'Sales Manager',
    status: 'Active',
    joiningDate: '2021-09-01',
    phone: '+1 (555) 789-0123',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    salaryStructure: {
      basic: 11000,
      allowances: { housing: 2200, transport: 850, medical: 420, other: 330 },
      deductions: { tax: 2200, insurance: 420, other: 160 }
    }
  },
  {
    id: '8',
    name: 'Amanda Foster',
    email: 'amanda.foster@company.com',
    role: 'EMPLOYEE',
    department: 'Design',
    position: 'UI/UX Designer',
    status: 'Terminated',
    joiningDate: '2021-11-15',
    phone: '+1 (555) 890-1234',
    salaryStructure: {
      basic: 7500,
      allowances: { housing: 1500, transport: 600, medical: 300, other: 200 },
      deductions: { tax: 1400, insurance: 300, other: 100 }
    }
  }
];

export const mockDepartments: Department[] = [
  { id: '1', name: 'Executive', description: 'Executive leadership and strategic planning', employeeCount: 3 },
  { id: '2', name: 'Human Resources', description: 'Employee relations and talent management', employeeCount: 8 },
  { id: '3', name: 'Engineering', description: 'Product development and technical operations', employeeCount: 25 },
  { id: '4', name: 'Marketing', description: 'Brand management and growth initiatives', employeeCount: 12 },
  { id: '5', name: 'Finance', description: 'Financial planning and accounting', employeeCount: 10 },
  { id: '6', name: 'Sales', description: 'Revenue generation and client relations', employeeCount: 18 },
  { id: '7', name: 'Design', description: 'Product design and user experience', employeeCount: 8 },
];

export const mockPositions: Position[] = [
  { id: '1', title: 'Chief Executive Officer', department: 'Executive', permissions: ['all'] },
  { id: '2', title: 'HR Director', department: 'Human Resources', permissions: ['employees', 'payroll', 'policies'] },
  { id: '3', title: 'Engineering Manager', department: 'Engineering', permissions: ['employees.view', 'attendance'] },
  { id: '4', title: 'Senior Developer', department: 'Engineering', permissions: ['attendance.self', 'policies.view'] },
  { id: '5', title: 'Marketing Specialist', department: 'Marketing', permissions: ['attendance.self', 'policies.view'] },
  { id: '6', title: 'Financial Analyst', department: 'Finance', permissions: ['payroll.view', 'attendance.self'] },
  { id: '7', title: 'Sales Manager', department: 'Sales', permissions: ['employees.view', 'attendance'] },
  { id: '8', title: 'UI/UX Designer', department: 'Design', permissions: ['attendance.self', 'policies.view'] },
];

export const mockAttendance: Attendance[] = [
  { id: '1', employeeId: '1', employeeName: 'John Anderson', date: '2024-01-15', status: 'Present', checkIn: '08:45', checkOut: '17:30' },
  { id: '2', employeeId: '2', employeeName: 'Sarah Mitchell', date: '2024-01-15', status: 'Present', checkIn: '08:55', checkOut: '17:15' },
  { id: '3', employeeId: '3', employeeName: 'Michael Chen', date: '2024-01-15', status: 'Late', checkIn: '09:30', checkOut: '18:00' },
  { id: '4', employeeId: '4', employeeName: 'Emily Rodriguez', date: '2024-01-15', status: 'Present', checkIn: '08:50', checkOut: '17:20' },
  { id: '5', employeeId: '5', employeeName: 'David Kim', date: '2024-01-15', status: 'Absent' },
  { id: '6', employeeId: '6', employeeName: 'Lisa Thompson', date: '2024-01-15', status: 'Present', checkIn: '08:40', checkOut: '17:10' },
  { id: '7', employeeId: '7', employeeName: 'James Wilson', date: '2024-01-15', status: 'Half Day', checkIn: '08:45', checkOut: '13:00' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '5', employeeName: 'David Kim', type: 'Annual', startDate: '2024-01-15', endDate: '2024-01-20', status: 'Approved', reason: 'Family vacation' },
  { id: '2', employeeId: '4', employeeName: 'Emily Rodriguez', type: 'Sick', startDate: '2024-01-22', endDate: '2024-01-23', status: 'Pending', reason: 'Medical appointment' },
  { id: '3', employeeId: '6', employeeName: 'Lisa Thompson', type: 'Personal', startDate: '2024-01-25', endDate: '2024-01-25', status: 'Pending', reason: 'Personal errand' },
  { id: '4', employeeId: '3', employeeName: 'Michael Chen', type: 'Annual', startDate: '2024-02-01', endDate: '2024-02-05', status: 'Pending', reason: 'Travel plans' },
];

export const mockPolicies: Policy[] = [
  { id: '1', title: 'Code of Conduct', content: 'Professional behavior guidelines...', category: 'General', assignedTo: ['all'], createdAt: '2023-01-01', acknowledgedBy: ['1', '2', '3', '4'] },
  { id: '2', title: 'Remote Work Policy', content: 'Guidelines for remote work arrangements...', category: 'Work', assignedTo: ['Engineering', 'Design'], createdAt: '2023-06-15', acknowledgedBy: ['3', '4'] },
  { id: '3', title: 'Leave Policy', content: 'Annual leave, sick leave, and other absences...', category: 'HR', assignedTo: ['all'], createdAt: '2023-01-01', acknowledgedBy: ['1', '2', '3', '4', '5', '6'] },
  { id: '4', title: 'Data Security', content: 'Information security and data protection...', category: 'Security', assignedTo: ['all'], createdAt: '2023-03-20', acknowledgedBy: ['1', '2', '3'] },
];

export const mockSalaries: Salary[] = [
  { id: '1', employeeId: '1', employeeName: 'John Anderson', month: 12, year: 2023, earnings: { basic: 15000, allowances: 5000, bonus: 2000 }, deductions: { tax: 3000, insurance: 500, other: 200 }, netPay: 18300, status: 'Paid' },
  { id: '2', employeeId: '2', employeeName: 'Sarah Mitchell', month: 12, year: 2023, earnings: { basic: 10000, allowances: 3500, bonus: 1000 }, deductions: { tax: 2000, insurance: 400, other: 150 }, netPay: 11950, status: 'Paid' },
  { id: '3', employeeId: '3', employeeName: 'Michael Chen', month: 12, year: 2023, earnings: { basic: 12000, allowances: 4200, bonus: 1500 }, deductions: { tax: 2500, insurance: 450, other: 180 }, netPay: 14570, status: 'Paid' },
  { id: '4', employeeId: '4', employeeName: 'Emily Rodriguez', month: 1, year: 2024, earnings: { basic: 8000, allowances: 2600, bonus: 0 }, deductions: { tax: 1500, insurance: 300, other: 100 }, netPay: 8700, status: 'Pending' },
  { id: '5', employeeId: '5', employeeName: 'David Kim', month: 1, year: 2024, earnings: { basic: 6000, allowances: 2100, bonus: 0 }, deductions: { tax: 1000, insurance: 250, other: 80 }, netPay: 6770, status: 'Processing' },
];

export const mockCommunicationLogs: CommunicationLog[] = [
  { id: '1', type: 'email', recipients: ['all'], message: 'Monthly newsletter - January 2024', status: 'sent', timestamp: '2024-01-05T10:30:00Z', subject: 'Company Newsletter - January' },
  { id: '2', type: 'whatsapp', recipients: ['Engineering'], message: 'Team meeting reminder for tomorrow at 10 AM', status: 'sent', timestamp: '2024-01-14T16:00:00Z' },
  { id: '3', type: 'email', recipients: ['john.anderson@company.com'], message: 'Your leave request has been approved', status: 'sent', timestamp: '2024-01-10T09:15:00Z', subject: 'Leave Request Approved' },
  { id: '4', type: 'whatsapp', recipients: ['Sales'], message: 'Q1 targets have been updated. Check your dashboard.', status: 'failed', timestamp: '2024-01-12T11:00:00Z' },
];

export const mockDashboardStats: DashboardStats = {
  totalEmployees: 84,
  activeEmployees: 78,
  onLeave: 5,
  newHires: 8,
  pendingLeaves: 3,
  totalPayroll: 425000,
  attendanceRate: 94.5
};

export const monthlyPayrollData = [
  { month: 'Jan', amount: 380000 },
  { month: 'Feb', amount: 392000 },
  { month: 'Mar', amount: 398000 },
  { month: 'Apr', amount: 405000 },
  { month: 'May', amount: 410000 },
  { month: 'Jun', amount: 418000 },
  { month: 'Jul', amount: 420000 },
  { month: 'Aug', amount: 422000 },
  { month: 'Sep', amount: 425000 },
  { month: 'Oct', amount: 428000 },
  { month: 'Nov', amount: 430000 },
  { month: 'Dec', amount: 435000 },
];

export const departmentDistribution = [
  { name: 'Engineering', value: 25, fill: 'hsl(217, 91%, 40%)' },
  { name: 'Sales', value: 18, fill: 'hsl(142, 76%, 36%)' },
  { name: 'Marketing', value: 12, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Finance', value: 10, fill: 'hsl(199, 89%, 48%)' },
  { name: 'HR', value: 8, fill: 'hsl(280, 70%, 50%)' },
  { name: 'Design', value: 8, fill: 'hsl(340, 80%, 55%)' },
  { name: 'Executive', value: 3, fill: 'hsl(215, 20%, 45%)' },
];

export const attendanceTrend = [
  { day: 'Mon', present: 76, absent: 6, late: 2 },
  { day: 'Tue', present: 78, absent: 4, late: 2 },
  { day: 'Wed', present: 75, absent: 7, late: 2 },
  { day: 'Thu', present: 79, absent: 3, late: 2 },
  { day: 'Fri', present: 72, absent: 8, late: 4 },
];
