import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Upload, Users, FileText, Activity, LogOut, Menu, X, Bell, CheckCircle, AlertCircle, Clock, Filter, Search, Download } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'personnel' | 'family' | 'veteran' | 'cert-army';
  serviceNumber?: string;
  unit?: string;
}

interface Incident {
  id: string;
  title: string;
  type: 'fraud' | 'malware' | 'phishing' | 'espionage' | 'opsec';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'analyzing' | 'confirmed' | 'mitigated' | 'closed';
  reportedBy: string;
  timestamp: string;
  evidence: string[];
  aiAnalysis?: {
    threatLevel: number;
    confidence: number;
    indicators: string[];
    recommendations: string[];
  };
}

const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Suspicious WhatsApp Message with Location Request',
    type: 'espionage',
    priority: 'critical',
    status: 'analyzing',
    reportedBy: 'Maj. Singh, 14 GARH RIF',
    timestamp: '2025-01-27T10:30:00Z',
    evidence: ['whatsapp_screenshot.jpg', 'phone_logs.txt'],
    aiAnalysis: {
      threatLevel: 95,
      confidence: 89,
      indicators: ['Location harvesting', 'Social engineering', 'Unknown contact'],
      recommendations: ['Block contact immediately', 'Report to unit security officer', 'Change location sharing settings']
    }
  },
  {
    id: '2',
    title: 'Phishing Email Targeting Defence Personnel',
    type: 'phishing',
    priority: 'high',
    status: 'confirmed',
    reportedBy: 'Sqn Ldr Sharma, IAF',
    timestamp: '2025-01-27T09:15:00Z',
    evidence: ['email_headers.eml', 'malicious_link.txt'],
    aiAnalysis: {
      threatLevel: 78,
      confidence: 92,
      indicators: ['Spoofed sender', 'Credential harvesting', 'Military terminology'],
      recommendations: ['Do not click links', 'Forward to cyber cell', 'Update security awareness']
    }
  }
];

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = (role: User['role']) => {
    const user: User = {
      id: '1',
      name: role === 'cert-army' ? 'CERT-Army Analyst' : 'Service Member',
      role,
      serviceNumber: role !== 'cert-army' ? 'SF12345' : undefined,
      unit: role === 'personnel' ? '14 GARH RIF' : undefined
    };
    setCurrentUser(user);
    setShowLoginModal(false);
  };

  const handleFileUpload = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Simulate AI analysis completion
          setTimeout(() => {
            const newIncident: Incident = {
              id: Date.now().toString(),
              title: 'New Cyber Incident Report',
              type: 'malware',
              priority: 'medium',
              status: 'analyzing',
              reportedBy: currentUser?.name || 'Anonymous',
              timestamp: new Date().toISOString(),
              evidence: Array.from(files).map(f => f.name),
              aiAnalysis: {
                threatLevel: 65,
                confidence: 78,
                indicators: ['Suspicious file behavior', 'Network communication'],
                recommendations: ['Isolate affected system', 'Run full system scan']
              }
            };
            setIncidents(prev => [newIncident, ...prev]);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzing': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'confirmed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'mitigated': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (showLoginModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Defence Cyber Portal</h1>
            <p className="text-gray-600">Secure Access Required</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('personnel')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Active Personnel
            </button>
            <button
              onClick={() => handleLogin('family')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Family Member
            </button>
            <button
              onClick={() => handleLogin('veteran')}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Veteran
            </button>
            <button
              onClick={() => handleLogin('cert-army')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              CERT-Army
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Defence Cyber Portal</h1>
                <p className="text-xs text-gray-500 hidden sm:block">AI-Enabled Incident & Safety System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-500 hover:text-blue-600 cursor-pointer" />
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs text-gray-500 uppercase">{currentUser?.role.replace('-', ' ')}</p>
              </div>
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'report', label: 'Report Incident', icon: Upload },
            { id: 'incidents', label: 'My Incidents', icon: FileText },
            ...(currentUser?.role === 'cert-army' ? [{ id: 'analysis', label: 'Threat Analysis', icon: AlertTriangle }] : [])
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Threats</p>
                    <p className="text-3xl font-bold text-red-600">3</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Under Analysis</p>
                    <p className="text-3xl font-bold text-blue-600">7</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-3xl font-bold text-green-600">42</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">AI Confidence</p>
                    <p className="text-3xl font-bold text-purple-600">94%</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Recent Critical Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Critical Security Alerts</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {incidents.filter(i => i.priority === 'critical').slice(0, 3).map((incident) => (
                    <div key={incident.id} className="flex items-start space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900">{incident.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Reported by: {incident.reportedBy}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-red-600 font-medium">
                            Threat Level: {incident.aiAnalysis?.threatLevel}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(incident.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Incident Tab */}
        {activeTab === 'report' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Cyber Security Incident</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Select incident type</option>
                      <option>Phishing Email</option>
                      <option>Suspicious Message</option>
                      <option>Malware Detection</option>
                      <option>Espionage Attempt</option>
                      <option>OPSEC Violation</option>
                      <option>Identity Theft</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>System will auto-classify</option>
                      <option>Critical - Immediate Response</option>
                      <option>High - Urgent</option>
                      <option>Medium - Standard</option>
                      <option>Low - Routine</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Description</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide detailed description of the incident..."
                  />
                </div>

                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Upload</label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files.length > 0) {
                        handleFileUpload(e.dataTransfer.files);
                      }
                    }}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500 mb-4">Supports: Images, Videos, Audio, Documents, Email files</p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFileUpload(e.target.files);
                        }
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                      Select Files
                    </label>
                  </div>
                  
                  {isUploading && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Uploading and analyzing...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Submit Report
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Save Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Incident Reports</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search incidents..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Incident</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">AI Analysis</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {incidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{incident.title}</p>
                            <p className="text-sm text-gray-500">{incident.reportedBy}</p>
                            <p className="text-xs text-gray-400">{new Date(incident.timestamp).toLocaleString()}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {incident.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getPriorityColor(incident.priority)}`}>
                            {incident.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(incident.status)}
                            <span className="text-sm capitalize">{incident.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {incident.aiAnalysis && (
                            <div>
                              <p className="text-sm font-medium">Threat: {incident.aiAnalysis.threatLevel}%</p>
                              <p className="text-xs text-gray-500">Confidence: {incident.aiAnalysis.confidence}%</p>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setSelectedIncident(incident)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CERT-Army Analysis Tab */}
        {activeTab === 'analysis' && currentUser?.role === 'cert-army' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Threat Analysis Dashboard</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            {/* Threat Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100">Critical Threats</p>
                    <p className="text-3xl font-bold">8</p>
                    <p className="text-sm text-red-100 mt-2">Requiring immediate action</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-red-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Active Campaigns</p>
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-sm text-orange-100 mt-2">Coordinated attacks detected</p>
                  </div>
                  <Users className="w-12 h-12 text-orange-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">AI Accuracy</p>
                    <p className="text-3xl font-bold">96.2%</p>
                    <p className="text-sm text-blue-100 mt-2">Over last 30 days</p>
                  </div>
                  <Activity className="w-12 h-12 text-blue-200" />
                </div>
              </div>
            </div>

            {/* Priority Queue */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Priority Response Queue</h3>
              </div>
              <div className="p-6 space-y-4">
                {incidents.filter(i => ['critical', 'high'].includes(i.priority)).map((incident) => (
                  <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(incident.priority)}`}>
                            {incident.priority}
                          </span>
                          <span className="text-sm text-gray-500">{incident.type.toUpperCase()}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{incident.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{incident.reportedBy}</p>
                        
                        {incident.aiAnalysis && (
                          <div className="bg-gray-50 rounded-md p-3">
                            <div className="grid grid-cols-2 gap-4 mb-2">
                              <div>
                                <span className="text-xs text-gray-500">Threat Level</span>
                                <p className="font-semibold text-red-600">{incident.aiAnalysis.threatLevel}%</p>
                              </div>
                              <div>
                                <span className="text-xs text-gray-500">AI Confidence</span>
                                <p className="font-semibold text-blue-600">{incident.aiAnalysis.confidence}%</p>
                              </div>
                            </div>
                            <div className="mb-2">
                              <span className="text-xs text-gray-500 block mb-1">Threat Indicators</span>
                              <div className="flex flex-wrap gap-1">
                                {incident.aiAnalysis.indicators.map((indicator, index) => (
                                  <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                    {indicator}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block mb-1">Recommended Actions</span>
                              <ul className="text-xs text-gray-700 space-y-1">
                                {incident.aiAnalysis.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-blue-500 mr-2">•</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                          Escalate
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Assign
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedIncident.title}</h3>
                  <p className="text-gray-600 mt-1">Reported by: {selectedIncident.reportedBy}</p>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="font-medium capitalize">{selectedIncident.type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Priority</span>
                  <p className={`font-medium capitalize ${selectedIncident.priority === 'critical' ? 'text-red-600' : 'text-orange-600'}`}>
                    {selectedIncident.priority}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <p className="font-medium capitalize">{selectedIncident.status}</p>
                </div>
              </div>

              {selectedIncident.aiAnalysis && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">AI Analysis Results</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Threat Assessment</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Threat Level</span>
                          <span className="text-sm font-bold text-red-600">{selectedIncident.aiAnalysis.threatLevel}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${selectedIncident.aiAnalysis.threatLevel}%` }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">AI Confidence</span>
                          <span className="text-sm font-bold text-blue-600">{selectedIncident.aiAnalysis.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Threat Indicators</h5>
                      <div className="space-y-1">
                        {selectedIncident.aiAnalysis.indicators.map((indicator, index) => (
                          <span key={index} className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded mr-1 mb-1">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions</h5>
                    <ul className="space-y-1">
                      {selectedIncident.aiAnalysis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <span className="text-green-500 mr-2 mt-0.5">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Evidence Files</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedIncident.evidence.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;