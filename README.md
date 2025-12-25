# WorkForce Management System

A comprehensive, modern workforce management system built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**. This application provides complete employee management, payroll, attendance, and HR operations with a clean, professional UI.

## 🎯 Features

### Core Functionality
- **Employee Management** - Create, read, update, and delete employee records with complete CRUD operations
- **Department Management** - Organize employees into departments with full management capabilities
- **Attendance Tracking** - Monitor employee attendance, mark check-in/check-out, and track absences
- **Leave Management** - Submit, approve, and manage employee leave requests
- **Payroll Management** - Process payroll, manage salaries, and generate salary slips
- **Policy Management** - Create and manage company policies with employee acknowledgment tracking
- **Communication Tools** - Send emails and WhatsApp messages to employees
- **Analytics & Reports** - Comprehensive dashboards with charts and business intelligence
- **Role-Based Access Control** - Support for Admin, HR, Manager, and Employee roles
- **User Authentication** - Secure login with role-based authorization

### Technical Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme support
- ✅ Type-safe with TypeScript
- ✅ Component-based architecture with Radix UI
- ✅ Form validation with React Hook Form and Zod
- ✅ State management with React Context
- ✅ API service layer for easy backend integration
- ✅ Mock data service for development/testing
- ✅ Error handling and toast notifications
- ✅ Loading states and optimistic updates

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ or higher
- **npm** 9+ or **yarn** 4+
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/workforce.git
cd workforce
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Demo Credentials

For development/testing:
- **Email:** `john.anderson@company.com`
- **Password:** `demo123`
- **Role:** Admin (full access)

You can log in with any of the other mock users using the same password.

## 📁 Project Structure

```
workforce/
├── public/                    # Static assets
│   └── robots.txt
├── src/
│   ├── components/           # Reusable React components
│   │   ├── layout/          # Layout components (Header, Sidebar, MainLayout)
│   │   ├── dashboard/       # Dashboard widgets and charts
│   │   ├── ui/             # UI component library (Radix UI based)
│   │   ├── NavLink.tsx      # Navigation link wrapper
│   │   └── ProtectedRoute.tsx
│   ├── pages/              # Page components
│   │   ├── Login.tsx       # Authentication page
│   │   ├── Dashboard.tsx   # Main dashboard with stats
│   │   ├── Employees.tsx   # Employee list and management
│   │   ├── EmployeeDetails.tsx # Individual employee profile
│   │   ├── EmployeeForm.tsx # Create/Edit employee form
│   │   ├── Departments.tsx  # Department management
│   │   ├── Payroll.tsx      # Payroll management
│   │   ├── Attendance.tsx   # Attendance tracking
│   │   ├── Policies.tsx     # Policy management
│   │   ├── Reports.tsx      # Analytics and reports
│   │   ├── EmailCommunication.tsx
│   │   ├── WhatsAppCommunication.tsx
│   │   ├── Settings.tsx     # Application settings
│   │   ├── Index.tsx        # Home/Index page
│   │   └── NotFound.tsx     # 404 page
│   ├── services/           # API and data services
│   │   ├── api.ts         # Axios API client with endpoints
│   │   └── mockDataService.ts # In-memory mock data service
│   ├── context/           # React Context for state
│   │   └── AuthContext.tsx # Authentication state
│   ├── hooks/             # Custom React hooks
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── data/              # Static/mock data
│   │   └── mockData.ts
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── App.tsx            # Root App component with routing
│   ├── App.css            # Global styles
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Base styles
│   └── vite-env.d.ts      # Vite type definitions
├── .env.example           # Environment variables template
├── .env.local            # Local environment (git ignored)
├── .eslintrc.js          # ESLint configuration
├── components.json       # Component library config
├── eslint.config.js      # ESLint rules
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript base config
├── tsconfig.app.json     # TypeScript app config
├── tsconfig.node.json    # TypeScript node config
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Type check with TypeScript
npm run type-check
```

### Code Quality

The project uses:
- **ESLint** - Code linting and quality rules
- **Prettier** - Code formatting (via ESLint)
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework

### Making Changes

1. Create a feature branch
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following the project conventions

3. Run linting and type checking
```bash
npm run lint
npm run type-check
```

4. Build locally to verify
```bash
npm run build
```

5. Commit and push
```bash
git add .
git commit -m "feat: description of your changes"
git push origin feature/your-feature-name
```

## 🏗️ Build & Deployment

### Building for Production

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Traditional Server
```bash
npm run build
# Upload dist/ folder to your hosting
```

