import React, { useState, useEffect } from 'react';
import { Menu, Bell, Droplets, ArrowUp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardCharts from './components/DashboardCharts';
import LocationWidget from './components/LocationWidget';
import NotificationPanel from './components/NotificationPanel';
import AIInsights from './components/AIInsights';
import ImpactSummary from './components/ImpactSummary';
import EmergencyTips from './components/EmergencyTips';
import LandingPage from './components/LandingPage';
import AIInsightsPage from './components/AIInsightsPage';
import RiverStatsPage from './components/RiverStatsPage';
import EmergencyTipsPage from './components/EmergencyTipsPage';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleSystem from './components/ParticleSystem';
import LocationAccessWidget from './components/LocationAccessWidget';

type PageType = 'dashboard' | 'ai-insights' | 'river-stats' | 'emergency-tips' | 'charts' | 'location' | 'notifications';

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning' as const, message: '⚠️ River rising at Kanpur – Take precautions', time: '2 min ago' },
    { id: 2, type: 'info' as const, message: '🟡 Rainfall increasing at Patna', time: '5 min ago' },
    { id: 3, type: 'success' as const, message: '✅ Water level stable at Allahabad', time: '10 min ago' }
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
        type: (Math.random() > 0.5 ? 'warning' : 'info') as 'warning' | 'info',
        message: randomMessage,
        time: 'Just now'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setNotificationCount(prev => prev + 1);
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterApp = () => {
    setShowLandingPage(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  // Show landing page if showLandingPage is true
  if (showLandingPage) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  // Render different pages based on currentPage
  if (currentPage === 'ai-insights') {
    return <AIInsightsPage onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'river-stats') {
    return <RiverStatsPage onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'emergency-tips') {
    return <EmergencyTipsPage onBack={handleBackToDashboard} />;
  }

  // Main Dashboard
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Particle System */}
      <ParticleSystem particleCount={30} color="#14b8a6" className="opacity-60" />
      
      {/* Content Overlay */}
      <div className="relative z-20 min-h-screen bg-gradient-to-br from-slate-900/10 via-transparent to-teal-900/20">
      {/* Header */}
      <header className="glass-effect border-b border-teal-200/30 sticky top-0 z-50 water-shimmer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-teal-500/20 transition-all duration-300 hover:scale-105 border border-transparent hover:border-teal-400/30"
              >
                <Menu className="h-6 w-6 text-cyan-300 hover:text-cyan-200 transition-colors" />
              </button>
              <div className="flex items-center space-x-2">
                <Droplets className="h-8 w-8 text-teal-400 animate-pulse-slow" />
                <h1 className="text-xl font-bold text-white drop-shadow-lg">Bindu</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 hover:bg-green-500/30 transition-all duration-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-sm text-green-300 font-medium">Live Monitoring</span>
              </div>
              <button
                onClick={() => setNotificationOpen(true)}
                className="relative p-2 rounded-lg hover:bg-teal-500/20 transition-all duration-300 hover:scale-105 border border-transparent hover:border-teal-400/30"
              >
                <Bell className="h-6 w-6 text-cyan-300 hover:text-cyan-200 transition-colors" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500/90 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse border border-red-400/50 shadow-lg shadow-red-500/50">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Location Access Widget - Top Right */}
        <div className="absolute top-0 right-4 sm:right-6 lg:right-8 z-30">
          <LocationAccessWidget className="w-64" />
        </div>
        
        {/* AI Insights */}
        <section id="ai-insights" className="mt-20 sm:mt-8">
          <AIInsights />
        </section>
        
        {/* Dashboard Charts */}
        <section id="charts" className="mt-8">
          <DashboardCharts />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Location Widget */}
          <section id="location">
            <LocationWidget />
          </section>
          
          {/* Impact Summary */}
          <section id="stats">
            <ImpactSummary />
          </section>
        </div>
        
        {/* Emergency Tips */}
        <section id="emergency" className="mt-8">
          <EmergencyTips />
        </section>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigation}
      />
      
      {/* Notifications Panel */}
      <NotificationPanel 
        isOpen={notificationOpen} 
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        onClearCount={() => setNotificationCount(0)}
      />
      </div>
    </div>
  );
}

export default App;