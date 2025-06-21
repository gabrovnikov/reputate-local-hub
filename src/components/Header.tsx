
import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-primary-foreground/80 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="relative">
          <Bell size={24} className="text-primary-foreground/80" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
