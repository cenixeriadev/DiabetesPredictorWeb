import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const { login, register } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        correo: '',
        contrasena: ''
    });

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const success = await login(formData.username, formData.contrasena);
            
            if (success) {
                navigate('/Home');
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
            const success = await register(formData.username, formData.correo, formData.contrasena);
            
            if (success) {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                setIsRegisterMode(false);
                // Limpiar los campos después del registro exitoso
                setFormData({
                    username: '',
                    correo: '',
                    contrasena: ''
                });
            } else {
                setError("Error en el registro. El nombre de usuario o correo ya existe.");
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
            <div className={`container_login ${isRegisterMode ? 'activate' : ''}`}>
                <div className="form-box">
                    <form onSubmit={handleLogin} className="login-form">
                        <h1>Login</h1>
                        <div className="social-icons">
                            <a href="#"><i className="bx bxl-google"></i></a>
                            <a href="#"><i className="bx bxl-facebook"></i></a>
                            <a href="#"><i className="bx bxl-github"></i></a>
                            <a href="#"><i className="bx bxl-instagram"></i></a>
                        </div>
                        <p>Or use your username and password</p>
                        <div className="input-box">
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className="input-box">
                            <input
                                name="contrasena"
                                type="password"
                                placeholder="Password"
                                required
                                value={formData.contrasena}
                                onChange={handleInputChange}
                            />
                            <i className="bx bxs-lock-alt" style={{ color: 'black' }}></i>
                        </div>
                        <div className="forgot-link">
                            <Link to="/ResetPassword">Forgot your password?</Link>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="btn">Sign in</button>
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>Registration</h1>
                        <div className="social-icons">
                            <a href="#"><i className="bx bxl-google"></i></a>
                            <a href="#"><i className="bx bxl-facebook"></i></a>
                            <a href="#"><i className="bx bxl-github"></i></a>
                            <a href="#"><i className="bx bxl-instagram"></i></a>
                        </div>
                        <p>Or register with your username and email</p>
                        <div className="input-box">
                            <input 
                                name="username"
                                type="text" 
                                placeholder="Username" 
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className="input-box">
                            <input 
                                name="correo"
                                type="email" 
                                placeholder="Correo" 
                                value={formData.correo}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input 
                                name="contrasena"
                                type="password" 
                                placeholder="Password" 
                                value={formData.contrasena}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-lock-alt" style={{ color: 'black' }}></i>
                        </div>
                        <button type="submit" className="btn">Register</button>
                    </form>
                </div>

                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, Welcome!!</h1>
                        <p>Don't have an account?</p>
                        <button className="btn register-btn" onClick={() => setIsRegisterMode(true)}>Register</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="btn login-btn" onClick={() => setIsRegisterMode(false)}>Log In</button>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default Login;
