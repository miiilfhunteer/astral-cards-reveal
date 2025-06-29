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

  // Полный набор из 78 карт Таро с новыми высококачественными изображениями
  const allCards = [
    // Major Arcana (22 cards)
    "https://i.ibb.co/mr1BnS7C/the-fool-new.jpg", // 0 - Шут
    "https://i.ibb.co/3m38ckXq/the-magician-new.jpg", // 1 - Маг
    "https://i.ibb.co/G3W3tvkk/the-high-priestess-new.jpg", // 2 - Верховная Жрица
    "https://i.ibb.co/fYQrqSNX/the-empress-new.jpg", // 3 - Императрица
    "https://i.ibb.co/Swsv2xwg/the-emperor-new.jpg", // 4 - Император
    "https://i.ibb.co/HpXhkVLx/the-hierophant-new.jpg", // 5 - Иерофант
    "https://i.ibb.co/dszSvg9W/the-lovers-new.jpg", // 6 - Влюбленные
    "https://i.ibb.co/DPM2yzGb/the-chariot-new.jpg", // 7 - Колесница
    "https://i.ibb.co/QvNzzN9S/strength-new.jpg", // 8 - Сила
    "https://i.ibb.co/7JhxMryn/the-hermit-new.jpg", // 9 - Отшельник
    "https://i.ibb.co/Txfnrn7p/wheel-of-fortune-new.jpg", // 10 - Колесо Фортуны
    "https://i.ibb.co/hFcQzq1C/justice-new.jpg", // 11 - Справедливость
    "https://i.ibb.co/WpFV57JW/the-hanged-man-new.jpg", // 12 - Повешенный
    "https://i.ibb.co/23S3XV9Y/death-new-1.jpg", // 13 - Смерть
    "https://i.ibb.co/sJd3DrhW/temperance-new.jpg", // 14 - Умеренность
    "https://i.ibb.co/qYqtDcJc/the-devil-new.jpg", // 15 - Дьявол
    "https://i.ibb.co/RkhMgRF2/the-tower-v3.jpg", // 16 - Башня
    "https://i.ibb.co/8Lv5pzHn/the-star-new.jpg", // 17 - Звезда
    "https://i.ibb.co/4ZLd9xcT/the-moon-new.jpg", // 18 - Луна
    "https://i.ibb.co/5xG1S6bS/The-sun.jpg", // 19 - Солнце
    "https://i.ibb.co/1tg5RGG2/judgement-new-1.jpg", // 20 - Суд
    "https://i.ibb.co/JFHxDjH5/the-world-new.jpg", // 21 - Мир
    
    // Wands (14 cards)
    "https://i.ibb.co/LDP5TqcH/ace-of-wands-new-1.jpg", // 22 - Туз Жезлов
    "https://i.ibb.co/ksfjDsxB/two-of-wands-new.jpg", // 23 - Двойка Жезлов
    "https://i.ibb.co/5gW7CCHq/three-of-wands-new.jpg", // 24 - Тройка Жезлов
    "https://i.ibb.co/jvsNZ7Cf/four-of-wands-new-1.jpg", // 25 - Четверка Жезлов
    "https://i.ibb.co/LdVtrL9x/five-of-wands-1.jpg", // 26 - Пятерка Жезлов
    "https://i.ibb.co/jN7Nk2r/six-of-wands.jpg", // 27 - Шестерка Жезлов
    "https://i.ibb.co/4Z7KDWq7/seven-of-wands-new.jpg", // 28 - Семерка Жезлов
    "https://i.ibb.co/4RRzC1Qd/eight-of-wands-1.jpg", // 29 - Восьмерка Жезлов
    "https://i.ibb.co/gLKwSSZL/nine-of-wands-new.jpg", // 30 - Девятка Жезлов
    "https://i.ibb.co/F4yQ3bkY/ten-of-wands-new.jpg", // 31 - Десятка Жезлов
    "https://i.ibb.co/LzWwf9cV/page-of-wands.jpg", // 32 - Паж Жезлов
    "https://i.ibb.co/Zpm6rnBw/knight-of-wands-new-1.jpg", // 33 - Рыцарь Жезлов
    "https://i.ibb.co/gLVHtV5j/queen-of-wands-new.jpg", // 34 - Королева Жезлов
    "https://i.ibb.co/67zbhpky/king-of-wands-new-1.jpg", // 35 - Король Жезлов
    
    // Cups (14 cards)
    "https://i.ibb.co/MkTPK1FQ/ace-of-cups-new-1.jpg", // 36 - Туз Кубков
    "https://i.ibb.co/Kp44Rcys/two-of-cups-new.jpg", // 37 - Двойка Кубков
    "https://i.ibb.co/CppK08XJ/three-of-cups.jpg", // 38 - Тройка Кубков
    "https://i.ibb.co/xtzj3RCh/four-of-cups-new-1.jpg", // 39 - Четверка Кубков
    "https://i.ibb.co/fdPcynnZ/five-of-cups-new-1.jpg", // 40 - Пятерка Кубков
    "https://i.ibb.co/7PQ8H9H/six-of-cups-new.jpg", // 41 - Шестерка Кубков
    "https://i.ibb.co/XrpzkvTL/seven-of-cups-new.jpg", // 42 - Семерка Кубков
    "https://i.ibb.co/MD8x1r8s/eight-of-cups-new-1.jpg", // 43 - Восьмерка Кубков
    "https://i.ibb.co/G3pj1270/nine-of-cups-new-1.jpg", // 44 - Девятка Кубков
    "https://i.ibb.co/1tDDZYkK/ten-of-cups-new.jpg", // 45 - Десятка Кубков
    "https://i.ibb.co/ZpQhp0kN/page-of-cups-new.jpg", // 46 - Паж Кубков
    "https://i.ibb.co/HLqdcvxJ/knight-of-cups-new-1.jpg", // 47 - Рыцарь Кубков
    "https://i.ibb.co/fd25fjBH/queen-of-cups-new.jpg", // 48 - Королева Кубков
    "https://i.ibb.co/xt5dytDd/king-of-cups-new-1.jpg", // 49 - Король Кубков
    
    // Swords (14 cards)
    "https://i.ibb.co/bMHDcrWw/ace-of-swords-new-1.jpg", // 50 - Туз Мечей
    "https://i.ibb.co/1f95srHX/two-of-swords-new.jpg", // 51 - Двойка Мечей
    "https://i.ibb.co/842Hg5Bv/three-of-swords-new.jpg", // 52 - Тройка Мечей
    "https://i.ibb.co/cc2J2fBg/four-of-swords-new-1.jpg", // 53 - Четверка Мечей
    "https://i.ibb.co/SXXvTzGS/five-of-swords-new-1.jpg", // 54 - Пятерка Мечей
    "https://i.ibb.co/6cTM10fM/six-of-swords-new.jpg", // 55 - Шестерка Мечей
    "https://i.ibb.co/jkswZhqZ/seven-of-swords-new.jpg", // 56 - Семерка Мечей
    "https://i.ibb.co/tT8vQB3H/eight-of-swords-1.jpg", // 57 - Восьмерка Мечей
    "https://i.ibb.co/9mPf6ZMd/nine-of-swords-new.jpg", // 58 - Девятка Мечей
    "https://i.ibb.co/zWfmfGdP/ten-of-swords-new.jpg", // 59 - Десятка Мечей
    "https://i.ibb.co/rRm30vmG/page-of-swords-new.jpg", // 60 - Паж Мечей
    "https://i.ibb.co/0V9jQ8dy/knight-of-swords-new-1.jpg", // 61 - Рыцарь Мечей
    "https://i.ibb.co/whYTbSz5/queen-of-swords-new.jpg", // 62 - Королева Мечей
    "https://i.ibb.co/4g02jvTj/king-of-swords-new-1.jpg", // 63 - Король Мечей
    
    // Pentacles (14 cards)
    "https://i.ibb.co/MyF7wh11/ace-of-pentacles-new-1.jpg", // 64 - Туз Пентаклей
    "https://i.ibb.co/F47rc5Cp/two-of-pentacles-new.jpg", // 65 - Двойка Пентаклей
    "https://i.ibb.co/jZTXzp2G/three-of-pentacles-new.jpg", // 66 - Тройка Пентаклей
    "https://i.ibb.co/20WSMP5M/four-of-pentacles-new-1.jpg", // 67 - Четверка Пентаклей
    "https://i.ibb.co/cSHRHs4h/five-of-pentacles-new-1.jpg", // 68 - Пятерка Пентаклей
    "https://i.ibb.co/fV0y7XkQ/six-of-pentacles.jpg", // 69 - Шестерка Пентаклей
    "https://i.ibb.co/hF9CyQWh/seven-of-pentacles-new.jpg", // 70 - Семерка Пентаклей
    "https://i.ibb.co/QFNqx3b7/eight-of-pentacles-new-1.jpg", // 71 - Восьмерка Пентаклей
    "https://i.ibb.co/39LwF0w9/nine-of-pentacles-new.jpg", // 72 - Девятка Пентаклей
    "https://i.ibb.co/zTKxw6kq/ten-of-pentacles.jpg", // 73 - Десятка Пентаклей
    "https://i.ibb.co/svngg0s6/page-of-pentacles-new.jpg", // 74 - Паж Пентаклей
    "https://i.ibb.co/0VnQ9yj0/knight-of-pentacles-new-1.jpg", // 75 - Рыцарь Пентаклей
    "https://i.ibb.co/045S7jf/queen-of-pentacles-new.jpg", // 76 - Королева Пентаклей
    "https://i.ibb.co/svgHd7P8/king-of-pentacles-new-1.jpg" // 77 - Король Пентаклей
  ];

  const cardNames = [
    // Major Arcana
    "Шут", "Маг", "Верховная Жрица", "Императрица", "Император", "Иерофант",
    "Влюбленные", "Колесница", "Сила", "Отшельник", "Колесо Фортуны", "Справедливость",
    "Повешенный", "Смерть", "Умеренность", "Дьявол", "Башня", "Звезда", "Луна", "Солнце",
    "Суд", "Мир", 
    // Wands
    "Туз Жезлов", "Двойка Жезлов", "Тройка Жезлов", "Четверка Жезлов",
    "Пятерка Жезлов", "Шестерка Жезлов", "Семерка Жезлов", "Восьмерка Жезлов",
    "Девятка Жезлов", "Десятка Жезлов", "Паж Жезлов", "Рыцарь Жезлов", "Королева Жезлов",
    "Король Жезлов", 
    // Cups
    "Туз Кубков", "Двойка Кубков", "Тройка Кубков", "Четверка Кубков",
    "Пятерка Кубков", "Шестерка Кубков", "Семерка Кубков", "Восьмерка Кубков",
    "Девятка Кубков", "Десятка Кубков", "Паж Кубков", "Рыцарь Кубков", "Королева Кубков",
    "Король Кубков", 
    // Swords
    "Туз Мечей", "Двойка Мечей", "Тройка Мечей", "Четверка Мечей",
    "Пятерка Мечей", "Шестерка Мечей", "Семерка Мечей", "Восьмерка Мечей", "Девятка Мечей", "Десятка Мечей",
    "Паж Мечей", "Рыцарь Мечей", "Королева Мечей", "Король Мечей",
    // Pentacles
    "Туз Пентаклей", "Двойка Пентаклей", "Тройка Пентаклей", "Четверка Пентаклей",
    "Пятерка Пентаклей", "Шестерка Пентаклей", "Семерка Пентаклей", "Восьмерка Пентаклей",
    "Девятка Пентаклей", "Десятка Пентаклей", "Паж Пентаклей", "Рыцарь Пентаклей", 
    "Королева Пентаклей", "Король Пентаклей"
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
      
      // Обновляем массив выбранных карт правильно
      const updatedRevealedCards = [...revealedCards, newCard];
      setRevealedCards(updatedRevealedCards);
      
      console.log('CardSelection: Updated revealed cards:', updatedRevealedCards);
      
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

      {/* Selected cards display - улучшенное качество */}
      {selectedCards.length === 3 && (
        <div className="mt-12 px-4">
          <h3 className="text-xl md:text-2xl font-light text-golden-400 mb-8 text-center">
            Судьба приготовила тебе такие карты:
          </h3>
          
          {/* Горизонтальное отображение карт с улучшенным качеством */}
          <div className="flex justify-center items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 max-w-full mx-auto overflow-x-auto">
            {revealedCards.map((card, index) => (
              <div key={index} className="text-center flex-shrink-0">
                <div className="w-24 h-36 xs:w-28 xs:h-42 sm:w-32 sm:h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 mx-auto mb-3 bg-black rounded-lg overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-contain shadow-lg border border-golden-400/30 rounded-lg"
                    style={{
                      imageRendering: 'high-quality',
                      imageRendering: '-webkit-optimize-contrast'
                    }}
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
