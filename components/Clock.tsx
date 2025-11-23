
import React, { useState, useEffect } from 'react';
import { TranslationType } from '../translations';
import { Language } from '../types';

interface ClockProps {
  name?: string;
  t: TranslationType;
  hasCustomWallpaper: boolean;
  language: Language;
}

export const Clock: React.FC<ClockProps> = ({ name, t, hasCustomWallpaper, language }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    // Force 24h format for a cleaner look, or adapt based on preference. 
    // Using default browser locale behavior for time format usually works best for user expectation.
    return date.toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 5) return t.goodEvening; // Late night logic
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
  };

  // Adaptive Styles Logic
  // If wallpaper is present: Use White text with strong Drop Shadow for contrast
  // If default: Use standard Theme colors (Dark/Light)
  const titleClass = hasCustomWallpaper
    ? "text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
    : "text-gray-800 dark:text-zinc-50";

  const textClass = hasCustomWallpaper
    ? "text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
    : "text-gray-500 dark:text-zinc-400";

  return (
    <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-top-4 duration-1000 select-none">
      {/* Time */}
      <h2 className={`text-7xl md:text-8xl font-[200] tracking-tighter mb-2 tabular-nums transition-colors duration-500 ${titleClass}`}>
        {formatTime(time)}
      </h2>
      
      {/* Date & Greeting Container */}
      <div className={`flex flex-col items-center gap-1 transition-colors duration-500 ${textClass}`}>
        {/* Date */}
        <p className="text-lg md:text-xl font-light tracking-wide opacity-95">
          {formatDate(time)}
        </p>
        
        {/* Greeting */}
        <p className="text-base font-normal opacity-80 mt-1">
           {getGreeting()}{name ? `, ${name}` : ''}
        </p>
      </div>
    </div>
  );
};
