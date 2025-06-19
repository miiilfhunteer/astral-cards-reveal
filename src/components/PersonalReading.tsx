
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardSelection } from '@/components/CardSelection';
import { Heart, DollarSign, User, Sparkles } from 'lucide-react';

export const PersonalReading = () => {
  const [step, setStep] = useState('form'); // form, selection, payment, result
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    topic: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.topic) {
      setStep('selection');
      // Scroll to card selection
      setTimeout(() => {
        window.scrollTo({ 
          top: document.body.scrollHeight, 
          behavior: 'smooth' 
        });
      }, 500);
    }
  };

  const topics = [
    { value: 'relationships', label: 'Отношения и любовь', icon: Heart },
    { value: 'money', label: 'Деньги и карьера', icon: DollarSign },
    { value: 'self', label: 'Самопознание', icon: User },
    { value: 'future', label: 'Будущее и возможности', icon: Sparkles }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        
        {step === 'form' && (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-light text-golden-400 mb-8">
              Персональный расклад
            </h2>
            <p className="text-xl text-purple-200 mb-12">
              Расскажи немного о себе, чтобы карты дали тебе точный ответ
            </p>

            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto space-y-6">
              <div className="text-left">
                <Label htmlFor="name" className="text-purple-200 mb-2 block">
                  Твоё имя
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-black/20 border-purple-800/50 text-white placeholder-purple-400 focus:border-golden-400"
                  placeholder="Как тебя зовут?"
                  required
                />
              </div>

              <div className="text-left">
                <Label htmlFor="age" className="text-purple-200 mb-2 block">
                  Возраст
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="16"
                  max="99"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="bg-black/20 border-purple-800/50 text-white placeholder-purple-400 focus:border-golden-400"
                  placeholder="Сколько тебе лет?"
                  required
                />
              </div>

              <div className="text-left">
                <Label className="text-purple-200 mb-2 block">
                  Тема расклада
                </Label>
                <Select onValueChange={(value) => setFormData({...formData, topic: value})}>
                  <SelectTrigger className="bg-black/20 border-purple-800/50 text-white">
                    <SelectValue placeholder="Выбери тему, которая тебя волнует" />
                  </SelectTrigger>
                  <SelectContent className="bg-indigo-950 border-purple-800/50">
                    {topics.map((topic) => {
                      const Icon = topic.icon;
                      return (
                        <SelectItem 
                          key={topic.value} 
                          value={topic.value}
                          className="text-white hover:bg-purple-800/30 cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-golden-400" />
                            <span>{topic.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-golden-600 to-golden-400 hover:from-golden-700 hover:to-golden-500 text-black font-medium text-lg py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Продолжить к картам
              </Button>
            </form>
          </div>
        )}

        {step === 'selection' && (
          <CardSelection 
            formData={formData}
            onComplete={() => setStep('payment')}
          />
        )}

        {step === 'payment' && (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-light text-golden-400 mb-8">
              Почти готово!
            </h2>
            <div className="max-w-md mx-auto bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-8 border border-golden-400/30">
              <p className="text-purple-200 mb-6">
                Стоимость персонального расклада: <span className="text-golden-400 text-xl font-medium">400 грн.</span>
              </p>
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium text-lg py-3 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
                Оплатить расклад
              </Button>
              <p className="text-purple-400 text-sm mt-4">
                Безопасная оплата • Моментальное получение результата
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
