
-- Criar tabela de planos
CREATE TABLE public.plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly NUMERIC(10,2) NOT NULL,
  description TEXT,
  is_trial BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de usuários
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  business_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  signup_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  plan_id UUID REFERENCES public.plans(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de assinaturas
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'trialing', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de fontes/plataformas
CREATE TABLE public.sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('google', 'facebook', 'tripadvisor', 'reclameaqui')),
  source_name TEXT NOT NULL,
  api_key_or_credentials JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de avaliações
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID NOT NULL REFERENCES public.sources(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  customer_name TEXT,
  rating NUMERIC(3,2) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  comment TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  external_review_id TEXT,
  received_at TIMESTAMP WITH TIME ZONE NOT NULL,
  responded BOOLEAN NOT NULL DEFAULT false,
  ai_response TEXT,
  response_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de relatórios semanais
CREATE TABLE public.weekly_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  report_date DATE NOT NULL,
  avg_score NUMERIC(3,2),
  total_reviews INTEGER NOT NULL DEFAULT 0,
  positive_reviews INTEGER NOT NULL DEFAULT 0,
  negative_reviews INTEGER NOT NULL DEFAULT 0,
  neutral_reviews INTEGER NOT NULL DEFAULT 0,
  report_sent BOOLEAN NOT NULL DEFAULT false,
  sent_via_whatsapp BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, report_date)
);

-- Criar tabela de logs do WhatsApp
CREATE TABLE public.whatsapp_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('report', 'alert', 'onboarding', 'response', 'notification')),
  message_content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'delivered')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de alertas de avaliações
CREATE TABLE public.review_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  review_id UUID REFERENCES public.reviews(id) ON DELETE SET NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('low_rating', 'spike_in_negatives', 'no_recent_reviews', 'high_volume')),
  title TEXT NOT NULL,
  description TEXT,
  triggered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de integrações
CREATE TABLE public.integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  integration_type TEXT NOT NULL CHECK (integration_type IN ('openai', 'zapi', 'google_places', 'facebook_api', 'tripadvisor_api')),
  api_key TEXT,
  configuration JSONB,
  active BOOLEAN NOT NULL DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, integration_type)
);

-- Criar tabela de solicitações de funcionalidades
CREATE TABLE public.feature_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'rejected')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  votes INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para otimização de performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_plan_id ON public.users(plan_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_sources_user_id ON public.sources(user_id);
CREATE INDEX idx_sources_platform ON public.sources(platform);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_source_id ON public.reviews(source_id);
CREATE INDEX idx_reviews_received_at ON public.reviews(received_at);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);
CREATE INDEX idx_weekly_reports_user_id ON public.weekly_reports(user_id);
CREATE INDEX idx_weekly_reports_date ON public.weekly_reports(report_date);
CREATE INDEX idx_whatsapp_logs_user_id ON public.whatsapp_logs(user_id);
CREATE INDEX idx_whatsapp_logs_sent_at ON public.whatsapp_logs(sent_at);
CREATE INDEX idx_review_alerts_user_id ON public.review_alerts(user_id);
CREATE INDEX idx_review_alerts_triggered_at ON public.review_alerts(triggered_at);
CREATE INDEX idx_integrations_user_id ON public.integrations(user_id);
CREATE INDEX idx_feature_requests_user_id ON public.feature_requests(user_id);
CREATE INDEX idx_feature_requests_status ON public.feature_requests(status);

-- Habilitar Row Level Security (RLS) em todas as tabelas
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para a tabela plans (leitura pública)
CREATE POLICY "Anyone can view plans" ON public.plans FOR SELECT USING (true);

-- Políticas RLS para a tabela users
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para a tabela subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para a tabela sources
CREATE POLICY "Users can manage their own sources" ON public.sources FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para a tabela reviews
CREATE POLICY "Users can manage their own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para a tabela weekly_reports
CREATE POLICY "Users can manage their own reports" ON public.weekly_reports FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para a tabela whatsapp_logs
CREATE POLICY "Users can view their own whatsapp logs" ON public.whatsapp_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own whatsapp logs" ON public.whatsapp_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para a tabela review_alerts
CREATE POLICY "Users can manage their own alerts" ON public.review_alerts FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para a tabela integrations
CREATE POLICY "Users can manage their own integrations" ON public.integrations FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para a tabela feature_requests
CREATE POLICY "Users can view all feature requests" ON public.feature_requests FOR SELECT USING (true);
CREATE POLICY "Users can create feature requests" ON public.feature_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own feature requests" ON public.feature_requests FOR UPDATE USING (auth.uid() = user_id);

-- Inserir planos básicos
INSERT INTO public.plans (name, price_monthly, description, is_trial) VALUES
('Gratuito', 0.00, 'Plano gratuito com funcionalidades básicas', false),
('Trial', 0.00, 'Período de teste de 7 dias', true),
('Básico', 29.90, 'Monitoramento de até 3 plataformas', false),
('Profissional', 59.90, 'Monitoramento completo + IA + Automações', false),
('Empresarial', 99.90, 'Funcionalidades avançadas + Suporte prioritário', false);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar automaticamente o campo updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON public.sources FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON public.integrations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_feature_requests_updated_at BEFORE UPDATE ON public.feature_requests FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
