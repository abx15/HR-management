import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { mockCommunicationLogs, mockDepartments } from '@/data/mockData';
import { Mail, Send, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

export default function EmailCommunication() {
  const { toast } = useToast();
  const emailLogs = mockCommunicationLogs.filter(log => log.type === 'email');

  const handleSend = () => {
    toast({ title: "Email Sent", description: "Your email has been sent successfully." });
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h1 className="page-title">Email Communication</h1>
        <p className="page-subtitle">Send emails to employees and view communication logs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" /> Compose Email
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Recipients</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select recipients" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {mockDepartments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Email subject..." />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Write your message..." className="min-h-[150px]" />
            </div>
            <Button onClick={handleSend} className="w-full gap-2">
              <Send className="w-4 h-4" /> Send Email
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Emails</h2>
          <div className="space-y-4">
            {emailLogs.map(log => (
              <div key={log.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{log.subject}</span>
                  <span className={cn("flex items-center gap-1 text-xs",
                    log.status === 'sent' ? "text-success" : "text-destructive"
                  )}>
                    {log.status === 'sent' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {log.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
