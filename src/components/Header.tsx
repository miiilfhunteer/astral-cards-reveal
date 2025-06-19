
import React from 'react';
import { Moon, Star } from 'lucide-react';

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Moon className="w-8 h-8 text-golden-400" />
          <span className="text-2xl font-light text-golden-400">TaroMystic</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Star className="w-5 h-5 text-purple-300" />
          <span className="text-purple-200">Твой путь к познанию</span>
        </div>
      </nav>
    </header>
  );
};
