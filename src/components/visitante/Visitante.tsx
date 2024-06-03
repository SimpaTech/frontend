import React from 'react';
import NavbarVisitante from './NavbarVisitante';
import FooterVisitante from './FooterVisitante';
import Container from 'react-bootstrap/Container';
import './Visitante.css';

const Visitante: React.FC = () => {
  return (
    <div className="visitante-page">
      <NavbarVisitante />
      <Container fluid className="visitante-content">
        {/* Conteúdo da página do visitante */}
        <h1 className="display-4">Página do Visitante</h1>
        <p className="lead">Bem-vindo à página de visitante.</p>
      </Container>
      <Container fluid className="visitante-content">
        {/* Conteúdo da página do visitante */}
        <h1 className="display-4">Página do Visitante</h1>
        <p className="lead">Bem-vindo à página de visitante.</p>
      </Container>
      <Container fluid className="visitante-content">
        {/* Conteúdo da página do visitante */}
        <h1 className="display-4">Página do Visitante</h1>
        <p className="lead">Bem-vindo à página de visitante.</p>
      </Container>
      <Container fluid className="visitante-content">
        {/* Conteúdo da página do visitante */}
        <h1 className="display-4">Página do Visitante</h1>
        <p className="lead">Bem-vindo à página de visitante.</p>
      </Container>
      <FooterVisitante />
    </div>
  );
};

export default Visitante;
