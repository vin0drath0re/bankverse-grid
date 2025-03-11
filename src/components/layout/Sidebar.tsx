
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  PiggyBank, 
  ArrowRightLeft, 
  BarChart3, 
  BellRing, 
  Settings, 
  HelpCircle,
  LogOut,
  Menu,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, to, active, onClick }: NavItemProps) => (
  <Link to={to} onClick={onClick}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 pl-3 mb-1 font-normal",
        active ? "bg-bank-muted text-bank-primary" : "hover:bg-bank-muted/50 hover:text-bank-primary"
      )}
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  currentPath: string;
}

const Sidebar = ({ collapsed, toggleSidebar, currentPath }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/' },
    { icon: <CreditCard size={20} />, label: 'Accounts', to: '/accounts' },
    { icon: <ArrowRightLeft size={20} />, label: 'Transactions', to: '/transactions' },
    { icon: <TrendingUp size={20} />, label: 'Investments', to: '/investments' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', to: '/analytics' },
    { icon: <BellRing size={20} />, label: 'Notifications', to: '/notifications' },
  ];

  const bottomNavItems = [
    { icon: <Settings size={20} />, label: 'Settings', to: '/settings' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', to: '/help' },
  ];

  if (isMobile && collapsed) {
    return null;
  }

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50",
      collapsed ? "w-[70px]" : "w-64",
      isMobile && !collapsed ? "fixed left-0 top-0" : ""
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-bank-primary rounded-md flex items-center justify-center">
              <span className="font-bold text-white">B</span>
            </div>
            <span className="ml-2 font-semibold text-lg">BankVerse</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          <Menu size={20} />
        </Button>
      </div>

      <div className="p-3">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={item.to === currentPath}
            onClick={isMobile ? toggleSidebar : undefined}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
        {bottomNavItems.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={item.to === currentPath}
            onClick={isMobile ? toggleSidebar : undefined}
          />
        ))}
        <Button variant="ghost" className="w-full justify-start gap-3 pl-3 text-red-500 hover:text-red-600 hover:bg-red-50 mt-2">
          <LogOut size={20} />
          <span>{collapsed ? '' : 'Logout'}</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
