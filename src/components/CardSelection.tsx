
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
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [shuffledIndexes, setShuffledIndexes] = useState<number[]>([]);

  // Прямые ссылки на изображения карт Таро высокого качества
  const allCards = [
    "https://i.postimg.cc/4nzQ74FK/0.jpg", // Шут
    "https://i.postimg.cc/F7Ngjt2T/1.jpg", // Маг
    "https://i.postimg.cc/Tp0j07xf/2.jpg", // Верховная Жрица
    "https://i.postimg.cc/G4pF5F3Y/3.jpg", // Император
    "https://i.postimg.cc/75Q385bR/4.jpg", // Императрица
    "https://i.postimg.cc/d7k8qJyV/5.jpg", // Иерофант
    "https://i.postimg.cc/kV0WGLQF/6.jpg", // Влюбленные
    "https://i.postimg.cc/sGyS9S0M/7.jpg", // Колесница
    "https://i.postimg.cc/dkGrynnM/8.jpg", // Сила
    "https://i.postimg.cc/9wp9xMvJ/9.jpg", // Отшельник
    "https://i.postimg.cc/MXbrkYwr/10.jpg", // Колесо Фортуны
    "https://i.postimg.cc/6TN11mkv/11.jpg", // Справедливость
    "https://i.postimg.cc/zVz2qRXD/12.jpg", // Повешенный
    "https://i.postimg.cc/hf2yvPfL/13.jpg", // Смерть
    "https://i.postimg.cc/jW7ZMHvc/14.jpg", // Умеренность
    "https://i.postimg.cc/k2Djb3bk/15.jpg", // Дьявол
    "https://i.postimg.cc/K1V07q74/16.jpg", // Башня
    "https://i.postimg.cc/NLYpxrX8/17.jpg", // Звезда
    "https://i.postimg.cc/hQSs4HnZ/18.jpg", // Луна
    "https://i.postimg.cc/phQkHPwn/19.jpg", // Солнце
    "https://i.postimg.cc/hzRM6X5B/20.jpg", // Суд
    "https://i.postimg.cc/4n5w2NvD/21.jpg", // Мир
    "https://i.postimg.cc/SJxdBFDJ/22.jpg", // Туз Жезлов
    "https://i.postimg.cc/qNtL7cfr/23.jpg", // Двойка Жезлов
    "https://i.postimg.cc/56Kg17Rp/24.jpg", // Тройка Жезлов
    "https://i.postimg.cc/FY2xkfmL/25.jpg", // Четверка Жезлов
    "https://i.postimg.cc/mcCyYb26/26.jpg", // Пятерка Жезлов
    "https://i.postimg.cc/G8RJzZ43/27.jpg", // Шестерка Жезлов
    "https://i.postimg.cc/vgv7K3nr/28.jpg", // Семерка Жезлов
    "https://i.postimg.cc/kRXNPKNk/29.jpg", // Восьмерка Жезлов
    "https://i.postimg.cc/s1V4WCFw/30.jpg", // Девятка Жезлов
    "https://i.postimg.cc/RqXQQp49/31.jpg", // Десятка Жезлов
    "https://i.postimg.cc/Tp1jkj3b/32.jpg", // Паж Жезлов
    "https://i.postimg.cc/3dqXzykc/33.jpg", // Рыцарь Жезлов
    "https://i.postimg.cc/Yvm67pgq/34.jpg", // Королева Жезлов
    "https://i.postimg.cc/v1FWHpL7/35.jpg", // Король Жезлов
    "https://i.postimg.cc/jWHyWZZp/36.jpg", // Туз Кубков
    "https://i.postimg.cc/YG8gRjc8/37.jpg", // Двойка Кубков
    "https://i.postimg.cc/8f5v0DNG/38.jpg", // Тройка Кубков
    "https://i.postimg.cc/xqxMbk31/39.jpg", // Четверка Кубков
    "https://i.postimg.cc/3WJ2Rjpq/40.jpg", // Пятерка Кубков
    "https://i.postimg.cc/JGsJ31pc/41.jpg", // Шестерка Кубков
    "https://i.postimg.cc/mPMHqmfP/42.jpg", // Семерка Кубков
    "https://i.postimg.cc/JGSXP9gw/43.jpg", // Восьмерка Кубков
    "https://i.postimg.cc/Y4HWwQMb/44.jpg", // Девятка Кубков
    "https://i.postimg.cc/7CnTPbLD/45.jpg", // Десятка Кубков
    "https://i.postimg.cc/mzZ1PRc9/46.jpg", // Паж Кубков
    "https://i.postimg.cc/tZrZPfPM/47.jpg", // Рыцарь Кубков
    "https://i.postimg.cc/9wr4BpYF/48.jpg", // Королева Кубков
    "https://i.postimg.cc/RqFn9Sx5/49.jpg", // Король Кубков
    "https://i.postimg.cc/Jt2HzfRy/50.jpg", // Туз Мечей
    "https://i.postimg.cc/crtggFJF/51.jpg", // Двойка Мечей
    "https://i.postimg.cc/4YCKzp7s/52.jpg", // Тройка Мечей
    "https://i.postimg.cc/sMpMK17S/53.jpg", // Четверка Мечей
    "https://i.postimg.cc/sBsvLy4L/54.jpg", // Пятерка Мечей
    "https://i.postimg.cc/cKhryjDL/55.jpg"  // Шестерка Мечей
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
    "Пятерка Мечей", "Шестерка Мечей"
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
    
    // Добавляем карту к перевернутым для анимации
    setFlippedCards(prev => [...prev, index]);
    
    setTimeout(() => {
      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);
      
      // Используем перемешанный индекс для выбора карты
      const cardIndex = shuffledIndexes[index];
      const cardImage = allCards[cardIndex];
      const cardName = cardNames[cardIndex];
      
      console.log('CardSelection: Selected card:', { cardIndex, cardImage, cardName });
      
      const newCard = {
        image: cardImage,
        name: cardName,
        index: cardIndex
      };
      
      setRevealedCards([...revealedCards, newCard]);
      
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
    setFlippedCards([]);
    
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
          const isFlipped = flippedCards.includes(index);
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
                      isFlipped ? 'rotate-y-180' : ''
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
                    
                    {/* Card Front - остается перевернутой после клика */}
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
