
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-golden-400 hover:text-golden-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Вернуться на главную
        </Link>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-light mb-8 text-golden-400">
            📄 Terms of Service (Условия использования)
          </h1>
          
          <p className="text-gray-300 mb-8">
            <strong>Last updated:</strong> June 26, 2025
          </p>

          <div className="space-y-6 text-gray-200">
            <p className="text-lg">
              Добро пожаловать на сайт astral-cards-reveal.lovable.app!
            </p>

            <p>
              Используя данный сайт, вы соглашаетесь с нижеприведёнными условиями:
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">1. Услуги</h2>
                <p>
                  Мы предоставляем цифровые продукты, связанные с Таро-раскладами и интерпретациями. 
                  Услуги предоставляются в цифровом виде (текст, изображения, PDF) после оплаты.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">2. Оплата</h2>
                <p>
                  Оплата осуществляется через защищённый платёжный шлюз Paddle. Все цены указаны в гривнах (UAH) 
                  и включают налоги, если применимо. После оплаты клиент получает доступ к заказанному продукту.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">3. Возвраты</h2>
                <p>
                  Так как услуга является цифровой и считается оказанной после оплаты, возвраты не предусмотрены. 
                  Если вы считаете, что произошла ошибка, пожалуйста, свяжитесь с нами через email: support@lovable.app.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">4. Ответственность</h2>
                <p>
                  Сайт и его авторы не несут ответственности за личные решения, принятые на основе полученной информации. 
                  Все интерпретации имеют развлекательный характер.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">5. Контактная информация</h2>
                <p>
                  Если у вас есть вопросы по условиям использования, пожалуйста, свяжитесь с нами:
                </p>
                <p>
                  <strong>Email:</strong> support@lovable.app
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
