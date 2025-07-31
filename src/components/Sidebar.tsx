import React, { useState } from 'react';
import { X, BarChart3, AlertTriangle, Bell, MapPin, Shield, Info, Brain } from 'lucide-react';

type PageType = 'dashboard' | 'ai-insights' | 'river-stats' | 'emergency-tips' | 'charts' | 'location' | 'notifications';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const [showEmergencyHelpline, setShowEmergencyHelpline] = useState(true);
  
  const menuItems = [
    { icon: Brain, label: 'AI Insights', page: 'ai-insights' as PageType },
    { icon: BarChart3, label: 'River Stats', page: 'river-stats' as PageType },
    { icon: AlertTriangle, label: 'Flood Risk Charts', page: 'charts' as PageType },
    { icon: Bell, label: 'Live Notifications', page: 'notifications' as PageType },
    { icon: MapPin, label: 'Set Location', page: 'location' as PageType },
    { icon: Shield, label: 'Emergency Tips', page: 'emergency-tips' as PageType },
    { icon: Info, label: 'About Dashboard', page: 'dashboard' as PageType }
  ];

  const handleNavigation = (page: PageType) => {
    onNavigate(page);
    onClose(); // Close sidebar after navigation
  };

  const handleEmergencyCall = () => {
    // Simulate emergency call functionality
    alert('Emergency call initiated. Connecting to emergency services...');
  };

  const handleCloseEmergencyHelpline = () => {
    setShowEmergencyHelpline(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 transition-all duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 glass-effect border-r border-teal-200/30 shadow-2xl z-50 transform transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-teal-200/30">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-teal-400/20 transition-all duration-300 hover:scale-110"
          >
            <X className="h-5 w-5 text-cyan-300 hover:text-white" />
          </button>
        </div>
        
        <nav className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.page)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-teal-400/20 transition-all duration-300 group text-left hover:scale-105 hover:shadow-lg border border-transparent hover:border-teal-300/30"
                >
                  <item.icon className="h-5 w-5 text-teal-400 group-hover:text-cyan-300 transition-colors duration-300" />
                  <span className="text-white/90 group-hover:text-white font-medium drop-shadow-sm">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {showEmergencyHelpline && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="glass-effect border border-red-400/30 p-4 rounded-xl text-white relative hover:border-red-300/50 transition-all duration-300">
              <button
                onClick={handleCloseEmergencyHelpline}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-400/30 transition-all duration-300 hover:scale-110"
              >
                <X className="h-4 w-4 text-red-300 hover:text-white" />
              </button>
              <h3 className="font-semibold mb-1 text-red-200 drop-shadow-sm">Emergency Helpline</h3>
              <p className="text-sm opacity-90 mb-2 text-white/80">Call 108 for immediate assistance</p>
              <button
                onClick={handleEmergencyCall}
                className="w-full bg-red-500/20 border border-red-400/50 text-red-200 py-2 px-4 rounded-lg font-semibold hover:bg-red-400/30 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                🚨 Call Emergency
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;