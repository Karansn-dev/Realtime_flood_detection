import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, MapPin, AlertTriangle, TrendingUp, Droplets, Zap, Clock, Users, Shield, Building } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardCharts from './components/DashboardCharts';
import LocationWidget from './components/LocationWidget';
import NotificationPanel from './components/NotificationPanel';
import AIInsights from './components/AIInsights';
import ImpactSummary from './components/ImpactSummary';
import EmergencyTips from './components/EmergencyTips';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: '⚠️ River rising at Kanpur – Take precautions', time: '2 min ago' },
    { id: 2, type: 'info', message: '🟡 Rainfall increasing at Patna', time: '5 min ago' },
    { id: 3, type: 'success', message: '✅ Water level stable at Allahabad', time: '10 min ago' }
  ]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotifications = [
        '🔴 High water level detected at Varanasi',
        '⚠️ LiDAR sensors detecting rapid rise upstream',
        '🟡 Moderate rainfall predicted in next 2 hours',
        '📊 AI model confidence increased to 87%',
        '🌊 Flow velocity increasing at monitoring station 3',
        '🚨 Emergency teams dispatched to Zone A'
      ];
      
      const randomMessage = newNotifications[Math.floor(Math.random() * newNotifications.length)];
      const newNotification = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'warning' : 'info',
        message: randomMessage,
        time: 'Just now'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setNotificationCount(prev => prev + 1);
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Menu className="h-6 w-6 text-blue-700" />
              </button>
              <div className="flex items-center space-x-2">
                <Droplets className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Ganga Flood Monitor</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Live Monitoring</span>
              </div>
              <button
                onClick={() => setNotificationOpen(true)}
                className="relative p-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Bell className="h-6 w-6 text-blue-700" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights */}
        <AIInsights />
        
        {/* Dashboard Charts */}
        <DashboardCharts />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Location Widget */}
          <LocationWidget />
          
          {/* Impact Summary */}
          <ImpactSummary />
        </div>
        
        {/* Emergency Tips */}
        <EmergencyTips />
      </main>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Notifications Panel */}
      <NotificationPanel 
        isOpen={notificationOpen} 
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        onClearCount={() => setNotificationCount(0)}
      />
    </div>
  );
}

export default App;