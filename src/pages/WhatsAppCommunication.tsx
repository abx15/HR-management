import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { mockCommunicationLogs, mockDepartments } from '@/data/mockData';
import { MessageSquare, Send, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

export default function WhatsAppCommunication() {
  const { toast } = useToast();
  const whatsappLogs = mockCommunicationLogs.filter(log => log.type === 'whatsapp');

  const handleSend = () => {
    toast({ title: "Message Sent", description: "WhatsApp message has been sent." });
  };

  return (
    <MainLayout>
      <div className="page-header">
        <h1 className="page-title">WhatsApp Communication</h1>
        <p className="page-subtitle">Send WhatsApp messages to employees</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-success" /> Compose Message
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
              <Label>Message</Label>
              <Textarea placeholder="Write your message..." className="min-h-[150px]" />
            </div>
            <Button onClick={handleSend} className="w-full gap-2 bg-success hover:bg-success/90">
              <Send className="w-4 h-4" /> Send WhatsApp
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Message History</h2>
          <div className="space-y-4">
            {whatsappLogs.map(log => (
              <div key={log.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-sm mb-2">{log.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">To: {log.recipients.join(', ')}</span>
                  <span className={cn("flex items-center gap-1 text-xs",
                    log.status === 'sent' ? "text-success" : "text-destructive"
                  )}>
                    {log.status === 'sent' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
