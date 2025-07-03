import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Headerprincipal from './components/header';
import Home from './pages/Home';
import Pag_Informacion from './pages/Pag_Informacion';
import Footerprincipal from './components/footer';
import Pag_Evaluacion from './pages/Pag_Evaluacion';
import Pag_Cuestionario from './pages/Pag_Cuestionario';
import Login from './pages/Login';
import ResetPassword from './pages/Reset_Password';
import ResultadoBajo from './components/resultados_cuestionario/resultado_bajo';
import ResultadoAlto from './components/resultados_cuestionario/resultado_alto';
import ResultadoLigero from './components/resultados_cuestionario/resultado_ligero';
import ResultadoModerado from './components/resultados_cuestionario/resultado_moderado';
import ResultadoMuyAlto from './components/resultados_cuestionario/resultado_muy_alto';
import Pag_Informacion_Usuario from './pages/Pag_Informacion_Usuario';
import DeleteUsuario from './pages/Delete_Usuario';
import ListaEvaluaciones from './pages/ListaEvaluaciones';

export default function App() {
  return (
    <BrowserRouter>
      <Headerprincipal />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Pag_Informacion" element={<Pag_Informacion />} />
        <Route path="/Pag_Informacion_Usuario" element={<Pag_Informacion_Usuario />} />
        <Route path="/ListaEvaluaciones" element={<ListaEvaluaciones />} />
        <Route path="/Pag_Evaluacion" element={<Pag_Evaluacion />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/DeleteAccount" element={<DeleteUsuario />} />
        <Route path="/Pag_Cuestionario" element={<Pag_Cuestionario />} />
        <Route path="/resultado/bajo" element={<ResultadoBajo />} />
        <Route path="/resultado/ligero" element={<ResultadoLigero />} />
        <Route path="/resultado/moderado" element={<ResultadoModerado />} />
        <Route path="/resultado/alto" element={<ResultadoAlto />} />
        <Route path="/resultado/muy-alto" element={<ResultadoMuyAlto />} />
      </Routes>
      <Footerprincipal />
    </BrowserRouter>
  );
}
