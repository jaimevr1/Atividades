import React from 'react';

const Card = ({ 
  children, 
  interactive = false, 
  className = '', 
  onClick,
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'card bg-white rounded-2xl p-6 transition-all duration-300';
  const interactiveClasses = interactive ? 'card-interactive cursor-pointer hover:transform hover:-translate-y-3' : 'hover:transform hover:-translate-y-2';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-purple-50' : '';
  
  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${gradientClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;