import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import ResetPassword from './Reset_Password';
import '../styles/Login.css';

const Login = () => {
    const url_base = "https://diabetespredictorweb.onrender.com";

    const [formData, setFormData] = useState({
        username: '',
        correo: '',
        contrasena: ''
    });

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url_base}/api/v1/auth/login`, {
                username: formData.username,
                contrasena: formData.contrasena
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                localStorage.setItem("logueado", "true");
                navigate('/Home');
            } else {
                alert(response.data.message || "Credenciales incorrectas");
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "Error al iniciar sesión");
            console.error(error);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url_base}/api/v1/auth/register`, {
                username: formData.username,
                correo: formData.correo,
                contrasena: formData.contrasena
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                alert(response.data.message || 'Registro exitoso');
                setIsRegisterMode(false);
            } else {
                alert(response.data.message || "Error en el registro");
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "Error en el registro");
            console.error(error);
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
