import React, { useState } from 'react';
import { Shield, X, Save, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface UpdatePoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdatePoliciesModal: React.FC<UpdatePoliciesModalProps> = ({ isOpen, onClose }) => {
  const [selectedPolicy, setSelectedPolicy] = useState('password');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [policies, setPolicies] = useState({
    password: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      maxAge: 90,
      historyCount: 5
    },
    access: {
      sessionTimeout: 30,
      maxLoginAttempts: 3,
      lockoutDuration: 15,
      requireMFA: true,
      allowRemoteAccess: false
    },
    network: {
      firewallEnabled: true,
      intrusionDetection: true,
      vpnRequired: true,
      allowedPorts: '80,443,22',
      blockedCountries: 'CN,RU,KP'
    },
    data: {
      encryptionRequired: true,
      backupFrequency: 'daily',
      retentionPeriod: 365,
      dataClassification: true,
      dlpEnabled: true
    }
  });

  const policyCategories = [
    { id: 'password', name: 'Password Policy', icon: Shield },
    { id: 'access', name: 'Access Control', icon: Shield },
    { id: 'network', name: 'Network Security', icon: Shield },
    { id: 'data', name: 'Data Protection', icon: Shield }
  ];

  const handlePolicyUpdate = (category: string, field: string, value: any) => {
    setPolicies(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const saveChanges = async () => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUpdating(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const renderPasswordPolicy = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
          <input
            type="number"
            value={policies.password.minLength}
            onChange={(e) => handlePolicyUpdate('password', 'minLength', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Age (days)</label>
          <input
            type="number"
            value={policies.password.maxAge}
            onChange={(e) => handlePolicyUpdate('password', 'maxAge', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        {[
          { key: 'requireUppercase', label: 'Require Uppercase Letters' },
          { key: 'requireLowercase', label: 'Require Lowercase Letters' },
          { key: 'requireNumbers', label: 'Require Numbers' },
          { key: 'requireSymbols', label: 'Require Special Characters' }
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={policies.password[key as keyof typeof policies.password] as boolean}
                onChange={(e) => handlePolicyUpdate('password', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccessPolicy = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={policies.access.sessionTimeout}
            onChange={(e) => handlePolicyUpdate('access', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={policies.access.maxLoginAttempts}
            onChange={(e) => handlePolicyUpdate('access', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        {[
          { key: 'requireMFA', label: 'Require Multi-Factor Authentication' },
          { key: 'allowRemoteAccess', label: 'Allow Remote Access' }
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={policies.access[key as keyof typeof policies.access] as boolean}
                onChange={(e) => handlePolicyUpdate('access', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNetworkPolicy = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Ports</label>
        <input
          type="text"
          value={policies.network.allowedPorts}
          onChange={(e) => handlePolicyUpdate('network', 'allowedPorts', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="80,443,22"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Blocked Countries</label>
        <input
          type="text"
          value={policies.network.blockedCountries}
          onChange={(e) => handlePolicyUpdate('network', 'blockedCountries', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="CN,RU,KP"
        />
      </div>

      <div className="space-y-3">
        {[
          { key: 'firewallEnabled', label: 'Enable Firewall' },
          { key: 'intrusionDetection', label: 'Enable Intrusion Detection' },
          { key: 'vpnRequired', label: 'Require VPN for Remote Access' }
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={policies.network[key as keyof typeof policies.network] as boolean}
                onChange={(e) => handlePolicyUpdate('network', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDataPolicy = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            value={policies.data.backupFrequency}
            onChange={(e) => handlePolicyUpdate('data', 'backupFrequency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period (days)</label>
          <input
            type="number"
            value={policies.data.retentionPeriod}
            onChange={(e) => handlePolicyUpdate('data', 'retentionPeriod', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        {[
          { key: 'encryptionRequired', label: 'Require Data Encryption' },
          { key: 'dataClassification', label: 'Enable Data Classification' },
          { key: 'dlpEnabled', label: 'Enable Data Loss Prevention' }
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={policies.data[key as keyof typeof policies.data] as boolean}
                onChange={(e) => handlePolicyUpdate('data', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Update Security Policies</h2>
                <p className="text-gray-600">Configure and update security policies</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex h-96">
          {/* Policy Categories */}
          <div className="w-1/3 border-r border-gray-200 p-4">
            <h3 className="font-bold text-gray-900 mb-4">Policy Categories</h3>
            <div className="space-y-2">
              {policyCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedPolicy(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      selectedPolicy === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Policy Configuration */}
          <div className="flex-1 p-6">
            <div className="mb-4">
              <h3 className="font-bold text-gray-900 mb-2">
                {policyCategories.find(p => p.id === selectedPolicy)?.name} Configuration
              </h3>
            </div>

            <div className="overflow-y-auto max-h-64">
              {selectedPolicy === 'password' && renderPasswordPolicy()}
              {selectedPolicy === 'access' && renderAccessPolicy()}
              {selectedPolicy === 'network' && renderNetworkPolicy()}
              {selectedPolicy === 'data' && renderDataPolicy()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {updateSuccess && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Policies updated successfully!</span>
              </div>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                disabled={isUpdating}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePoliciesModal;