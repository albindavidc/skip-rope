import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, List, Zap, Settings, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans flex flex-col relative overflow-hidden">
      {/* Background Motif */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="rope-arc"></div>
      </div>

      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full bg-dark-800/90 backdrop-blur-md border-t border-dark-700 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
          <NavItem to="/home" icon={<Home className="w-6 h-6" />} label="Home" active={location.pathname === '/home'} />
          <NavItem to="/ropes" icon={<List className="w-6 h-6" />} label="Ropes" active={location.pathname === '/ropes' || location.pathname === '/guide'} />
          <NavItem to="/skills" icon={<Zap className="w-6 h-6" />} label="Skills" active={location.pathname === '/skills'} />
          <NavItem to="/workout" icon={<Activity className="w-6 h-6" />} label="Workout" active={location.pathname === '/workout'} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center w-16 h-full transition-colors",
        active ? "text-accent" : "text-slate-500 hover:text-slate-300"
      )}
    >
      <div className={cn("transition-transform duration-200", active ? "-translate-y-1" : "")}>
        {icon}
      </div>
      <span className={cn(
        "text-[10px] font-medium tracking-wide transition-opacity duration-200 absolute bottom-1",
        active ? "opacity-100" : "opacity-0"
      )}>
        {label}
      </span>
    </Link>
  );
}
