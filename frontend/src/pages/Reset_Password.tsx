import React from "react";
import "../styles/Reset_Password.css";
import UserProfileLayout from "../components/UserProfileLayout";

export default function ResetPassword() {
    return (
        <UserProfileLayout 
            activePage="password"
            title="Cambiar contraseña"
            subtitle="Ingrese el correo electrónico asociado a su cuenta y le enviaremos las instrucciones para restablecer la contraseña."
        >
            <div className="reset-form-box" style={{ padding: "20px", maxWidth: "600px" }}>
                <form>
                    <h3 className="reset-label">Su correo electrónico</h3>
                    <div className="reset-input-box">
                        <input type="text" placeholder="Email" required className="reset-input" />
                        <i className="bx bxs-envelope"></i>
                    </div>
                    <button id="reset-btn" type="submit" className="reset-btn-glass">
                        Enviar instrucciones
                    </button>
                </form>
            </div>
        </UserProfileLayout>
    );
}