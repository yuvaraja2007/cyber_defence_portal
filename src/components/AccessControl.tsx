import React, { useState } from 'react';
import { Lock, Shield, Key, Users, Eye, EyeOff, Plus, CreditCard as Edit, Trash2 } from 'lucide-react';

const AccessControl: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showAddRole, setShowAddRole] = useState(false);

  const roles = [
    {
      id: 'admin',
      name: 'System Administrator',
      description: 'Full system access with all privileges',
      users: 3,
      permissions: ['read', 'write', 'delete', 'admin', 'security'],
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'security',
      name: 'Security Analyst',
      description: 'Security monitoring and incident response',
      users: 8,
      permissions: ['read', 'write', 'security'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'operator',
      name: 'System Operator',
      description: 'System monitoring and basic operations',
      users: 12,
      permissions: ['read', 'write'],
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'viewer',
      name: 'Read Only',
      description: 'View-only access to dashboards and reports',
      users: 25,
      permissions: ['read'],
      color: 'bg-gray-100 text-gray-800'
    }
  ];

  const permissions = [
    { id: 'read', name: 'Read Access', description: 'View dashboards and reports' },
    { id: 'write', name: 'Write Access', description: 'Modify configurations and settings' },
    { id: 'delete', name: 'Delete Access', description: 'Remove data and configurations' },
    { id: 'admin', name: 'Admin Access', description: 'User management and system administration' },
    { id: 'security', name: 'Security Access', description: 'Security policies and incident management' }
  ];

  const accessLogs = [
    {
      user: 'john.doe@company.com',
      action: 'Login',
      resource: 'Dashboard',
      timestamp: '2024-01-15 14:30:22',
      ip: '192.168.1.45',
      status: 'Success'
    },
    {
      user: 'sarah.johnson@company.com',
      action: 'View',
      resource: 'Threat Monitor',
      timestamp: '2024-01-15 14:28:15',
      ip: '192.168.1.67',
      status: 'Success'
    },
    {
      user: 'mike.chen@company.com',
      action: 'Update',
      resource: 'Security Policy',
      timestamp: '2024-01-15 14:25:33',
      ip: '192.168.1.23',
      status: 'Success'
    },
    {
      user: 'unknown.user@external.com',
      action: 'Login',
      resource: 'Dashboard',
      timestamp: '2024-01-15 14:20:10',
      ip: '203.45.67.89',
      status: 'Failed'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Success' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Control</h1>
        <p className="text-gray-600">Manage user roles, permissions, and access policies</p>
      </div>

      {/* Access Control Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">48</p>
              <p className="text-gray-600 font-medium">Active Users</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">4</p>
              <p className="text-gray-600 font-medium">User Roles</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-purple-600">156</p>
              <p className="text-gray-600 font-medium">Login Sessions</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Key className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">3</p>
              <p className="text-gray-600 font-medium">Failed Attempts</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roles Management */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">User Roles</h2>
              <button 
                onClick={() => setShowAddRole(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Role
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {roles.map((role) => (
              <div 
                key={role.id} 
                className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                  selectedRole === role.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                      {role.users} users
                    </span>
                    <div className="flex gap-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Permissions</h2>
          </div>
          <div className="p-6">
            {selectedRole ? (
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  {roles.find(r => r.id === selectedRole)?.name} Permissions
                </h3>
                <div className="space-y-3">
                  {permissions.map((permission) => {
                    const hasPermission = roles.find(r => r.id === selectedRole)?.permissions.includes(permission.id);
                    return (
                      <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{permission.name}</p>
                          <p className="text-sm text-gray-600">{permission.description}</p>
                        </div>
                        <div className="ml-4">
                          {hasPermission ? (
                            <Eye className="h-5 w-5 text-green-600" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a role to view permissions</p>
              </div>
            )}
          </div>
        </div>

        {/* Access Logs */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Access Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{log.resource}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono">{log.ip}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;