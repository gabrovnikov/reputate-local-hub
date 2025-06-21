
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'success' | 'warning' | 'danger' | 'primary';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success': return 'bg-success/10 text-success border-success/20';
      case 'warning': return 'bg-warning/10 text-warning border-warning/20';
      case 'danger': return 'bg-danger/10 text-danger border-danger/20';
      default: return 'bg-primary-light text-primary border-primary/20';
    }
  };

  return (
    <div className={`rounded-xl p-4 border ${getColorClasses()}`}>
      <div className="text-sm font-medium opacity-80 mb-1">{title}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {subtitle && <div className="text-xs opacity-70">{subtitle}</div>}
    </div>
  );
};

export default MetricCard;
