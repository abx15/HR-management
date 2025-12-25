import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockDepartments, mockPositions } from '@/data/mockData';
import { ArrowLeft, Save, Upload, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { employeeService } from '@/services/mockDataService';

export default function EmployeeForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = id && id !== 'new';

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    role: 'EMPLOYEE' as const,
    status: 'Active' as const,
    joiningDate: '',
    basicSalary: '',
    profileImage: '',
  });

  // Load employee data if editing
  useEffect(() => {
    if (isEditing && id) {
      loadEmployee(id);
    }
  }, [isEditing, id]);

  const loadEmployee = async (employeeId: string) => {
    try {
      setLoading(true);
      const employee = await employeeService.getById(employeeId);
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        role: employee.role,
        status: employee.status,
        joiningDate: employee.joiningDate,
        basicSalary: employee.salaryStructure?.basic?.toString() || '',
        profileImage: employee.profileImage || '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load employee data",
        variant: "destructive",
      });
      navigate('/employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.department || !formData.position || !formData.joiningDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        position: formData.position,
        role: formData.role,
        status: formData.status,
        joiningDate: formData.joiningDate,
        profileImage: formData.profileImage,
        salaryStructure: {
          basic: parseInt(formData.basicSalary) || 0,
          allowances: { housing: 0, transport: 0, medical: 0, other: 0 },
          deductions: { tax: 0, insurance: 0, other: 0 }
        }
      };

      if (isEditing && id) {
        await employeeService.update(id, submitData);
        toast({
          title: "Success",
          description: `${formData.name} has been updated successfully.`,
        });
      } else {
        await employeeService.create(submitData);
        toast({
          title: "Success",
          description: `${formData.name} has been added successfully.`,
        });
      }
      navigate('/employees');
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Failed to update employee" : "Failed to add employee",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="page-title">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h1>
          <p className="page-subtitle">
            {isEditing ? 'Update employee information' : 'Fill in the details to add a new team member'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-muted-foreground">
                    {formData.name.charAt(0) || '?'}
                  </span>
                )}
              </div>
              <div>
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date *</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleChange('joiningDate', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Work Info */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Work Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Department *</Label>
                <Select value={formData.department} onValueChange={(v) => handleChange('department', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDepartments.map(dept => (
                      <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Position *</Label>
                <Select value={formData.position} onValueChange={(v) => handleChange('position', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPositions.map(pos => (
                      <SelectItem key={pos.id} value={pos.title}>{pos.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select value={formData.role} onValueChange={(v) => handleChange('role', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Salary Info */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">Compensation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="basicSalary">Basic Salary (USD)</Label>
                <Input
                  id="basicSalary"
                  type="number"
                  value={formData.basicSalary}
                  onChange={(e) => handleChange('basicSalary', e.target.value)}
                  placeholder="5000"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="gap-2">
              {submitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? 'Update Employee' : 'Add Employee'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
