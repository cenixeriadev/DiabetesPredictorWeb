import "../styles/Delete_Usuario.css";
import { Link } from 'react-router-dom';

export default function DeleteUsuario() {
    return (
        <div className="deleteuser-root">
            <div className="deleteuser-container">
                <div className="deleteuser-logo-img">
                    4Z
                </div>
                <div className="deleteuser-form-box">
                    <form>
                        <h1>Eliminar Cuenta</h1>
                        <p>
                            Estás a punto de eliminar tu usuario. Toda la información relacionada con tu evaluación desaparecerá.
                        </p>
                        <h3>Tu usuario</h3>
                        <div className="deleteuser-input-box">
                            <input type="text" placeholder="Username" disabled />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className="deleteuser-button-container">
                            <button id="btnyes" type="submit" className="deleteuser-btn-glass1">
                                Sí
                            </button>
                            <button id="btnno" type="button" className="deleteuser-btn-glass2">
                                No
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
