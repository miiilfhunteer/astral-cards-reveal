
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface DailyCardProps {
  onRevealed: (revealed: boolean) => void;
  onPersonalReadingClick: () => void;
}

export const DailyCard: React.FC<DailyCardProps> = ({ onRevealed, onPersonalReadingClick }) => {
  const [step, setStep] = useState('initial'); // initial, preparing, revealing, revealed
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCTA, setShowCTA] = useState(false);

  // Карта дня - Шут
  const dailyCard = {
    name: "Шут",
    imageUrl: "https://static.tildacdn.com/tild6564-6365-4839-a538-366265396261/fool_with_label.jpg",
    description: "Вот Твоя Карта Дня, это - Шут: эта карта символизирует новые начинания и спонтанные решения. Сегодня стоит довериться своей интуиции и сделать шаг в неизвестность, который может привести к удивительным открытиям."
  };

  useEffect(() => {
    // Автоматически начинаем процесс при загрузке компонента
    setStep('preparing');
    
    // Показываем подготовительное сообщение
    setTimeout(() => {
      setStep('revealing');
    }, 3000);
  }, []);

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

  if (step === 'preparing') {
    return (
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center space-x-2 text-white hover:text-golden-400 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-sm">Звук {soundEnabled ? 'включен' : 'выключен'}</span>
          </button>
        </div>
        <p className="text-xl text-white mb-8 animate-pulse">
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
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl border border-golden-400/30 flex flex-col items-center justify-center p-4 rotate-y-180"
              style={{ 
                backfaceVisibility: 'hidden',
                backgroundImage: `url('${dailyCard.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
            </div>
          </div>
        </div>
        
        {step === 'revealing' && (
          <p className="text-white mt-4 animate-pulse">
            Нажмите на карту, чтобы увидеть ее значение
          </p>
        )}
      </div>

      {/* Card Description */}
      {step === 'revealed' && (
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-800/30">
            <p className="text-white leading-relaxed text-lg">{dailyCard.description}</p>
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
            <p className="text-white mb-6">
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
