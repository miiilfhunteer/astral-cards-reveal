
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ReadingResult = () => {
  const location = useLocation();
  const { formData, selectedCards } = location.state || {};

  // Если нет данных, показываем ошибку
  if (!formData || !selectedCards) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl text-golden-400 mb-4">Ошибка</h1>
          <p className="text-purple-200 mb-6">Данные расклада не найдены</p>
          <Link to="/">
            <Button className="bg-golden-600 hover:bg-golden-700 text-black">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-purple-200 hover:text-golden-400 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться на главную
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-light text-golden-400 mb-4">
            Твой персональный расклад, {formData.name}!
          </h1>
          
          <p className="text-lg md:text-xl text-purple-200 mb-12">
            Возраст: {formData.age} лет • Тема: {formData.topic === 'relationships' ? 'Отношения и любовь' : 
            formData.topic === 'money' ? 'Деньги и карьера' : 
            formData.topic === 'self' ? 'Самопознание' : 'Будущее и возможности'}
          </p>

          {/* Cards Display */}
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-light text-golden-400 mb-8">
              Твои карты:
            </h2>
            
            {/* Cards Layout */}
            <div className="flex justify-center items-start gap-4 md:gap-8 mb-8 max-w-full mx-auto overflow-x-auto">
              {selectedCards.map((card: any, index: number) => (
                <div key={index} className="text-center flex-shrink-0">
                  <div className="w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 mx-auto mb-4 bg-black rounded-lg overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-contain shadow-lg border border-golden-400/30 rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://static.tildacdn.com/tild3835-6566-4939-b233-646265643261/card_back.jpg';
                      }}
                    />
                  </div>
                  <div className="text-golden-400 font-medium text-sm md:text-base mb-2">
                    {card.name}
                  </div>
                  <div className="text-purple-300 text-xs md:text-sm">
                    {index === 0 ? 'Прошлое' : index === 1 ? 'Настоящее' : 'Будущее'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Content */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-8 border border-golden-400/30">
              <h3 className="text-xl md:text-2xl font-light text-golden-400 mb-6">
                Интерпретация расклада
              </h3>
              
              <div className="text-purple-200 text-base md:text-lg leading-relaxed space-y-4">
                <p>
                  <strong className="text-golden-400">Здесь будет персональный расклад</strong>
                </p>
                <p>
                  В будущем здесь будет подробная интерпретация каждой карты, 
                  персонализированная специально для тебя на основе твоих данных и выбранной темы.
                </p>
                <p>
                  Расклад будет включать:
                </p>
                <ul className="text-left list-disc list-inside space-y-2 text-purple-300">
                  <li>Значение каждой карты в контексте твоей ситуации</li>
                  <li>Связь между картами и их влияние друг на друга</li>
                  <li>Персональные советы и рекомендации</li>
                  <li>Прогноз и возможные пути развития событий</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 space-y-4">
            <Link to="/">
              <Button className="bg-golden-600 hover:bg-golden-700 text-black font-medium px-8 py-3 rounded-full">
                Получить новый расклад
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingResult;
