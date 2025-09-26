import React, { useState, useEffect } from 'react';
import { Lock, X, Play, CheckCircle, AlertTriangle, XCircle, Shield } from 'lucide-react';

interface SecurityAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecurityAuditModal: React.FC<SecurityAuditModalProps> = ({ isOpen, onClose }) => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditResults, setAuditResults] = useState<any[]>([]);
  const [currentCheck, setCurrentCheck] = useState('');

  const auditChecks = [
    'Password Policy Compliance',
    'User Access Permissions',
    'System Vulnerabilities',
    'Network Security Configuration',
    'Data Encryption Status',
    'Backup Integrity',
    'Log Analysis',
    'Compliance Verification'
  ];

  const startAudit = () => {
    setIsAuditing(true);
    setAuditProgress(0);
    setAuditResults([]);
    setCurrentCheck('');

    let checkIndex = 0;
    const interval = setInterval(() => {
      if (checkIndex < auditChecks.length) {
        setCurrentCheck(auditChecks[checkIndex]);
        
        // Simulate check completion
        setTimeout(() => {
          const result = {
            check: auditChecks[checkIndex],
            status: Math.random() > 0.3 ? 'pass' : Math.random() > 0.5 ? 'warning' : 'fail',
            details: getCheckDetails(auditChecks[checkIndex]),
            score: Math.floor(Math.random() * 40) + 60
          };
          
          setAuditResults(prev => [...prev, result]);
          setAuditProgress(((checkIndex + 1) / auditChecks.length) * 100);
          
          if (checkIndex === auditChecks.length - 1) {
            setIsAuditing(false);
            setCurrentCheck('');
            clearInterval(interval);
          }
          
          checkIndex++;
        }, 1000);
      }
    }, 1200);
  };

  const getCheckDetails = (check: string) => {
    const details: { [key: string]: string } = {
      'Password Policy Compliance': 'Strong password requirements enforced',
      'User Access Permissions': '3 users with excessive privileges detected',
      'System Vulnerabilities': '2 critical vulnerabilities found',
      'Network Security Configuration': 'Firewall rules properly configured',
      'Data Encryption Status': 'All sensitive data encrypted at rest',
      'Backup Integrity': 'Last backup completed successfully',
      'Log Analysis': 'No suspicious activities detected',
      'Compliance Verification': 'GDPR compliance requirements met'
    };
    return details[check] || 'Check completed successfully';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'fail': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'fail': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const overallScore = auditResults.length > 0 
    ? Math.round(auditResults.reduce((sum, result) => sum + result.score, 0) / auditResults.length)
    : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Security Audit</h2>
                <p className="text-gray-600">Comprehensive security assessment</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Audit Controls */}
          <div className="mb-6">
            <button
              onClick={startAudit}
              disabled={isAuditing}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              {isAuditing ? 'Running Audit...' : 'Start Security Audit'}
            </button>
          </div>

          {/* Current Check */}
          {isAuditing && currentCheck && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="font-medium text-blue-900">Currently checking: {currentCheck}</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {(isAuditing || auditResults.length > 0) && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Audit Progress</span>
                <span className="text-sm text-gray-500">{Math.round(auditProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${auditProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Overall Score */}
          {auditResults.length > 0 && !isAuditing && (
            <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Overall Security Score</h3>
                <div className="text-4xl font-bold text-purple-600 mb-2">{overallScore}/100</div>
                <p className="text-gray-600">
                  {overallScore >= 90 ? 'Excellent security posture' :
                   overallScore >= 75 ? 'Good security with minor improvements needed' :
                   overallScore >= 60 ? 'Moderate security - several issues to address' :
                   'Poor security - immediate action required'}
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {auditResults.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Audit Results</h3>
              <div className="space-y-3">
                {auditResults.map((result, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(result.status)}
                        <h4 className="font-medium text-gray-900">{result.check}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600">{result.score}/100</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                          {result.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 ml-8">{result.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {auditResults.length > 0 && !isAuditing && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">Recommendations</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Review and update user access permissions</li>
                <li>• Apply security patches for identified vulnerabilities</li>
                <li>• Implement additional monitoring for suspicious activities</li>
                <li>• Schedule regular security audits</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditModal;