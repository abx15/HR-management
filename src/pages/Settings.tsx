import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const handleSave = () => toast({ title: "Settings Saved", description: "Your settings have been updated." });

  return (
    <MainLayout>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and application preferences</p>
      </div>
      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="WorkForce Inc." />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input defaultValue="hr@workforce.com" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Leave Request Alerts</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </MainLayout>
  );
}
