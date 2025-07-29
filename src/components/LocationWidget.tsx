import React, { useState, useEffect } from 'react';
import { MapPin, Crosshair, AlertTriangle, CheckCircle, Activity, Shield, Clock, TrendingUp } from 'lucide-react';

const LocationWidget: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high' | null>(null);
  const [loading, setLoading] = useState(false);
  const [liveStats, setLiveStats] = useState({
    nearbySensors: 0,
    lastUpdate: '',
    coverageRadius: '',
    activeAlerts: 0
  });

  useEffect(() => {
    // Simulate live stats updates
    const updateLiveStats = () => {
      setLiveStats({
        nearbySensors: Math.floor(Math.random() * 20) + 5,
        lastUpdate: `${Math.floor(Math.random() * 10) + 1} min ago`,
        coverageRadius: `${Math.floor(Math.random() * 50) + 10} km`,
        activeAlerts: Math.floor(Math.random() * 5)
      });
    };

    updateLiveStats();
    const interval = setInterval(updateLiveStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkFloodRisk = (locationName: string) => {
    // Simulate flood risk assessment with more realistic data
    const risks = ['low', 'medium', 'high'] as const;
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    setRiskLevel(randomRisk);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        checkFloodRisk(location);
        setLoading(false);
      }, 1500);
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocation('Current Location');
          setTimeout(() => {
            checkFloodRisk('Current Location');
            setLoading(false);
          }, 1000);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      setLoading(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getRiskMessage = () => {
    switch (riskLevel) {
      case 'low':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bg: 'bg-green-50',
          border: 'border-green-100',
          message: 'Low flood risk - Area is relatively safe',
          recommendation: 'Continue normal activities, monitor weather updates'
        };
      case 'medium':
        return { 
          icon: AlertTriangle, 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-50',
          border: 'border-yellow-100',
          message: 'Medium flood risk - Monitor conditions',
          recommendation: 'Stay alert, prepare emergency kit, avoid low-lying areas'
        };
      case 'high':
        return { 
          icon: AlertTriangle, 
          color: 'text-red-600', 
          bg: 'bg-red-50',
          border: 'border-red-100',
          message: 'High flood risk - Take immediate precautions',
          recommendation: 'Evacuate if necessary, follow emergency protocols'
        };
      default:
        return null;
    }
  };

  const riskInfo = getRiskMessage();

  return (
    <div id="location" className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Check Flood Risk at Your Location</h3>
            <p className="text-xs text-gray-600">Real-time risk assessment using AI and sensor data</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 px-2 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-700 font-medium">LIVE</span>
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-blue-600 text-xs font-medium">Nearby Sensors</div>
              <div className="text-lg font-bold text-blue-700">{liveStats.nearbySensors}</div>
            </div>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-green-600 text-xs font-medium">Last Update</div>
              <div className="text-sm font-bold text-green-700">{liveStats.lastUpdate}</div>
            </div>
            <Clock className="h-5 w-5 text-green-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-600 text-xs font-medium">Coverage</div>
              <div className="text-sm font-bold text-purple-700">{liveStats.coverageRadius}</div>
            </div>
            <Shield className="h-5 w-5 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-orange-600 text-xs font-medium">Active Alerts</div>
              <div className="text-lg font-bold text-orange-700">{liveStats.activeAlerts}</div>
            </div>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </div>

      <form onSubmit={handleLocationSubmit} className="space-y-3">
        <div>
          <label htmlFor="location-input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter City/District
          </label>
          <div className="relative">
            <input
              id="location-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Varanasi, Kanpur, Allahabad"
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Checking Risk...</span>
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                <span>Check Risk Level</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Crosshair className="h-4 w-4" />
            <span>{loading ? 'Getting Location...' : 'Use My Location'}</span>
          </button>
        </div>
      </form>

      {/* Risk Display */}
      {riskInfo && (
        <div className={`mt-4 p-4 rounded-lg border ${riskInfo.bg} ${riskInfo.border} animate-fadeIn shadow-md`}>
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${riskInfo.bg} ${riskInfo.border}`}>
              <riskInfo.icon className={`h-5 w-5 ${riskInfo.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className={`font-semibold text-base ${riskInfo.color}`}>
                  {location || 'Selected Location'}
                </p>
                <TrendingUp className={`h-4 w-4 ${riskInfo.color} animate-pulse`} />
              </div>
              <p className="text-sm text-gray-700 mb-1">{riskInfo.message}</p>
              <p className="text-xs text-gray-600 font-medium">Recommendation: {riskInfo.recommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Map Placeholder */}
      <div className="mt-4 bg-gray-50 rounded-lg h-40 flex items-center justify-center border border-gray-200">
        <div className="text-center text-gray-500">
          <div className="relative mb-3">
            <MapPin className="h-10 w-10 mx-auto text-gray-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm font-medium">Interactive Map Integration</p>
          <p className="text-xs mt-1">(Google Maps/Leaflet would be integrated here)</p>
          {currentLocation && (
            <div className="mt-2 p-2 bg-white rounded shadow-sm">
              <p className="text-xs font-mono text-gray-600">
                Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationWidget;