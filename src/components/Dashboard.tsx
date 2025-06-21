
import React from 'react';
import Header from './Header';
import ScoreCard from './ScoreCard';
import MetricCard from './MetricCard';
import ReviewCard from './ReviewCard';

const Dashboard: React.FC = () => {
  return (
    <div className="pb-20">
      <Header 
        title="Painel de Reputação" 
        subtitle="Monitore sua presença online em tempo real"
      />
      
      <div className="px-4 space-y-6">
        {/* Score Principal */}
        <ScoreCard
          score={4.2}
          trend="up"
          trendValue="+0.3 em 7 dias"
          description="Score Geral de Reputação"
        />
        
        {/* Métricas */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Avaliações Positivas"
            value="24"
            subtitle="Últimos 30 dias"
            color="success"
          />
          <MetricCard
            title="Avaliações Negativas"
            value="3"
            subtitle="Precisam de resposta"
            color="danger"
          />
          <MetricCard
            title="Tempo Economizado"
            value="3.2h"
            subtitle="Esta semana"
            color="primary"
          />
          <MetricCard
            title="Taxa de Resposta"
            value="95%"
            subtitle="Com IA"
            color="success"
          />
        </div>
        
        {/* Status das Conexões */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Status das Conexões</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-gray-600">Google</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-gray-600">Facebook</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm text-gray-600">TripAdvisor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">ReclameAqui</span>
            </div>
          </div>
        </div>
        
        {/* Última Avaliação */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Última Avaliação Recebida</h3>
          <ReviewCard
            author="Maria Santos"
            rating={2}
            comment="O atendimento foi demorado e o ambiente estava um pouco desorganizado. Espero que melhorem."
            platform="Google"
            date="Há 2 horas"
            isNegative={true}
          />
        </div>
        
        {/* Dica de Valor */}
        <div className="bg-primary-light border border-primary/20 rounded-xl p-4">
          <div className="text-sm text-primary-foreground/80 mb-1">💡 Dica de hoje</div>
          <div className="text-sm text-primary-foreground">
            Você está economizando <strong>3.2 horas por semana</strong> com respostas automáticas da IA!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
