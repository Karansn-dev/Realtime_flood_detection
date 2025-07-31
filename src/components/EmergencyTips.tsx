import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Phone, MapPin } from 'lucide-react';

const EmergencyTips: React.FC = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const emergencyData = {
    before: [
      'Create an emergency kit with essentials (water, food, first aid)',
      'Identify safe evacuation routes and higher ground locations',
      'Keep important documents in waterproof containers',
      'Sign up for local emergency alerts and notifications',
      'Prepare a communication plan with family members'
    ],
    during: [
      'Move to higher ground immediately if water is rising',
      'Avoid walking or driving through flood water',
      'Stay tuned to emergency broadcasts and official updates',
      'Call for help only if in immediate danger',
      'Do not attempt to save belongings if it risks your safety'
    ],
    after: [
      'Wait for authorities to declare areas safe before returning',
      'Be aware of contaminated flood water and damaged infrastructure',
      'Document damage with photos for insurance claims',
      'Clean and disinfect everything that came in contact with flood water',
      'Seek medical attention if you feel unwell'
    ]
  };

  const helplines = [
    { name: 'National Emergency', number: '108', description: 'Medical & Fire Emergency' },
    { name: 'Disaster Management', number: '1070', description: 'Flood & Natural Disasters' },
    { name: 'Police Emergency', number: '100', description: 'Police Assistance' },
    { name: 'Women Helpline', number: '1091', description: 'Women in Distress' }
  ];

  const safeZones = [
    { name: 'Community Center - Sector 15', distance: '2.3 km', capacity: '500 people' },
    { name: 'Government School - Civil Lines', distance: '3.1 km', capacity: '300 people' },
    { name: 'Stadium Complex - Main Road', distance: '4.2 km', capacity: '1000 people' },
    { name: 'Hospital - Emergency Wing', distance: '1.8 km', capacity: '200 people' }
  ];

  return (
    <div id="emergency" className="mt-8 glass-effect rounded-xl p-6 shadow-2xl border border-white/20 hover-lift card-hover">
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse-slow" />
        <h3 className="text-lg font-semibold text-white drop-shadow-lg">Emergency Preparedness Guide</h3>
      </div>

      {/* Emergency Actions */}
      <div className="space-y-4 mb-8">
        {/* Before Flood */}
        <div className="glass-effect border border-white/20 rounded-lg hover-lift">
          <button
            onClick={() => toggleSection('before')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-all duration-300"
          >
            <span className="font-medium text-white drop-shadow">Before Flood - Preparation</span>
            {openSections.before ? 
              <ChevronDown className="h-5 w-5 text-gray-300" /> : 
              <ChevronRight className="h-5 w-5 text-gray-300" />
            }
          </button>
          {openSections.before && (
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {emergencyData.before.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* During Flood */}
        <div className="glass-effect border border-white/20 rounded-lg hover-lift">
          <button
            onClick={() => toggleSection('during')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-all duration-300"
          >
            <span className="font-medium text-white drop-shadow">During Flood - Safety Actions</span>
            {openSections.during ? 
              <ChevronDown className="h-5 w-5 text-gray-300" /> : 
              <ChevronRight className="h-5 w-5 text-gray-300" />
            }
          </button>
          {openSections.during && (
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {emergencyData.during.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* After Flood */}
        <div className="glass-effect border border-white/20 rounded-lg hover-lift">
          <button
            onClick={() => toggleSection('after')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-all duration-300"
          >
            <span className="font-medium text-white drop-shadow">After Flood - Recovery</span>
            {openSections.after ? 
              <ChevronDown className="h-5 w-5 text-gray-300" /> : 
              <ChevronRight className="h-5 w-5 text-gray-300" />
            }
          </button>
          {openSections.after && (
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {emergencyData.after.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Helplines */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="h-5 w-5 text-cyan-400 animate-pulse-slow" />
            <h4 className="font-semibold text-white drop-shadow">Emergency Helplines</h4>
          </div>
          <div className="space-y-3">
            {helplines.map((helpline, index) => (
              <div key={index} className="glass-effect p-3 rounded-lg border border-white/20 hover-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white drop-shadow">{helpline.name}</p>
                    <p className="text-sm text-gray-300">{helpline.description}</p>
                  </div>
                  <a 
                    href={`tel:${helpline.number}`}
                    className="glass-effect text-white px-3 py-1 rounded-full text-sm font-medium hover:scale-110 transition-all duration-300 border border-white/20 shadow-lg"
                  >
                    {helpline.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Safe Zones */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-green-400 animate-pulse-slow" />
            <h4 className="font-semibold text-white drop-shadow">Nearby Safe Zones</h4>
          </div>
          <div className="space-y-3">
            {safeZones.map((zone, index) => (
              <div key={index} className="glass-effect p-3 rounded-lg border border-white/20 hover-lift">
                <p className="font-medium text-white drop-shadow">{zone.name}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-300">{zone.distance} away</span>
                  <span className="text-xs glass-effect text-green-300 px-2 py-1 rounded-full border border-white/20">
                    {zone.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyTips;