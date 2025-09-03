import React from 'react';

const CelebrationModal = ({ 
  isVisible, 
  message, 
  onClose,
  type = 'success',
  autoClose = true 
}) => {
  React.useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, onClose]);
  
  if (!isVisible) return null;
  
  const icons = {
    success: '🎉',
    achievement: '🏆',
    star: '⭐',
    fire: '🔥'
  };
  
  return (
    <div className="celebration">
      <div className="celebration-content">
        <div className="text-6xl mb-4 animate-bounce">
          {icons[type]}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Parabéns!
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          {message}
        </p>
        <div className="flex justify-center space-x-2">
          <span className="text-2xl animate-pulse">🌟</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>🌟</span>
          <span className="text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>🌟</span>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;