import { PlusIcon } from 'lucide-react';
import { Navigate } from 'react-router';

import DateSelection from '@/components/date-selection';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, isInitializing } = useAuthContext();
  if (isInitializing) return null;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
      <div className="p-8">
        {/* Parte do topo */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            {/* Seletor de data e botão de transação */}
            <Button>
              <PlusIcon />
              Nova Transação
            </Button>
          </div>
        </div>
        {/* Gráfico ou conteúdo principal da dashboard */}
      </div>
    </>
  );
};

export default HomePage;
