import React, { useState, useEffect } from 'react';

const AudioController = ({ 
  backgroundMusicFiles = [],
  volume = 0.15,
  autoPlay = true 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  
  useEffect(() => {
    if (backgroundMusicFiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * backgroundMusicFiles.length);
      const audio = new Audio(backgroundMusicFiles[randomIndex]);
      audio.volume = volume;
      audio.loop = true;
      setCurrentAudio(audio);
      
      if (autoPlay) {
        audio.play().catch(() => {
          console.log('Auto-play blocked, waiting for user interaction');
        });
        setIsPlaying(true);
      }
    }
    
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, []);
  
  const toggleMusic = () => {
    if (!currentAudio) return;
    
    if (isPlaying) {
      currentAudio.pause();
      setIsPlaying(false);
    } else {
      currentAudio.play().catch(() => {
        console.log('Could not play audio');
      });
      setIsPlaying(true);
    }
  };
  
  return (
    <button
      onClick={toggleMusic}
      className="audio-control"
      title={isPlaying ? 'Pausar música' : 'Tocar música'}
    >
      <div className="w-6 h-6 text-purple-600">
        {isPlaying ? (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </div>
    </button>
  );
};

export default AudioController;