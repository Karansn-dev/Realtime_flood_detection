import React, { useState, useEffect } from 'react';
import { Menu, Bell, Droplets, ArrowUp } from 'lucide-react';

import ScrollAnimations from './components/ScrollAnimations';
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
import RippleEffect from './components/RippleEffect';
import LocationAccessWidget from './components/LocationAccessWidget';

type PageType = 'dashboard' | 'ai-insights' | 'river-stats' | 'emergency-tips' | 'charts' | 'location' | 'notifications';

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  type NotificationType = {
    id: number;
    type: 'warning' | 'info' | 'success';
    message: string;
    time: string;
  };

  const [notifications, setNotifications] = useState<NotificationType[]>([
    { id: 1, type: 'warning', message: '⚠️ River rising at Kanpur – Take precautions', time: '2 min ago' },
    { id: 2, type: 'info', message: '🟡 Rainfall increasing at Patna', time: '5 min ago' },
    { id: 3, type: 'success', message: '✅ Water level stable at Allahabad', time: '10 min ago' }
  ]);
  const [notificationCount, setNotificationCount] = useState(0);

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
        type: (Math.random() > 0.5 ? 'warning' : 'info') as 'warning' | 'info' | 'success',
        message: randomMessage,
        time: 'Just now'
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setNotificationCount(prev => prev + 1);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  if (showLandingPage) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  if (currentPage === 'ai-insights') return <AIInsightsPage onBack={handleBackToDashboard} />;
  if (currentPage === 'river-stats') return <RiverStatsPage onBack={handleBackToDashboard} />;
  if (currentPage === 'emergency-tips') return <EmergencyTipsPage onBack={handleBackToDashboard} />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <ParticleSystem particleCount={40} color="#0ea5e9" className="opacity-60" />
      <RippleEffect intensity={1.2} color="#0ea5e9" />

      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/10 to-cyan-900/20 pointer-events-none -z-10"></div>

      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Menu className="h-6 w-6 text-white" />
              </button>
              <div className="flex items-center space-x-2">
                <Droplets className="h-8 w-8 text-cyan-400 animate-glow" />
                <h1 className="text-xl font-bold text-white drop-shadow">Bindu</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 glass-effect px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300 font-medium drop-shadow">Live Monitoring</span>
              </div>
              <button
                onClick={() => setNotificationOpen(true)}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <Bell className="h-6 w-6 text-white" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
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
        {/* Location Access Widget */}
        <div className="absolute top-0 right-4 sm:right-6 lg:right-8 z-30">
          <LocationAccessWidget className="w-64" />
        </div>

        <ScrollAnimations animation="fadeInUp" delay={100}>
          <section id="ai-insights" className="mt-20 sm:mt-8">
            <AIInsights />
          </section>
        </ScrollAnimations>

        <ScrollAnimations animation="fadeInUp" delay={200}>
          <section id="charts" className="mt-8">
            <DashboardCharts />
          </section>
        </ScrollAnimations>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <ScrollAnimations animation="fadeInLeft" delay={300}>
            <section id="location">
              <LocationWidget />
            </section>
          </ScrollAnimations>
          <ScrollAnimations animation="fadeInRight" delay={400}>
            <section id="stats">
              <ImpactSummary />
            </section>
          </ScrollAnimations>
        </div>

        <ScrollAnimations animation="fadeInUp" delay={500}>
          <section id="emergency" className="mt-8">
            <EmergencyTips />
          </section>
        </ScrollAnimations>
      </main>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 backdrop-blur-md bg-white/10 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigation}
      />

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
