import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ThreatMonitor from './components/ThreatMonitor';
import SecurityAnalytics from './components/SecurityAnalytics';
import IncidentResponse from './components/IncidentResponse';
import SystemMonitor from './components/SystemMonitor';
import AccessControl from './components/AccessControl';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'threats':
        return <ThreatMonitor />;
      case 'analytics':
        return <SecurityAnalytics />;
      case 'incidents':
        return <IncidentResponse />;
      case 'monitoring':
        return <SystemMonitor />;
      case 'access':
        return <AccessControl />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;