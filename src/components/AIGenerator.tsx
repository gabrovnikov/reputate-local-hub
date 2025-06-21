
import React, { useState } from 'react';
import Header from './Header';
import ConnectionCard from './ConnectionCard';
import { Zap, Copy, Check, Sparkles } from 'lucide-react';

const AIGenerator: React.FC = () => {
  const [connections, setConnections] = useState({
    google: true,
    facebook: true,
    tripadvisor: false,
    reclameaqui: false
  });

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleConnect = (platform: string) => {
    setConnections(prev => ({ ...prev, [platform]: true }));
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const platforms = [
    { id: 'google', name: 'Google Meu Negócio', icon: '🔍', connected: connections.google },
    { id: 'facebook', name: 'Facebook Business', icon: '📘', connected: connections.facebook },
    { id: 'tripadvisor', name: 'TripAdvisor', icon: '✈️', connected: connections.tripadvisor },
    { id: 'reclameaqui', name: 'ReclameAqui', icon: '⚖️', connected: connections.reclameaqui }
  ];

  const aiTemplates = [
    {
      title: "Resposta Cordial",
      description: "Para críticas construtivas",
      template: "Olá! Agradecemos muito seu feedback. Vamos analisar internamente os pontos mencionados para melhorar nosso atendimento. Ficamos à disposição para conversar pessoalmente quando desejar. Obrigado!"
    },
    {
      title: "Resposta Empática",
      description: "Para clientes insatisfeitos",
      template: "Prezado cliente, pedimos desculpas pela experiência não ter sido a esperada. Seus comentários são muito importantes para nós e já estamos trabalhando nas melhorias necessárias. Gostaríamos de conversar com você para resolver qualquer questão pendente."
    },
    {
      title: "Resposta Profissional",
      description: "Para reclamações específicas",
      template: "Muito obrigado pelo seu feedback! Nossa equipe está comprometida em melhorar continuamente e seus comentários nos ajudam nesse processo. Esperamos recebê-lo novamente em breve para mostrar as melhorias implementadas!"
    }
  ];

  return (
    <div className="pb-20">
      <Header 
        title="Inteligência Artificial" 
        subtitle="Gere respostas personalizadas automaticamente"
      />
      
      <div className="px-4 space-y-6">
        {/* Status das Conexões */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Conectar Plataformas</h3>
          <div className="space-y-3">
            {platforms.map((platform) => (
              <ConnectionCard
                key={platform.id}
                platform={platform.name}
                icon={platform.icon}
                connected={platform.connected}
                onConnect={() => handleConnect(platform.id)}
              />
            ))}
          </div>
        </div>

        {/* Estatísticas da IA */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} />
            <span className="font-semibold">IA em Ação</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold">87</div>
              <div className="opacity-80">Respostas geradas</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="opacity-80">Taxa de aprovação</div>
            </div>
          </div>
        </div>

        {/* Templates de Resposta */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Templates de Resposta</h3>
          <div className="space-y-3">
            {aiTemplates.map((template, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{template.title}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(template.template, index)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copiedIndex === index ? (
                      <Check size={16} className="text-success" />
                    ) : (
                      <Copy size={16} className="text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                  {template.template}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Configurações da IA */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Configurações da IA</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Resposta Automática</div>
                <div className="text-sm text-gray-500">Gera respostas automaticamente</div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Tom Personalizado</div>
                <div className="text-sm text-gray-500">Adapta ao seu negócio</div>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dica */}
        <div className="bg-primary-light border border-primary/20 rounded-xl p-4">
          <div className="text-sm text-primary-foreground/80 mb-1">💡 Dica</div>
          <div className="text-sm text-primary-foreground">
            A IA aprende com suas respostas aprovadas para gerar conteúdo mais personalizado!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
