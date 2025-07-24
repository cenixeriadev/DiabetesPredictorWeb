import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ListaEvaluaciones.css";
import UserProfileLayout from "../components/UserProfileLayout";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface EvaluacionItem {
  id_cuestionario: number;
  fecha: string;
  hora: string;
  prediccion: string;
  id_resultado: number;
}

// Función para formatear la fecha (usa configuración local del usuario)
const formatearFecha = (fechaISO: string): string => {
  const fecha = new Date(fechaISO + 'T00:00:00Z'); // Agregar tiempo UTC para evitar cambios de zona horaria
  return fecha.toLocaleDateString(undefined, { // undefined usa la configuración local del navegador
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
// NUEVA FUNCIÓN - Usa la fecha Y hora del backend
const formatearHoraLocal = (fechaISO: string, horaISO: string): string => {
  try {
    // Combina fecha y hora en formato ISO UTC (ej: "2023-10-05T14:30:00Z")
    const dateTimeUTC = `${fechaISO}T${horaISO}Z`;
    const date = new Date(dateTimeUTC);
    
    // Convierte a hora local del usuario
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Usa zona horaria del usuario
    });
  } catch (error) {
    console.error("Error formateando hora:", error);
    return horaISO; // Fallback
  }
};

// Función para convertir la predicción numérica a texto descriptivo
const getNivelRiesgo = (prediccion: string): string => {
  switch (prediccion) {
    case "No Diabetes":
      return "Bajo";
    case "Diabetes":
      return "Alto";
    default:
      return "No disponible";
  }
};

export default function ListaEvaluaciones() {
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [totalItems, setTotalItems] = useState<number>(0);
  useEffect(() => {
    const fetchEvaluaciones = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/historial`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setEvaluaciones(response.data.historial);
          setTotalItems(response.data.total);
        }
      } catch (error) {
        console.error("Error al obtener el historial de evaluaciones:", error);
        setError(
          "No se pudo cargar el historial de evaluaciones. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluaciones();
  }, []);

  // Calculamos el número total de páginas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Obtenemos los elementos para la página actual (el backend ya los ordena)
  const currentItems = evaluaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manejadores para la paginación
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <UserProfileLayout
      activePage="evaluaciones"
      title="Lista de evaluaciones"
      subtitle="A continuación la lista de evaluaciones tomadas."
    >
      {isLoading ? (
        <div className="profileinfo-loading">
          <div className="profileinfo-spinner"></div>
          <p>Cargando evaluaciones...</p>
        </div>
      ) : error ? (
        <div className="profileinfo-error">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="profileinfo-retry-button"
          >
            Reintentar
          </button>
        </div>
      ) : evaluaciones.length === 0 ? (
        <div className="profileinfo-no-evaluations">
          <p>No tienes evaluaciones registradas.</p>
          <Link to="/Pag_Evaluacion" className="profileinfo-button">
            Realizar una evaluación
          </Link>
        </div>
      ) : (
        // Lista de evaluaciones
        <>
          {currentItems.map((evaluacion, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <div
                className="profileinfo-evaluation-block"
                key={evaluacion.id_cuestionario}
              >
                <h3>Evaluación #{globalIndex}</h3>
                <div className="profileinfo-form-group">
                  <label>Fecha:</label>
                  <input
                    type="text"
                    value={formatearFecha(evaluacion.fecha)}
                    readOnly
                  />
                </div>
                <div className="profileinfo-form-group">
                  <label>Hora:</label>
                  <input
                    type="text"
                    value={formatearHoraLocal(evaluacion.fecha , evaluacion.hora)}
                    readOnly
                  />
                </div>
                <div className="profileinfo-form-group">
                  <label>Resultado:</label>
                  <input
                    type="text"
                    value={getNivelRiesgo(evaluacion.prediccion)}
                    readOnly
                    className={`result-${evaluacion.prediccion}`}
                  />
                </div>
              </div>
            );
          })}

          {totalPages > 1 && (
            <div className="profileinfo-pagination">
              <span>
                Página {currentPage} de {totalPages}
              </span>
            </div>
          )}

          <div className="profileinfo-buttons">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="profileinfo-button"
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
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="profileinfo-button"
            >
              Siguiente
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
                style={{ marginLeft: "8px", marginRight: "0" }}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </>
      )}
    </UserProfileLayout>
  );
}
