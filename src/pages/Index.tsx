
import React, { useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import Dashboard from '../components/Dashboard';
import Reviews from '../components/Reviews';
import AIGenerator from '../components/AIGenerator';
import Settings from '../components/Settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'reviews':
        return <Reviews />;
      case 'ai':
        return <AIGenerator />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
