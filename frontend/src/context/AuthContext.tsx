import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

// Definición de tipos
interface User {
  id_usuario: number;
  username: string;
  correo: string;
  contrasena: string;
  // Otros campos que pueda tener el usuario
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
}

// Creación del contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// URL base para las solicitudes API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// Proveedor del contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Función para verificar si el usuario está autenticado
  const checkAuthStatus = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Verificar si hay token en localStorage (método simple)
      const isLoggedIn = localStorage.getItem("logueado") === "true";

      if (isLoggedIn) {
        // Verificar con el backend
        const response = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.usuario) {
          setUser(response.data.usuario);
          setIsAuthenticated(true);
          setIsLoading(false);
          return true;
        } else {
          // Si el backend no reconoce al usuario, limpiar localStorage
          localStorage.removeItem("logueado");
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return false;
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      localStorage.removeItem("logueado");
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  // Función para iniciar sesión
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/login`,
        {
          username,
          contrasena: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 && response.data.usuario) {
        localStorage.setItem("logueado", "true");
        setUser(response.data.usuario);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      return false;
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/register`,
        {
          username,
          correo: email,
          contrasena: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201 && response.data.usuario) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error de registro:", error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = async (): Promise<void> => {
    try {
      // Llamar al endpoint de cierre de sesión en el backend
      await axios.post(
        `${API_BASE_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Sesión cerrada correctamente en el servidor");
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
      // Continuamos con la limpieza del lado del cliente incluso si hay un error en el servidor
    } finally {
      // Limpiar estado local siempre, independientemente del resultado de la llamada a la API
      localStorage.removeItem("logueado");
      setUser(null);
      setIsAuthenticated(false);
      console.log("Estado de autenticación local limpiado");
    }
  };

  // Valores proporcionados por el contexto
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
