import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Headerprincipal from './components/header';
import Home from './pages/Home';
import Pag_Informacion from './pages/Pag_Informacion';
import Footerprincipal from './components/footer';
export default function App() {
  return (
    <BrowserRouter>
      <Headerprincipal />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Pag_Informacion" element={<Pag_Informacion/>} />
      </Routes>
      <Footerprincipal />
    </BrowserRouter>
  );
}
