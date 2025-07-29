import React from 'react';
import { Users, Shield, Building } from 'lucide-react';

const ImpactSummary: React.FC = () => {
  const impactGroups = [
    {
      icon: Users,
      title: 'Citizens',
      benefits: [
        'Get real-time flood alerts on mobile devices',
        'Access safe evacuation routes and shelters',
        'Receive emergency preparedness tips',
        'Reduced panic with accurate information'
      ],
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Shield,
      title: 'Disaster Response Teams',
      benefits: [
        'Access real-time zone risk maps',
        'Prioritize rescue operations effectively',
        'Coordinate using geo-located dashboards',
        'Deploy resources based on AI predictions'
      ],
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Building,
      title: 'Urban Planners & Authorities',
      benefits: [
        'Use historical data for smart city planning',
        'Design resilient drainage systems',
        'Create flood-resistant infrastructure',
        'Make data-driven policy decisions'
      ],
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Impact Summary for Stakeholders</h3>
      
      <div className="space-y-6">
        {impactGroups.map((group, index) => (
          <div key={index} className={`p-4 rounded-lg ${group.bg}`}>
            <div className="flex items-center space-x-3 mb-3">
              <group.icon className={`h-6 w-6 ${group.color}`} />
              <h4 className={`font-semibold ${group.color}`}>{group.title}</h4>
            </div>
            <ul className="space-y-2">
              {group.benefits.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="text-sm text-gray-700 flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white">
        <h4 className="font-semibold mb-2">Total Impact</h4>
        <p className="text-sm opacity-90">
          Protecting over 50+ million people living along the Ganga basin with AI-powered early warning systems
        </p>
      </div>
    </div>
  );
};

export default ImpactSummary;