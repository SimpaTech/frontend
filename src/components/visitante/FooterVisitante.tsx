import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './FooterVisitante.css'; // Arquivo CSS para estilos adicionais

const FooterVisitante: React.FC = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom" className="footer">
      <div className="footer-section">
        <img src="/images/FooterLogo.png" alt="Logo" className="footer-logo" />
        <p className="footer-description">Site criado para projeto do 4º DSM, FATEC Profº Jessen Vidal.</p>
      </div>
      <div className="footer-section">
        <Nav className="flex-column">
          <Nav.Link href="/">Ínicio</Nav.Link>
          <Nav.Link href="/">Documentação</Nav.Link>
          <Nav.Link href="/">Dados</Nav.Link>
        </Nav>
        <p className="footer-company">© 2024 SimpaTech - Os cabulosos</p>
      </div>
      <div className="footer-section">
        <Button variant="outline-primary" href="#top" className="btn-back-to-top">
          Voltar ao Topo
        </Button>
      </div>
    </Navbar>
  );
};

export default FooterVisitante;
