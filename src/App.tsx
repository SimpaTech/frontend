import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Estacao from './components/Estacao';
import Usuario from './components/Usuario';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/estacoes" element={<Estacao />} />
          <Route path="/usuarios" element={<Usuario />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;