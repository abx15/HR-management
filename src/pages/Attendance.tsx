import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockAttendance, mockLeaveRequests, mockUsers } from '@/data/mockData';
import { 
  Search, 
  Download, 
  Calendar,
  Clock,
  UserCheck,
  UserMinus,
  Filter
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

export default function Attendance() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const filteredAttendance = mockAttendance.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const presentCount = mockAttendance.filter(a => a.status === 'Present').length;
  const absentCount = mockAttendance.filter(a => a.status === 'Absent').length;
  const lateCount = mockAttendance.filter(a => a.status === 'Late').length;

  const handleApproveLeave = (id: string) => {
    toast({
      title: "Leave Approved",
      description: "The leave request has been approved.",
    });
  };

  const handleRejectLeave = (id: string) => {
    toast({
      title: "Leave Rejected",
      description: "The leave request has been rejected.",
      variant: "destructive"
    });
  };

  return (
    <MainLayout>
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Attendance & Leave</h1>
          <p className="page-subtitle">Track employee attendance and manage leave requests</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Present Today"
          value={presentCount}
          icon={UserCheck}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          title="Absent"
          value={absentCount}
          icon={UserMinus}
          iconBg="bg-destructive/10"
          iconColor="text-destructive"
        />
        <StatCard
          title="Late Arrivals"
          value={lateCount}
          icon={Clock}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          title="Pending Leaves"
          value={mockLeaveRequests.filter(r => r.status === 'Pending').length}
          icon={Calendar}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Half Day">Half Day</SelectItem>
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
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Check In</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Check Out</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((record) => {
                    const employee = mockUsers.find(u => u.id === record.employeeId);
                    
                    return (
                      <tr key={record.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
                              {employee?.profileImage ? (
                                <img src={employee.profileImage} alt={record.employeeName} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary font-medium">
                                  {record.employeeName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <span className="font-medium">{record.employeeName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">{record.date}</td>
                        <td className="py-4 px-6 text-center">{record.checkIn || '-'}</td>
                        <td className="py-4 px-6 text-center">{record.checkOut || '-'}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            record.status === 'Present' && "bg-success/10 text-success",
                            record.status === 'Absent' && "bg-destructive/10 text-destructive",
                            record.status === 'Late' && "bg-warning/10 text-warning",
                            record.status === 'Half Day' && "bg-info/10 text-info"
                          )}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leaves">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Employee</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Duration</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Reason</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaveRequests.map((request) => {
                    const employee = mockUsers.find(u => u.id === request.employeeId);
                    
                    return (
                      <tr key={request.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
                              {employee?.profileImage ? (
                                <img src={employee.profileImage} alt={request.employeeName} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary font-medium">
                                  {request.employeeName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <span className="font-medium">{request.employeeName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            request.type === 'Sick' && "bg-destructive/10 text-destructive",
                            request.type === 'Annual' && "bg-primary/10 text-primary",
                            request.type === 'Personal' && "bg-warning/10 text-warning"
                          )}>
                            {request.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">
                          {request.startDate} - {request.endDate}
                        </td>
                        <td className="py-4 px-6 text-muted-foreground max-w-xs truncate">
                          {request.reason}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            request.status === 'Approved' && "bg-success/10 text-success",
                            request.status === 'Pending' && "bg-warning/10 text-warning",
                            request.status === 'Rejected' && "bg-destructive/10 text-destructive"
                          )}>
                            {request.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {request.status === 'Pending' && (
                            <div className="flex justify-center gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleApproveLeave(request.id)}
                                className="bg-success hover:bg-success/90 h-8"
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRejectLeave(request.id)}
                                className="text-destructive hover:bg-destructive/10 h-8"
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
