import React from 'react';
import { BarChart3, TrendingUp, Droplets, MapPin, Clock, ArrowLeft, Activity, Thermometer } from 'lucide-react';

interface RiverStatsPageProps {
  onBack: () => void;
}

const RiverStatsPage: React.FC<RiverStatsPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-blue-700" />
              </button>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">River Statistics</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700 font-medium">Live Data</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">12.4m</div>
            <div className="text-gray-600">Current Water Level</div>
            <div className="text-sm text-green-600 mt-1">+0.3m from yesterday</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-green-600" />
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">2,450</div>
            <div className="text-gray-600">Flow Rate (m³/s)</div>
            <div className="text-sm text-green-600 mt-1">+120 from yesterday</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="h-8 w-8 text-orange-600" />
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24.5°C</div>
            <div className="text-gray-600">Water Temperature</div>
            <div className="text-sm text-orange-600 mt-1">+1.2°C from yesterday</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">156</div>
            <div className="text-gray-600">Active Sensors</div>
            <div className="text-sm text-purple-600 mt-1">All operational</div>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Water Level History</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Current Level</div>
                  <div className="text-sm text-gray-600">12.4m above sea level</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">12.4m</div>
                  <div className="text-sm text-green-600">Normal Range</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Warning Level</div>
                  <div className="text-sm text-gray-600">15.2m above sea level</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-600">15.2m</div>
                  <div className="text-sm text-yellow-600">2.8m remaining</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Danger Level</div>
                  <div className="text-sm text-gray-600">17.8m above sea level</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">17.8m</div>
                  <div className="text-sm text-red-600">5.4m remaining</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Flow Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Average Flow</div>
                  <div className="text-sm text-gray-600">Last 24 hours</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">2,340 m³/s</div>
                  <div className="text-sm text-green-600">+4.7%</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Peak Flow</div>
                  <div className="text-sm text-gray-600">Today's maximum</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">2,890 m³/s</div>
                  <div className="text-sm text-blue-600">At 14:30</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Minimum Flow</div>
                  <div className="text-sm text-gray-600">Today's minimum</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">1,980 m³/s</div>
                  <div className="text-sm text-purple-600">At 06:15</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Network Status */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sensor Network Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">156</div>
              <div className="text-gray-600">Total Sensors</div>
              <div className="text-sm text-green-600 mt-1">All operational</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">142</div>
              <div className="text-gray-600">Water Level</div>
              <div className="text-sm text-blue-600 mt-1">Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">14</div>
              <div className="text-gray-600">Flow Rate</div>
              <div className="text-sm text-purple-600 mt-1">Active</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-800 font-medium">All sensors reporting normally</span>
            </div>
            <div className="text-sm text-green-700 mt-1">Last data update: 2 minutes ago</div>
          </div>
        </div>

        {/* Historical Data */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Historical Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Monthly Averages</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">January</span>
                  <span className="font-semibold">11.2m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">February</span>
                  <span className="font-semibold">10.8m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">March</span>
                  <span className="font-semibold">11.5m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">April</span>
                  <span className="font-semibold">12.1m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">May</span>
                  <span className="font-semibold">12.4m</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Record Levels</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Highest Recorded</span>
                  <span className="font-semibold text-red-600">18.7m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">2019-08-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lowest Recorded</span>
                  <span className="font-semibold text-blue-600">8.2m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">2020-03-22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Level</span>
                  <span className="font-semibold">11.8m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiverStatsPage; 