
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { getRandomDailyCard } from '@/data/dailyCards';

interface DailyCardProps {
  onRevealed: (revealed: boolean) => void;
  onPersonalReadingClick: () => void;
}

export const DailyCard: React.FC<DailyCardProps> = ({ onRevealed, onPersonalReadingClick }) => {
  const [step, setStep] = useState('initial'); // initial, preparing, revealing, revealed
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCTA, setShowCTA] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    // Выбираем случайную карту при загрузке
    const randomCard = getRandomDailyCard();
    console.log('DailyCard: Selected random card:', randomCard);
    setSelectedCard(randomCard);
    
    // Автоматически начинаем процесс при загрузке компонента
    setStep('preparing');
    
    // Показываем подготовительное сообщение
    setTimeout(() => {
      setStep('revealing');
    }, 3000);
  }, []);

  const handleCardClick = () => {
    if (step === 'revealing') {
      console.log('DailyCard: Card clicked, revealing card');
      // Play flip sound if enabled
      if (soundEnabled) {
        const audio = new Audio('/sounds/card-flip.mp3');
        audio.play().catch(() => {
          // Handle audio play failure silently
        });
      }
      
      setStep('revealed');
      onRevealed(true);
      
      // Show CTA after a delay and scroll to bottom
      setTimeout(() => {
        setShowCTA(true);
        // Scroll to bottom of page to show the CTA
        setTimeout(() => {
          window.scrollTo({ 
            top: document.body.scrollHeight, 
            behavior: 'smooth' 
          });
        }, 500);
      }, 2000);
    }
  };

  if (step === 'preparing') {
    return (
      <div className="text-center px-4">
        <div className="flex items-center justify-center mb-6">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center space-x-2 text-white hover:text-golden-400 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-sm">Звук {soundEnabled ? 'включен' : 'выключен'}</span>
          </button>
        </div>
        <p className="text-lg md:text-xl text-white mb-8 animate-pulse">
          Сейчас появится ваша Карта Дня,<br />
          пожалуйста, включите звук чтобы прочувствовать момент
        </p>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-golden-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!selectedCard) return null;

  return (
    <div className="text-center w-full max-w-4xl mx-auto px-4">
      {/* Card Display */}
      <div className="mb-6 md:mb-8">
        <div 
          className="relative mx-auto w-48 h-72 sm:w-56 sm:h-84 md:w-64 md:h-96 cursor-pointer group"
          onClick={handleCardClick}
          style={{ perspective: '1000px' }}
        >
          <div className={`relative w-full h-full transition-transform duration-1000 ${step === 'revealed' ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
            {/* Card Back */}
            <div 
              className="absolute inset-0 w-full h-full rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-golden-400/30"
              style={{ 
                backfaceVisibility: 'hidden',
                backgroundImage: `url('https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
            </div>
            
            {/* Card Front */}
            <div 
              className="absolute inset-0 w-full h-full rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-golden-400/30 rotate-y-180 overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.name}
                className="w-full h-full object-contain bg-black rounded-xl md:rounded-2xl"
                style={{
                  imageRendering: '-webkit-optimize-contrast'
                }}
                onLoad={() => {
                  console.log('DailyCard: Image loaded successfully:', selectedCard.imageUrl);
                }}
                onError={(e) => {
                  console.error('DailyCard: Image load error for:', selectedCard.imageUrl);
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg';
                }}
              />
            </div>
          </div>
        </div>
        
        {step === 'revealing' && (
          <p className="text-white mt-4 md:mt-6 animate-pulse text-lg sm:text-xl md:text-2xl">
            <span className="font-bold text-xl sm:text-2xl md:text-3xl">Нажмите</span> на карту, чтобы увидеть ее значение
          </p>
        )}
      </div>

      {/* Card Description */}
      {step === 'revealed' && (
        <div className="max-w-2xl mx-auto mb-6 md:mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-purple-800/30">
            <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-3 md:mb-4">{selectedCard.title}:</h3>
            <p className="text-white leading-relaxed text-sm sm:text-base md:text-lg">{selectedCard.description}</p>
          </div>
        </div>
      )}

      {/* CTA for Personal Reading */}
      {showCTA && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-golden-400/30">
            <h3 className="text-lg sm:text-xl md:text-2xl font-light text-golden-400 mb-4 md:mb-6">
              Хочешь получить <em className="italic">Свой</em> Персональный Расклад?
            </h3>
            <Button 
              onClick={onPersonalReadingClick}
              className="w-full bg-gradient-to-r from-black to-purple-900 hover:from-purple-900 hover:to-black text-white font-medium text-sm sm:text-base px-4 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 shake-button whitespace-normal leading-tight"
            >
              Получить персональный расклад
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
