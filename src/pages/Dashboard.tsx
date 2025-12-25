import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { PayrollChart } from '@/components/dashboard/PayrollChart';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { 
  mockDashboardStats, 
  monthlyPayrollData, 
  departmentDistribution, 
  attendanceTrend,
  mockLeaveRequests 
} from '@/data/mockData';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  UserPlus, 
  Clock, 
  DollarSign,
  TrendingUp 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { toast } = useToast();
  const stats = mockDashboardStats;

  const handleApprove = (id: string) => {
    toast({
      title: "Leave Approved",
      description: "The leave request has been approved successfully.",
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Leave Rejected",
      description: "The leave request has been rejected.",
      variant: "destructive"
    });
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's an overview of your workforce.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          change="+8 this month"
          changeType="positive"
          icon={Users}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          title="Active Employees"
          value={stats.activeEmployees}
          change={`${((stats.activeEmployees / stats.totalEmployees) * 100).toFixed(1)}% of total`}
          changeType="neutral"
          icon={UserCheck}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          title="On Leave"
          value={stats.onLeave}
          change={`${stats.pendingLeaves} pending requests`}
          changeType="neutral"
          icon={UserMinus}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          title="Total Payroll"
          value={`$${(stats.totalPayroll / 1000).toFixed(0)}K`}
          change="+2.5% from last month"
          changeType="positive"
          icon={DollarSign}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
      </div>

      {/* Second Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="New Hires"
          value={stats.newHires}
          change="This month"
          changeType="positive"
          icon={UserPlus}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          change="+1.2% from last week"
          changeType="positive"
          icon={Clock}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          title="Avg. Productivity"
          value="87%"
          change="+3% improvement"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PayrollChart data={monthlyPayrollData} />
        <DepartmentChart data={departmentDistribution} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart data={attendanceTrend} />
        <RecentActivity 
          leaveRequests={mockLeaveRequests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </MainLayout>
  );
}
