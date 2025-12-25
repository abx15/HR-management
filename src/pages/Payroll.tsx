import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockSalaries, mockUsers } from '@/data/mockData';
import { 
  Search, 
  Download, 
  DollarSign, 
  TrendingUp, 
  Clock,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from '@/components/dashboard/StatCard';
import { useToast } from '@/hooks/use-toast';

export default function Payroll() {
  const [search, setSearch] = useState('');
  const [monthFilter, setMonthFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const filteredSalaries = mockSalaries.filter(salary => {
    const matchesSearch = salary.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchesMonth = monthFilter === 'all' || `${salary.month}/${salary.year}` === monthFilter;
    const matchesStatus = statusFilter === 'all' || salary.status === statusFilter;
    return matchesSearch && matchesMonth && matchesStatus;
  });

  const totalPayroll = filteredSalaries.reduce((sum, s) => sum + s.netPay, 0);
  const paidCount = filteredSalaries.filter(s => s.status === 'Paid').length;
  const pendingCount = filteredSalaries.filter(s => s.status === 'Pending').length;

  const handleProcessPayroll = () => {
    toast({
      title: "Processing Payroll",
      description: "Payroll is being processed. This may take a few minutes.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting Report",
      description: "Your payroll report is being generated.",
    });
  };

  return (
    <MainLayout>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Payroll</h1>
          <p className="page-subtitle">Manage salary processing and payslips</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={handleProcessPayroll} className="gap-2">
            <DollarSign className="w-4 h-4" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Payroll"
          value={`$${totalPayroll.toLocaleString()}`}
          icon={DollarSign}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          title="Processed"
          value={paidCount}
          change={`${Math.round((paidCount / filteredSalaries.length) * 100)}% of total`}
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          change="Awaiting approval"
          changeType="neutral"
          icon={Clock}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by employee name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
            <SelectItem value="1/2024">Jan 2024</SelectItem>
            <SelectItem value="12/2023">Dec 2023</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Employee</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Period</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Earnings</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Deductions</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Net Pay</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary) => {
                const employee = mockUsers.find(u => u.id === salary.employeeId);
                const totalEarnings = salary.earnings.basic + salary.earnings.allowances + salary.earnings.bonus;
                const totalDeductions = salary.deductions.tax + salary.deductions.insurance + salary.deductions.other;
                
                return (
                  <tr key={salary.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
                          {employee?.profileImage ? (
                            <img src={employee.profileImage} alt={salary.employeeName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary font-medium">
                              {salary.employeeName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="font-medium">{salary.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      {new Date(salary.year, salary.month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-right text-success font-medium">
                      ${totalEarnings.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-destructive">
                      -${totalDeductions.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right font-bold">
                      ${salary.netPay.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        salary.status === 'Paid' && "bg-success/10 text-success",
                        salary.status === 'Pending' && "bg-warning/10 text-warning",
                        salary.status === 'Processing' && "bg-info/10 text-info"
                      )}>
                        {salary.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <FileText className="w-4 h-4" />
                        Payslip
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
