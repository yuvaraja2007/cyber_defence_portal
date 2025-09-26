import React from 'react';
import { Shield, AlertTriangle, Users, Activity, TrendingUp, Server, Globe, Lock } from 'lucide-react';
import NetworkScanModal from '../QuickActions/NetworkScanModal';
import SecurityAuditModal from '../QuickActions/SecurityAuditModal';
import UpdatePoliciesModal from '../QuickActions/UpdatePoliciesModal';
import IncidentReportModal from '../QuickActions/IncidentReportModal';

const Dashboard: React.FC = () => {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  const securityMetrics = [
    {
      title: 'Security Score',
      value: '94%',
      change: '+2.3%',
      trend: 'up',
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Active Threats',
      value: '7',
      change: '-12',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Protected Assets',
      value: '1,247',
      change: '+156',
      trend: 'up',
      icon: Server,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Users',
      value: '342',
      change: '+28',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const recentThreats = [
    { id: 1, type: 'Malware Detection', severity: 'High', target: 'Web Server 01', time: '2 min ago', status: 'Blocked' },
    { id: 2, type: 'Brute Force Attack', severity: 'Medium', target: 'Login Portal', time: '15 min ago', status: 'Mitigated' },
    { id: 3, type: 'SQL Injection', severity: 'Critical', target: 'Database', time: '1 hour ago', status: 'Investigating' },
    { id: 4, type: 'DDoS Attack', severity: 'High', target: 'Main Website', time: '3 hours ago', status: 'Blocked' },
  ];

  const systemHealth = [
    { component: 'Firewall', status: 'Operational', uptime: '99.9%' },
    { component: 'IDS/IPS', status: 'Operational', uptime: '99.7%' },
    { component: 'Antivirus', status: 'Warning', uptime: '98.2%' },
    { component: 'VPN Gateway', status: 'Operational', uptime: '99.8%' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600">Real-time cybersecurity monitoring and threat intelligence</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">System Secure</span>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-gray-600 font-medium">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Threats */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Recent Threats</h2>
          </div>
          <div className="space-y-4">
            {recentThreats.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-gray-900">{threat.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      threat.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      threat.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {threat.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{threat.target} • {threat.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  threat.status === 'Blocked' ? 'bg-green-100 text-green-800' :
                  threat.status === 'Mitigated' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {threat.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">System Health</h2>
          </div>
          <div className="space-y-4">
            {systemHealth.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    system.status === 'Operational' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{system.component}</span>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    system.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {system.status}
                  </p>
                  <p className="text-xs text-gray-500">{system.uptime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveModal('networkScan')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all duration-200 hover:scale-105"
          >
            <Globe className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Network Scan</span>
          </button>
          <button 
            onClick={() => setActiveModal('securityAudit')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all duration-200 hover:scale-105"
          >
            <Lock className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Security Audit</span>
          </button>
          <button 
            onClick={() => setActiveModal('updatePolicies')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all duration-200 hover:scale-105"
          >
            <Shield className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Update Policies</span>
          </button>
          <button 
            onClick={() => setActiveModal('incidentReport')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all duration-200 hover:scale-105"
          >
            <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Incident Report</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <NetworkScanModal 
        isOpen={activeModal === 'networkScan'} 
        onClose={() => setActiveModal(null)} 
      />
      <SecurityAuditModal 
        isOpen={activeModal === 'securityAudit'} 
        onClose={() => setActiveModal(null)} 
      />
      <UpdatePoliciesModal 
        isOpen={activeModal === 'updatePolicies'} 
        onClose={() => setActiveModal(null)} 
      />
      <IncidentReportModal 
        isOpen={activeModal === 'incidentReport'} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
};

export default Dashboard;