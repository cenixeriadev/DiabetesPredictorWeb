import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Headerprincipal from './components/header';
import Home from './pages/Home';
import Footerprincipal from './components/footer';
export default function App() {
  return (
    <BrowserRouter>
      <Headerprincipal />
      <Routes>
        <Route path="/Home" element={<Home />} />
      </Routes>
      <Footerprincipal />
    </BrowserRouter>
  );
}
