
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

interface CardSelectionProps {
  formData: {
    name: string;
    age: string;
    topic: string;
  };
  onComplete: () => void;
}

// Все 78 карт с реальными изображениями
const allTarotCards = [
  { name: "Туз Кубков", imageUrl: "https://static.tildacdn.com/tild6265-3030-4532-b365-366464653534/ace_of_cups_with_lab.jpg" },
  { name: "Туз Пентаклей", imageUrl: "https://static.tildacdn.com/tild3832-3335-4431-a433-633066646566/ace_of_pentacles_wit.jpg" },
  { name: "Туз Мечей", imageUrl: "https://static.tildacdn.com/tild6337-3262-4130-b333-646231356536/ace_of_swords_with_l.jpg" },
  { name: "Туз Жезлов", imageUrl: "https://static.tildacdn.com/tild6235-3930-4536-b561-336465363439/ace_of_wands_with_la.jpg" },
  { name: "Колесница", imageUrl: "https://static.tildacdn.com/tild3332-3231-4565-a337-353934653633/chariot_with_label.jpg" },
  { name: "Смерть", imageUrl: "https://static.tildacdn.com/tild3634-3062-4365-a234-656665323766/death_with_label.jpg" },
  { name: "Дьявол", imageUrl: "https://static.tildacdn.com/tild3133-6538-4162-b061-646461346239/devil_with_label.jpg" },
  { name: "Восьмёрка Кубков", imageUrl: "https://static.tildacdn.com/tild6635-3266-4337-b239-353838396330/eight_of_cups_with_l.jpg" },
  { name: "Восьмёрка Пентаклей", imageUrl: "https://static.tildacdn.com/tild3939-3566-4233-a661-646232663265/eight_of_pentacles_w.jpg" },
  { name: "Восьмёрка Мечей", imageUrl: "https://static.tildacdn.com/tild6466-3437-4737-a265-353266386339/eight_of_swords_with.jpg" },
  { name: "Восьмёрка Жезлов", imageUrl: "https://static.tildacdn.com/tild3734-3437-4730-b935-303433343932/eight_of_wands_with_.jpg" },
  { name: "Император", imageUrl: "https://static.tildacdn.com/tild6263-3363-4761-b035-636661613463/emperor_with_label.jpg" },
  { name: "Императрица", imageUrl: "https://static.tildacdn.com/tild3661-6132-4261-b166-633863353063/empress_with_label.jpg" },
  { name: "Пятёрка Кубков", imageUrl: "https://static.tildacdn.com/tild3137-6235-4463-a532-383437653434/five_of_cups_with_la.jpg" },
  { name: "Пятёрка Пентаклей", imageUrl: "https://static.tildacdn.com/tild6135-6236-4538-b636-373437383139/five_of_pentacles_wi.jpg" },
  { name: "Пятёрка Мечей", imageUrl: "https://static.tildacdn.com/tild6637-6664-4233-b939-633831646635/five_of_swords_with_.jpg" },
  { name: "Пятёрка Жезлов", imageUrl: "https://static.tildacdn.com/tild6337-3262-4364-b936-393331323331/five_of_wands_with_l.jpg" },
  { name: "Шут", imageUrl: "https://static.tildacdn.com/tild6564-6365-4839-a538-366265396261/fool_with_label.jpg" },
  { name: "Четвёрка Кубков", imageUrl: "https://static.tildacdn.com/tild3439-6337-4036-a463-666438313639/four_of_cups_with_la.jpg" },
  { name: "Четвёрка Пентаклей", imageUrl: "https://static.tildacdn.com/tild6663-6166-4631-b935-636631643434/four_of_pentacles_wi.jpg" },
  { name: "Четвёрка Мечей", imageUrl: "https://static.tildacdn.com/tild3665-3331-4865-b839-303435346464/four_of_swords_with_.jpg" },
  { name: "Четвёрка Жезлов", imageUrl: "https://static.tildacdn.com/tild3962-6661-4331-b935-623536343761/four_of_wands_with_l.jpg" },
  { name: "Повешенный", imageUrl: "https://static.tildacdn.com/tild3163-3766-4563-b432-623131633932/hanged_man_with_labe.jpg" },
  { name: "Отшельник", imageUrl: "https://static.tildacdn.com/tild3061-6665-4864-a561-336639373338/hermit_with_label.jpg" },
  { name: "Иерофант", imageUrl: "https://static.tildacdn.com/tild3435-6535-4638-b965-653165656132/hierophant_with_labe.jpg" },
  { name: "Верховная Жрица", imageUrl: "https://static.tildacdn.com/tild3131-3336-4339-b962-613862393633/high_priestess_with_.jpg" },
  { name: "Суд", imageUrl: "https://static.tildacdn.com/tild3034-6331-4233-a461-616438626562/judgement_with_label.jpg" },
  { name: "Справедливость", imageUrl: "https://static.tildacdn.com/tild3337-6266-4061-a336-393532343437/justice_with_label.jpg" },
  { name: "Король Кубков", imageUrl: "https://static.tildacdn.com/tild3236-6233-4232-a636-636136663861/king_of_cups_with_la.jpg" },
  { name: "Король Пентаклей", imageUrl: "https://static.tildacdn.com/tild3930-6635-4162-b839-663434306333/king_of_pentacles_wi.jpg" },
  { name: "Король Мечей", imageUrl: "https://static.tildacdn.com/tild3464-3761-4563-b963-373066333366/king_of_swords_with_.jpg" },
  { name: "Король Жезлов", imageUrl: "https://static.tildacdn.com/tild3231-6238-4737-b634-333236366561/king_of_wands_with_l.jpg" },
  { name: "Рыцарь Кубков", imageUrl: "https://static.tildacdn.com/tild3839-3466-4535-b465-616134333631/knight_of_cups_with_.jpg" },
  { name: "Рыцарь Пентаклей", imageUrl: "https://static.tildacdn.com/tild6236-6636-4066-b165-343139383861/knight_of_pentacles_.jpg" },
  { name: "Рыцарь Мечей", imageUrl: "https://static.tildacdn.com/tild3635-3435-4766-b437-383735653337/knight_of_swords_wit.jpg" },
  { name: "Рыцарь Жезлов", imageUrl: "https://static.tildacdn.com/tild6635-6239-4632-b332-396265396563/knight_of_wands_with.jpg" },
  { name: "Влюблённые", imageUrl: "https://static.tildacdn.com/tild3565-6166-4435-b633-343961363332/lovers_with_label.jpg" },
  { name: "Маг", imageUrl: "https://static.tildacdn.com/tild3935-6134-4032-a534-396263366162/magician_with_label.jpg" },
  { name: "Луна", imageUrl: "https://static.tildacdn.com/tild6265-3966-4536-b231-366432353065/moon_with_label.jpg" },
  { name: "Девятка Кубков", imageUrl: "https://static.tildacdn.com/tild6539-3733-4333-a135-323134646332/nine_of_cups_with_la.jpg" },
  { name: "Девятка Пентаклей", imageUrl: "https://static.tildacdn.com/tild3831-3535-4431-b537-373861383562/nine_of_pentacles_wi.jpg" },
  { name: "Девятка Мечей", imageUrl: "https://static.tildacdn.com/tild6461-6130-4239-b564-313032616666/nine_of_swords_with_.jpg" },
  { name: "Девятка Жезлов", imageUrl: "https://static.tildacdn.com/tild3935-3432-4562-b335-613534623962/nine_of_wands_with_l.jpg" },
  { name: "Паж Кубков", imageUrl: "https://static.tildacdn.com/tild6632-6234-4362-a166-336539313465/page_of_cups_with_la.jpg" },
  { name: "Паж Пентаклей", imageUrl: "https://static.tildacdn.com/tild6633-3566-4364-b239-623939346131/page_of_pentacles_wi.jpg" },
  { name: "Паж Мечей", imageUrl: "https://static.tildacdn.com/tild6435-6663-4135-a164-636364313262/page_of_swords_with_.jpg" },
  { name: "Паж Жезлов", imageUrl: "https://static.tildacdn.com/tild3534-3134-4132-b130-353630666339/page_of_wands_with_l.jpg" },
  { name: "Королева Кубков", imageUrl: "https://static.tildacdn.com/tild3062-6633-4131-b064-386137663937/queen_of_cups_with_l.jpg" },
  { name: "Королева Пентаклей", imageUrl: "https://static.tildacdn.com/tild6164-3039-4563-b030-636235626539/queen_of_pentacles_w.jpg" },
  { name: "Королева Мечей", imageUrl: "https://static.tildacdn.com/tild3230-3639-4163-b138-613430303339/queen_of_swords_with.jpg" },
  { name: "Королева Жезлов", imageUrl: "https://static.tildacdn.com/tild6662-6532-4132-b264-353734646433/queen_of_wands_with_.jpg" },
  { name: "Семёрка Кубков", imageUrl: "https://static.tildacdn.com/tild6335-6362-4466-b061-306564363462/seven_of_cups_with_l.jpg" },
  { name: "Семёрка Пентаклей", imageUrl: "https://static.tildacdn.com/tild3036-3633-4663-a263-643161316361/seven_of_pentacles_w.jpg" },
  { name: "Семёрка Мечей", imageUrl: "https://static.tildacdn.com/tild6666-3639-4264-b531-336631643138/seven_of_swords_with.jpg" },
  { name: "Семёрка Жезлов", imageUrl: "https://static.tildacdn.com/tild3231-3239-4866-b336-353564663730/seven_of_wands_with_.jpg" },
  { name: "Шестёрка Кубков", imageUrl: "https://static.tildacdn.com/tild3864-6539-4636-b066-323963633263/six_of_cups_with_lab.jpg" },
  { name: "Шестёрка Пентаклей", imageUrl: "https://static.tildacdn.com/tild6265-3934-4063-b662-623139353936/six_of_pentacles_wit.jpg" },
  { name: "Шестёрка Мечей", imageUrl: "https://static.tildacdn.com/tild3964-3933-4764-a639-386564393530/six_of_swords_with_l.jpg" },
  { name: "Шестёрка Жезлов", imageUrl: "https://static.tildacdn.com/tild6631-6161-4062-b633-383063363338/six_of_wands_with_la.jpg" },
  { name: "Звезда", imageUrl: "https://static.tildacdn.com/tild6538-3339-4461-b937-386232363764/star_with_label.jpg" },
  { name: "Сила", imageUrl: "https://static.tildacdn.com/tild6239-3030-4130-b738-396633346366/strength_with_label.jpg" },
  { name: "Солнце", imageUrl: "https://static.tildacdn.com/tild3530-3232-4263-a561-326566616563/sun_with_label.jpg" },
  { name: "Умеренность", imageUrl: "https://static.tildacdn.com/tild3035-6361-4233-b039-653736333034/temperance_with_labe.jpg" },
  { name: "Десятка Кубков", imageUrl: "https://static.tildacdn.com/tild6537-3832-4836-b237-663432346632/ten_of_cups_with_lab.jpg" },
  { name: "Десятка Пентаклей", imageUrl: "https://static.tildacdn.com/tild3837-6134-4339-a232-613738626236/ten_of_pentacles_wit.jpg" },
  { name: "Десятка Мечей", imageUrl: "https://static.tildacdn.com/tild3765-6365-4834-b365-613162666438/ten_of_swords_with_l.jpg" },
  { name: "Десятка Жезлов", imageUrl: "https://static.tildacdn.com/tild6166-6332-4066-a662-626539623862/ten_of_wands_with_la.jpg" },
  { name: "Тройка Кубков", imageUrl: "https://static.tildacdn.com/tild3038-3334-4662-b935-313236306131/three_of_cups_with_l.jpg" },
  { name: "Тройка Пентаклей", imageUrl: "https://static.tildacdn.com/tild3738-3934-4562-a437-643364666135/three_of_pentacles_w.jpg" },
  { name: "Тройка Жезлов", imageUrl: "https://static.tildacdn.com/tild3830-3366-4735-b734-393961323835/three_of_wands_with_.jpg" },
  { name: "Тройка Мечей", imageUrl: "https://static.tildacdn.com/tild6232-3361-4531-b836-626337363462/three_of_swords_with.jpg" },
  { name: "Башня", imageUrl: "https://static.tildacdn.com/tild6461-3035-4264-b032-646430306564/tower_with_label.jpg" },
  { name: "Двойка Кубков", imageUrl: "https://static.tildacdn.com/tild3837-6537-4864-a632-363036626231/two_of_cups_with_lab.jpg" },
  { name: "Двойка Пентаклей", imageUrl: "https://static.tildacdn.com/tild3131-3232-4663-b565-653036393634/two_of_pentacles_wit.jpg" },
  { name: "Двойка Мечей", imageUrl: "https://static.tildacdn.com/tild3431-3335-4564-a161-643632336337/two_of_swords_with_l.jpg" },
  { name: "Двойка Жезлов", imageUrl: "https://static.tildacdn.com/tild3263-6639-4436-b939-333337656264/two_of_wands_with_la.jpg" },
  { name: "Колесо Фортуны", imageUrl: "https://static.tildacdn.com/tild3866-6238-4339-a466-353438383661/wheel_of_fortune_wit.jpg" },
  { name: "Мир", imageUrl: "https://static.tildacdn.com/tild6536-3539-4434-b862-656337313037/world_with_label.jpg" }
];

