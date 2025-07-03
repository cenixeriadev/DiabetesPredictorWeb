import React from 'react';
import "../styles/footer.css";

export default function Footerprincipal() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-logo">4Z</div>
                <div className="footer-subtitulo">Equipo #01</div>
            </div>
            <div className="footer-mid">
                <div className="footer-integrantes">
                    <p>Ramos Anthony</p>
                    <p>Santiesteban Sebastian</p>
                    <p>Aguilar Richard</p>
                    <p>Siquita Eduar</p>
                    <p>Leon Gianfranco</p>
                </div>
                <div>© 2025. 4Z derechos reservados.</div>
            </div>
            <div className="footer-right">
                <div className="footer-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="bx bxl-facebook footer-social-icon"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="bx bxl-instagram footer-social-icon"></i>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <i className="bx bxl-youtube footer-social-icon"></i>
                    </a>
                </div>
                <p>Support: eduar.sk8.23@gmail.com</p>
                <p>Contacto: 955151725</p>
            </div>
        </footer>
    );
}