import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { login, register } = useAuth();

  const [formDataR, setFormDataR] = useState({
    username: "",
    correo: "",
    contrasena: "",
  });
  const [formDataL, setFormDataL] = useState({
    username: "",
    contrasena: "",
  }); // it's not clean this way, but it works for now

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChangeL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataL({
      ...formDataL,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChangeR = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataR({
      ...formDataR,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const success = await login(formDataL.username, formDataL.contrasena);

      if (success) {
        navigate("/Home");
      } else {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Error al iniciar sesión");
        console.error(error);
      } else {
        setError("Error al iniciar sesión");
        console.error(error);
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const success = await register(
        formDataR.username,
        formDataR.correo,
        formDataR.contrasena
      );

      if (success) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsRegisterMode(false);
        // Limpiar los campos después del registro exitoso
        setFormDataR({
          username: "",
          correo: "",
          contrasena: "",
        });
      } else {
        setError(
          "Error en el registro. El nombre de usuario o correo ya existe."
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Error en el registro");
        console.error(error);
      } else {
        setError("Error en el registro");
        console.error(error);
      }
    }
  };

  return (
    <div className="login_container_page">
      <div className={`container_login ${isRegisterMode ? "activate" : ""}`}>
        <div className="form-box">
          <form onSubmit={handleLogin} className="login-form">
            <h1>Login</h1>
            <p>Ingrese su nombre de usuario y contraseña</p>
            <div className="input-box">
              <input
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                required
                value={formDataL.username}
                onChange={handleInputChangeL}
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                required
                value={formDataL.contrasena}
                onChange={handleInputChangeL}
              />
              <i className="bx bxs-lock-alt" style={{ color: "black" }}></i>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn">
              Ingresar
            </button>
          </form>
        </div>

        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Registrate</h1>
            <p>
              Rellene los siguientes campos para poder registrarse en la pagína
            </p>
            <div className="input-box">
              <input
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                value={formDataR.username}
                onChange={handleInputChangeR}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                name="correo"
                type="email"
                placeholder="Correo"
                value={formDataR.correo}
                onChange={handleInputChangeR}
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                value={formDataR.contrasena}
                onChange={handleInputChangeR}
                required
              />
              <i className="bx bxs-lock-alt" style={{ color: "black" }}></i>
            </div>
            <button type="submit" className="btn">
              Registrarse
            </button>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hola, Bienvenido!!</h1>
            <p>Aún no tienes una cuenta?</p>
            <button
              className="btn register-btn"
              onClick={() => setIsRegisterMode(true)}
            >
              Registrarse
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Bienvenido devuelta!</h1>
            <p>Ya tienes una cuenta?</p>
            <button
              className="btn login-btn"
              onClick={() => setIsRegisterMode(false)}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
