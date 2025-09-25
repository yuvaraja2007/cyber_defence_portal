import React, { useState } from 'react';
import { Users, UserPlus, Search, Filter, MoreVertical, Mail, Phone, Shield, Calendar } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [filterRole, setFilterRole] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'System Administrator',
      department: 'IT Security',
      status: 'Active',
      lastLogin: '2024-01-15 14:30:22',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-03-15',
      permissions: ['read', 'write', 'delete', 'admin', 'security'],
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Security Analyst',
      department: 'IT Security',
      status: 'Active',
      lastLogin: '2024-01-15 13:45:10',
      phone: '+1 (555) 234-5678',
      joinDate: '2023-06-20',
      permissions: ['read', 'write', 'security'],
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'System Operator',
      department: 'IT Operations',
      status: 'Active',
      lastLogin: '2024-01-15 12:20:33',
      phone: '+1 (555) 345-6789',
      joinDate: '2023-08-10',
      permissions: ['read', 'write'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 4,
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      role: 'Security Analyst',
      department: 'IT Security',
      status: 'Active',
      lastLogin: '2024-01-15 11:15:45',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-09-05',
      permissions: ['read', 'write', 'security'],
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'Read Only',
      department: 'Management',
      status: 'Inactive',
      lastLogin: '2024-01-10 16:30:00',
      phone: '+1 (555) 567-8901',
      joinDate: '2023-01-20',
      permissions: ['read'],
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'System Administrator': return 'bg-red-100 text-red-800';
      case 'Security Analyst': return 'bg-blue-100 text-blue-800';
      case 'System Operator': return 'bg-green-100 text-green-800';
      case 'Read Only': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage user accounts, roles, and access permissions</p>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">48</p>
              <p className="text-gray-600 font-medium">Total Users</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">42</p>
              <p className="text-gray-600 font-medium">Active Users</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-orange-600">6</p>
              <p className="text-gray-600 font-medium">Inactive Users</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-purple-600">5</p>
              <p className="text-gray-600 font-medium">New This Month</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <UserPlus className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Users</h2>
              <div className="flex gap-4 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Administrator</option>
                  <option value="analyst">Security Analyst</option>
                  <option value="operator">System Operator</option>
                  <option value="viewer">Read Only</option>
                </select>
                <button 
                  onClick={() => setShowAddUser(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                >
                  <UserPlus className="h-4 w-4" />
                  Add User
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div 
                key={user.id} 
                className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                  selectedUser === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Last login: {user.lastLogin}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">User Details</h2>
          </div>
          {selectedUser ? (
            <div className="p-6">
              {(() => {
                const user = users.find(u => u.id === selectedUser);
                return user ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.role}</p>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2 ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">{user.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Join Date</p>
                          <p className="font-medium text-gray-900">{user.joinDate}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <p className="font-medium text-gray-900">Permissions</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.permissions.map((permission) => (
                          <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Edit User
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a user to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;