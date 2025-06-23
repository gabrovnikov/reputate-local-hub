
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, TrendingUp, AlertTriangle, MessageSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get reviews count and average rating
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating, sentiment')
        .eq('user_id', user.id);

      // Get recent alerts count
      const { data: alerts } = await supabase
        .from('review_alerts')
        .select('id')
        .eq('user_id', user.id)
        .eq('resolved', false);

      // Get connected sources
      const { data: sources } = await supabase
        .from('sources')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true);

      const totalReviews = reviews?.length || 0;
      const averageRating = reviews?.length 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;
      
      const positiveReviews = reviews?.filter(r => r.sentiment === 'positive').length || 0;
      const negativeReviews = reviews?.filter(r => r.sentiment === 'negative').length || 0;
      const neutralReviews = reviews?.filter(r => r.sentiment === 'neutral').length || 0;

      return {
        totalReviews,
        averageRating: Number(averageRating.toFixed(1)),
        positiveReviews,
        negativeReviews,
        neutralReviews,
        activeAlerts: alerts?.length || 0,
        connectedSources: sources?.length || 0,
      };
    },
    enabled: !!user,
  });

  if (isLoading) {
    return <div className="text-center py-8">Carregando estatísticas...</div>;
  }

  const statCards = [
    {
      title: 'Total de Avaliações',
      value: stats?.totalReviews || 0,
      icon: MessageSquare,
      description: 'Este mês',
      color: 'text-blue-600',
    },
    {
      title: 'Nota Média',
      value: stats?.averageRating || 0,
      icon: Star,
      description: 'De 5 estrelas',
      color: 'text-yellow-600',
    },
    {
      title: 'Alertas Ativos',
      value: stats?.activeAlerts || 0,
      icon: AlertTriangle,
      description: 'Requerem atenção',
      color: 'text-red-600',
    },
    {
      title: 'Fontes Conectadas',
      value: stats?.connectedSources || 0,
      icon: TrendingUp,
      description: 'Plataformas ativas',
      color: 'text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral da sua reputação online</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Sentimentos</CardTitle>
            <CardDescription>Últimas avaliações recebidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Positivas</span>
                <span className="text-sm text-gray-900">{stats?.positiveReviews || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Neutras</span>
                <span className="text-sm text-gray-900">{stats?.neutralReviews || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">Negativas</span>
                <span className="text-sm text-gray-900">{stats?.negativeReviews || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Ações</CardTitle>
            <CardDescription>Tarefas recomendadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm">Conectar nova fonte de avaliações</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm">Responder avaliações pendentes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">Configurar alertas automáticos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
