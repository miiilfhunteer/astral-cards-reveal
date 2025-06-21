
import React, { useState, useEffect } from 'react';
import { DailyCard } from '@/components/DailyCard';
import { PersonalReading } from '@/components/PersonalReading';

const Index = () => {
  const [showPersonalReading, setShowPersonalReading] = useState(false);
  const [dailyCardRevealed, setDailyCardRevealed] = useState(false);
  const [showDailyCard, setShowDailyCard] = useState(false);

  const handleGetCard = () => {
    setShowDailyCard(true);
    // Scroll to the second screen with more padding for mobile
    setTimeout(() => {
      const secondScreen = document.getElementById('daily-card-section');
      if (secondScreen) {
        const yOffset = window.innerWidth <= 768 ? -100 : -50; // More offset for mobile
        const y = secondScreen.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 300);
  };

  const handlePersonalReadingClick = () => {
    setShowPersonalReading(true);
    // Scroll to personal reading form
    setTimeout(() => {
      const personalReadingForm = document.getElementById('personal-reading-form');
      if (personalReadingForm) {
        personalReadingForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* First Screen - Hero with Tarot Cards Background */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/lovable-uploads/4a22e54a-17ca-4595-8af8-3307c7f1b8b1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-sans font-light mb-6 text-white">
            Что покажут <em className="italic">ТВОИ</em> карты ТАРО?
          </h1>
          <p className="text-lg md:text-2xl font-sans text-gray-200 mb-12">
            Получи расклад прямо сейчас, в один клик. Узнай, что тебя ждёт!
          </p>
          
          <button
            onClick={handleGetCard}
            className="bg-white text-black font-sans font-medium text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 shimmer-button"
          >
            🔮 Получить расклад
          </button>
        </div>
      </section>

      {/* Second Screen - Daily Card with Mystical Girl Background */}
      {showDailyCard && (
        <section 
          id="daily-card-section"
          className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden py-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/lovable-uploads/25f2d21a-8752-4123-b12f-19566f7a677a.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <DailyCard 
            onRevealed={setDailyCardRevealed}
            onPersonalReadingClick={handlePersonalReadingClick}
          />
        </section>
      )}

      {/* Personal Reading Section */}
      {showPersonalReading && (
        <PersonalReading />
      )}
    </div>
  );
};

export default Index;
