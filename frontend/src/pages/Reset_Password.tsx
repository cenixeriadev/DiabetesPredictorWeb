import React from "react";
import "../styles/Reset_Password.css";

export default function ResetPassword() {
    return (
        <div className="reset-outer-center">
            <div className="reset-container">
                <div
                    className="reset-logo-img"
                    style={{
                        fontWeight: "bold",
                        fontSize: "5rem",
                        color: "#574b90",
                        textAlign: "center",
                        margin: "24px auto"
                    }}
                >
                    4Z
                </div>
                <div className="reset-form-box">
                    <form>
                        <h1 className="reset-title">Reset your password</h1>
                        <p className="reset-desc">
                            Ingrese el correo electrónico asociado a su cuenta y le enviaremos las instrucciones para restablecer la contraseña.
                        </p>
                        <h3 className="reset-label">Your email</h3>
                        <div className="reset-input-box">
                            <input type="text" placeholder="Email" required className="reset-input" />
                            <i className="bx bxs-envelope"></i>
                        </div>
                        <button id="reset-btn" type="submit" className="reset-btn-glass">
                            Send reset instructions
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}