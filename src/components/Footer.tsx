
import React from 'react';
import { Heart, Star } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-purple-800/30 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-golden-400" />
          <span className="text-golden-400 font-light">TaroMystic</span>
          <Star className="w-5 h-5 text-golden-400" />
        </div>
        <p className="text-purple-200 flex items-center justify-center space-x-1">
          <span>Создано с</span>
          <Heart className="w-4 h-4 text-red-400" />
          <span>для души</span>
        </p>
      </div>
    </footer>
  );
};
