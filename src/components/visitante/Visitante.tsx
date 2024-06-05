import React from 'react';
import NavbarVisitante from './NavbarVisitante';
import FooterVisitante from './FooterVisitante';
import Container from 'react-bootstrap/Container';
import './Visitante.css';
import { Image } from 'react-bootstrap';

const Visitante: React.FC = () => {
  return (
    <div className="visitante-page">
      <NavbarVisitante />

      <Container fluid className="m-0 p-0 w-100">
        <Image fluid src="/images/Banner.png" className=""/>
      </Container>

      <Container fluid className="visitante-content flex justify-center text-center">
        {/* Conteúdo da página do visitante */}
        <h1 className="display-4">Página do Visitante</h1>
        <p className="lead">Bem-vindo à página de visitante.</p>
      </Container>
      
      <FooterVisitante />
    </div>
  );
};

export default Visitante;
