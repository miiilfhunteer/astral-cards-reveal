
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { tarotCards } from '@/data/tarotCards';

interface CardSelectionProps {
  formData: {
    name: string;
    age: string;
    topic: string;
  };
  onComplete: (cards: any[]) => void;
}

export const CardSelection: React.FC<CardSelectionProps> = ({ formData, onComplete }) => {
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Shuffle cards when component mounts
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);

  useEffect(() => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, []);

  const handleCardClick = (card: any) => {
    if (selectedCards.length < 3 && !selectedCards.find(c => c.id === card.id)) {
      const newSelected = [...selectedCards, card];
      setSelectedCards(newSelected);
      
      if (newSelected.length === 3) {
        setIsComplete(true);
      }
    }
  };

  const handleComplete = () => {
    onComplete(selectedCards);
  };

  const resetSelection = () => {
    setSelectedCards([]);
    setIsComplete(false);
  };

  return (
    <div className="text-center px-4">
      <h2 className="text-2xl md:text-3xl font-light text-golden-400 mb-4">
        Выбери 3 карты, {formData.name}
      </h2>
      <p className="text-lg text-purple-200 mb-8">
        Доверься интуиции и выбери те карты, которые тебя привлекают
      </p>

      {/* Selected Cards Display */}
      {selectedCards.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg text-golden-400 mb-4">Твои карты:</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {selectedCards.map((card, index) => (
              <div key={card.id} className="text-center">
                <div className="w-20 h-30 md:w-24 md:h-36 mb-2">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-contain rounded-lg border-2 border-golden-400"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg';
                    }}
                  />
                </div>
                <p className="text-xs text-purple-300">
                  {index === 0 ? 'Прошлое' : index === 1 ? 'Настоящее' : 'Будущее'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card Grid */}
      {!isComplete && (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 mb-8 max-w-4xl mx-auto">
          {shuffledCards.slice(0, 24).map((card) => (
            <div
              key={card.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedCards.find(c => c.id === card.id) ? 'opacity-50' : ''
              }`}
              onClick={() => handleCardClick(card)}
            >
              <img
                src="https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg"
                alt="Карта Таро"
                className="w-full h-auto rounded-lg shadow-lg border border-golden-400/30 hover:border-golden-400"
              />
            </div>
          ))}
        </div>
      )}

      {/* Selection Status */}
      <div className="mb-6">
        <p className="text-purple-200">
          Выбрано карт: {selectedCards.length} из 3
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {isComplete ? (
          <div className="space-y-4">
            <Button
              onClick={handleComplete}
              className="bg-gradient-to-r from-golden-600 to-golden-400 hover:from-golden-700 hover:to-golden-500 text-black font-medium px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Продолжить с выбранными картами
            </Button>
            <Button
              onClick={resetSelection}
              variant="outline"
              className="border-purple-600 text-purple-200 hover:bg-purple-800/30"
            >
              Выбрать другие карты
            </Button>
          </div>
        ) : (
          <p className="text-purple-400 text-sm">
            Выбери еще {3 - selectedCards.length} {3 - selectedCards.length === 1 ? 'карту' : 'карты'}
          </p>
        )}
      </div>
    </div>
  );
};
