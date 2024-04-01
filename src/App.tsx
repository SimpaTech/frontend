import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EstacaoCadastro from './components/EstacaoCadastro';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/estacoes/cadastro" element={<EstacaoCadastro />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;