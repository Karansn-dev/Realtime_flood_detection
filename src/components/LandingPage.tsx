import React, { useState } from 'react';
import { Droplets, Shield, TrendingUp, MapPin, AlertTriangle, ArrowRight, Play, Users, Clock } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated 3D Background */}
      <AnimatedBackground />
      
      {/* Enhanced Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[length:30px_30px] animate-pulse-slow"></div>
      </div>

      {/* Floating Elements - Enhanced with new animations */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-teal-400/40 rounded-full blur-xl animate-float z-10"></div>
      <div className="absolute top-40 right-20 w-36 h-36 bg-cyan-400/35 rounded-full blur-xl animate-pulse-slow delay-1000 z-10"></div>
      <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-blue-400/30 rounded-full blur-xl animate-float delay-2000 z-10"></div>
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-emerald-400/25 rounded-full blur-xl animate-pulse-slow delay-1500 z-10"></div>
      
      {/* Additional depth layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-teal-900/30 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6 shadow-2xl">
              <Droplets className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
              Bindu
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-2 font-light drop-shadow-lg">
              Real-Time Flood Monitoring System
            </p>
            <p className="text-lg text-blue-200/95 max-w-2xl mx-auto drop-shadow-lg">
              Advanced AI-powered monitoring for the Ganga River basin with predictive analytics and early warning systems
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Early Warning</h3>
              <p className="text-blue-100/95 text-sm">
                AI-powered predictions with 95% accuracy for flood detection
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Real-Time Data</h3>
              <p className="text-blue-100/95 text-sm">
                Live monitoring with LiDAR sensors and IoT devices
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Smart Mapping</h3>
              <p className="text-blue-100/95 text-sm">
                Interactive maps with flood risk zones and evacuation routes
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">24/7</div>
              <div className="text-blue-200/95 text-sm">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">500+</div>
              <div className="text-blue-200/95 text-sm">Sensors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">95%</div>
              <div className="text-blue-200/95 text-sm">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">10min</div>
              <div className="text-blue-200/95 text-sm">Response Time</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onEnterApp}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Enter Dashboard</span>
              <ArrowRight className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </button>
            
            <button className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white font-semibold rounded-xl border border-white/30 hover:bg-white/25 transition-all duration-300 flex items-center space-x-2 shadow-2xl">
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-6 text-blue-200/90 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>500K+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Emergency Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".4"
            className="fill-teal-800"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".7"
            className="fill-teal-700"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-teal-600"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage; 