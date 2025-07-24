import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { useAuth } from "../context/AuthContext";

export default function Headerprincipal() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <header>
      <div className="LogoContainer">
        <h3 className="Titulo">
          Web Predictive Model to Estimate the Probability of Developing Type 2 Diabetes
        </h3>
      </div>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      ></button>
      <div className={`MenuContainer ${menuOpen ? "open" : ""}`}>
        <nav className="Menu">
          <Link to="/Home" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="./Pag_Informacion" onClick={() => setMenuOpen(false)}>
            Information
          </Link>
          <Link to="/Pag_Evaluacion" onClick={() => setMenuOpen(false)}>
            Evaluation
          </Link>
        </nav>
        <nav className="Login">
          {isAuthenticated ? (
            <Link to="/ProfileInformation" onClick={() => setMenuOpen(false)}>
              {user?.username || "Usuario"}
            </Link>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login/Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
