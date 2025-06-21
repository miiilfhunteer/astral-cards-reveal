
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

  // All 78 tarot card images
  const allCards = [
    "https://static.tildacdn.com/tild6265-3030-4532-b365-366464653534/ace_of_cups_with_lab.jpg",
    "https://static.tildacdn.com/tild3832-3335-4431-a433-633066646566/ace_of_pentacles_wit.jpg",
    "https://static.tildacdn.com/tild6337-3262-4130-b333-646231356536/ace_of_swords_with_l.jpg",
    "https://static.tildacdn.com/tild6235-3930-4536-b561-336465363439/ace_of_wands_with_la.jpg",
    "https://static.tildacdn.com/tild3332-3231-4565-a337-353934653633/chariot_with_label.jpg",
    "https://static.tildacdn.com/tild3634-3062-4365-a234-656665323766/death_with_label.jpg",
    "https://static.tildacdn.com/tild3133-6538-4162-b061-646461346239/devil_with_label.jpg",
    "https://static.tildacdn.com/tild6635-3266-4337-b239-353838396330/eight_of_cups_with_l.jpg",
    "https://static.tildacdn.com/tild3939-3566-4233-a661-646232663265/eight_of_pentacles_w.jpg",
    "https://static.tildacdn.com/tild6466-3437-4737-a265-353266386339/eight_of_swords_with.jpg",
    "https://static.tildacdn.com/tild3933-3433-4233-b134-353735393763/eight_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3633-3933-4233-b134-353735393763/emperor_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/empress_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/five_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/five_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/five_of_swords_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/five_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/fool_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/four_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/four_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/four_of_swords_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/four_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/hanged_man_with_l.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/hermit_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/hierophant_with_l.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/high_priestess_with_.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/judgement_with_la.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/justice_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/king_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/king_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/king_of_swords_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/king_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/knight_of_cups_wit.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/knight_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/knight_of_swords_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/knight_of_wands_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/lovers_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/magician_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/moon_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/nine_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/nine_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/nine_of_swords_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/nine_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/page_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/page_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/page_of_swords_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/page_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/queen_of_cups_wit.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/queen_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/queen_of_swords_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/queen_of_wands_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/seven_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/seven_of_pentacles.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/seven_of_swords_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/seven_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/six_of_cups_with_l.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/six_of_pentacles_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/six_of_swords_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/six_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/star_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/strength_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/sun_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/temperance_with_l.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/ten_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/ten_of_pentacles_w.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/ten_of_swords_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/ten_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/three_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/three_of_pentacles_w.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/three_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/three_of_swords_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/tower_with_label.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/two_of_cups_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/two_of_pentacles_wi.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/two_of_swords_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/two_of_wands_with.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/wheel_of_fortune_w.jpg",
    "https://static.tildacdn.com/tild3933-3933-4233-b134-353735393763/world_with_label.jpg"
  ];

  const cardNames = [
    "Туз Кубков", "Туз Пентаклей", "Туз Мечей", "Туз Жезлов", "Колесница", "Смерть", "Дьявол",
    "Восьмерка Кубков", "Восьмерка Пентаклей", "Восьмерка Мечей", "Восьмерка Жезлов", "Император",
    "Императрица", "Пятерка Кубков", "Пятерка Пентаклей", "Пятерка Мечей", "Пятерка Жезлов", "Шут",
    "Четверка Кубков", "Четверка Пентаклей", "Четверка Мечей", "Четверка Жезлов", "Повешенный",
    "Отшельник", "Иерофант", "Верховная Жрица", "Суд", "Справедливость", "Король Кубков",
    "Король Пентаклей", "Король Мечей", "Король Жезлов", "Рыцарь Кубков", "Рыцарь Пентаклей",
    "Рыцарь Мечей", "Рыцарь Жезлов", "Влюбленные", "Маг", "Луна", "Девятка Кубков",
    "Девятка Пентаклей", "Девятка Мечей", "Девятка Жезлов", "Паж Кубков", "Паж Пентаклей",
    "Паж Мечей", "Паж Жезлов", "Королева Кубков", "Королева Пентаклей", "Королева Мечей",
    "Королева Жезлов", "Семерка Кубков", "Семерка Пентаклей", "Семерка Мечей", "Семерка Жезлов",
    "Шестерка Кубков", "Шестерка Пентаклей", "Шестерка Мечей", "Шестерка Жезлов", "Звезда",
    "Сила", "Солнце", "Умеренность", "Десятка Кубков", "Десятка Пентаклей", "Десятка Мечей",
    "Десятка Жезлов", "Тройка Кубков", "Тройка Пентаклей", "Тройка Жезлов", "Тройка Мечей",
    "Башня", "Двойка Кубков", "Двойка Пентаклей", "Двойка Мечей", "Двойка Жезлов",
    "Колесо Фортуны", "Мир"
  ];

  const handleCardClick = (index: number) => {
    if (selectedCards.includes(index) || selectedCards.length >= 3) return;
    
    // Анимация переворачивания карты
    setFlippingCard(index);
    
    setTimeout(() => {
      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);
      
      // Get random card from the 78 cards
      const randomCardIndex = Math.floor(Math.random() * allCards.length);
      const newCard = {
        image: allCards[randomCardIndex],
        name: cardNames[randomCardIndex] || `Карта ${randomCardIndex + 1}`
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
    }, 600); // Время анимации переворачивания
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
        onClick={() => window.location.reload()}
        className="mb-8 bg-purple-800 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
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
        {Array.from({ length: 24 }, (_, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              selectedCards.includes(index) ? 'opacity-50 scale-95' : ''
            }`}
          >
            <div className="relative w-full aspect-[2/3]">
              <div
                className={`w-full h-full rounded-lg shadow-lg border border-golden-400/30 card-flip ${
                  flippingCard === index ? 'flipping' : ''
                }`}
                style={{
                  backgroundImage: `url('https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              {selectedCards.includes(index) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <span className="text-golden-400 text-2xl md:text-3xl font-bold">
                    {selectedCards.indexOf(index) + 1}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
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
