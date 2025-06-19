
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { tarotCards } from '@/data/tarotCards';
import { Volume2, VolumeX } from 'lucide-react';

interface DailyCardProps {
  onRevealed: (revealed: boolean) => void;
  onPersonalReadingClick: () => void;
}

export const DailyCard: React.FC<DailyCardProps> = ({ onRevealed, onPersonalReadingClick }) => {
  const [step, setStep] = useState('initial'); // initial, preparing, revealing, revealed
  const [dailyCard, setDailyCard] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCTA, setShowCTA] = useState(false);

  const handleGetCard = () => {
    setStep('preparing');
    // Scroll down smoothly
    setTimeout(() => {
      window.scrollTo({ 
        top: window.innerHeight * 0.8, 
        behavior: 'smooth' 
      });
    }, 500);

    // Show preparing message
    setTimeout(() => {
      setStep('revealing');
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setDailyCard(randomCard);
    }, 3000);
  };

  const handleCardClick = () => {
    if (step === 'revealing') {
      // Play flip sound if enabled
      if (soundEnabled) {
        const audio = new Audio('/sounds/card-flip.mp3');
        audio.play().catch(() => {
          // Handle audio play failure silently
        });
      }
      
      setStep('revealed');
      onRevealed(true);
      
      // Show CTA after a delay
      setTimeout(() => {
        setShowCTA(true);
      }, 2000);
    }
  };

  if (step === 'initial') {
    return (
      <div className="text-center animate-fade-in">
        <Button 
          onClick={handleGetCard}
          className="bg-gradient-to-r from-golden-600 to-golden-400 hover:from-golden-700 hover:to-golden-500 text-black font-medium text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Получить карту дня
        </Button>
      </div>
    );
  }

  if (step === 'preparing') {
    return (
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center space-x-2 text-purple-200 hover:text-golden-400 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-sm">Звук {soundEnabled ? 'включен' : 'выключен'}</span>
          </button>
        </div>
        <p className="text-xl text-purple-200 mb-8 animate-pulse">
          Сейчас появится ваша Карта Дня,<br />
          пожалуйста, включите звук чтобы прочувствовать момент
        </p>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-golden-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      {/* Card Display */}
      <div className="mb-8">
        <div 
          className="relative mx-auto w-64 h-96 cursor-pointer group"
          onClick={handleCardClick}
          style={{ perspective: '1000px' }}
        >
          <div className={`relative w-full h-full transition-transform duration-1000 ${step === 'revealed' ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
            {/* Card Back */}
            <div 
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-2xl border border-golden-400/30 flex items-center justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-golden-400/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-golden-400/40 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-golden-400 rounded-full"></div>
                  </div>
                </div>
                <p className="text-golden-400 font-light">Таро</p>
              </div>
            </div>
            
            {/* Card Front */}
            {dailyCard && (
              <div 
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-2xl border border-golden-400/30 flex flex-col items-center justify-center p-6 rotate-y-180"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-6xl mb-4">{dailyCard.symbol}</div>
                <h3 className="text-xl font-light text-golden-400 mb-2">{dailyCard.name}</h3>
                <p className="text-purple-200 text-center text-sm leading-relaxed">{dailyCard.meaning}</p>
              </div>
            )}
          </div>
        </div>
        
        {step === 'revealing' && (
          <p className="text-purple-200 mt-4 animate-pulse">
            Нажмите на карту, чтобы увидеть ее значение
          </p>
        )}
      </div>

      {/* Card Description */}
      {step === 'revealed' && dailyCard && (
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
          <h2 className="text-2xl font-light text-golden-400 mb-4">
            Вот Твоя Карта Дня
          </h2>
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-800/30">
            <h3 className="text-xl text-purple-200 mb-3">
              <span className="text-golden-400">{dailyCard.name}</span>
            </h3>
            <p className="text-purple-100 leading-relaxed">{dailyCard.dailyMessage}</p>
          </div>
        </div>
      )}

      {/* CTA for Personal Reading */}
      {showCTA && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-8 border border-golden-400/30">
            <h3 className="text-2xl font-light text-golden-400 mb-4">
              Хочешь узнать больше?
            </h3>
            <p className="text-purple-200 mb-6">
              Получи персональный расклад под свою ситуацию
            </p>
            <Button 
              onClick={onPersonalReadingClick}
              className="bg-gradient-to-r from-golden-600 to-golden-400 hover:from-golden-700 hover:to-golden-500 text-black font-medium text-lg px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Получить персональный расклад
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
