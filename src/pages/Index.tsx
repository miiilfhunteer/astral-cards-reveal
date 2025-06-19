
import React, { useState, useEffect } from 'react';
import { DailyCard } from '@/components/DailyCard';
import { PersonalReading } from '@/components/PersonalReading';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [showPersonalReading, setShowPersonalReading] = useState(false);
  const [dailyCardRevealed, setDailyCardRevealed] = useState(false);
  const [showDailyCard, setShowDailyCard] = useState(false);

  const handleGetCard = () => {
    setShowDailyCard(true);
    // Scroll to the second screen
    setTimeout(() => {
      const secondScreen = document.getElementById('daily-card-section');
      if (secondScreen) {
        secondScreen.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* First Screen - Hero with Tarot Cards Background */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/4a22e54a-17ca-4595-8af8-3307c7f1b8b1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light mb-6 text-white animate-fade-in">
            Что покажут ТВОИ карты ТАРО?
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 animate-fade-in delay-500">
            Получи расклад прямо сейчас, в один клик. Узнай, что тебя ждёт!
          </p>
          
          <button
            onClick={handleGetCard}
            className="bg-white text-black font-medium text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in delay-1000"
          >
            🔮 Получить расклад
          </button>
        </div>
      </section>

      {/* Second Screen - Daily Card with Mystical Girl Background */}
      {showDailyCard && (
        <section 
          id="daily-card-section"
          className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/lovable-uploads/25f2d21a-8752-4123-b12f-19566f7a677a.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <DailyCard 
            onRevealed={setDailyCardRevealed}
            onPersonalReadingClick={() => setShowPersonalReading(true)}
          />
        </section>
      )}

      {/* Personal Reading Section */}
      {showPersonalReading && (
        <PersonalReading />
      )}

      <Footer />
    </div>
  );
};

export default Index;
