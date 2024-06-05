import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Estacao from './components/estacao/Estacao';
import Usuario from './components/usuarios/Usuario';
import Parametros from './components/parametros/Parametros';
import Alertas from './components/alertas/Alertas';
import Medidas from './components/medidas/Medidas';
import Ocorrencias from './components/ocorrencias/Ocorrencias';
import Visitante from './components/visitantes/Visitante';
import Documentacao from './components/visitantes/Documentacao';
import OcorrenciasConsultarVisitante from './components/visitantes/OcorrenciasVisitante';
import MedidasVisitanteConsultar from './components/visitantes/MedidasVisitante';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Visitante/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/estacoes" element={<Estacao />} />
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/parametros" element={<Parametros />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/medidas" element={<Medidas />} />
          <Route path="/ocorrencias" element={<Ocorrencias />} />
          <Route path="/documentacao" element={<Documentacao />} />
          <Route path="/dados/ocorrencias" element={<OcorrenciasConsultarVisitante />} />
          <Route path="/dados/medidas" element={<MedidasVisitanteConsultar />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;