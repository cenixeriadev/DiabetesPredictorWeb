import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import '../styles/Login.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterActive, setIsRegisterActive] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "Me" && password === "xd") {
            localStorage.setItem("logueado", "true");
            navigate('/Home');
        } else {
            alert("Credenciales incorrectas");
        }
    };

    const handleRegister = () => {
        // Funcionalidad de registro (pendiente de implementación)
        alert("Registro no implementado");
        setIsRegisterActive(true);
    };

    const handleBack = () => {
        navigate('../Proyecto Pagina Web/Pagina Inicio.html');
    };

    return (
        <div className="login_container_page">
            <div className={`container_login ${isRegisterActive ? "activate" : ""}`}>
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
                                id="username"
                                type="text"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className="input-box">
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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
                            <input type="text" placeholder="Username" required />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Email" required />
                            <i className="bx bxs-envelope"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required />
                            <i className="bx bxs-lock-alt" style={{ color: 'black' }}></i>
                        </div>
                        <button type="button" className="btn" onClick={handleRegister}>Register</button>
                    </form>
                </div>

                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, Welcome!!</h1>
                        <p>Don't have an account?</p>
                        <button className="btn register-btn" onClick={() => setIsRegisterActive(true)}>Register</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="btn login-btn" onClick={() => setIsRegisterActive(false)}>Log In</button>
                    </div>
                </div>
                
            </div>
        </div>    
    );
};

export default Login;