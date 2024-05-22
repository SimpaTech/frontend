import React from "react";
import { Nav } from "react-bootstrap";
import "../../styles/navbar/Navbar.css"

type Props = {
  changePage: (page: string) => void;
  hasDashboard: boolean;
  currentPage: string;
  hasCadastro: boolean;
};

const Navbar: React.FC<Props> = ({ changePage, hasDashboard, currentPage, hasCadastro }) => {
  // Defining the default page as "Dashboard"
  const defaultPage = "Dashboard";

  return (
    <Nav className="navbar" defaultActiveKey={defaultPage} onSelect={(selectedKey) => {
      if (selectedKey !== null) {
        changePage(selectedKey as string);
      }
    }}>
      {hasDashboard && (
        <Nav.Item key="Dashboard">
          <Nav.Link className={`${currentPage === "Dashboard" ? "active-page" : ""}`} eventKey="Dashboard">Dashboard</Nav.Link>
        </Nav.Item>
      )}
      {hasCadastro && (
      <Nav.Item key="Cadastro">
        <Nav.Link className={`${currentPage === "Cadastro" ? "active-page" : ""}`} eventKey="Cadastro">Cadastro</Nav.Link>
      </Nav.Item>
      )}
      <Nav.Item key="Consulta">
        <Nav.Link className={`${currentPage === "Consulta" ? "active-page" : ""}`} eventKey="Consulta">Consulta</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;