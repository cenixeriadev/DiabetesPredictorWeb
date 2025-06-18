import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/footer.css";
import icon_sf from "../assets/imagenes/icon1 sf.png";
import icon2_sf from "../assets/imagenes/icon2 sf.png";
import icon3_sf from "../assets/imagenes/icon3 sf.png";   
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
                        <img className="icono1" src="/src/assets/imagenes/icon1 sf.png" alt="Icono 1" />
                        <img className="icono2" src="/src/assets/imagenes/icon2 sf.png" alt="Icono 2" />
                        <img className="icono3" src="/src/assets/imagenes/icon3 sf.png" alt="Icono 3" />
                    </div>
                    <p>Support: eduar.sk8.23@gmail.com</p>
                    <p>Contacto: 955151725</p>
            </div>
    </footer>
    );
}