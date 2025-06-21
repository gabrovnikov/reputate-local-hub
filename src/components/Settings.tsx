
import React, { useState } from 'react';
import Header from './Header';
import { Phone, Clock, Bell, CreditCard, User, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('(11) 99999-9999');
  const [notifications, setNotifications] = useState({
    weeklyReports: true,
    instantAlerts: true,
    negativeReviews: true
  });

  return (
    <div className="pb-20">
      <Header 
        title="Configurações" 
        subtitle="Personalize sua experiência"
      />
      
      <div className="px-4 space-y-6">
        {/* Perfil */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <User size={24} className="text-primary" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">João Silva</div>
              <div className="text-sm text-gray-500">joao@restaurante.com</div>
            </div>
          </div>
          <button className="text-primary text-sm font-medium">Editar Perfil</button>
        </div>

        {/* Configurações do WhatsApp */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Phone size={20} className="text-primary" />
            <h3 className="font-semibold text-gray-900">WhatsApp</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número do WhatsApp
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dia para Relatório Semanal
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="monday">Segunda-feira</option>
                <option value="tuesday">Terça-feira</option>
                <option value="wednesday">Quarta-feira</option>
                <option value="thursday">Quinta-feira</option>
                <option value="friday">Sexta-feira</option>
                <option value="saturday">Sábado</option>
                <option value="sunday">Domingo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Horário para Envio
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={20} className="text-primary" />
            <h3 className="font-semibold text-gray-900">Notificações</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Relatórios Semanais</div>
                <div className="text-sm text-gray-500">Receba resumo semanal via WhatsApp</div>
              </div>
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  notifications.weeklyReports ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setNotifications(prev => ({ ...prev, weeklyReports: !prev.weeklyReports }))}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications.weeklyReports ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Alertas Instantâneos</div>
                <div className="text-sm text-gray-500">Notificação imediata para novas avaliações</div>
              </div>
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  notifications.instantAlerts ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setNotifications(prev => ({ ...prev, instantAlerts: !prev.instantAlerts }))}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications.instantAlerts ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Apenas Avaliações Negativas</div>
                <div className="text-sm text-gray-500">Alerta somente para notas 1-3</div>
              </div>
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                  notifications.negativeReviews ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setNotifications(prev => ({ ...prev, negativeReviews: !prev.negativeReviews }))}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  notifications.negativeReviews ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Plano */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard size={20} className="text-primary" />
            <h3 className="font-semibold text-gray-900">Plano Atual</h3>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="font-medium text-gray-900">Plano Profissional</div>
              <div className="text-sm text-gray-500">R$ 97/mês • Renovação em 15 dias</div>
            </div>
            <div className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
              Ativo
            </div>
          </div>
          
          <button className="text-primary text-sm font-medium">Gerenciar Assinatura</button>
        </div>

        {/* Ajuda */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle size={20} className="text-primary" />
            <h3 className="font-semibold text-gray-900">Ajuda & Suporte</h3>
          </div>
          
          <div className="space-y-3">
            <button className="w-full text-left py-2 text-gray-700 hover:text-primary transition-colors">
              Central de Ajuda
            </button>
            <button className="w-full text-left py-2 text-gray-700 hover:text-primary transition-colors">
              Falar com Suporte
            </button>
            <button className="w-full text-left py-2 text-gray-700 hover:text-primary transition-colors">
              Tutoriais em Vídeo
            </button>
          </div>
        </div>

        {/* Versão */}
        <div className="text-center text-sm text-gray-500">
          Versão 1.2.3
        </div>
      </div>
    </div>
  );
};

export default Settings;
