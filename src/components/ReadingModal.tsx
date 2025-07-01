
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Mail, MessageCircle, X } from 'lucide-react';

interface ReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    age: string;
    topic: string;
  };
  selectedCards: any[];
}

export const ReadingModal: React.FC<ReadingModalProps> = ({
  isOpen,
  onClose,
  formData,
  selectedCards
}) => {
  const getTopicName = (topic: string) => {
    switch (topic) {
      case 'relationships': return 'Отношения и любовь';
      case 'money': return 'Деньги и карьера';
      case 'self': return 'Самопознание';
      case 'future': return 'Будущее и возможности';
      default: return topic;
    }
  };

  const handleShare = (platform: string) => {
    const text = `Мой персональный расклад Таро: ${selectedCards.map(card => card.name).join(', ')}`;
    const url = window.location.href;
    
    switch (platform) {
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Мой расклад Таро&body=${encodeURIComponent(text + '\n\n' + url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(text + '\n\n' + url);
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 border-golden-400/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-light text-golden-400 text-center">
            Твой персональный расклад, {formData.name}!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="text-center">
            <p className="text-lg text-purple-200">
              Возраст: {formData.age} лет • Тема: {getTopicName(formData.topic)}
            </p>
          </div>

          {/* Cards Display */}
          <div className="text-center">
            <h3 className="text-xl font-light text-golden-400 mb-6">
              Твои карты:
            </h3>
            
            <div className="flex justify-center items-start gap-4 md:gap-8 mb-6 overflow-x-auto">
              {selectedCards.map((card, index) => (
                <div key={index} className="text-center flex-shrink-0">
                  <div className="w-24 h-36 md:w-32 md:h-48 mx-auto mb-3">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-contain rounded-lg border-2 border-golden-400/50 shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg';
                      }}
                    />
                  </div>
                  <div className="text-golden-400 font-medium text-sm mb-1">
                    {card.name}
                  </div>
                  <div className="text-purple-300 text-xs">
                    {index === 0 ? 'Прошлое' : index === 1 ? 'Настоящее' : 'Будущее'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Content */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-golden-400/20">
            <h4 className="text-lg font-light text-golden-400 mb-4 text-center">
              Интерпретация расклада
            </h4>
            
            <div className="text-purple-200 text-sm md:text-base leading-relaxed space-y-3">
              <p className="text-golden-400 font-medium">
                Здесь будет персональный расклад
              </p>
              <p>
                В будущем здесь будет подробная интерпретация каждой карты, 
                персонализированная специально для тебя на основе твоих данных и выбранной темы.
              </p>
              <p>
                Расклад будет включать анализ связей между картами, 
                персональные советы и прогноз развития событий.
              </p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="border-t border-golden-400/20 pt-6">
            <h5 className="text-center text-golden-400 mb-4">Поделиться раскладом:</h5>
            <div className="flex justify-center gap-3 flex-wrap">
              <Button
                onClick={() => handleShare('telegram')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram
              </Button>
              <Button
                onClick={() => handleShare('email')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                onClick={() => handleShare('copy')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Копировать
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <div className="text-center pt-4">
            <Button
              onClick={onClose}
              className="bg-golden-600 hover:bg-golden-700 text-black font-medium px-6 py-2 rounded-full"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
