import { useParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { mockUsers, mockAttendance, mockSalaries } from '@/data/mockData';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Edit, 
  Briefcase,
  DollarSign,
  Clock,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const employee = mockUsers.find(u => u.id === id);
  
  if (!employee) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Employee Not Found</h2>
          <Link to="/employees">
            <Button>Back to Employees</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const employeeAttendance = mockAttendance.filter(a => a.employeeId === id);
  const employeeSalaries = mockSalaries.filter(s => s.employeeId === id);

  const totalEarnings = employee.salaryStructure 
    ? employee.salaryStructure.basic + 
      Object.values(employee.salaryStructure.allowances).reduce((a, b) => a + b, 0)
    : 0;
  
  const totalDeductions = employee.salaryStructure
    ? Object.values(employee.salaryStructure.deductions).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <MainLayout>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Header */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 overflow-hidden flex-shrink-0">
            {employee.profileImage ? (
              <img src={employee.profileImage} alt={employee.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary font-bold text-3xl">
                {employee.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{employee.name}</h1>
                <p className="text-lg text-muted-foreground">{employee.position}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    employee.status === 'Active' && "bg-success/10 text-success",
                    employee.status === 'On Leave' && "bg-warning/10 text-warning",
                    employee.status === 'Terminated' && "bg-muted text-muted-foreground"
                  )}>
                    {employee.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {employee.role}
                  </span>
                </div>
              </div>
              <Link to={`/employees/${id}/edit`}>
                <Button className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Contact Info
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{employee.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{employee.phone}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Work Info
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{employee.department}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Joined {employee.joiningDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Salary Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gross</span>
              <span className="text-sm font-medium">${totalEarnings.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deductions</span>
              <span className="text-sm font-medium text-destructive">-${totalDeductions.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm font-medium">Net Pay</span>
              <span className="text-lg font-bold text-success">${(totalEarnings - totalDeductions).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="attendance" className="bg-card rounded-xl border border-border">
        <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
          <TabsTrigger 
            value="attendance" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Attendance
          </TabsTrigger>
          <TabsTrigger 
            value="salary" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Salary History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Check In</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Check Out</th>
                </tr>
              </thead>
              <tbody>
                {employeeAttendance.map((record) => (
                  <tr key={record.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm">{record.date}</td>
                    <td className="py-3 px-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        record.status === 'Present' && "bg-success/10 text-success",
                        record.status === 'Absent' && "bg-destructive/10 text-destructive",
                        record.status === 'Late' && "bg-warning/10 text-warning",
                        record.status === 'Half Day' && "bg-info/10 text-info"
                      )}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.checkIn || '-'}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.checkOut || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="salary" className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Period</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Earnings</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Deductions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Net Pay</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeSalaries.map((salary) => (
                  <tr key={salary.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-sm">{`${salary.month}/${salary.year}`}</td>
                    <td className="py-3 px-4 text-sm text-success">
                      ${(salary.earnings.basic + salary.earnings.allowances + salary.earnings.bonus).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-destructive">
                      -${(salary.deductions.tax + salary.deductions.insurance + salary.deductions.other).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">${salary.netPay.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        salary.status === 'Paid' && "bg-success/10 text-success",
                        salary.status === 'Pending' && "bg-warning/10 text-warning",
                        salary.status === 'Processing' && "bg-info/10 text-info"
                      )}>
                        {salary.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
