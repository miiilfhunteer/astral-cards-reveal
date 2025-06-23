
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
  const [shuffleKey, setShuffleKey] = useState(0); // Для перемешивания колоды

  // Новые 78 карт Таро с Google Drive
  const allCards = [
    "https://drive.google.com/uc?id=1tyng1l4Gh2g-jZUVOdxHDU2GJn5KjrW6",
    "https://drive.google.com/uc?id=1ySurbO0GtzmuncuaxHJHK21axa1u_sn-",
    "https://drive.google.com/uc?id=1B3-zSdDXESpO67LJ0fZIgKtq2rENc6Rp",
    "https://drive.google.com/uc?id=1Fl67__ubQJZMmxqtwfyPXuzmUl4mpryr",
    "https://drive.google.com/uc?id=1HzRh2iTG7CI2ZRTwvbfd2CAfSOUk9HLz",
    "https://drive.google.com/uc?id=1Thg-zY2EZrS3V349ZKFmiLMQciZRGlCm",
    "https://drive.google.com/uc?id=15WUuqGgkkTbPdwDJU-xtEzrAfVEhlDbJ",
    "https://drive.google.com/uc?id=1ArWtJZLA2-dR1q435c41woODwi6zZ_CK",
    "https://drive.google.com/uc?id=1PYY88rCjPj62kdCksJCc1iAbG_1c_kwE",
    "https://drive.google.com/uc?id=1eVo1mLDemHydoq6MgNkWkUYifWDC-vkZ",
    "https://drive.google.com/uc?id=17HyrjPkiZZUZM2Rnv2ELdPgu59D_zHeq",
    "https://drive.google.com/uc?id=1J9N2rfjcp1XGA2Qoq2ghzMyimDDfuGcp",
    "https://drive.google.com/uc?id=1c40LjHcEQsnz8Tl3UYU2aedR2GYw822L",
    "https://drive.google.com/uc?id=1zW9vPXg2kQ22ro4PNiYjyDign75Hw1Sb",
    "https://drive.google.com/uc?id=1ND74nGBVFLKWt3jjVQzaaremcxXDgJk8",
    "https://drive.google.com/uc?id=1Z990yR_sH746ovvRSo8VMmFKM7kHY2tc",
    "https://drive.google.com/uc?id=1ewnU_8RZQ2TYWho7Tp_-q1Nvm55goLYN",
    "https://drive.google.com/uc?id=1fdwlAWy8duGzNebCTmWy8bAs7JszPh9b",
    "https://drive.google.com/uc?id=1tg_iwMuwzCEhyNF7NjJniciDaJfQ6Tdi",
    "https://drive.google.com/uc?id=19uvzq5YXn4imKP295JykSZdiW7PrLl3s",
    "https://drive.google.com/uc?id=1DPSLl67Akv5ppBTMYLIqRhDH9OJ9H8Ko",
    "https://drive.google.com/uc?id=1Ss_pI2AEHTSGH8zmIz6SjUA0-oeH8dSo",
    "https://drive.google.com/uc?id=1hbHmv1qrw0W8UJysdEU0DeyrVTZGmmce",
    "https://drive.google.com/uc?id=1J4QddBrivw3qQy84dDaEfLtwqQ9iZWav",
    "https://drive.google.com/uc?id=1T3vUpX3IK970cZ5vcv1w0vv0wy_Duo10",
    "https://drive.google.com/uc?id=1tMx5lU35MsROk8cV3Fd7ucOTqn3NGFov",
    "https://drive.google.com/uc?id=1x9rqCu8CRJqz8-Vp6bl_jQl9L5INJlMB",
    "https://drive.google.com/uc?id=1NaPLygJKvxINfBIzmf4sgLl6XteIHKwA",
    "https://drive.google.com/uc?id=1WwAGPblbTK_08FfsZS7u2TX6kDjUxksu",
    "https://drive.google.com/uc?id=1d8A4fAmbPJLkfGIeJa3xERXo5b2rLhCg",
    "https://drive.google.com/uc?id=1kDz06viMvWWkblozXYuqo1razBvOa_JB",
    "https://drive.google.com/uc?id=1n2p07oh3tJ69fI_UgLG-hmrYirTfCP5p",
    "https://drive.google.com/uc?id=10xWO3uHhpZ5BOJ7pmIpGsTfMgXXcvVvT",
    "https://drive.google.com/uc?id=16fI1vp5AosW2vb6VOfUmbxf7s3Y8Xbb4",
    "https://drive.google.com/uc?id=1JF4nwYjAzactJ_-IcMtt1rPSY5X1RNo4",
    "https://drive.google.com/uc?id=1lhFBpRSwpZ-IpoFaYN9MlXFBtNELRkGL",
    "https://drive.google.com/uc?id=1MsC9VEqQpntypu1l5hm2D-pyESo83W4-",
    "https://drive.google.com/uc?id=1d4igjWKD4Oe8HRYMQIvjfD1iBlPa8Pkv",
    "https://drive.google.com/uc?id=1ghsRXn2tN8SHsYBUlwkwaw6rM8zBVhtf",
    "https://drive.google.com/uc?id=1lRidvC9WAauknKQH1e41pmxExV3LokBh",
    "https://drive.google.com/uc?id=1HeGI8Rj727EZq6vacY3NBGM0byya7yH",
    "https://drive.google.com/uc?id=1lioOz0pGBFRZHDgOFTSwzTZIv2HSeirR",
    "https://drive.google.com/uc?id=1pUjMgtsmZHEbdpF8lbctPUKD3uWUwmI-",
    "https://drive.google.com/uc?id=1qsp7pHy90liEpHp8nz35wPYUGcJ3C0vg",
    "https://drive.google.com/uc?id=1sVPduSxem9Q-s3S1WRtLwsTm8XMBRZCn",
    "https://drive.google.com/uc?id=1-9wwv_tvFY81Hx_8vyA5ppqUnt2VK7LC",
    "https://drive.google.com/uc?id=1CuL1CyGrnpsqa9f_SqdTwXpQKbPi1e5h",
    "https://drive.google.com/uc?id=1ph7gQmYOlX8WXU0mgZWGIb_eAH41fftA",
    "https://drive.google.com/uc?id=1rXpP0PMTKmWzCMrNNiBGV1DzWWBUVLNG",
    "https://drive.google.com/uc?id=1EU9VVovCz-VgV8LzMjnZWWZ3ZO0fjLvh",
    "https://drive.google.com/uc?id=1gGdyjObN_fRNVkdcQnSlWXRvMyH_OJRU",
    "https://drive.google.com/uc?id=1jfqjd4kiD5yFJ5mT9s1ZcEdRbcP6FVmx",
    "https://drive.google.com/uc?id=1oelonzVyzn7EGrfphL2NqFxF6CQOfaiR",
    "https://drive.google.com/uc?id=1G2UdCDHqLvRNdf7e7MqPauV07xK9M3HO",
    "https://drive.google.com/uc?id=1LqexLW88QrNTEx2wfUKLkDwvTbw-sHUL",
    "https://drive.google.com/uc?id=1gWuZdwolfu4SHIqpjJsVA3fkZRbMWlpN"
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
      
      // Get random card from the available cards
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
    }, 600);
  };

  const handleShuffle = () => {
    // Сброс всех состояний для перемешивания
    setSelectedCards([]);
    setRevealedCards([]);
    setFlippingCard(null);
    setShuffleKey(prev => prev + 1); // Изменяем ключ для принудительного обновления
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
      <div key={shuffleKey} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 px-4">
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
                  perspective: '1000px'
                }}
              >
                {/* Card Back */}
                <div
                  className={`w-full h-full rounded-lg transition-transform duration-600 ${
                    flippingCard === index ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    backgroundImage: flippingCard === index 
                      ? `url('${allCards[Math.floor(Math.random() * allCards.length)]}')`
                      : `url('https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transformStyle: 'preserve-3d'
                  }}
                />
              </div>
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
                    onError={(e) => {
                      console.log('Image load error for:', card.image);
                      // Fallback to a backup image if needed
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
