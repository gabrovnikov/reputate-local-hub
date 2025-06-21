
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ScoreCardProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  description: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, trend, trendValue, description }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-danger';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} />;
    if (trend === 'down') return <TrendingDown size={16} />;
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2">{score.toFixed(1)}</div>
        <div className="text-sm text-gray-600 mb-3">{description}</div>
        <div className={`flex items-center justify-center gap-1 text-sm font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{trendValue}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
