import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
      )} style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
        <Header onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="p-6 animate-fade-in">
          {children}
        </main>
      </div>
      
      {/* Responsive sidebar margin */}
      <style>{`
        :root {
          --sidebar-width: 256px;
        }
        @media (max-width: 1024px) {
          :root {
            --sidebar-width: 0px;
          }
        }
      `}</style>
    </div>
  );
}
