import React, { useState, useEffect } from 'react';
import { Server, Cpu, HardDrive, Wifi, Database, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const SystemMonitor: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: 67,
      status: 'normal',
      icon: Cpu,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Memory Usage',
      value: 84,
      status: 'warning',
      icon: Server,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'Disk Usage',
      value: 45,
      status: 'normal',
      icon: HardDrive,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Network I/O',
      value: 23,
      status: 'normal',
      icon: Wifi,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const servers = [
    {
      name: 'Web Server 01',
      ip: '192.168.1.10',
      status: 'online',
      uptime: '99.9%',
      cpu: 45,
      memory: 67,
      disk: 34,
      lastCheck: '30 sec ago'
    },
    {
      name: 'Database Server',
      ip: '192.168.1.20',
      status: 'online',
      uptime: '99.7%',
      cpu: 78,
      memory: 89,
      disk: 56,
      lastCheck: '15 sec ago'
    },
    {
      name: 'Mail Server',
      ip: '192.168.1.30',
      status: 'warning',
      uptime: '98.2%',
      cpu: 23,
      memory: 45,
      disk: 78,
      lastCheck: '1 min ago'
    },
    {
      name: 'Backup Server',
      ip: '192.168.1.40',
      status: 'offline',
      uptime: '0%',
      cpu: 0,
      memory: 0,
      disk: 0,
      lastCheck: '5 min ago'
    }
  ];

  const networkDevices = [
    { name: 'Core Switch', type: 'Switch', status: 'online', ports: '24/24', traffic: 'High' },
    { name: 'Firewall', type: 'Security', status: 'online', ports: '8/8', traffic: 'Medium' },
    { name: 'Router', type: 'Router', status: 'online', ports: '4/4', traffic: 'Low' },
    { name: 'Access Point 1', type: 'WiFi', status: 'warning', ports: '50/100', traffic: 'Medium' },
    { name: 'Access Point 2', type: 'WiFi', status: 'online', ports: '32/100', traffic: 'Low' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'offline': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getUsageColor = (value: number) => {
    if (value >= 80) return 'bg-red-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Monitor</h1>
            <p className="text-gray-600">Real-time infrastructure monitoring and performance metrics</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-lg font-mono text-gray-900">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  metric.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {metric.status}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}%</p>
                <p className="text-gray-600 font-medium mb-3">{metric.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getUsageColor(metric.value)}`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Server Status */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Server className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">Server Status</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {servers.map((server, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{server.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{server.ip}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(server.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                      {server.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CPU</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                          style={{ width: `${server.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{server.cpu}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Memory</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                          style={{ width: `${server.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{server.memory}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Disk</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.disk)}`}
                          style={{ width: `${server.disk}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{server.disk}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Uptime: {server.uptime}</span>
                  <span>Last check: {server.lastCheck}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Devices */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Wifi className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-900">Network Devices</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {networkDevices.map((device, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-500">{device.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(device.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Ports: <span className="font-medium">{device.ports}</span></span>
                    <span className="text-gray-600">Traffic: <span className="font-medium">{device.traffic}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 lg:col-span-2">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900">Performance Trends</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between gap-2">
              {[45, 52, 48, 61, 58, 67, 63, 71, 68, 74, 69, 67].map((value, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="bg-gradient-to-t from-purple-500 to-blue-400 rounded-t-lg w-full min-h-4"
                    style={{ height: `${(value / 100) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{index + 1}h</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <span className="text-sm text-gray-600">CPU Usage - Last 12 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;