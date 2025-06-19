import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import '../styles/Login.css';

const Login = () => {
    const url_base = "https://diabetespredictorweb.onrender.com";
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
                withCredentials: true // Importante para que las cookies se manejen correctamente
            });
            
            if (response.data.success) {
                localStorage.setItem("logueado", "true");
                navigate('/Home');
            }
        } catch (error) {
            alert("Credenciales incorrectas");
            console.error(error);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url_base}/api/v1/auth/register`, {
                username: formData.username,
                email: formData.email,
                contrasena: formData.contrasena
            }, {
                withCredentials: true
            });
            
            if (response.data.success) {
                alert('Registro exitoso');
                setIsRegisterMode(false);
            }
        } catch (error) {
            alert("Error en el registro");
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
                        <p>Or use your email and password</p>
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
                                id="password"
                                type="password"
                                placeholder="Password"
                                required
                                value={formData.contrasena}
                                onChange={handleInputChange}
                            />
                            <i className="bx bxs-lock-alt" style={{ color: 'black' }}></i>
                        </div>
                        <div className="forgot-link">
                            <a href="../New_password/index 3.html">Forgot your password?</a>
                        </div>
                        <button type="submit" className="btn">Sign in</button>
                    </form>
                </div>

                <div className="form-box register">
                    <form>
                        <h1>Registration</h1>
                        <div className="social-icons">
                            <a href="#"><i className="bx bxl-google"></i></a>
                            <a href="#"><i className="bx bxl-facebook"></i></a>
                            <a href="#"><i className="bx bxl-github"></i></a>
                            <a href="#"><i className="bx bxl-instagram"></i></a>
                        </div>
                        <p>Or register with a social platform</p>
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
                                name="email"
                                type="email" 
                                placeholder="Email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input 
                                name="password"
                                type="password" 
                                placeholder="Password" 
                                value={formData.contrasena}
                                onChange={handleInputChange}
                                required
                            />
                            <i className="bx bxs-lock-alt" style={{ color: 'black' }}></i>
                        </div>
                        <button type="button" className="btn" onClick={handleRegister}>Register</button>
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