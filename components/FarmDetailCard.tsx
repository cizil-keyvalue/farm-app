import React from 'react';

interface FarmDetailCardProps {
  title: string;
  value: string | number;
  iconColor: 'blue' | 'green' | 'yellow';
  iconPath: string;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600'
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600'
  }
};

export default function FarmDetailCard({ title, value, iconColor, iconPath }: FarmDetailCardProps) {
  const colors = colorClasses[iconColor];
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}>
          <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 ml-3">{title}</h3>
      </div>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}
