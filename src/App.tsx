import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import EmployeeForm from "./pages/EmployeeForm";
import Departments from "./pages/Departments";
import Payroll from "./pages/Payroll";
import Attendance from "./pages/Attendance";
import Policies from "./pages/Policies";
import EmailCommunication from "./pages/EmailCommunication";
import WhatsAppCommunication from "./pages/WhatsAppCommunication";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
            <Route path="/employees/new" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
            <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
            <Route path="/employees/:id/edit" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
            <Route path="/payroll" element={<ProtectedRoute allowedRoles={['ADMIN', 'HR']}><Payroll /></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
            <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
            <Route path="/communication/email" element={<ProtectedRoute allowedRoles={['ADMIN', 'HR']}><EmailCommunication /></ProtectedRoute>} />
            <Route path="/communication/whatsapp" element={<ProtectedRoute allowedRoles={['ADMIN', 'HR']}><WhatsAppCommunication /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute allowedRoles={['ADMIN', 'HR', 'MANAGER']}><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
