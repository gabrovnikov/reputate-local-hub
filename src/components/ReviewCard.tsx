
import React, { useState } from 'react';
import { Star, Zap, Copy, Check } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  rating: number;
  comment: string;
  platform: string;
  date: string;
  isNegative?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  author, 
  rating, 
  comment, 
  platform, 
  date, 
  isNegative = false 
}) => {
  const [showAI, setShowAI] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const aiSuggestions = [
    "Olá! Agradecemos muito seu feedback. Vamos analisar internamente os pontos mencionados para melhorar nosso atendimento. Ficamos à disposição para conversar pessoalmente quando desejar. Obrigado!",
    "Prezado cliente, obrigado por compartilhar sua experiência. Seus comentários são muito importantes para nós. Já estamos trabalhando nas melhorias necessárias. Esperamos recebê-lo novamente em breve!",
    "Muito obrigado pelo seu feedback! Pedimos desculpas pela experiência não ter sido a esperada. Nossa equipe está comprometida em melhorar continuamente. Gostaríamos de conversar com você para resolver qualquer questão pendente."
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-warning fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900">{author}</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-sm text-gray-500">• {platform}</span>
            <span className="text-sm text-gray-500">• {date}</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-3">{comment}</p>
      
      {isNegative && (
        <div className="border-t pt-3">
          {!showAI ? (
            <button
              onClick={() => setShowAI(true)}
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Zap size={16} />
              Gerar Resposta com IA
            </button>
          ) : (
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900 mb-2">
                Sugestões de resposta:
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 relative">
                  <p className="text-sm text-gray-700 mb-2">{suggestion}</p>
                  <button
                    onClick={() => copyToClipboard(suggestion, index)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded"
                  >
                    {copiedIndex === index ? (
                      <Check size={16} className="text-success" />
                    ) : (
                      <Copy size={16} className="text-gray-500" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
