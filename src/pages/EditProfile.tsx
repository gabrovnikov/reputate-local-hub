
import React, { useState } from 'react';
import { ArrowLeft, Camera, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao@restaurante.com',
    phone: '(11) 99999-9999',
    restaurant: 'Restaurante do João',
    address: 'Rua das Flores, 123 - São Paulo, SP'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aqui seria implementada a lógica de salvamento
    console.log('Salvando perfil:', formData);
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl mb-6">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Editar Perfil</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">Atualize suas informações</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Foto do Perfil */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center">
                <User size={48} className="text-primary" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                <Camera size={16} />
              </button>
            </div>
            <Button variant="outline" size="sm">
              Alterar Foto
            </Button>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nome Completo
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Informações do Negócio */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Informações do Negócio</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="restaurant" className="text-sm font-medium text-gray-700">
                Nome do Estabelecimento
              </Label>
              <Input
                id="restaurant"
                type="text"
                value={formData.restaurant}
                onChange={(e) => handleInputChange('restaurant', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Endereço
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button 
            className="flex-1"
            onClick={handleSave}
          >
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
