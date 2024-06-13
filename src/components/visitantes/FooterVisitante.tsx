import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../../styles/visitantes/FooterVisitante.css"; // Arquivo CSS para estilos adicionais
import { useNavigate } from 'react-router-dom';

const FooterVisitante: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar className="footer">
      <div className="footer-section">
        <img src="/images/FooterLogo.png" alt="Logo" className="footer-logo" />
        <p className="footer-description">
          Site criado para projeto do 4º DSM,
          <br />
          FATEC Profº Jessen Vidal.
        </p>
      </div>
      <div className="footer-section">
        <Nav className="flex-column">
          <Nav.Link onClick={() => navigate("/")}>Ínicio</Nav.Link>
          <Nav.Link onClick={() => navigate("/documentacao")}>Documentação</Nav.Link>
          <Nav.Link onClick={() => navigate("/dados/ocorrencias")}>Ocorrências</Nav.Link>
          <Nav.Link onClick={() => navigate("/dados/medidas")}>Medidas</Nav.Link>
        </Nav>
        <p className="footer-company">© 2024 SimpaTech - Os cabulosos</p>
      </div>
      <div className="footer-section">
        <Button
          variant="outline-primary"
          onClick={() => window.scrollTo(0, 0)}
          className="btn-back-to-top"
        >
          Voltar ao topo
        </Button>
      </div>
    </Navbar>
  );
};

export default FooterVisitante;
