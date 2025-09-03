import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  max = 100, 
  showLabel = true, 
  label,
  color = 'primary',
  size = 'md',
  animated = true,
  className = '' 
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));
  
  const colors = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    error: 'bg-gradient-to-r from-red-500 to-pink-500'
  };
  
  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };
  
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || `Progresso: ${Math.round(percentage)}%`}
          </span>
          <span className="text-sm text-gray-500">
            {progress}/{max}
          </span>
        </div>
      )}
      <div className={`progress-bar bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`progress-fill ${colors[color]} ${sizes[size]} ${animated ? 'transition-all duration-500 ease-out' : ''} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;