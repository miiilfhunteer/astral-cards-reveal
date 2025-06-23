
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CardSelectionProps {
  formData: {
    name: string;
    age: string;
    topic: string;
  };
  onComplete: () => void;
}

export const CardSelection: React.FC<CardSelectionProps> = ({ formData, onComplete }) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [revealedCards, setRevealedCards] = useState<any[]>([]);
  const [flippingCard, setFlippingCard] = useState<number | null>(null);
  const [shuffledIndexes, setShuffledIndexes] = useState<number[]>([]);

  // Обновленные карты с новыми ссылками postimg.cc (все 55 карт)
  const allCards = [
    "https://postimg.cc/4nzQ74FK", // Шут
    "https://postimg.cc/F7Ngjt2T", // Маг
    "https://postimg.cc/Tp0j07xf", // Верховная Жрица
    "https://postimg.cc/G4pF5F3Y", // Император
    "https://postimg.cc/75Q385bR", // Императрица
    "https://postimg.cc/d7k8qJyV", // Иерофант
    "https://postimg.cc/kV0WGLQF", // Влюбленные
    "https://postimg.cc/sGyS9S0M", // Колесница
    "https://postimg.cc/dkGrynnM", // Сила
    "https://postimg.cc/9wp9xMvJ", // Отшельник
    "https://postimg.cc/MXbrkYwr", // Колесо Фортуны
    "https://postimg.cc/6TN11mkv", // Справедливость
    "https://postimg.cc/zVz2qRXD", // Повешенный
    "https://postimg.cc/hf2yvPfL", // Смерть
    "https://postimg.cc/jW7ZMHvc", // Умеренность
    "https://postimg.cc/k2Djb3bk", // Дьявол
    "https://postimg.cc/K1V07q74", // Башня
    "https://postimg.cc/NLYpxrX8", // Звезда
    "https://postimg.cc/hQSs4HnZ", // Луна
    "https://postimg.cc/phQkHPwn", // Солнце
    "https://postimg.cc/hzRM6X5B", // Суд
    "https://postimg.cc/4n5w2NvD", // Мир
    "https://postimg.cc/SJxdBFDJ", // Туз Жезлов
    "https://postimg.cc/qNtL7cfr", // Двойка Жезлов
    "https://postimg.cc/56Kg17Rp", // Тройка Жезлов
    "https://postimg.cc/FY2xkfmL", // Четверка Жезлов
    "https://postimg.cc/mcCyYb26", // Пятерка Жезлов
    "https://postimg.cc/G8RJzZ43", // Шестерка Жезлов
    "https://postimg.cc/vgv7K3nr", // Семерка Жезлов
    "https://postimg.cc/kRXNPKNk", // Восьмерка Жезлов
    "https://postimg.cc/s1V4WCFw", // Девятка Жезлов
    "https://postimg.cc/RqXQQp49", // Десятка Жезлов
    "https://postimg.cc/Tp1jkj3b", // Паж Жезлов
    "https://postimg.cc/3dqXzykc", // Рыцарь Жезлов
    "https://postimg.cc/Yvm67pgq", // Королева Жезлов
    "https://postimg.cc/v1FWHpL7", // Король Жезлов
    "https://postimg.cc/jWHyWZZp", // Туз Кубков
    "https://postimg.cc/YG8gRjc8", // Двойка Кубков
    "https://postimg.cc/8f5v0DNG", // Тройка Кубков
    "https://postimg.cc/xqxMbk31", // Четверка Кубков
    "https://postimg.cc/3WJ2Rjpq", // Пятерка Кубков
    "https://postimg.cc/JGsJ31pc", // Шестерка Кубков
    "https://postimg.cc/mPMHqmfP", // Семерка Кубков
    "https://postimg.cc/JGSXP9gw", // Восьмерка Кубков
    "https://postimg.cc/Y4HWwQMb", // Девятка Кубков
    "https://postimg.cc/7CnTPbLD", // Десятка Кубков
    "https://postimg.cc/mzZ1PRc9", // Паж Кубков
    "https://postimg.cc/tZrZPfPM", // Рыцарь Кубков
    "https://postimg.cc/9wr4BpYF", // Королева Кубков
    "https://postimg.cc/RqFn9Sx5", // Король Кубков
    "https://postimg.cc/Jt2HzfRy", // Туз Мечей
    "https://postimg.cc/crtggFJF", // Двойка Мечей
    "https://postimg.cc/4YCKzp7s", // Тройка Мечей
    "https://postimg.cc/sMpMK17S", // Четверка Мечей
    "https://postimg.cc/sBsvLy4L"  // Пятерка Мечей
  ];

  const cardNames = [
    "Шут", "Маг", "Верховная Жрица", "Император", "Императрица", "Иерофант",
    "Влюбленные", "Колесница", "Сила", "Отшельник", "Колесо Фортуны", "Справедливость",
    "Повешенный", "Смерть", "Умеренность", "Дьявол", "Башня", "Звезда", "Луна", "Солнце",
    "Суд", "Мир", "Туз Жезлов", "Двойка Жезлов", "Тройка Жезлов", "Четверка Жезлов",
    "Пятерка Жезлов", "Шестерка Жезлов", "Семерка Жезлов", "Восьмерка Жезлов",
    "Девятка Жезлов", "Десятка Жезлов", "Паж Жезлов", "Рыцарь Жезлов", "Королева Жезлов",
    "Король Жезлов", "Туз Кубков", "Двойка Кубков", "Тройка Кубков", "Четверка Кубков",
    "Пятерка Кубков", "Шестерка Кубков", "Семерка Кубков", "Восьмерка Кубков",
    "Девятка Кубков", "Десятка Кубков", "Паж Кубков", "Рыцарь Кубков", "Королева Кубков",
    "Король Кубков", "Туз Мечей", "Двойка Мечей", "Тройка Мечей", "Четверка Мечей",
    "Пятерка Мечей"
  ];

  // Инициализация перемешанных индексов при первой загрузке
  React.useEffect(() => {
    console.log('CardSelection: Initializing shuffled indexes');
    const indexes = Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * allCards.length));
    console.log('CardSelection: Generated shuffled indexes:', indexes);
    setShuffledIndexes(indexes);
  }, []);

  const handleCardClick = (index: number) => {
    if (selectedCards.includes(index) || selectedCards.length >= 3) return;
    
    console.log('CardSelection: Card clicked at index:', index);
    
    // Анимация переворачивания карты
    setFlippingCard(index);
    
    setTimeout(() => {
      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);
      
      // Используем перемешанный индекс для выбора карты
      const cardIndex = shuffledIndexes[index] || Math.floor(Math.random() * allCards.length);
      const cardImage = allCards[cardIndex];
      const cardName = cardNames[cardIndex] || `Карта ${cardIndex + 1}`;
      
      console.log('CardSelection: Selected card:', { cardIndex, cardImage, cardName });
      
      const newCard = {
        image: cardImage,
        name: cardName
      };
      
      setRevealedCards([...revealedCards, newCard]);
      setFlippingCard(null);
      
      // If all 3 cards are selected, scroll to bottom
      if (newSelectedCards.length === 3) {
        setTimeout(() => {
          window.scrollTo({ 
            top: document.body.scrollHeight, 
            behavior: 'smooth' 
          });
        }, 1000);
      }
    }, 600);
  };

  const handleShuffle = () => {
    console.log('CardSelection: Shuffling deck');
    
    // Сброс всех состояний для перемешивания
    setSelectedCards([]);
    setRevealedCards([]);
    setFlippingCard(null);
    
    // Генерируем новые случайные индексы для карт
    const newIndexes = Array.from({ length: 24 }, (_, i) => Math.floor(Math.random() * allCards.length));
    console.log('CardSelection: New shuffled indexes:', newIndexes);
    setShuffledIndexes(newIndexes);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-light text-golden-400 mb-4">
        Привет, {formData.name}!
      </h2>
      <p className="text-lg md:text-xl text-purple-200 mb-8 px-4">
        Выбери 3 карты, которые тебя привлекают
      </p>

      {/* Shuffle button */}
      <Button
        onClick={handleShuffle}
        className="mb-8 bg-purple-800 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
        type="button"
      >
        🔄 Перемешать колоду
      </Button>

      {/* Selection progress */}
      <div className="mb-8">
        <p className="text-white text-lg mb-4">
          Выбрано карт: <span className="text-golden-400 font-bold">{selectedCards.length} из 3</span>
        </p>
      </div>

      {/* Card deck for selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 px-4">
        {Array.from({ length: 24 }, (_, index) => {
          const isSelected = selectedCards.includes(index);
          const isFlipping = flippingCard === index;
          const cardImageIndex = shuffledIndexes[index] || 0;
          
          return (
            <div
              key={`${index}-${shuffledIndexes.length}`}
              onClick={() => handleCardClick(index)}
              className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                isSelected ? 'opacity-50 scale-95' : ''
              }`}
            >
              <div className="relative w-full aspect-[2/3]">
                <div
                  className="w-full h-full rounded-lg shadow-lg border border-golden-400/30"
                  style={{ perspective: '1000px' }}
                >
                  <div
                    className={`w-full h-full rounded-lg transition-transform duration-600 ${
                      isFlipping ? 'rotate-y-180' : ''
                    }`}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Card Back */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-lg"
                      style={{
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div
                        className="w-full h-full rounded-lg"
                        style={{
                          backgroundImage: `url('https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    </div>
                    
                    {/* Card Front (показывается после переворота) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-lg rotate-y-180"
                      style={{
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <img
                        src={allCards[cardImageIndex]}
                        alt={cardNames[cardImageIndex] || 'Карта Таро'}
                        className="w-full h-full object-cover rounded-lg"
                        onLoad={() => {
                          console.log('CardSelection: Card flip image loaded:', allCards[cardImageIndex]);
                        }}
                        onError={(e) => {
                          console.error('CardSelection: Card flip image error:', allCards[cardImageIndex]);
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <span className="text-golden-400 text-2xl md:text-3xl font-bold">
                      {selectedCards.indexOf(index) + 1}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected cards display */}
      {selectedCards.length === 3 && (
        <div className="mt-12 px-4">
          <h3 className="text-xl md:text-2xl font-light text-golden-400 mb-8 text-center">
            Судьба приготовила тебе такие карты:
          </h3>
          
          {/* Горизонтальное отображение карт */}
          <div className="flex justify-center items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 max-w-full mx-auto overflow-x-auto">
            {revealedCards.map((card, index) => (
              <div key={index} className="text-center flex-shrink-0">
                <div className="w-24 h-36 xs:w-28 xs:h-42 sm:w-32 sm:h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 mx-auto mb-3">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover rounded-lg shadow-lg border border-golden-400/30"
                    onError={(e) => {
                      console.error('CardSelection: Selected card image error for:', card.image);
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg';
                    }}
                    onLoad={() => {
                      console.log('CardSelection: Selected card image loaded successfully:', card.image);
                    }}
                  />
                </div>
                <div className="text-golden-400 font-medium text-xs sm:text-sm md:text-base leading-tight whitespace-normal max-w-24 xs:max-w-28 sm:max-w-32 md:max-w-40 lg:max-w-48 mx-auto">
                  {card.name.includes(' ') ? (
                    <>
                      <div>{card.name.split(' ')[0]}</div>
                      <div>{card.name.split(' ').slice(1).join(' ')}</div>
                    </>
                  ) : (
                    card.name
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={onComplete}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto bg-gradient-to-r from-golden-600 to-golden-400 hover:from-golden-700 hover:to-golden-500 text-black font-medium text-xs sm:text-sm md:text-lg py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 px-4 leading-tight"
          >
            <span className="break-words">Получить Персональный Расклад</span>
          </Button>
        </div>
      )}
    </div>
  );
};
