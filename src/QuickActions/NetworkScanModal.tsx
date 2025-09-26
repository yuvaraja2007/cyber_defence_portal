import React, { useState, useEffect } from 'react';
import { Globe, X, Play, Pause, CheckCircle, AlertTriangle, Server, Wifi } from 'lucide-react';

interface NetworkScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkScanModal: React.FC<NetworkScanModalProps> = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [scanType, setScanType] = useState('quick');

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Generate mock results
          setScanResults([
            { ip: '192.168.1.1', device: 'Router', status: 'online', ports: [22, 80, 443], risk: 'low' },
            { ip: '192.168.1.10', device: 'Web Server', status: 'online', ports: [80, 443, 8080], risk: 'medium' },
            { ip: '192.168.1.20', device: 'Database Server', status: 'online', ports: [3306, 5432], risk: 'low' },
            { ip: '192.168.1.45', device: 'Unknown Device', status: 'online', ports: [22, 23, 80], risk: 'high' },
            { ip: '192.168.1.100', device: 'Workstation', status: 'offline', ports: [], risk: 'low' }
          ]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Network Scan</h2>
                <p className="text-gray-600">Discover and analyze network devices</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Scan Configuration */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Scan Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scan Type</label>
                <select 
                  value={scanType}
                  onChange={(e) => setScanType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isScanning}
                >
                  <option value="quick">Quick Scan</option>
                  <option value="comprehensive">Comprehensive Scan</option>
                  <option value="vulnerability">Vulnerability Scan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IP Range</label>
                <input 
                  type="text" 
                  defaultValue="192.168.1.0/24"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isScanning}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Port Range</label>
                <input 
                  type="text" 
                  defaultValue="1-1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isScanning}
                />
              </div>
            </div>
          </div>

          {/* Scan Controls */}
          <div className="mb-6">
            <button
              onClick={startScan}
              disabled={isScanning}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isScanning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </button>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Scan Progress</span>
                <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Results */}
          {scanResults.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Scan Results ({scanResults.length} devices found)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Open Ports</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {scanResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-mono text-gray-900">{result.ip}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 flex items-center gap-2">
                          {result.device.includes('Server') ? <Server className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
                          {result.device}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.status)}
                            <span className="capitalize">{result.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {result.ports.length > 0 ? result.ports.join(', ') : 'None'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(result.risk)}`}>
                            {result.risk.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkScanModal;