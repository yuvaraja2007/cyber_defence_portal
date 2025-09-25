import React from 'react';
import { BarChart3, PieChart, TrendingUp, Activity, Shield, AlertTriangle } from 'lucide-react';

const SecurityAnalytics: React.FC = () => {
  const analyticsCards = [
    {
      title: 'Threat Detection Rate',
      value: '97.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'Response Time',
      value: '2.3 min',
      change: '-45 sec',
      trend: 'down',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'False Positives',
      value: '3.2%',
      change: '-0.8%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const threatCategories = [
    { category: 'Malware', count: 45, percentage: 35, color: 'bg-red-500' },
    { category: 'Phishing', count: 32, percentage: 25, color: 'bg-orange-500' },
    { category: 'Brute Force', count: 28, percentage: 22, color: 'bg-yellow-500' },
    { category: 'Data Breach', count: 15, percentage: 12, color: 'bg-purple-500' },
    { category: 'Other', count: 8, percentage: 6, color: 'bg-gray-500' }
  ];

  const weeklyData = [
    { day: 'Mon', threats: 23, blocked: 21 },
    { day: 'Tue', threats: 34, blocked: 32 },
    { day: 'Wed', threats: 18, blocked: 17 },
    { day: 'Thu', threats: 41, blocked: 38 },
    { day: 'Fri', threats: 29, blocked: 28 },
    { day: 'Sat', threats: 15, blocked: 15 },
    { day: 'Sun', threats: 12, blocked: 12 }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Analytics</h1>
        <p className="text-gray-600">Comprehensive security metrics and threat intelligence</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${card.trend === 'down' ? 'rotate-180' : ''}`} />
                  {card.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-gray-600 font-medium">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Threat Categories Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">Threat Categories</h2>
          </div>
          <div className="space-y-4">
            {threatCategories.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="font-medium text-gray-900">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-8 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-6 w-6 text-green-500" />
            <h2 className="text-xl font-bold text-gray-900">Weekly Threat Trends</h2>
          </div>
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium text-gray-900 w-12">{day.day}</span>
                <div className="flex-1 mx-4">
                  <div className="flex gap-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="bg-red-400 h-full rounded-full"
                        style={{ width: `${(day.threats / 50) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-green-500 h-full rounded-full absolute top-0 left-0"
                        style={{ width: `${(day.blocked / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-red-600 font-medium">{day.threats}</span>
                  <span className="text-green-600 font-medium">{day.blocked}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Threats Detected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Threats Blocked</span>
            </div>
          </div>
        </div>

        {/* Security Score Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">Security Score Timeline</h2>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[85, 92, 88, 94, 91, 96, 94, 97, 95, 98, 96, 94].map((score, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg w-full min-h-4"
                  style={{ height: `${(score / 100) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-gray-600">Last 12 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAnalytics;