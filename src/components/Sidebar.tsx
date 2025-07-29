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
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <nav className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.page)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group text-left"
                >
                  <item.icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {showEmergencyHelpline && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white relative">
              <button
                onClick={handleCloseEmergencyHelpline}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-400 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
              <h3 className="font-semibold mb-1">Emergency Helpline</h3>
              <p className="text-sm opacity-90 mb-2">Call 108 for immediate assistance</p>
              <button
                onClick={handleEmergencyCall}
                className="w-full bg-white text-red-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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