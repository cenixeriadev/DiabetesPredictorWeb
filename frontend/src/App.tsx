import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Headerprincipal from './components/header';
import Home from './pages/Home';
import Pag_Informacion from './pages/Pag_Informacion';
import Footerprincipal from './components/footer';
import Pag_Evaluacion from './pages/Pag_Evaluacion';
import Pag_Cuestionario from './pages/Pag_Cuestionario';
import Login from './pages/Login';
import ResultadoBajo from './components/resultados_cuestionario/resultado_bajo';
import ResultadoAlto from './components/resultados_cuestionario/resultado_alto';
import ResultadoLigero from './components/resultados_cuestionario/resultado_ligero';
import ResultadoModerado from './components/resultados_cuestionario/resultado_moderado';
import ResultadoMuyAlto from './components/resultados_cuestionario/resultado_muy_alto';
import Pag_Informacion_Usuario from './pages/Pag_Informacion_Usuario';
import DeleteUsuario from './pages/Delete_Usuario';
import ListaEvaluaciones from './pages/ListaEvaluaciones';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/loading.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Headerprincipal />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Pag_Informacion" element={<Pag_Informacion />} />
          <Route path="/ProfileInformation" element={<ProtectedRoute><Pag_Informacion_Usuario /></ProtectedRoute>} />
          <Route path="/ListaEvaluaciones" element={<ProtectedRoute><ListaEvaluaciones /></ProtectedRoute>} />
          <Route path="/Pag_Evaluacion" element={<ProtectedRoute><Pag_Evaluacion /></ProtectedRoute>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DeleteAccount" element={<ProtectedRoute><DeleteUsuario /></ProtectedRoute>} />
          <Route path="/Pag_Cuestionario" element={<ProtectedRoute><Pag_Cuestionario /></ProtectedRoute>} />
          <Route path="/resultado/bajo" element={<ProtectedRoute><ResultadoBajo /></ProtectedRoute>} />
          <Route path="/resultado/ligero" element={<ProtectedRoute><ResultadoLigero /></ProtectedRoute>} />
          <Route path="/resultado/moderado" element={<ProtectedRoute><ResultadoModerado /></ProtectedRoute>} />
          <Route path="/resultado/alto" element={<ProtectedRoute><ResultadoAlto /></ProtectedRoute>} />
          <Route path="/resultado/muy-alto" element={<ProtectedRoute><ResultadoMuyAlto /></ProtectedRoute>} />
        </Routes>
        <Footerprincipal />
      </BrowserRouter>
    </AuthProvider>
  );
}
