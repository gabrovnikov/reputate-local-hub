
import React, { useState } from 'react';
import Header from './Header';
import ReviewCard from './ReviewCard';

const Reviews: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  const reviews = [
    {
      author: "João Silva",
      rating: 5,
      comment: "Excelente atendimento! Equipe muito prestativa e ambiente acolhedor. Super recomendo!",
      platform: "Google",
      date: "Há 1 dia",
      isNegative: false
    },
    {
      author: "Maria Santos",
      rating: 2,
      comment: "O atendimento foi demorado e o ambiente estava um pouco desorganizado. Espero que melhorem.",
      platform: "Google",
      date: "Há 2 horas",
      isNegative: true
    },
    {
      author: "Pedro Costa",
      rating: 4,
      comment: "Boa experiência no geral, apenas a espera foi um pouco longa. Mas vale a pena!",
      platform: "Facebook",
      date: "Há 3 dias",
      isNegative: false
    },
    {
      author: "Ana Oliveira",
      rating: 1,
      comment: "Muito insatisfeita com o serviço. Não retorno mais.",
      platform: "Google",
      date: "Há 5 dias",
      isNegative: true
    }
  ];

  const filteredReviews = reviews.filter(review => {
    if (filter === 'positive') return review.rating >= 4;
    if (filter === 'negative') return review.rating <= 3;
    return true;
  });

  return (
    <div className="pb-20">
      <Header 
        title="Avaliações" 
        subtitle="Monitore e responda suas avaliações"
      />
      
      <div className="px-4">
        {/* Filtros */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas (4)
          </button>
          <button
            onClick={() => setFilter('positive')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'positive'
                ? 'bg-success text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Positivas (2)
          </button>
          <button
            onClick={() => setFilter('negative')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === 'negative'
                ? 'bg-danger text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Negativas (2)
          </button>
        </div>

        {/* Lista de Avaliações */}
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <ReviewCard
              key={index}
              author={review.author}
              rating={review.rating}
              comment={review.comment}
              platform={review.platform}
              date={review.date}
              isNegative={review.isNegative}
            />
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">Nenhuma avaliação encontrada</div>
            <div className="text-sm text-gray-400">Tente ajustar os filtros</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
