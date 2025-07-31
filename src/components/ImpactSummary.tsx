import React, { useState, useEffect } from 'react';
import { Users, Shield, Building, TrendingUp, Activity, Target, Award, Globe } from 'lucide-react';

const ImpactSummary: React.FC = () => {
  const [counters, setCounters] = useState({
    peopleProtected: 0,
    sensorsActive: 0,
    alertsSent: 0,
    accuracy: 0
  });

  const [liveStats, setLiveStats] = useState({
    activeSensors: 247,
    lastAlert: '2 min ago',
    systemStatus: 'operational',
    coverageArea: '2,500 km²'
  });

  useEffect(() => {
    // Animate counters on mount
    const animateCounters = () => {
      const targetCounters = {
        peopleProtected: 50,
        sensorsActive: 247,
        alertsSent: 1247,
        accuracy: 95
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          peopleProtected: Math.floor(targetCounters.peopleProtected * progress),
          sensorsActive: Math.floor(targetCounters.sensorsActive * progress),
          alertsSent: Math.floor(targetCounters.alertsSent * progress),
          accuracy: Math.floor(targetCounters.accuracy * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    animateCounters();

    // Update live stats every 30 seconds
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeSensors: prev.activeSensors + (Math.random() > 0.5 ? 1 : -1),
        lastAlert: `${Math.floor(Math.random() * 5) + 1} min ago`
      }));
    }, 30000);

    return () => clearInterval(statsInterval);
  }, []);

  const impactGroups = [
    {
      icon: Users,
      title: 'Citizens',
      benefits: [
        'Get real-time flood alerts on mobile devices',
        'Access safe evacuation routes and shelters',
        'Receive emergency preparedness tips',
        'Reduced panic with accurate information'
      ],
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      stats: `${counters.peopleProtected}+ million protected`
    },
    {
      icon: Shield,
      title: 'Disaster Response Teams',
      benefits: [
        'Access real-time zone risk maps',
        'Prioritize rescue operations effectively',
        'Coordinate using geo-located dashboards',
        'Deploy resources based on AI predictions'
      ],
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100',
      stats: `${counters.alertsSent} alerts sent today`
    },
    {
      icon: Building,
      title: 'Urban Planners & Authorities',
      benefits: [
        'Use historical data for smart city planning',
        'Design resilient drainage systems',
        'Create flood-resistant infrastructure',
        'Make data-driven policy decisions'
      ],
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      stats: `${counters.accuracy}% prediction accuracy`
    }
  ];

  return (
    <div className="glass-effect rounded-xl p-4 shadow-2xl border border-white/20 hover-lift card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white drop-shadow-lg">Impact Summary for Stakeholders</h3>
        <div className="flex items-center space-x-2 glass-effect px-2 py-1 rounded-full border border-white/20">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-300 font-medium">LIVE</span>
        </div>
      </div>
      
      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="glass-effect border border-white/20 rounded-lg p-3 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-cyan-400 text-xs font-medium">Active Sensors</div>
              <div className="text-lg font-bold text-white">{liveStats.activeSensors}</div>
            </div>
            <Activity className="h-5 w-5 text-cyan-400 animate-pulse-slow" />
          </div>
        </div>
        
        <div className="glass-effect border border-white/20 rounded-lg p-3 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-green-400 text-xs font-medium">Last Alert</div>
              <div className="text-sm font-bold text-white">{liveStats.lastAlert}</div>
            </div>
            <Target className="h-5 w-5 text-green-400 animate-glow" />
          </div>
        </div>
        
        <div className="glass-effect border border-white/20 rounded-lg p-3 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-400 text-xs font-medium">System Status</div>
              <div className="text-sm font-bold text-white capitalize">{liveStats.systemStatus}</div>
            </div>
            <Award className="h-5 w-5 text-purple-400 animate-pulse-slow" />
          </div>
        </div>
        
        <div className="glass-effect border border-white/20 rounded-lg p-3 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-orange-400 text-xs font-medium">Coverage Area</div>
              <div className="text-sm font-bold text-white">{liveStats.coverageArea}</div>
            </div>
            <Globe className="h-5 w-5 text-orange-400 animate-float" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {impactGroups.map((group, index) => (
          <div key={index} className={`p-4 rounded-lg border glass-effect border-white/20 hover-lift transition-all duration-300 relative overflow-hidden`}>
            {/* Subtle animated background */}
            <div className="absolute inset-0 opacity-5">
              <div className="data-flow h-full w-full"></div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg glass-effect border border-white/20`}>
                  <group.icon className={`h-5 w-5 ${group.color}`} />
                </div>
                <div>
                  <h4 className={`font-semibold text-base text-white drop-shadow-lg`}>{group.title}</h4>
                  <p className="text-xs text-gray-300">{group.stats}</p>
                </div>
              </div>
              <TrendingUp className={`h-4 w-4 ${group.color} animate-pulse-slow`} />
            </div>
            <ul className="space-y-2">
              {group.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="text-xs text-gray-300 flex items-start">
                  <span className={`mr-2 mt-1 w-1.5 h-1.5 rounded-full ${group.color.replace('text-', 'bg-')}`}></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 glass-effect border border-white/20 rounded-lg hover-lift relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-shimmer"></div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white mb-1 drop-shadow-lg">Total Impact</h4>
            <p className="text-xs text-gray-300">
              Protecting over {counters.peopleProtected}+ million people living along the Ganga basin with AI-powered early warning systems
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400 drop-shadow-lg animate-glow">{counters.accuracy}%</div>
            <div className="text-xs text-cyan-300">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSummary;