
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { tarotCards } from '@/data/tarotCards';
import { Shuffle } from 'lucide-react';

interface CardSelectionProps {
  formData: {
    name: string;
    age: string;
    topic: string;
  };
  onComplete: () => void;
}

export const CardSelection: React.FC<CardSelectionProps> = ({ formData, onComplete }) => {
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const cardsToSelect = 3;

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    setIsShuffling(true);
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    
    setTimeout(() => {
      setShuffledCards(shuffled);
      setIsShuffling(false);
    }, 1500);
  };

  const handleCardSelect = (card: any) => {
    if (selectedCards.length < cardsToSelect && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleComplete = () => {
    if (selectedCards.length === cardsToSelect) {
      onComplete();
    }
  };

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-light text-golden-400 mb-4">
        Привет, {formData.name}!
      </h2>
      <p className="text-xl text-purple-200 mb-8">
        Выбери {cardsToSelect} карты, которые тебя привлекают
      </p>

      {/* Shuffle Button */}
      <div className="mb-8">
        <Button
          onClick={shuffleCards}
          disabled={isShuffling}
          className="bg-purple-800/50 hover:bg-purple-700/50 text-purple-200 border border-purple-600/50 px-6 py-2 rounded-full"
        >
          <Shuffle className={`w-4 h-4 mr-2 ${isShuffling ? 'animate-spin' : ''}`} />
          {isShuffling ? 'Перемешиваю...' : 'Перемешать колоду'}
        </Button>
      </div>

      {/* Selected Cards Counter */}
      <div className="mb-8">
        <p className="text-purple-200">
          Выбрано карт: <span className="text-golden-400 font-medium">{selectedCards.length}</span> из {cardsToSelect}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-8 max-w-6xl mx-auto">
        {shuffledCards.slice(0, 24).map((card, index) => (
          <div
            key={`${card.name}-${index}`}
            onClick={() => handleCardSelect(card)}
            className={`
              relative w-16 h-24 md:w-20 md:h-32 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10
              ${selectedCards.includes(card) 
                ? 'ring-2 ring-golden-400 scale-105' 
                : 'hover:ring-1 hover:ring-purple-400'
              }
              ${selectedCards.length >= cardsToSelect && !selectedCards.includes(card) 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
              }
            `}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg shadow-lg border border-golden-400/30 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-1 bg-golden-400/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-golden-400/40 rounded-full"></div>
                </div>
                <div className="text-xs text-golden-400">Таро</div>
              </div>
            </div>
            
            {selectedCards.includes(card) && (
              <div className="absolute inset-0 bg-golden-400/20 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-golden-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">
                    {selectedCards.indexOf(card) + 1}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Cards Display */}
      {selectedCards.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl text-golden-400 mb-4">Твои выбранные карты:</h3>
          <div className="flex justify-center space-x-4">
            {selectedCards.map((card, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-32 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg shadow-lg border border-golden-400/30 flex items-center justify-center mb-2">
                  <div className="text-2xl">{card.symbol}</div>
                </div>
                <p className="text-xs text-purple-200">{card.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complete Button */}
      {selectedCards.length === cardsToSelect && (
        <Button
          onClick={handleComplete}
          className="bg-gradient-to-r from-golden-600 to-golden-400 hover:from-golden-700 hover:to-golden-500 text-black font-medium text-lg px-8 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
        >
          Узнать значение карт
        </Button>
      )}
    </div>
  );
};
