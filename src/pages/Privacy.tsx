
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
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
            🔒 Privacy Policy (Политика конфиденциальности)
          </h1>
          
          <p className="text-gray-300 mb-8">
            <strong>Last updated:</strong> June 26, 2025
          </p>

          <div className="space-y-6 text-gray-200">
            <p className="text-lg">
              Мы уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">1. Сбор информации</h2>
                <p>
                  Мы собираем только необходимую информацию для предоставления наших услуг:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Данные для оплаты (через Paddle)</li>
                  <li>Email для связи и доставки цифровых продуктов</li>
                  <li>Техническая информация о посещении сайта (cookies, IP-адрес)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">2. Использование данных</h2>
                <p>
                  Ваши данные используются исключительно для:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Обработки платежей</li>
                  <li>Предоставления заказанных услуг</li>
                  <li>Технической поддержки</li>
                  <li>Улучшения работы сайта</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">3. Безопасность</h2>
                <p>
                  Мы используем современные технологии шифрования для защиты ваших данных. 
                  Платежная информация обрабатывается исключительно через защищённые системы Paddle.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">4. Передача данных третьим лицам</h2>
                <p>
                  Мы не продаем и не передаем ваши персональные данные третьим лицам, 
                  за исключением случаев, необходимых для обработки платежей (Paddle).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">5. Ваши права</h2>
                <p>
                  Вы имеете право запросить информацию о ваших данных, их исправление или удаление. 
                  Для этого свяжитесь с нами по email: support@lovable.app
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-golden-400 mb-3">6. Контактная информация</h2>
                <p>
                  По вопросам конфиденциальности обращайтесь:
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

export default Privacy;
