import React from 'react';

const Badge = ({ 
  children, 
  type = 'bronze', 
  icon, 
  size = 'md',
  className = '' 
}) => {
  const baseClasses = 'badge inline-flex items-center rounded-full font-semibold';
  
  const types = {
    bronze: 'badge-bronze bg-orange-100 text-orange-800 border-2 border-orange-200',
    silver: 'badge-silver bg-gray-100 text-gray-800 border-2 border-gray-200',
    gold: 'badge-gold bg-yellow-100 text-yellow-800 border-2 border-yellow-200',
    speed: 'badge-speed bg-purple-100 text-purple-800 border-2 border-purple-200'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return (
    <span className={`${baseClasses} ${types[type]} ${sizes[size]} ${className}`}>
      {icon && <span className="mr-1 text-lg">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;