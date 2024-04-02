import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Estacao from './components/Estacao';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/estacoes" element={<Estacao />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;