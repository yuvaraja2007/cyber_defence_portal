import React, { useState } from 'react';
import { AlertTriangle, Shield, Search, Filter, MoreVertical, Eye } from 'lucide-react';

const ThreatMonitor: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const threats = [
    {
      id: 1,
      type: 'Advanced Persistent Threat',
      severity: 'Critical',
      source: '192.168.1.45',
      target: 'Database Server',
      status: 'Active',
      detected: '2024-01-15 14:30:22',
      description: 'Suspicious lateral movement detected in network segments'
    },
    {
      id: 2,
      type: 'Malware Detection',
      severity: 'High',
      source: 'email-gateway.local',
      target: 'Workstation-07',
      status: 'Contained',
      detected: '2024-01-15 13:45:15',
      description: 'Trojan.Win32.Generic detected in email attachment'
    },
    {
      id: 3,
      type: 'Brute Force Attack',
      severity: 'Medium',
      source: '203.45.67.89',
      target: 'SSH Service',
      status: 'Blocked',
      detected: '2024-01-15 12:20:10',
      description: 'Multiple failed login attempts from external IP'
    },
    {
      id: 4,
      type: 'Data Exfiltration',
      severity: 'Critical',
      source: 'internal-user-01',
      target: 'File Server',
      status: 'Investigating',
      detected: '2024-01-15 11:15:33',
      description: 'Unusual data transfer patterns detected'
    },
    {
      id: 5,
      type: 'Phishing Attempt',
      severity: 'Medium',
      source: 'external-email',
      target: 'HR Department',
      status: 'Mitigated',
      detected: '2024-01-15 10:30:45',
      description: 'Malicious email with credential harvesting payload'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Contained': return 'bg-blue-100 text-blue-800';
      case 'Blocked': return 'bg-green-100 text-green-800';
      case 'Investigating': return 'bg-purple-100 text-purple-800';
      case 'Mitigated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Threat Monitor</h1>
        <p className="text-gray-600">Real-time threat detection and incident tracking</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search threats..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Threats</option>
              <option value="active">Active</option>
              <option value="contained">Contained</option>
              <option value="investigating">Investigating</option>
            </select>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium">
            Generate Report
          </button>
        </div>
      </div>

      {/* Threat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">5</p>
              <p className="text-gray-600 font-medium">Active Threats</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">23</p>
              <p className="text-gray-600 font-medium">Mitigated Today</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-orange-600">12</p>
              <p className="text-gray-600 font-medium">High Priority</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">156</p>
              <p className="text-gray-600 font-medium">Total This Week</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Threats Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Active Threats</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threat Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detected</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {threats.map((threat) => (
                <tr key={threat.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{threat.type}</p>
                      <p className="text-sm text-gray-500">{threat.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-mono">{threat.source}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{threat.target}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{threat.detected}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThreatMonitor;