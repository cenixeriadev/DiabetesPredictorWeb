import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/Login' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Si está cargando, muestra un indicador de carga
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // Si está autenticado, permite acceso al componente hijo
  return <>{children}</>;
};

export default ProtectedRoute;
