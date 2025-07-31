import React, { useEffect } from 'react';
import { X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: number;
  type: 'warning' | 'info' | 'success';
  message: string;
  time: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onClearCount: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  isOpen, 
  onClose, 
  notifications,
  onClearCount 
}) => {
  useEffect(() => {
    if (isOpen) {
      onClearCount();
    }
  }, [isOpen, onClearCount]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'glass-effect border-red-400/30 text-red-200 hover:border-red-300/50';
      case 'success':
        return 'glass-effect border-green-400/30 text-green-200 hover:border-green-300/50';
      default:
        return 'glass-effect border-cyan-400/30 text-cyan-200 hover:border-cyan-300/50';
    }
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
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 glass-effect border-l border-teal-200/30 shadow-2xl z-50 transform transition-all duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-teal-200/30">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">Live Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-teal-400/20 transition-all duration-300 hover:scale-110"
          >
            <X className="h-5 w-5 text-cyan-300 hover:text-white" />
          </button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto h-full pb-20">
          {notifications.length === 0 ? (
            <div className="text-center text-cyan-300 mt-8">
              <Clock className="h-12 w-12 mx-auto mb-4 text-teal-400 animate-pulse" />
              <p className="text-white/80">No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border animate-slideIn transition-all duration-300 hover:scale-105 hover:shadow-lg ${getNotificationStyle(notification.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium drop-shadow-sm">{notification.message}</p>
                      <p className="text-xs opacity-70 mt-1 text-white/60">{notification.time}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;