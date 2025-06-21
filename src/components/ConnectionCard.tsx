
import React, { useState } from 'react';
import { CheckCircle, Plus } from 'lucide-react';

interface ConnectionCardProps {
  platform: string;
  icon: string;
  connected: boolean;
  onConnect: () => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ platform, icon, connected, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula conexão
    onConnect();
    setIsConnecting(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
            <span className="text-xl">{icon}</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{platform}</div>
            <div className="text-sm text-gray-500">
              {connected ? 'Conectado' : 'Não conectado'}
            </div>
          </div>
        </div>
        
        {connected ? (
          <CheckCircle className="text-success" size={24} />
        ) : (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Plus size={16} />
            {isConnecting ? 'Conectando...' : 'Conectar'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
