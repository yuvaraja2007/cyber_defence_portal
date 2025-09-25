import React from 'react';
import { Shield, BarChart3, AlertTriangle, Users, Settings, Home, Eye, Lock } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'threats', label: 'Threat Monitor', icon: AlertTriangle },
    { id: 'analytics', label: 'Security Analytics', icon: BarChart3 },
    { id: 'incidents', label: 'Incident Response', icon: Shield },
    { id: 'monitoring', label: 'System Monitor', icon: Eye },
    { id: 'access', label: 'Access Control', icon: Lock },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 border-r border-gray-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">CyberDefence</h1>
          <p className="text-gray-400 text-sm">Security Portal</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-800/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-sm font-medium text-red-400">Security Alert</span>
        </div>
        <p className="text-xs text-gray-300">3 critical vulnerabilities detected. Review immediately.</p>
      </div>
    </div>
  );
};

export default Sidebar;