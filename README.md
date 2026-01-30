# Workforce - HR Management System

![License](https://img.shields.io/github/license/abx15/HR-management)
![Issues](https://img.shields.io/github/issues/abx15/HR-management)
![Forks](https://img.shields.io/github/forks/abx15/HR-management)
![Stars](https://img.shields.io/github/stars/abx15/HR-management)

A professional, enterprise-grade HR Management System built with React, Vite, and Modern UI principles. This application provides comprehensive tools for managing workforce data, scheduling, and analytics.

## 🚀 Features

- **Employee Management**: Create, read, update, and delete employee records.
- **Modern UI/UX**: Built with a responsive design system using Tailwind CSS and Radix UI.
- **Dashboard Analytics**: Visual insights into workforce metrics using Recharts.
- **Secure Authentication**: Role-based access control (RBAC).
- **Scheduling**: Interactive calendar and shift management.
- **Performance Tracking**: Evaluation and feedback systems.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📦 Local Setup

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abx15/HR-management.git
   cd HR-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## 🐳 Docker Usage

This project includes a multi-stage Dockerfile for production-ready containerization.

### Build the Image

```bash
docker build -t hr-management .
```

### Run the Container

```bash
docker run -p 8080:80 hr-management
```

The application will be serving on `http://localhost:8080`.

## 🚀 Deployment

### Vercel

The project is configured for Vercel deployment with `vercel.json` handling SPA routing.

1. Import the project into Vercel.
2. The `vercel.json` will automatically configure the rewrites.
3. Deploy!

### GitHub Actions (CI/CD)

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that automatically:

- Installs dependencies
- Runs linting
- Builds the project

This ensures code quality and build stability on every push and pull request to the `main` branch.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Support

If you find this project useful, please consider supporting the development!

[Become a Sponsor](https://github.com/sponsors/abx15)

---

Made with ❤️ by [abx15](https://github.com/abx15)