## 📝 Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# Frontend API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# App Settings
VITE_APP_NAME=WorkForce Management System
VITE_APP_VERSION=1.0.0

# Demo Credentials (for development)
VITE_DEMO_EMAIL=john.anderson@company.com
VITE_DEMO_PASSWORD=demo123

# Feature Flags
VITE_ENABLE_MOCK_API=true
VITE_ENABLE_DEBUG_MODE=false

# Features
VITE_ENABLE_EMAIL_COMMUNICATION=true
VITE_ENABLE_WHATSAPP_COMMUNICATION=true
VITE_ENABLE_PAYROLL_PROCESSING=true
VITE_ENABLE_LEAVE_MANAGEMENT=true
```

## 🔐 Authentication

The application includes a mock authentication system for development. To implement real authentication:

### Replace Mock Auth with Real Auth

1. **Update AuthContext.tsx**
```typescript
import { authService } from '@/services/mockDataService';

// Replace with real API call
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
```

2. **Configure Backend API URL**
```env
VITE_API_URL=https://your-backend.com/api
```

3. **Implement JWT Token Handling**
The application includes token storage in localStorage. Update for your auth needs:
- Secure HTTP-only cookies recommended
- Implement token refresh logic
- Add logout endpoint

## 📊 Data Models

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';
  department: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  joiningDate: string;
  phone: string;
  profileImage?: string;
  salaryStructure: SalaryStructure;
}
```

### Department
```typescript
{
  id: string;
  name: string;
  description: string;
  employeeCount: number;
}
```

### Attendance
```typescript
{
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  checkIn?: string;
  checkOut?: string;
}
```

### LeaveRequest
```typescript
{
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Personal';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}
```

See [types/index.ts](src/types/index.ts) for complete type definitions.

## 🔌 API Integration

### Service Layer

The application includes a complete API service layer in `services/api.ts`:

```typescript
import { employeeService, departmentService, payrollService } from '@/services/mockDataService';

// Fetch employees
const employees = await employeeService.getAll();

// Create employee
const newEmployee = await employeeService.create({
  name: 'John Doe',
  email: 'john@company.com',
  // ... other fields
});

// Update employee
const updated = await employeeService.update(id, { name: 'Jane Doe' });

// Delete employee
await employeeService.delete(id);
```

### Switching to Real Backend

Replace `mockDataService` imports with actual API calls:

```typescript
// Before (mock)
import { employeeService } from '@/services/mockDataService';

// After (real API)
import { employeeAPI } from '@/services/api';
const employees = await employeeAPI.getAll();
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login with demo credentials
- [ ] Add new employee
- [ ] Edit employee details
- [ ] Delete employee
- [ ] Filter employees by department/status
- [ ] Create department
- [ ] Mark attendance
- [ ] Submit leave request
- [ ] Process payroll
- [ ] View dashboard statistics
- [ ] Test responsive design on mobile

### Unit Testing Setup (Optional)

To add unit tests:

```bash
npm install -D vitest @testing-library/react @testing-library/user-event
```

## 🐛 Troubleshooting

### Common Issues

**Port 5173 already in use**
```bash
npm run dev -- --port 3001
```

**Dependencies not installing**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tailwind styles not applying**
```bash
npm run build:css
```

**TypeScript errors in VS Code**
- Restart TypeScript language server: Ctrl+Shift+P → "TypeScript: Restart TS Server"

**Module not found errors**
- Check path aliases in `tsconfig.json`
- Ensure imports use `@/` prefix for src/ directory

## 🎨 Customization

### Theming

Update `tailwind.config.ts` to customize colors, fonts, and spacing:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Adding New Pages

1. Create component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Sidebar.tsx`

## 📚 Dependencies

### Core
- **react** 19.0.0 - UI library
- **react-router-dom** 6.30.1 - Routing
- **typescript** 5.8.3 - Type safety

### UI & Styling
- **tailwindcss** 3.4.17 - CSS framework
- **@radix-ui/** - Accessible component primitives
- **lucide-react** - Icon library

### Forms & Validation
- **react-hook-form** 7.61.1 - Form state management
- **zod** 3.25.76 - Schema validation

### Data & API
- **axios** 1.7.7 - HTTP client
- **@tanstack/react-query** 5.83.0 - Data fetching (optional)

### Build Tools
- **vite** 5.4.19 - Build tool
- **eslint** - Code quality
- **postcss** - CSS processing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev)
- UI components powered by [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

**Last Updated:** January 2024  
**Version:** 1.0.0  
**Status:** Production Ready ✅
