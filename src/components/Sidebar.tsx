import React from 'react';
import { X, BarChart3, AlertTriangle, Bell, MapPin, Shield, Info } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: BarChart3, label: 'River Stats', href: '#stats' },
    { icon: AlertTriangle, label: 'Flood Risk Charts', href: '#charts' },
    { icon: Bell, label: 'Live Notifications', href: '#notifications' },
    { icon: MapPin, label: 'Set Location', href: '#location' },
    { icon: Shield, label: 'Emergency Tips', href: '#emergency' },
    { icon: Info, label: 'About Dashboard', href: '#about' }
  ];

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
                <a
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-lg text-white">
            <h3 className="font-semibold mb-1">Emergency Helpline</h3>
            <p className="text-sm opacity-90">Call 108 for immediate assistance</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;