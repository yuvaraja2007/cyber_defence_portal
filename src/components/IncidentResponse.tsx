import React, { useState } from 'react';
import { AlertTriangle, Clock, User, CheckCircle, XCircle, Play, Pause, FileText, MessageSquare } from 'lucide-react';

const IncidentResponse: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const incidents = [
    {
      id: 1,
      title: 'Data Breach - Customer Database',
      severity: 'Critical',
      status: 'Active',
      assignee: 'Sarah Johnson',
      created: '2024-01-15 09:30:00',
      updated: '2024-01-15 14:45:00',
      description: 'Unauthorized access detected in customer database. Potential data exfiltration of 10,000+ records.',
      timeline: [
        { time: '09:30', action: 'Incident detected by SIEM', user: 'System' },
        { time: '09:35', action: 'Alert escalated to SOC team', user: 'System' },
        { time: '09:45', action: 'Incident assigned to Sarah Johnson', user: 'Admin' },
        { time: '10:15', action: 'Initial investigation started', user: 'Sarah Johnson' },
        { time: '14:45', action: 'Database access revoked for compromised accounts', user: 'Sarah Johnson' }
      ]
    },
    {
      id: 2,
      title: 'Ransomware Attack - Finance Department',
      severity: 'Critical',
      status: 'Contained',
      assignee: 'Mike Chen',
      created: '2024-01-14 16:20:00',
      updated: '2024-01-15 08:30:00',
      description: 'Ransomware detected on multiple workstations in finance department. Systems isolated.',
      timeline: [
        { time: '16:20', action: 'Ransomware signature detected', user: 'System' },
        { time: '16:22', action: 'Affected systems quarantined', user: 'System' },
        { time: '16:30', action: 'Incident response team activated', user: 'Admin' },
        { time: '17:45', action: 'Backup restoration initiated', user: 'Mike Chen' },
        { time: '08:30', action: 'Systems restored and secured', user: 'Mike Chen' }
      ]
    },
    {
      id: 3,
      title: 'Phishing Campaign - HR Department',
      severity: 'High',
      status: 'Resolved',
      assignee: 'Lisa Wang',
      created: '2024-01-13 11:15:00',
      updated: '2024-01-14 09:00:00',
      description: 'Targeted phishing emails sent to HR staff. 3 users clicked malicious links.',
      timeline: [
        { time: '11:15', action: 'Phishing emails reported by users', user: 'HR Staff' },
        { time: '11:30', action: 'Email campaign blocked', user: 'System' },
        { time: '12:00', action: 'Affected user accounts secured', user: 'Lisa Wang' },
        { time: '14:30', action: 'Security awareness training scheduled', user: 'Lisa Wang' },
        { time: '09:00', action: 'Incident closed - no data compromise', user: 'Lisa Wang' }
      ]
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
      case 'Contained': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Investigating': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Play className="h-4 w-4" />;
      case 'Contained': return <Pause className="h-4 w-4" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4" />;
      case 'Investigating': return <AlertTriangle className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Incident Response</h1>
        <p className="text-gray-600">Manage and track security incidents with comprehensive response workflows</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">2</p>
              <p className="text-gray-600 font-medium">Active Incidents</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-yellow-600">1</p>
              <p className="text-gray-600 font-medium">Contained</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Pause className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">15</p>
              <p className="text-gray-600 font-medium">Resolved This Month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">2.4h</p>
              <p className="text-gray-600 font-medium">Avg Response Time</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Active Incidents</h2>
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="contained">Contained</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {incidents.map((incident) => (
              <div 
                key={incident.id} 
                className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                  selectedIncident === incident.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSelectedIncident(incident.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{incident.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{incident.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {getStatusIcon(incident.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{incident.assignee}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{incident.updated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Incident Timeline</h2>
          </div>
          {selectedIncident ? (
            <div className="p-6">
              {(() => {
                const incident = incidents.find(i => i.id === selectedIncident);
                return incident ? (
                  <div className="space-y-4">
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">{incident.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{incident.description}</p>
                    </div>
                    <div className="space-y-3">
                      {incident.timeline.map((event, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            {index < incident.timeline.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-1"></div>}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-sm font-medium text-gray-900">{event.action}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{event.time}</span>
                              <span className="text-xs text-blue-600">by {event.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Add Update
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2">
                          <FileText className="h-4 w-4" />
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select an incident to view details and timeline</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentResponse;