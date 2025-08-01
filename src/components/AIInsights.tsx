import React, { useState, useEffect } from 'react';
import { Brain, Radar, TrendingUp, Gauge } from 'lucide-react';

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState({
    confidence: 0,
    lastScan: '',
    prediction: '0.0',
    flowSpeed: '0.0'
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
    if (confidence >= 85) return { level: 'High', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (confidence >= 70) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    return { level: 'Low', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const confidenceInfo = getConfidenceLevel(insights.confidence);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* AI Confidence Score */}
      <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-teal-200/30 hover:border-teal-300/50 transition-all duration-500 water-shimmer group hover:shadow-teal-500/20 hover:scale-105 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Brain className="h-8 w-8 text-teal-400 group-hover:text-teal-300 transition-colors animate-pulse-slow" />
            <div className="absolute inset-0 animate-glow opacity-0 group-hover:opacity-100 transition-opacity">
              <Brain className="h-8 w-8 text-teal-300 opacity-50" />
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${confidenceInfo.bg} ${confidenceInfo.color} border border-teal-400/30`}>
            {confidenceInfo.level}
          </span>
        </div>
        <h3 className="text-sm font-medium text-cyan-300 mb-1">AI Confidence Score</h3>
        <p className="text-2xl font-bold text-white drop-shadow-lg">{insights.confidence}%</p>
        <p className="text-xs text-cyan-200 mt-2">Model accuracy in prediction</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-b-xl opacity-60"></div>
      </div>

      {/* Last LiDAR Scan */}
      <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-teal-200/30 hover:border-teal-300/50 transition-all duration-500 water-shimmer group hover:shadow-teal-500/20 hover:scale-105 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Radar className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors animate-pulse-slow" />
            <div className="absolute inset-0 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
              <Radar className="h-8 w-8 text-cyan-300 opacity-50" />
            </div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
        </div>
        <h3 className="text-sm font-medium text-cyan-300 mb-1">Last LiDAR Pulse</h3>
        <p className="text-2xl font-bold text-white drop-shadow-lg">{insights.lastScan}</p>
        <p className="text-xs text-cyan-200 mt-2">Scanning active areas</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-xl opacity-60"></div>
      </div>

      {/* 6-Hour Prediction */}
      <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-teal-200/30 hover:border-teal-300/50 transition-all duration-500 water-shimmer group hover:shadow-teal-500/20 hover:scale-105 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <TrendingUp className="h-8 w-8 text-orange-400 group-hover:text-orange-300 transition-colors animate-float" />
            <div className="absolute inset-0 animate-glow opacity-0 group-hover:opacity-100 transition-opacity">
              <TrendingUp className="h-8 w-8 text-orange-300 opacity-50" />
            </div>
          </div>
          <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-400/30">
            +{insights.prediction}m
          </span>
        </div>
        <h3 className="text-sm font-medium text-cyan-300 mb-1">6-Hour Rise Prediction</h3>
        <p className="text-2xl font-bold text-white drop-shadow-lg">{insights.prediction} meters</p>
        <p className="text-xs text-cyan-200 mt-2">Expected water level increase</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-xl opacity-60"></div>
      </div>

      {/* Current Flow Speed */}
      <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-teal-200/30 hover:border-teal-300/50 transition-all duration-500 water-shimmer group hover:shadow-teal-500/20 hover:scale-105 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Gauge className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors animate-pulse-slow" />
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity">
              <Gauge className="h-8 w-8 text-cyan-300 opacity-50" />
            </div>
          </div>
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full border border-cyan-400/30 animate-pulse">
            Live
          </span>
        </div>
        <h3 className="text-sm font-medium text-cyan-300 mb-1">Current Flow Speed</h3>
        <p className="text-2xl font-bold text-white drop-shadow-lg">{insights.flowSpeed} m/s</p>
        <p className="text-xs text-cyan-200 mt-2">Real-time velocity measurement</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-b-xl opacity-60"></div>
      </div>
    </div>
  );
};

export default AIInsights;