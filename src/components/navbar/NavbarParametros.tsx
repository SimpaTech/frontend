import React from "react";
import { Nav } from "react-bootstrap";
import "../styles/Navbar.css"

type Props = {
  changePage: (page: string) => void;
};

const NavbarParametros: React.FC<Props> = ({ changePage }) => {
  // Definindo a página padrão como "Dashboard"
  const defaultPage = "Dashboard";

  return (
    <Nav className="navbar" defaultActiveKey={defaultPage} onSelect={(selectedKey: string | null) => {
      if (selectedKey !== null) {
        changePage(selectedKey);
      }
    }}>
      <Nav.Item>
        <Nav.Link eventKey="Cadastrar">Cadastrar</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Consultar">Consultar</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavbarParametros;
