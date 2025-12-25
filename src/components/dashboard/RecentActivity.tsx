import { LeaveRequest } from '@/types';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecentActivityProps {
  leaveRequests: LeaveRequest[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function RecentActivity({ leaveRequests, onApprove, onReject }: RecentActivityProps) {
  const pendingRequests = leaveRequests.filter(r => r.status === 'Pending').slice(0, 4);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Pending Leave Requests</h3>
        <span className="badge-pending">{pendingRequests.length} pending</span>
      </div>
      
      <div className="space-y-4">
        {pendingRequests.map((request) => (
          <div 
            key={request.id} 
            className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-foreground">{request.employeeName}</p>
                <p className="text-sm text-muted-foreground mt-1">{request.type} Leave</p>
              </div>
              <div className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                request.type === 'Sick' && "bg-destructive/10 text-destructive",
                request.type === 'Annual' && "bg-primary/10 text-primary",
                request.type === 'Personal' && "bg-warning/10 text-warning",
              )}>
                {request.type}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{request.startDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>to {request.endDate}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2 italic">"{request.reason}"</p>
            
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm" 
                onClick={() => onApprove?.(request.id)}
                className="bg-success hover:bg-success/90"
              >
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onReject?.(request.id)}
                className="text-destructive hover:bg-destructive/10"
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
        
        {pendingRequests.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No pending requests</p>
        )}
      </div>
    </div>
  );
}