export const CardSelection: React.FC<CardSelectionProps> = ({ formData, onComplete }) => {
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [flippingCards, setFlippingCards] = useState<Set<string>>(new Set());
  const cardsToSelect = 3;

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    // Scroll to selected cards when 3 cards are selected
    if (selectedCards.length === cardsToSelect) {
      setTimeout(() => {
        const selectedCardsSection = document.getElementById('selected-cards-display');
        if (selectedCardsSection) {
          selectedCardsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000); // Wait for flip animation to complete
    }
  }, [selectedCards.length]);

  const shuffleCards = () => {
    setIsShuffling(true);
    const shuffled = [...allTarotCards].sort(() => Math.random() - 0.5);
    
    setTimeout(() => {
      setShuffledCards(shuffled);
      setIsShuffling(false);
    }, 1500);
  };

  const handleCardSelect = (card: any) => {
    if (selectedCards.length < cardsToSelect && !selectedCards.includes(card)) {
      // Add flip animation
      const cardKey = `${card.name}-${shuffledCards.indexOf(card)}`;
      setFlippingCards(prev => new Set(prev).add(cardKey));
      
      setTimeout(() => {
        setSelectedCards([...selectedCards, card]);
        setFlippingCards(prev => {
          const newSet = new Set(prev);
          newSet.delete(cardKey);
          return newSet;
        });
      }, 500);
    }
  };

  const handleComplete = () => {
    if (selectedCards.length === cardsToSelect) {
      onComplete();
    }
  };

  const formatCardName = (name: string) => {
    // Split long names into two lines for mobile
    if (name.length > 10) {
      const words = name.split(' ');
      if (words.length >= 2) {
        const mid = Math.ceil(words.length / 2);
        return {
          line1: words.slice(0, mid).join(' '),
          line2: words.slice(mid).join(' ')
        };
      }
    }
    return { line1: name, line2: '' };
  };

  return (
    <div className="text-center px-4">
      <h2 className="text-2xl md:text-3xl font-light text-golden-400 mb-4">
        Привет, {formData.name}!
      </h2>
      <p className="text-lg md:text-xl text-purple-200 mb-8">
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
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 mb-8 max-w-6xl mx-auto">
        {shuffledCards.slice(0, 24).map((card, index) => {
          const cardKey = `${card.name}-${index}`;
          const isFlipping = flippingCards.has(cardKey);
          const isSelected = selectedCards.includes(card);
          
          return (
            <div
              key={cardKey}
              onClick={() => handleCardSelect(card)}
              className={`
                relative w-12 h-18 md:w-20 md:h-32 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10 rounded-lg
                ${isSelected 
                  ? 'ring-2 ring-golden-400 scale-105' 
                  : 'hover:ring-1 hover:ring-purple-400'
                }
                ${selectedCards.length >= cardsToSelect && !isSelected 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
                }
              `}
              style={{ perspective: '1000px' }}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 ${isFlipping ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Back */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-lg shadow-lg border border-golden-400/30"
                  style={{
                    backfaceVisibility: 'hidden',
                    backgroundImage: `url('https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Card Front */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-lg shadow-lg border border-golden-400/30 rotate-y-180"
                  style={{
                    backfaceVisibility: 'hidden',
                    backgroundImage: `url('${card.imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 bg-golden-400/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-golden-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">
                      {selectedCards.indexOf(card) + 1}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Cards Display */}
      {selectedCards.length > 0 && (
        <div id="selected-cards-display" className="mb-8">
          <h3 className="text-lg md:text-xl text-golden-400 mb-6 text-center">Судьба приготовила тебе такие карты:</h3>
          <div className="flex justify-center items-end space-x-2 md:space-x-4 max-w-sm mx-auto">
            {selectedCards.map((card, index) => {
              const cardName = formatCardName(card.name);
              return (
                <div key={index} className="text-center flex-1">
                  <div 
                    className="w-16 h-24 md:w-20 md:h-32 rounded-lg shadow-lg border border-golden-400/30 mb-2 mx-auto"
                    style={{
                      backgroundImage: `url('${card.imageUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="text-xs text-purple-200 leading-tight">
                    <div>{cardName.line1}</div>
                    {cardName.line2 && <div>{cardName.line2}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Complete Button */}
      {selectedCards.length === cardsToSelect && (
        <div className="px-4">
          <Button
            onClick={handleComplete}
            className="w-full max-w-sm mx-auto bg-gradient-to-r from-golden-600 to-golden-400 hover:from-golden-700 hover:to-golden-500 text-black font-medium text-base md:text-lg px-6 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Получить Персональный Расклад
          </Button>
        </div>
      )}
    </div>
  );
};
