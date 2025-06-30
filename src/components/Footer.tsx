
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-golden-400/20 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 Astral Cards Reveal. Все права защищены.
          </div>
          
          <div className="flex space-x-6">
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-golden-400 text-sm transition-colors"
            >
              Условия использования
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-golden-400 text-sm transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <a 
              href="mailto:support@lovable.app" 
              className="text-gray-400 hover:text-golden-400 text-sm transition-colors"
            >
              Поддержка
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
