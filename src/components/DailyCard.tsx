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
  const [selectedCard, setSelectedCard] = useState<any>(null);

  // Обновленные карты с новыми ссылками postimg.cc
  const dailyCards = [
    {
      name: "Шут",
      imageUrl: "https://i.postimg.cc/4nzQ74FK/0.jpg",
      title: "Вот Твоя Карта Дня, это - Шут",
      description: "эта карта символизирует новые начинания и спонтанные решения. Сегодня стоит довериться своей интуиции и сделать шаг в неизвестность, который может привести к удивительным открытиям."
    },
    {
      name: "Маг",
      imageUrl: "https://i.postimg.cc/F7Ngjt2T/1.jpg",
      title: "Вот Твоя Карта Дня, это - Маг",
      description: "карта творческой силы и проявления намерений. Сегодня у тебя есть все необходимые ресурсы, чтобы воплотить свои желания в реальность, просто сосредоточься на своей цели."
    },
    {
      name: "Верховная Жрица",
      imageUrl: "https://i.postimg.cc/Tp0j07xf/2.jpg",
      title: "Вот Твоя Карта Дня, это - Верховная Жрица",
      description: "карта интуиции и скрытых знаний. Сегодня обрати внимание на свой внутренний голос и тайные знаки вокруг, они могут открыть тебе важную истину."
    },
    {
      name: "Император",
      imageUrl: "https://i.postimg.cc/G4pF5F3Y/3.jpg",
      title: "Вот Твоя Карта Дня, это - Император",
      description: "карта власти и стабильности. Сегодня время взять ответственность в свои руки и проявить лидерские качества."
    },
    {
      name: "Императрица",
      imageUrl: "https://i.postimg.cc/75Q385bR/4.jpg",
      title: "Вот Твоя Карта Дня, это - Императрица",
      description: "карта женственности и творчества. Сегодня твоя интуиция и забота помогут создать что-то прекрасное."
    },
    {
      name: "Иерофант",
      imageUrl: "https://i.postimg.cc/d7k8qJyV/5.jpg",
      title: "Вот Твоя Карта Дня, это - Иерофант",
      description: "карта мудрости и традиций. Сегодня стоит обратиться к проверенным знаниям и советам мудрых людей."
    },
    {
      name: "Влюбленные",
      imageUrl: "https://i.postimg.cc/kV0WGLQF/6.jpg",
      title: "Вот Твоя Карта Дня, это - Влюбленные",
      description: "карта любви и важных выборов. Сегодня слушай свое сердце при принятии решений."
    },
    {
      name: "Колесница",
      imageUrl: "https://i.postimg.cc/sGyS9S0M/7.jpg",
      title: "Вот Твоя Карта Дня, это - Колесница",
      description: "карта победы и движения вперед. Сегодня твоя решимость приведет к успеху."
    },
    {
      name: "Сила",
      imageUrl: "https://i.postimg.cc/dkGrynnM/8.jpg",
      title: "Вот Твоя Карта Дня, это - Сила",
      description: "карта внутренней силы и мужества. Сегодня ты способна преодолеть любые препятствия."
    },
    {
      name: "Отшельник",
      imageUrl: "https://i.postimg.cc/9wp9xMvJ/9.jpg",
      title: "Вот Твоя Карта Дня, это - Отшельник",
      description: "карта самопознания и поиска истины. Сегодня уделите время размышлениям о своем жизненном пути."
    }
  ];

  useEffect(() => {
    // Выбираем случайную карту при загрузке
    const randomCard = dailyCards[Math.floor(Math.random() * dailyCards.length)];
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
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center space-x-2 text-white hover:text-golden-400 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span className="text-sm">Звук {soundEnabled ? 'включен' : 'выключен'}</span>
          </button>
        </div>
        <p className="text-lg md:text-xl text-white mb-8 animate-pulse px-4">
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
    <div className="text-center w-full max-w-4xl mx-auto">
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
              className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl border border-golden-400/30"
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
              className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl border border-golden-400/30 rotate-y-180"
              style={{ 
                backfaceVisibility: 'hidden'
              }}
            >
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.name}
                className="w-full h-full object-cover rounded-2xl"
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
          <p className="text-white mt-6 animate-pulse text-xl md:text-2xl px-4">
            <span className="font-bold text-2xl md:text-3xl">Нажмите</span> на карту, чтобы увидеть ее значение
          </p>
        )}
      </div>

      {/* Card Description */}
      {step === 'revealed' && (
        <div className="max-w-2xl mx-auto mb-8 px-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-800/30">
            <h3 className="text-white font-bold text-lg md:text-xl mb-4">{selectedCard.title}:</h3>
            <p className="text-white leading-relaxed text-base md:text-lg">{selectedCard.description}</p>
          </div>
        </div>
      )}

      {/* CTA for Personal Reading */}
      {showCTA && (
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-golden-400/30">
            <h3 className="text-xl md:text-2xl font-light text-golden-400 mb-6">
              Хочешь получить <em className="italic">Свой</em> Персональный Расклад?
            </h3>
            <Button 
              onClick={onPersonalReadingClick}
              className="w-full bg-gradient-to-r from-black to-purple-900 hover:from-purple-900 hover:to-black text-white font-medium text-sm md:text-base px-4 py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 shake-button whitespace-normal leading-tight"
            >
              Получить персональный расклад
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
