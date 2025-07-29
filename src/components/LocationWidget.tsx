import React, { useState } from 'react';
import { MapPin, Crosshair, AlertTriangle, CheckCircle } from 'lucide-react';

const LocationWidget: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high' | null>(null);
  const [loading, setLoading] = useState(false);

  const checkFloodRisk = (locationName: string) => {
    // Simulate flood risk assessment
    const risks = ['low', 'medium', 'high'] as const;
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    setRiskLevel(randomRisk);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      checkFloodRisk(location);
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
          checkFloodRisk('Current Location');
          setLoading(false);
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
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', message: 'Low flood risk - Area is relatively safe' };
      case 'medium':
        return { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', message: 'Medium flood risk - Monitor conditions' };
      case 'high':
        return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', message: 'High flood risk - Take immediate precautions' };
      default:
        return null;
    }
  };

  const riskInfo = getRiskMessage();

  return (
    <div id="location" className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Check Flood Risk at Your Location</h3>
      </div>

      <form onSubmit={handleLocationSubmit} className="space-y-4">
        <div>
          <label htmlFor="location-input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter City/District
          </label>
          <input
            id="location-input"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Varanasi, Kanpur, Allahabad"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Check Risk Level
          </button>
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Crosshair className="h-4 w-4" />
            <span>{loading ? 'Getting Location...' : 'Use My Location'}</span>
          </button>
        </div>
      </form>

      {/* Risk Display */}
      {riskInfo && (
        <div className={`mt-6 p-4 rounded-lg ${riskInfo.bg} animate-fadeIn`}>
          <div className="flex items-center space-x-3">
            <riskInfo.icon className={`h-6 w-6 ${riskInfo.color}`} />
            <div>
              <p className={`font-semibold ${riskInfo.color}`}>
                {location || 'Selected Location'}
              </p>
              <p className="text-gray-700 text-sm mt-1">{riskInfo.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mini Map Placeholder */}
      <div className="mt-6 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Interactive map integration</p>
          <p className="text-xs">(Google Maps/Leaflet would be integrated here)</p>
          {currentLocation && (
            <p className="text-xs mt-2 font-mono">
              Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationWidget;