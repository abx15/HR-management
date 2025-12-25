import { MainLayout } from '@/components/layout/MainLayout';
import { PayrollChart } from '@/components/dashboard/PayrollChart';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { monthlyPayrollData, departmentDistribution, attendanceTrend } from '@/data/mockData';

export default function Reports() {
  return (
    <MainLayout>
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-subtitle">Comprehensive workforce analytics and insights</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayrollChart data={monthlyPayrollData} />
        <DepartmentChart data={departmentDistribution} />
        <AttendanceChart data={attendanceTrend} />
      </div>
    </MainLayout>
  );
}
