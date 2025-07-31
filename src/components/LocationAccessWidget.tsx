import React, { useState, useEffect } from 'react';
import { MapPin, Check, X, AlertCircle } from 'lucide-react';

interface LocationAccessWidgetProps {
  className?: string;
}

const LocationAccessWidget: React.FC<LocationAccessWidgetProps> = ({ className = '' }) => {
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }

    setLocationStatus('requesting');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationStatus('granted');
      },
      (error) => {
        console.error('Location access denied:', error);
        setLocationStatus('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const getStatusIcon = () => {
    switch (locationStatus) {
      case 'granted':
        return <Check className="h-4 w-4 text-green-400" />;
      case 'denied':
        return <X className="h-4 w-4 text-red-400" />;
      case 'requesting':
        return <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />;
      default:
        return <MapPin className="h-4 w-4 text-cyan-400" />;
    }
  };

  const getStatusText = () => {
    switch (locationStatus) {
      case 'granted':
        return 'Location Enabled';
      case 'denied':
        return 'Location Denied';
      case 'requesting':
        return 'Requesting...';
      default:
        return 'Enable Location';
    }
  };

  const getStatusColor = () => {
    switch (locationStatus) {
      case 'granted':
        return 'text-green-300';
      case 'denied':
        return 'text-red-300';
      case 'requesting':
        return 'text-cyan-300';
      default:
        return 'text-cyan-300';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="glass-effect rounded-xl p-4 border border-teal-200/30 hover:border-teal-300/50 transition-all duration-500 water-shimmer group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <AlertCircle className="h-4 w-4" />
          </button>
        </div>

        {location && locationStatus === 'granted' && (
          <div className="text-xs text-cyan-200 mb-3">
            <div>Lat: {location.lat.toFixed(4)}</div>
            <div>Lng: {location.lng.toFixed(4)}</div>
          </div>
        )}

        <button
          onClick={requestLocation}
          disabled={locationStatus === 'requesting' || locationStatus === 'granted'}
          className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
            locationStatus === 'granted'
              ? 'bg-green-500/20 text-green-300 border border-green-400/30 cursor-not-allowed'
              : locationStatus === 'denied'
              ? 'bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30'
              : locationStatus === 'requesting'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 cursor-not-allowed'
              : 'bg-teal-500/20 text-teal-300 border border-teal-400/30 hover:bg-teal-500/30 hover:text-teal-200'
          }`}
        >
          {locationStatus === 'granted' ? 'Location Active' : 
           locationStatus === 'denied' ? 'Try Again' :
           locationStatus === 'requesting' ? 'Requesting...' : 'Enable Location'}
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full left-0 mt-2 w-64 p-3 glass-effect rounded-lg border border-teal-200/30 z-50">
            <p className="text-xs text-cyan-200">
              Enable location access to receive real-time flood alerts and personalized risk assessments for your area.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationAccessWidget;
