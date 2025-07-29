import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Zap, Clock, BarChart3, ArrowLeft } from 'lucide-react';

interface AIInsightsPageProps {
  onBack: () => void;
}

const AIInsightsPage: React.FC<AIInsightsPageProps> = ({ onBack }) => {
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
                <Brain className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">AI Insights</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Live AI Analysis</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Confidence Score */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">AI Model Confidence</h2>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-600">Real-time</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">87%</div>
              <div className="text-gray-600">Flood Prediction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
              <div className="text-gray-600">Water Level Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">78%</div>
              <div className="text-gray-600">Rainfall Forecast</div>
            </div>
          </div>
        </div>

        {/* AI Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              Current Predictions
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Water Level Rise</div>
                  <div className="text-sm text-gray-600">Next 6 hours</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">+2.3m</div>
                  <div className="text-sm text-green-600">High Confidence</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Rainfall Intensity</div>
                  <div className="text-sm text-gray-600">Next 12 hours</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-600">45mm/hr</div>
                  <div className="text-sm text-orange-600">Moderate Risk</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">Flood Risk</div>
                  <div className="text-sm text-gray-600">Next 24 hours</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">High</div>
                  <div className="text-sm text-red-600">Take Precautions</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
              AI Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <div className="font-semibold text-red-800">Critical Alert</div>
                <div className="text-sm text-red-700">Water level rising faster than predicted</div>
                <div className="text-xs text-red-600 mt-1">2 minutes ago</div>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                <div className="font-semibold text-yellow-800">Warning</div>
                <div className="text-sm text-yellow-700">Heavy rainfall detected upstream</div>
                <div className="text-xs text-yellow-600 mt-1">15 minutes ago</div>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <div className="font-semibold text-blue-800">Info</div>
                <div className="text-sm text-blue-700">AI model updated with new sensor data</div>
                <div className="text-xs text-blue-600 mt-1">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Model Details */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">AI Model Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Model Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-semibold">95.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">2.3s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Points</span>
                  <span className="font-semibold">1.2M+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-semibold">2 min ago</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Model Features</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Real-time sensor data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Satellite imagery analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Weather pattern recognition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Historical flood data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIInsightsPage; 