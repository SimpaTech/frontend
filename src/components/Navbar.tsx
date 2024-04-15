import React from "react";
import { Nav } from "react-bootstrap";
import "../styles/Navbar.css";

type Props = {
  changePage: (page: string) => void;
  hasDashboard: boolean;
};

const Navbar: React.FC<Props> = ({ changePage, hasDashboard }) => {
  // Definindo a página padrão como "Dashboard"
  const defaultPage = "Dashboard";

  return (
    <Nav className="navbar" defaultActiveKey={defaultPage} onSelect={(selectedKey: string | null) => {
      if (selectedKey !== null) {
        changePage(selectedKey);
      }
    }}>
      <Nav.Item>
        <Nav.Link eventKey="Cadastro">Cadastro</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Consultar">Consultar</Nav.Link>
      </Nav.Item>
      {/* Renderização condicional para adicionar o item de navegação para o Dashboard */}
      {hasDashboard && (
        <Nav.Item>
          <Nav.Link eventKey="Dashboard">Dashboard</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default Navbar;
