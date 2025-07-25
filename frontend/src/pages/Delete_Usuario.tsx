import React, { useState } from "react";
import "../styles/Delete_Usuario.css";
import { Link, useNavigate } from "react-router-dom";
import UserProfileLayout from "../components/UserProfileLayout";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function DeleteUsuario() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    setError("");

    try {
      // Llamar al endpoint de eliminación de cuenta
      const response = await axios.delete(`${API_BASE_URL}/api/v1/auth/`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Si la eliminación fue exitosa, cerrar sesión
        await logout();
        // Redirigir al usuario a la página de inicio
        navigate("/Home", { replace: true });
      }
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      setError("No se pudo eliminar la cuenta. Inténtalo de nuevo más tarde.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <UserProfileLayout
      activePage="delete"
      title="Eliminar Cuenta"
      subtitle="Estás a punto de eliminar tu usuario. Toda la información relacionada con tu evaluación desaparecerá."
    >
      <div
        className="deleteuser-form-box"
        style={{ padding: "20px", maxWidth: "600px" }}
      >
        <form onSubmit={handleDeleteAccount}>
          <h3>Tu usuario</h3>
          <div className="deleteuser-input-box">
            <input
              type="text"
              value={user?.username || ""}
              placeholder="Username"
              disabled
            />
            <i className="bx bxs-user"></i>
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}

          <div className="deleteuser-button-container">
            <button
              id="btnyes"
              type="submit"
              className="deleteuser-btn-glass1"
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Sí, eliminar"}
            </button>
            <Link to="/ProfileInformation">
              <button
                id="btnno"
                type="button"
                className="deleteuser-btn-glass2"
                disabled={isDeleting}
              >
                Cancelar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </UserProfileLayout>
  );
}
