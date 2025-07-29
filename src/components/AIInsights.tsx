import React, { useState, useEffect } from 'react';
import { Brain, Radar, TrendingUp, Gauge } from 'lucide-react';

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState({
    confidence: 0,
    lastScan: '',
    prediction: 0,
    flowSpeed: 0
  });

  useEffect(() => {
    const updateInsights = () => {
      setInsights({
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        lastScan: new Date().toLocaleTimeString(),
        prediction: (Math.random() * 0.8 + 0.2).toFixed(1), // 0.2-1.0m
        flowSpeed: (Math.random() * 2 + 1).toFixed(1) // 1.0-3.0 m/s
      });
    };

    updateInsights();
    const interval = setInterval(updateInsights, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 85) return { level: 'High', color: 'text-green-600', bg: 'bg-green-100' };
    if (confidence >= 70) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const confidenceInfo = getConfidenceLevel(insights.confidence);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* AI Confidence Score */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <Brain className="h-8 w-8 text-purple-600" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${confidenceInfo.bg} ${confidenceInfo.color}`}>
            {confidenceInfo.level}
          </span>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">AI Confidence Score</h3>
        <p className="text-2xl font-bold text-gray-900">{insights.confidence}%</p>
        <p className="text-xs text-gray-500 mt-2">Model accuracy in prediction</p>
      </div>

      {/* Last LiDAR Scan */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <Radar className="h-8 w-8 text-blue-600" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">Last LiDAR Pulse</h3>
        <p className="text-2xl font-bold text-gray-900">{insights.lastScan}</p>
        <p className="text-xs text-gray-500 mt-2">Scanning active areas</p>
      </div>

      {/* 6-Hour Prediction */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <TrendingUp className="h-8 w-8 text-orange-600" />
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            +{insights.prediction}m
          </span>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">6-Hour Rise Prediction</h3>
        <p className="text-2xl font-bold text-gray-900">{insights.prediction} meters</p>
        <p className="text-xs text-gray-500 mt-2">Expected water level increase</p>
      </div>

      {/* Current Flow Speed */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <Gauge className="h-8 w-8 text-cyan-600" />
          <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-1 rounded-full">
            Live
          </span>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">Current Flow Speed</h3>
        <p className="text-2xl font-bold text-gray-900">{insights.flowSpeed} m/s</p>
        <p className="text-xs text-gray-500 mt-2">Real-time velocity measurement</p>
      </div>
    </div>
  );
};

export default AIInsights;