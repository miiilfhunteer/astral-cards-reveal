
import React, { useState, useEffect } from 'react';
import { DailyCard } from '@/components/DailyCard';
import { PersonalReading } from '@/components/PersonalReading';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [showPersonalReading, setShowPersonalReading] = useState(false);
  const [dailyCardRevealed, setDailyCardRevealed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      <Header />
      
      {/* Hero Section with Daily Card */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Background mystical elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-golden-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-purple-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-golden-300 rotate-45 animate-pulse delay-500"></div>
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light mb-4 bg-gradient-to-r from-golden-400 via-purple-300 to-golden-400 bg-clip-text text-transparent animate-fade-in">
            Узнай, что готовит тебе день
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-12 animate-fade-in delay-500">
            Позволь картам раскрыть тайны сегодняшнего дня
          </p>
          
          <DailyCard 
            onRevealed={setDailyCardRevealed}
            onPersonalReadingClick={() => setShowPersonalReading(true)}
          />
        </div>
      </section>

      {/* Personal Reading Section */}
      {showPersonalReading && (
        <PersonalReading />
      )}

      <Footer />
    </div>
  );
};

export default Index;
