import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface UserProfileSidebarProps {
  activePage: 'personal' | 'evaluaciones' | 'password' | 'delete';
}

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({ activePage }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // No es necesario hacer nada más aquí ya que logout() en AuthContext ya maneja 
    // tanto la llamada a la API como la limpieza del estado local
  };

  return (
    <div className="profileinfo-sidebar">
      <div className={`profileinfo-menu-item ${activePage === 'personal' ? 'active' : ''}`}>
        {activePage === 'personal' ? (
          'Personal'
        ) : (
          <Link to="/ProfileInformation" className="profileinfo-link">
            Personal
          </Link>
        )}
      </div>
      
      <div className={`profileinfo-menu-item ${activePage === 'evaluaciones' ? 'active' : ''}`}>
        {activePage === 'evaluaciones' ? (
          'Lista de evaluaciones'
        ) : (
          <Link to="/ListaEvaluaciones" className="profileinfo-link">
            Lista de evaluaciones
          </Link>
        )}
      </div>
      
      <div className="profileinfo-separator"></div>
      
      
      <div className={`profileinfo-menu-item ${activePage === 'delete' ? 'active' : ''}`}>
        {activePage === 'delete' ? (
          'Eliminar cuenta'
        ) : (
          <Link to="/DeleteAccount" className="profileinfo-link">
            Eliminar cuenta
          </Link>
        )}
      </div>
      
      <div className="profileinfo-separator"></div>
      
      <div className="profileinfo-menu-item">
        <Link
          to="/login"
          className="profileinfo-link logout"
          onClick={handleLogout}
          style={{ color: '#e53e3e', display: 'flex', alignItems: 'center' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '8px' }}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
